import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users, Settings, ScreenShare, Maximize, Minimize, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';


const CallPage = () => {
  const { callId } = useParams();
  const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Erro ao acessar mídia: ", error);
        setIsCameraOn(false);
        setIsMicOn(false);
      }
    };
    setupMedia();

    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleEndCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    navigate('/main/talk');
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user', time: new Date() }]);
      setNewMessage('');
      // Simulate receiving a message
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Olá! Tudo bem?", sender: 'other', time: new Date() }]);
      }, 1000);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <motion.div 
      className="h-screen w-screen flex bg-slate-900 text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-4 left-4 z-20">
        <img src={"/icons/logo-convoo.png"} alt="Convoo Logo" className="h-8" />
      </div>

      <div className={`flex-1 flex flex-col items-center justify-center p-4 transition-all duration-300 ${isChatOpen ? 'mr-80' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full max-w-6xl">
          <Card className="bg-slate-800 border-slate-700 overflow-hidden relative aspect-video flex items-center justify-center">
            {isCameraOn ? (
              <video ref={localVideoRef} autoPlay muted className="w-full h-full object-cover transform scale-x-[-1]"></video>
            ) : (
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" alt="Você" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <p className="text-slate-400">Câmera Desligada</p>
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-sm text-white">Você</div>
          </Card>
           <Card className="bg-slate-800 border-slate-700 overflow-hidden relative aspect-video flex items-center justify-center">
            <video ref={remoteVideoRef} autoPlay className="w-full h-full object-cover hidden"></video>
             <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt="Outro Usuário" />
                  <AvatarFallback>OU</AvatarFallback>
                </Avatar>
                <p className="text-slate-400">Aguardando outro usuário...</p>
              </div>
            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-sm text-white">Parceiro de Conversa</div>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="w-80 bg-slate-800 border-l border-slate-700 h-full flex flex-col fixed right-0 top-0 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Chat da Chamada</h2>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-2 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-convoo-blue text-white' : 'bg-slate-700 text-slate-200'}`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'} text-right`}>
                      {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
               {messages.length === 0 && (
                <div className="text-center text-slate-500 mt-10">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma mensagem ainda.</p>
                  <p>Comece uma conversa!</p>
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
              <Input 
                type="text" 
                placeholder="Digite sua mensagem..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-slate-700 border-slate-600 focus:ring-convoo-blue placeholder-slate-500" 
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-sm z-10">
        <div className="flex justify-center items-center space-x-3 md:space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleMic} className={`rounded-full h-12 w-12 md:h-14 md:w-14 ${isMicOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'} text-white`}>
            {isMicOn ? <Mic className="h-5 w-5 md:h-6 md:w-6" /> : <MicOff className="h-5 w-5 md:h-6 md:w-6" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleCamera} className={`rounded-full h-12 w-12 md:h-14 md:w-14 ${isCameraOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'} text-white`}>
            {isCameraOn ? <Video className="h-5 w-5 md:h-6 md:w-6" /> : <VideoOff className="h-5 w-5 md:h-6 md:w-6" />}
          </Button>
          <Button variant="destructive" size="icon" onClick={handleEndCall} className="rounded-full h-14 w-16 md:h-16 md:w-20 bg-red-600 hover:bg-red-700">
            <PhoneOff className="h-6 w-6 md:h-7 md:w-7" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleChat} className="rounded-full h-12 w-12 md:h-14 md:w-14 bg-white/20 hover:bg-white/30 text-white">
            <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
            {messages.length > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-convoo-orange animate-ping"></span>
            )}
          </Button>
           <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 md:h-14 md:w-14 bg-white/20 hover:bg-white/30 text-white hidden md:inline-flex">
            <ScreenShare className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="rounded-full h-12 w-12 md:h-14 md:w-14 bg-white/20 hover:bg-white/30 text-white hidden md:inline-flex">
            {isFullscreen ? <Minimize className="h-5 w-5 md:h-6 md:w-6" /> : <Maximize className="h-5 w-5 md:h-6 md:w-6" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 md:h-14 md:w-14 bg-white/20 hover:bg-white/30 text-white hidden md:inline-flex">
            <Settings className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CallPage;