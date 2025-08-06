const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql2/promise');

const prisma = new PrismaClient();

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'convoo',
  port: process.env.DB_PORT || 3306
};

// Scripts dos triggers
const triggers = [
  {
    name: 'set_duration_before_insert',
    description: 'Calcula automaticamente a duração das chamadas de vídeo',
    sql: `
DELIMITER //
CREATE TRIGGER set_duration_before_insert
BEFORE INSERT ON video_calls
FOR EACH ROW
BEGIN
  IF NEW.ended_at IS NOT NULL THEN
    SET NEW.duration_seconds = TIMESTAMPDIFF(SECOND, NEW.started_at, NEW.ended_at);
  END IF;
END//
DELIMITER ;
    `.trim()
  },
  {
    name: 'trg_add_minutes_to_user_stats',
    description: 'Atualiza as estatísticas de minutos falados quando o usuário sai da chamada',
    sql: `
DELIMITER //
CREATE TRIGGER trg_add_minutes_to_user_stats
AFTER UPDATE ON video_call_participants
FOR EACH ROW
BEGIN
  -- Só atualiza se o usuário acabou de sair da call
  IF OLD.left_at IS NULL AND NEW.left_at IS NOT NULL THEN
    UPDATE user_stats
    SET min_talked = min_talked + TIMESTAMPDIFF(MINUTE, NEW.joined_at, NEW.left_at)
    WHERE user_id = NEW.user_id;
  END IF;
END//
DELIMITER ;
    `.trim()
  }
];

async function createTriggers() {
  console.log('🚀 Iniciando criação dos triggers...');
  
  let connection;
  
  try {
    // Conectar ao banco de dados
    console.log('📡 Conectando ao banco de dados...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado com sucesso!');

    // Verificar se os triggers já existem
    console.log('🔍 Verificando triggers existentes...');
    const [existingTriggers] = await connection.execute(
      "SELECT TRIGGER_NAME FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = ?",
      [dbConfig.database]
    );
    
    const existingTriggerNames = existingTriggers.map(t => t.TRIGGER_NAME);
    console.log(`📋 Triggers existentes: ${existingTriggerNames.join(', ') || 'Nenhum'}`);

    // Criar cada trigger
    for (const trigger of triggers) {
      if (existingTriggerNames.includes(trigger.name)) {
        console.log(`⚠️  Trigger '${trigger.name}' já existe, pulando...`);
        continue;
      }

      console.log(`🔧 Criando trigger: ${trigger.name}`);
      console.log(`📝 Descrição: ${trigger.description}`);
      
      try {
        await connection.execute(trigger.sql);
        console.log(`✅ Trigger '${trigger.name}' criado com sucesso!`);
      } catch (error) {
        console.error(`❌ Erro ao criar trigger '${trigger.name}':`, error.message);
      }
    }

    console.log('🎉 Processo de criação dos triggers concluído!');

  } catch (error) {
    console.error('❌ Erro durante a criação dos triggers:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Conexão com o banco fechada.');
    }
    await prisma.$disconnect();
  }
}

// Função para remover triggers (útil para desenvolvimento)
async function dropTriggers() {
  console.log('🗑️  Iniciando remoção dos triggers...');
  
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado com sucesso!');

    for (const trigger of triggers) {
      console.log(`🗑️  Removendo trigger: ${trigger.name}`);
      try {
        await connection.execute(`DROP TRIGGER IF EXISTS ${trigger.name}`);
        console.log(`✅ Trigger '${trigger.name}' removido com sucesso!`);
      } catch (error) {
        console.error(`❌ Erro ao remover trigger '${trigger.name}':`, error.message);
      }
    }

    console.log('🎉 Processo de remoção dos triggers concluído!');

  } catch (error) {
    console.error('❌ Erro durante a remoção dos triggers:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
    await prisma.$disconnect();
  }
}

// Verificar argumentos da linha de comando
const args = process.argv.slice(2);
const command = args[0];

if (command === 'drop') {
  dropTriggers();
} else {
  createTriggers();
} 