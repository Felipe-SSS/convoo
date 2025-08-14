import React, { useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Peer } from 'peerjs';
import io from 'socket.io-client';
import { Button } from '@/components';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const LoadingDot = ({ delay }) => (
  <motion.div
    className="h-3 w-3 bg-white rounded-full"
    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const CallLoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { preferences } = location.state || { preferences: { language: 'any', country: 'any', topic: 'any' } };
  const { user } = useContext(AuthContext);

  const socketRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    const peer = new Peer(undefined, {
      host: 'localhost', port: 9000, path: '/myapp',
    });
    peerRef.current = peer; 

    peer.on('open', async (peerId) => {
      console.log('[PeerJS] Conectado. ID:', peerId);
      
      // Obter ID do usuário atual
      let userId = null;
      
      try {
        if (user) {
          console.log('CallLoadingPage - Usuário autenticado:', user);
          const response = await api.get('/users/info');
          console.log('CallLoadingPage - Resposta da API:', response.data);
          userId = response.data.data.id;
          console.log('CallLoadingPage - userId obtido:', userId);
        } else {
          console.log('CallLoadingPage - Nenhum usuário autenticado');
        }
      } catch (error) {
        console.error('CallLoadingPage - Erro ao obter ID do usuário:', error);
        console.error('CallLoadingPage - Detalhes do erro:', error.response?.data);
      }
      
      console.log('CallLoadingPage - Enviando para socket:', { peerId, preferences, userId });
      socket.emit('find-match', { peerId, preferences, userId });
    });

    socket.on('match-found', ({ partnerPeerId, roomId, partnerUserId }) => {
      console.log(`[Socket.IO] Par encontrado: ${partnerPeerId}, Sala: ${roomId}`);
      console.log(`[Socket.IO] ID do parceiro:`, partnerUserId);
      
      // Debug: Verificar se o ID do parceiro foi recebido
      if (partnerUserId) {
        console.log('✅ ID do parceiro recebido:', partnerUserId);
      } else {
        console.log('⚠️ Nenhum ID do parceiro recebido');
      }
      
      navigate(`/main/call/${roomId}`, {
        state: { 
          partnerPeerId, 
          myPeerId: peer.id,
          partnerUserId: partnerUserId
        }
      });
    });

    return () => {
      socket.disconnect();
      peer.destroy();
    };
  }, [navigate, preferences, user]);

  const handleCancel = () => {
    if (socketRef.current) {
      socketRef.current.emit('cancel-search');
    }
    navigate('/main/talk');
  };

  return (
    <motion.div
      className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-convoo-blue to-blue-700 text-white p-4 relative"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 left-6 text-white hover:bg-white/20"
        onClick={handleCancel}
      >
        <X className="h-6 w-6" />
      </Button>

      <motion.img
        src={"/icons/logo-convoo.png"}
        alt="Convoo Logo"
        className="h-40 mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      />

      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-6 text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        Estamos procurando alguém para se conectar...
      </motion.h1>

      <motion.div
        className="flex space-x-3 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <LoadingDot delay={0} />
        <LoadingDot delay={0.2} />
        <LoadingDot delay={0.4} />
      </motion.div>

      <motion.div
        className="w-full max-w-md bg-white/10 p-6 rounded-lg shadow-xl text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 120 }}
      >
        <h2 className="text-xl font-semibold mb-2">Dica Rápida:</h2>
        <p className="text-blue-100 text-sm">
          Comece com um "Olá!" amigável e pergunte sobre o dia da pessoa. <br />Lembre-se, o objetivo é praticar e se divertir! 😊
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CallLoadingPage;