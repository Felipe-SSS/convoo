import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Peer } from 'peerjs';
import io from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const socketRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    //const socket = io('https://c48c-138-94-55-208.ngrok-free.app ');
    socketRef.current = socket;

    /*const peer = new Peer(undefined, {
      host: 'https://f36e-138-94-55-208.ngrok-free.app',
      secure: true,
      path: '/myapp'
    });*/

    const peer = new Peer(undefined, {
      host: 'localhost', port: 9000, path: '/myapp',
    });
    peerRef.current = peer; 

    peer.on('open', (peerId) => {
      console.log('[PeerJS] Conectado. ID:', peerId);
      socket.emit('find-match', { peerId, preferences });
    });

    socket.on('match-found', ({ partnerPeerId, roomId }) => {
      console.log(`[Socket.IO] Par encontrado: ${partnerPeerId}, Sala: ${roomId}`);
      navigate(`/main/call/${roomId}`, {
        state: { partnerPeerId, myPeerId: peer.id }
      });
    });

    return () => {
      socket.disconnect();
      peer.destroy();
    };
  }, [navigate, preferences]);

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