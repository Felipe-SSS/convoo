import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { PeerServer } from 'peer';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://a433-138-94-55-208.ngrok-free.app "], // IMPORTANTE: Mude para o domínio do seu frontend em produção
    methods: ["GET", "POST"]
  }
});

const PORT = /*process.env.PORT ||*/ 3001;

// --- Lógica do Matchmaker com Filtros ---
let waitingUsers = [];
let connectedUsers = new Map(); // Armazena IDs dos usuários conectados

io.on('connection', (socket) => {
  console.log(`[Socket.IO] Usuário conectado: ${socket.id}`);

  socket.on('find-match', ({ peerId, preferences, userId }) => {
    console.log(`[Matchmaker] ${socket.id} (Peer: ${peerId}) procura par com pref:`, preferences);
    console.log(`[Matchmaker] ID do usuário:`, userId);
    
    // Armazenar ID do usuário
    connectedUsers.set(socket.id, { peerId, userId });
    
    const currentUser = { 
      socketId: socket.id, 
      peerId, 
      preferences,
      userId: userId
    };

    // Tenta encontrar um parceiro compatível na fila
    const partnerIndex = waitingUsers.findIndex(user => 
      (preferences.language === 'any' || user.preferences.language === 'any' || user.preferences.language === preferences.language) &&
      (preferences.country === 'any' || user.preferences.country === 'any' || user.preferences.country === preferences.country) &&
      (preferences.topic === 'any' || user.preferences.topic === 'any' || user.preferences.topic === preferences.topic)
    );

    if (partnerIndex !== -1) {
      const partner = waitingUsers.splice(partnerIndex, 1)[0];
      console.log(`[Matchmaker] Par compatível encontrado! ${currentUser.peerId} <=> ${partner.peerId}`);
      
      const roomId = `${currentUser.socketId}-${partner.socketId}`;

      // Envia IDs dos parceiros para ambos os usuários
      io.to(partner.socketId).emit('match-found', { 
        partnerPeerId: currentUser.peerId, 
        roomId,
        partnerUserId: currentUser.userId
      });
      io.to(currentUser.socketId).emit('match-found', { 
        partnerPeerId: partner.peerId, 
        roomId,
        partnerUserId: partner.userId
      });
      
      // Debug: Log dos IDs enviados
      console.log(`[Matchmaker] Enviando para ${partner.socketId}:`, {
        partnerPeerId: currentUser.peerId,
        partnerUserId: currentUser.userId
      });
      console.log(`[Matchmaker] Enviando para ${currentUser.socketId}:`, {
        partnerPeerId: partner.peerId,
        partnerUserId: partner.userId
      });
    } else {
      waitingUsers.push(currentUser);
      console.log(`[Matchmaker] ${socket.id} adicionado à fila de espera.`);
    }
  });

  // Novo evento para trocar IDs durante a chamada
  socket.on('request-partner-user-id', ({ roomId }) => {
    console.log(`[Socket.IO] ${socket.id} solicitando ID do parceiro na sala ${roomId}`);
    console.log(`[Socket.IO] Usuários conectados:`, Array.from(connectedUsers.entries()));
    
    // Encontrar o parceiro na mesma sala (lógica simplificada)
    const currentUserData = connectedUsers.get(socket.id);
    console.log(`[Socket.IO] Dados do usuário atual:`, currentUserData);
    
    // Buscar por qualquer outro usuário conectado
    const partnerSocketId = Array.from(connectedUsers.keys()).find(id => 
      id !== socket.id
    );
    
    console.log(`[Socket.IO] Parceiro encontrado:`, partnerSocketId);
    
    if (partnerSocketId) {
      const partnerUserId = connectedUsers.get(partnerSocketId)?.userId;
      console.log(`[Socket.IO] Enviando ID do parceiro:`, partnerUserId);
      socket.emit('partner-user-id', partnerUserId);
    } else {
      console.log(`[Socket.IO] Nenhum parceiro encontrado`);
    }
  });

  // Novo evento para atualizar ID do usuário
  socket.on('update-user-id', ({ userId, roomId }) => {
    console.log(`[Socket.IO] ${socket.id} atualizando ID:`, userId);
    
    const currentUserData = connectedUsers.get(socket.id);
    if (currentUserData) {
      connectedUsers.set(socket.id, { 
        ...currentUserData, 
        userId,
        roomId 
      });
    }
  });

  const cleanupUser = () => {
    const initialLength = waitingUsers.length;
    waitingUsers = waitingUsers.filter(user => user.socketId !== socket.id);
    if (initialLength > waitingUsers.length) {
      console.log(`[Matchmaker] ${socket.id} removido da fila.`);
    }
    
    // Remover das informações conectadas
    connectedUsers.delete(socket.id);
  };

  socket.on('cancel-search', cleanupUser);
  socket.on('disconnect', () => {
    console.log(`[Socket.IO] Usuário desconectado: ${socket.id}`);
    cleanupUser();
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor de Matchmaking (Socket.IO) rodando na porta ${PORT}`);
});

PeerServer({ port: 9000, path: '/myapp' });
console.log(`🛰️ PeerServer (WebRTC) rodando na porta 9000`);