#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function ensureUploadsDirectory() {
  try {
    const uploadsDir = path.join(__dirname, '..', 'backend', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('✅ Diretório backend/uploads criado com sucesso!');
      console.log(`📍 Localização: ${uploadsDir}`);
    } else {
      console.log('✅ Diretório backend/uploads já existe!');
      console.log(`📍 Localização: ${uploadsDir}`);
    }
    
    try {
      fs.accessSync(uploadsDir, fs.constants.R_OK | fs.constants.W_OK);
      console.log('✅ Permissões de leitura e escrita confirmadas!');
    } catch (error) {
      console.warn('⚠️  Aviso: Verifique as permissões do diretório uploads');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao verificar/criar diretório uploads:', error.message);
    return false;
  }
}

if (require.main === module) {
  const success = ensureUploadsDirectory();
  process.exit(success ? 0 : 1);
}

module.exports = ensureUploadsDirectory;
