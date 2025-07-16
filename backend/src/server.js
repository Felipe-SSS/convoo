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

io.on('connection', (socket) => {
  console.log(`[Socket.IO] Usuário conectado: ${socket.id}`);

  socket.on('find-match', ({ peerId, preferences }) => {
    console.log(`[Matchmaker] ${socket.id} (Peer: ${peerId}) procura par com pref:`, preferences);
    
    const currentUser = { socketId: socket.id, peerId, preferences };

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

      io.to(partner.socketId).emit('match-found', { partnerPeerId: currentUser.peerId, roomId });
      io.to(currentUser.socketId).emit('match-found', { partnerPeerId: partner.peerId, roomId });
    } else {
      waitingUsers.push(currentUser);
      console.log(`[Matchmaker] ${socket.id} adicionado à fila de espera.`);
    }
  });

  const cleanupUser = () => {
    const initialLength = waitingUsers.length;
    waitingUsers = waitingUsers.filter(user => user.socketId !== socket.id);
    if (initialLength > waitingUsers.length) {
      console.log(`[Matchmaker] ${socket.id} removido da fila.`);
    }
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