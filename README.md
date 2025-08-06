# Convoo - FETIN 2025

Workspace para o projeto Convoo, uma plataforma de conversação em idiomas estrangeiros.

## 🚀 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev                    # Inicia backend e frontend em desenvolvimento
npm run start                  # Inicia backend e frontend em desenvolvimento
npm run backend:dev           # Inicia apenas o backend em desenvolvimento
npm run frontend:dev          # Inicia apenas o frontend em desenvolvimento
```

### Banco de Dados

#### Migrations e Setup
```bash
npm run db-setup              # Executa migrations + triggers
npm run db-migrate            # Reset + migrations
npm run db-reset              # Reset completo do banco
npm run db-generate           # Gera cliente Prisma
npm run db-studio             # Abre Prisma Studio
npm run db-seed               # Executa seed do banco
```

#### Triggers
```bash
npm run db-triggers           # Cria os triggers no banco
npm run db-triggers:drop      # Remove os triggers do banco
npm run db-triggers:test      # Testa se os triggers funcionam
```

### Utilitários
```bash
npm run install:all           # Instala todas as dependências
npm run clean                 # Remove node_modules de todos os projetos
```

## 📁 Estrutura do Projeto

```
convoo/
├── backend/                  # API Node.js + Express
│   ├── src/
│   │   ├── prisma/          # Schema e migrations do banco
│   │   ├── controllers/     # Controladores da API
│   │   ├── routes/          # Rotas da API
│   │   └── middlewares/     # Middlewares
├── frontend/                 # Aplicação React + Vite
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas da aplicação
│   │   └── services/        # Serviços de API
└── database/                 # Scripts SQL e documentação
```

## 🗄️ Banco de Dados

### Tabelas Principais
- `users` - Usuários do sistema
- `user_profiles` - Perfis dos usuários
- `user_stats` - Estatísticas de uso
- `user_onboarding` - Dados de onboarding
- `video_calls` - Chamadas de vídeo
- `video_call_participants` - Participantes das chamadas
- `roles` - Roles do sistema

### Triggers Automáticos
- **`set_duration_before_insert`** - Calcula duração das chamadas
- **`trg_add_minutes_to_user_stats`** - Atualiza estatísticas de uso

## 🛠️ Configuração

### Pré-requisitos
- Node.js >= 18.0.0
- MySQL 8.0+
- npm >= 8.0.0

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd convoo

# Instale todas as dependências
npm run install:all

# Configure o banco de dados
npm run db-setup

# Execute o seed (opcional)
npm run db-seed
```

### Variáveis de Ambiente
Crie um arquivo `.env` no diretório `backend/src`:

```env
DATABASE_URL="mysql://root:@localhost:3306/convoo"
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=convoo
DB_PORT=3306
```

## 🧪 Testes

### Testar Triggers
```bash
npm run db-triggers:test
```

Este comando verifica se os triggers estão funcionando corretamente.

## 📚 Documentação

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [Database Schema](database/Convoo.sql)

## 👥 Equipe

**Equipe Convoo** - FETIN 2025
