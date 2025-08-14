// AuthLayout.jsx
import React from 'react';
import GeometricBackground from './GeometricBackground';
import AuthCard from './AuthCard';

const AuthLayoutLogin = ({ children, title, description, formFooter }) => {
  return (
    <GeometricBackground>
      <AuthCard 
        title={title} 
        description={description} 
        formFooter={formFooter}
        maxWidth='450px'
      >
        {children}
      </AuthCard>
    </GeometricBackground>
  );
};

export default AuthLayoutLogin;
