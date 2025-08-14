import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthCard = ({ children, title, description, formFooter, maxWidth = "600px" }) => {
  return (
    <motion.div
      className="relative z-10 w-full p-8 space-y-6 bg-white/90 backdrop-blur-sm shadow-2xl rounded-xl m-4 border border-slate-200"
      style={{ maxWidth }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="text-center">
        <Link to="/">
          <img src='/icons/logo-convoo.png' alt="Convoo Logo" className="mx-auto h-12 md:h-16 mb-6" />
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        <p className="text-slate-600 mt-2">{description}</p>
      </div>
      {children}
      <div className="text-sm text-center text-slate-500">
        {formFooter}
      </div>
    </motion.div>
  );
};

export default AuthCard;
