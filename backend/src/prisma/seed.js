const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Inserir roles
  console.log('📋 Criando roles...');
  
  const roles = [
    {
      name: 'Admin',
      description: 'Admin do sistema'
    },
    {
      name: 'User', 
      description: 'Usuario comum'
    }
  ];

  for (const role of roles) {
    const existingRole = await prisma.roles.findUnique({
      where: { name: role.name }
    });

    if (!existingRole) {
      await prisma.roles.create({
        data: role
      });
      console.log(`✅ Role '${role.name}' criada com sucesso`);
    } else {
      console.log(`ℹ️  Role '${role.name}' já existe, pulando...`);
    }
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });