// AuthLayout.jsx
import React from 'react';
import GeometricBackground from './GeometricBackground';
import AuthCard from './AuthCard';

const AuthLayoutRegister = ({ children, title, description, formFooter }) => {
  return (
    <GeometricBackground>
      <AuthCard 
        title={title} 
        description={description} 
        formFooter={formFooter}
      >
        {children}
      </AuthCard>
    </GeometricBackground>
  );
};

export default AuthLayoutRegister;
