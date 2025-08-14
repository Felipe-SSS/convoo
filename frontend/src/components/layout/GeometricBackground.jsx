import React from 'react';
import { motion } from 'framer-motion';

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

const GeometricBackground = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden ${className}`}>
      {/* Hexágono Azul Escuro (esquerda superior) - Tamanho fixo baseado no viewport */}
      <motion.div
        className="fixed opacity-50"
        style={{
          left: '0vw',
          top: '2vh',
          transform: 'translate(-62%, -10%)',
          width: '40vw',
          height: '40vw'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Hexagon size="100%" color="#0b2c49" />
      </motion.div>

      
      {/* Hexágono Azul Escuro (direita inferior) - Tamanho fixo baseado no viewport */}
      <motion.div
        className="fixed opacity-50"
        style={{
          right: '1vw',
          bottom: '11vh',
          transform: 'translate(62%, 28%)',
          width: '40vw',
          height: '40vw'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Hexagon size="100%" color="#0b2c49" />
      </motion.div>

     {/* Hexágono Azul Claro (esquerda) - Tamanho fixo baseado no viewport */}
      <motion.div
        className="fixed opacity-50"
        style={{
          left: '0',
          top: '8vh',
          transform: 'translate(-70%, -10%)',
          width: '60vw',
          height: '60vw'
        }}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Hexagon size="100%" color="#0863ac" />
      </motion.div>

        {/* Hexágono Azul Claro (direita) - Tamanho fixo baseado no viewport */}
        <motion.div
          className="fixed opacity-50"
          style={{
            right: '0',
            bottom: '-30vh',
            transform: 'translate(70%, -10%)',
            width: '60vw',
            height: '60vw'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Hexagon size="100%" color="#0863ac" />
        </motion.div>

      {/* Triângulo Superior Direito - Tamanho fixo baseado no viewport */}
      <motion.div
        className="fixed opacity-70"
        style={{
          top: '-7vh',
          right: '-12.5vw',
          width: '15vw',
          height: '15vw'
        }}
        initial={{ scale: 0.7, opacity: 0, rotate: -30 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: 0,
          x: '-15vw',
          y: '-5vh'
        }}
        transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
      >
        <TrianguloArredondado size="100%" color="#f97316" />
      </motion.div>

          {/* Triângulo Inferior Esquerdo - Tamanho fixo baseado no viewport */}
          <motion.div
            className="fixed opacity-70"
            style={{
              bottom: '-7vh',
              left: '-0.5vw',
              width: '15vw',
              height: '15vw'
            }}
            initial={{ scale: 0.7, opacity: 0, rotate: 30 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              x: '3vw',
              y: '5vh'
            }}
            transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          >
            <TrianguloArredondado size="100%" color="#f97316" flipped />
          </motion.div> 

      {/* Conteúdo passado como children */}
      {children}
    </div>
  );
};

export default GeometricBackground;
