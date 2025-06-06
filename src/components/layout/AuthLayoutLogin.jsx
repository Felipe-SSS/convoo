// AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const conlogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/13e7dfcc-9954-41c7-a924-7433fd40a466/060a102f45e7b3e5c7fba88a7d09f9f0.png";

const Hexagon = ({ size = 200, color = "#0b2c49" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
    <defs>
      <clipPath id="rounded-hex">
        <path d="
          M 25,3
          Q 20,5 18,10
          L 3,40
          Q 1,45 3,50
          L 18,80
          Q 20,85 25,87
          L 75,87
          Q 80,85 82,80
          L 97,50
          Q 99,45 97,40
          L 82,10
          Q 80,5 75,3
          Z" />
      </clipPath>
    </defs>
    <rect width="100" height="100" fill={color} clipPath="url(#rounded-hex)" />
  </svg>
);

const TrianguloArredondado = ({ className, flipped = false, size = 100, color = "#F97316" }) => {
  const width = size;
  const height = (size * 220) / 240; // nova altura proporcional
  const transform = flipped
    ? `scale(1, -1) translate(0, -220)` // flip ajustado para altura nova
    : `scale(1, 1)`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 220" // altura total menor agora
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={transform}>
        <path
          d="
            M120 220
            C110 220, 100 200, 40 90
            C30 70, 45 50, 65 50
            H175
            C195 50, 210 70, 200 90
            C140 200, 130 220, 120 220
            Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

const AuthLayoutLogin = ({ children, title, description, formFooter }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">

      {/* Hexágono Azul Escuro (esquerda superior) */}
      <motion.div
        className="absolute left-4 top-0 h-screen -translate-x-[62%] -translate-y-[10%] opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Hexagon size={700} color="#0b2c49" />
      </motion.div>

      
      {/* Hexágono Azul Escuro (direita inferior – espelhado do superior esquerdo) */}
      <motion.div
        className="absolute right-4 top-0 h-screen translate-x-[62%] translate-y-[28%] opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Hexagon size={700} color="#0b2c49" />
      </motion.div>

     {/* Hexágono Azul Claro (esquerda - cobre toda a altura, aparece pela metade) */}
      <motion.div
        className="absolute left-0 top-0 h-screen -translate-x-[70%] -translate-y-[10%] opacity-50"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Hexagon size={1000} color="#0863ac" />
      </motion.div>

        {/* Hexágono Azul Claro (direita - cobre toda a altura, aparece pela metade) */}
        <motion.div
          className="absolute right-0 top-0 h-screen translate-x-[70%] -translate-y-[10%] opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Hexagon size={1000} color="#0863ac" />
        </motion.div>




      {/* Triângulo Superior Direito (espelhado do inferior esquerdo, sem flipped) */}
      <motion.div
        className="absolute top-0 right-6 w-[60px] opacity-70"
        initial={{ scale: 0.7, opacity: 0, rotate: -30 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: 0,
          x: -220,
          y: -90
        }}
        transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
      >
        <TrianguloArredondado size={250} color="#f97316" />
      </motion.div>

          {/* Triângulo Inferior Esquerdo */}
          <motion.div
            className="absolute bottom-0 left-6 w-[60px] opacity-70"
            initial={{ scale: 0.7, opacity: 0, rotate: 30 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              x: 40,  // desloca 60px para direita
              y: 90   // desloca 20px para baixo
            }}
            transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          >
            <TrianguloArredondado size={250} color="#f97316" flipped />
          </motion.div> 

      {/* Conteúdo do Card */}
      <motion.div
        className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-sm shadow-2xl rounded-xl m-4 border border-slate-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center">
          <Link to="/">
            <img src={conlogoUrl} alt="Convoo Logo" className="mx-auto h-12 md:h-16 mb-6" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
          <p className="text-slate-600 mt-2">{description}</p>
        </div>
        {children}
        <div className="text-sm text-center text-slate-500">
          {formFooter}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayoutLogin;
