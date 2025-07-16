import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Peer } from 'peerjs';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, ScreenShare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const CallPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { callId: roomId } = useParams();
  const { partnerPeerId, myPeerId } = location.state || {};

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [partnerConnected, setPartnerConnected] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const dataConnectionRef = useRef(null);

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && dataConnectionRef.current) {
      const messagePayload = { text: newMessage, time: new Date() };
      dataConnectionRef.current.send(messagePayload);
      setMessages([...messages, { ...messagePayload, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <motion.div 
      className="h-screen w-screen flex bg-slate-900 text-white relative overflow-hidden"
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
            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-sm text-white">Parceiro de Conversa</div>
          </Card>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-sm z-10">
        <div className="flex justify-center items-center space-x-3 md:space-x-4">
          <Button onClick={toggleMic} className={`rounded-full h-14 w-14 ${isMicOn ? 'bg-white/20' : 'bg-red-500'}`}>
            {isMicOn ? <Mic /> : <MicOff />}
          </Button>
          <Button onClick={toggleCamera} className={`rounded-full h-14 w-14 ${isCameraOn ? 'bg-white/20' : 'bg-red-500'}`}>
            {isCameraOn ? <Video /> : <VideoOff />}
          </Button>
          <Button onClick={handleEndCall} className="rounded-full h-16 w-20 bg-red-600">
            <PhoneOff />
          </Button>
          <Button onClick={() => setIsChatOpen(true)} className="rounded-full h-14 w-14 bg-white/20">
            <MessageSquare />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="w-80 bg-slate-800 border-l border-slate-700 h-full flex flex-col fixed right-0 top-0 shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Chat da Chamada</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}><X/></Button>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-2 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-convoo-blue text-white' : 'bg-slate-700 text-slate-200'}`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
              <Input type="text" placeholder="Digite sua mensagem..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CallPage;