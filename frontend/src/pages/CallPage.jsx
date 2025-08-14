import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Peer } from 'peerjs';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, ScreenShare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import io from 'socket.io-client';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const CallPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { callId: roomId } = useParams();
  const { partnerPeerId, myPeerId, partnerUserId } = location.state || {};
  const { user } = useContext(AuthContext);

  // Debug: Log das informações do parceiro
  console.log('CallPage - partnerUserId:', partnerUserId);
  console.log('CallPage - partnerPeerId:', partnerPeerId);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [partnerConnected, setPartnerConnected] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [socket, setSocket] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const dataConnectionRef = useRef(null);

  // Conectar ao socket para trocar IDs
  useEffect(() => {
    const socketInstance = io('http://localhost:3001');
    setSocket(socketInstance);

    // Solicitar ID do parceiro
    if (roomId) {
      socketInstance.emit('request-partner-user-id', { roomId });
    }

    // Escutar ID do parceiro
    socketInstance.on('partner-user-id', (partnerUserId) => {
      console.log('CallPage - ID do parceiro recebido:', partnerUserId);
      
      // Obter informações do parceiro usando o ID
      if (partnerUserId) {
        api.get(`/users/${partnerUserId}`)
          .then(response => {
            const partnerData = response.data.data;
            console.log('CallPage - Informações do parceiro obtidas:', partnerData);
            setPartnerInfo(partnerData);
          })
          .catch(error => {
            console.error('Erro ao obter informações do parceiro:', error);
          });
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId]);

  // Atualizar ID do usuário no servidor
  useEffect(() => {
    const updateUserId = async () => {
      if (socket && user) {
        try {
          const response = await api.get('/users/info');
          const userId = response.data.data.id;
          
          socket.emit('update-user-id', { 
            userId,
            roomId 
          });
          
          console.log('CallPage - ID do usuário atualizado:', userId);
        } catch (error) {
          console.error('Erro ao obter ID do usuário:', error);
        }
      }
    };

    updateUserId();
  }, [socket, user, roomId]);

  // Obter informações do parceiro usando o ID inicial
  useEffect(() => {
    console.log('CallPage - useEffect partnerUserId:', partnerUserId);
    if (partnerUserId) {
      console.log('CallPage - Fazendo requisição para obter informações do parceiro...');
      api.get(`/users/${partnerUserId}`)
        .then(response => {
          const partnerData = response.data.data;
          console.log('CallPage - Informações iniciais do parceiro obtidas:', partnerData);
          setPartnerInfo(partnerData);
        })
        .catch(error => {
          console.error('CallPage - Erro ao obter informações iniciais do parceiro:', error);
          console.error('CallPage - Detalhes do erro:', error.response?.data);
        });
    } else {
      console.log('CallPage - Nenhum partnerUserId recebido');
    }
  }, [partnerUserId]);

  useEffect(() => {
    if (!partnerPeerId || !myPeerId) {
      navigate('/main/talk');
      return;
    }

    const peer = new Peer(myPeerId, { host: 'localhost', port: 9000, path: '/myapp' });
    peerRef.current = peer;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(myStream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = myStream;
        }

        const setupCall = (call) => {
          call.on('stream', (partnerStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = partnerStream;
              setPartnerConnected(true);
            }
          });
          call.on('close', handleEndCall);
        };

        const setupDataConnection = (conn) => {
          dataConnectionRef.current = conn;
          conn.on('data', (data) => {
            setMessages(prev => [...prev, { ...data, sender: 'other' }]);
          });
        };
        
        // Liga para o parceiro
        const call = peer.call(partnerPeerId, myStream);
        setupCall(call);

        // Inicia a conexão de dados
        const dataConnection = peer.connect(partnerPeerId);
        setupDataConnection(dataConnection);

        // Atende a chamada do parceiro
        peer.on('call', (incomingCall) => {
          incomingCall.answer(myStream);
          setupCall(incomingCall);
        });

        // Aceita a conexão de dados do parceiro
        peer.on('connection', (conn) => {
          setupDataConnection(conn);
        });

      }).catch(err => {
        console.error("Erro ao acessar mídia:", err);
      });

    return () => {
      if (peerRef.current) peerRef.current.destroy();
    };
  }, [partnerPeerId, myPeerId, navigate]);

  const toggleStream = (type, enabled) => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => {
        if (track.kind === type) track.enabled = enabled;
      });
    }
  };

  const toggleMic = () => {
    setIsMicOn(prev => {
      toggleStream('audio', !prev);
      return !prev;
    });
  };

  const toggleCamera = () => {
    setIsCameraOn(prev => {
      toggleStream('video', !prev);
      return !prev;
    });
  };

  const handleEndCall = () => {
    if (peerRef.current) peerRef.current.destroy();
    navigate('/main/talk');
  };

  const sendMessage = () => {
    if (newMessage.trim() && dataConnectionRef.current) {
      const messageData = { type: 'message', text: newMessage, timestamp: Date.now() };
      dataConnectionRef.current.send(messageData);
      setMessages(prev => [...prev, { ...messageData, sender: 'me' }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <motion.div 
      className="h-screen w-screen bg-slate-900 flex flex-col relative overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <div className={`flex-1 flex flex-col items-center justify-center p-4 transition-all duration-300 ${isChatOpen ? 'mr-80' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full max-w-6xl">
          <Card className="bg-slate-800 border-slate-700 overflow-hidden relative aspect-video flex items-center justify-center">
            <video ref={localVideoRef} autoPlay muted className={`w-full h-full object-cover transform scale-x-[-1] ${!isCameraOn && 'hidden'}`}></video>
            {!isCameraOn && (
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-2"><AvatarFallback>VC</AvatarFallback></Avatar>
                <p className="text-slate-400">Câmera Desligada</p>
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-sm text-white">Você</div>
          </Card>
          <Card className="bg-slate-800 border-slate-700 overflow-hidden relative aspect-video flex items-center justify-center">
            <video ref={remoteVideoRef} autoPlay className={`w-full h-full object-cover ${!partnerConnected && 'hidden'}`}></video>
            {!partnerConnected && (
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-2"><AvatarFallback>PC</AvatarFallback></Avatar>
                <p className="text-slate-400">Aguardando parceiro...</p>
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-sm text-white">
              {partnerInfo?.name || partnerInfo?.username || 'Parceiro de Conversa'}
            </div>
            {partnerInfo?.country && (
              <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-sm text-white">
                {partnerInfo.country}
              </div>
            )}
            {/* Informações adicionais do parceiro */}
            {partnerInfo && (
              <div className="absolute top-2 left-2 bg-black/50 px-3 py-2 rounded-lg text-sm text-white">
                <div className="font-semibold">{partnerInfo.name || partnerInfo.username || 'Parceiro'}</div>
                {partnerInfo.country && <div className="text-xs opacity-80">{partnerInfo.country}</div>}
              </div>
            )}
          </Card>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-sm z-10">
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full p-3 ${isMicOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-600 hover:bg-red-700'}`}
            onClick={toggleMic}
          >
            {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full p-3 ${isCameraOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-600 hover:bg-red-700'}`}
            onClick={toggleCamera}
          >
            {isCameraOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-3 bg-slate-700 hover:bg-slate-600"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-3 bg-red-600 hover:bg-red-700"
            onClick={handleEndCall}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="absolute right-0 top-0 h-full w-80 bg-slate-800 border-l border-slate-700 flex flex-col"
            initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-semibold text-white">Chat</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'me' 
                      ? 'bg-convoo-blue text-white' 
                      : 'bg-slate-700 text-white'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm">Enviar</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CallPage;