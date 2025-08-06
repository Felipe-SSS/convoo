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

async function testTriggers() {
  console.log('🧪 Iniciando testes dos triggers...');
  
  let connection;
  
  try {
    // Conectar ao banco de dados
    console.log('📡 Conectando ao banco de dados...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado com sucesso!');

    // Verificar se os triggers existem
    console.log('🔍 Verificando triggers...');
    const [triggers] = await connection.execute(
      "SELECT TRIGGER_NAME, EVENT_MANIPULATION, EVENT_OBJECT_TABLE FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = ? ORDER BY TRIGGER_NAME",
      [dbConfig.database]
    );
    
    if (triggers.length === 0) {
      console.log('⚠️  Nenhum trigger encontrado. Execute primeiro: npm run triggers');
      return;
    }

    console.log('📋 Triggers encontrados:');
    triggers.forEach(trigger => {
      console.log(`  - ${trigger.TRIGGER_NAME} (${trigger.EVENT_MANIPULATION} on ${trigger.EVENT_OBJECT_TABLE})`);
    });

    // Testar trigger de duração
    console.log('\n🧪 Testando trigger de duração...');
    try {
      const testCall = {
        started_at: new Date(),
        ended_at: new Date(Date.now() + 60000), // 1 minuto depois
        recording_url: 'test.mp4'
      };

      const [result] = await connection.execute(
        'INSERT INTO video_calls (started_at, ended_at, recording_url) VALUES (?, ?, ?)',
        [testCall.started_at, testCall.ended_at, testCall.recording_url]
      );

      const [callResult] = await connection.execute(
        'SELECT duration_seconds FROM video_calls WHERE id = ?',
        [result.insertId]
      );

      if (callResult.length > 0 && callResult[0].duration_seconds) {
        console.log(`✅ Trigger de duração funcionando! Duração calculada: ${callResult[0].duration_seconds} segundos`);
      } else {
        console.log('❌ Trigger de duração não funcionou corretamente');
      }

      // Limpar teste
      await connection.execute('DELETE FROM video_calls WHERE id = ?', [result.insertId]);

    } catch (error) {
      console.error('❌ Erro ao testar trigger de duração:', error.message);
    }

    // Testar trigger de estatísticas (simulação)
    console.log('\n🧪 Testando trigger de estatísticas...');
    try {
      // Verificar se existe um usuário para teste
      const [users] = await connection.execute('SELECT id FROM users LIMIT 1');
      
      if (users.length === 0) {
        console.log('⚠️  Nenhum usuário encontrado para testar trigger de estatísticas');
        console.log('💡 Crie um usuário primeiro ou execute o seed');
      } else {
        const userId = users[0].id;
        
        // Verificar se user_stats existe para este usuário
        const [stats] = await connection.execute(
          'SELECT min_talked FROM user_stats WHERE user_id = ?',
          [userId]
        );
        
        if (stats.length === 0) {
          console.log('⚠️  user_stats não encontrado para o usuário. Criando...');
          await connection.execute(
            'INSERT INTO user_stats (user_id, min_talked, practice_sequence, calls_made) VALUES (?, 0, 0, 0)',
            [userId]
          );
        }
        
        console.log(`✅ Trigger de estatísticas configurado para usuário ${userId}`);
        console.log('💡 O trigger será testado quando um usuário sair de uma chamada');
      }

    } catch (error) {
      console.error('❌ Erro ao testar trigger de estatísticas:', error.message);
    }

    console.log('\n🎉 Testes concluídos!');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Conexão com o banco fechada.');
    }
    await prisma.$disconnect();
  }
}

testTriggers(); 