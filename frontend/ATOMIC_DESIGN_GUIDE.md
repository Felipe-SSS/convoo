# Atomic Design System - Convoo Frontend

## 📋 Visão Geral

O frontend do Convoo foi reorganizado seguindo a metodologia **Atomic Design System**, criada por Brad Frost. Esta arquitetura organiza os componentes em 5 níveis hierárquicos, facilitando a manutenção, reutilização e escalabilidade do código.

## 🏗️ Estrutura de Pastas

```
frontend/src/components/
├── atoms/           # Componentes básicos
├── molecules/       # Combinações de átomos
├── organisms/       # Componentes complexos
├── templates/       # Layouts e estruturas
└── index.js         # Arquivo de exportações centralizadas
```

## 🧪 ATOMS (Átomos)

**Definição**: Componentes básicos e indivisíveis que formam a base do design system.

**Localização**: `components/atoms/`

**Componentes**:
- `avatar.jsx` - Avatar do usuário
- `button.jsx` - Botões
- `card.jsx` - Cards e containers
- `input.jsx` - Campos de entrada
- `label.jsx` - Labels
- `progress.jsx` - Barras de progresso
- `select.jsx` - Seletores dropdown
- `switch.jsx` - Switches/toggles
- `toast.jsx` - Notificações toast
- `toaster.jsx` - Container de toasts
- `use-toast.js` - Hook para toasts

**Características**:
- Componentes simples e reutilizáveis
- Não dependem de outros componentes
- Configuráveis via props
- Seguem padrões de design consistentes

## 🔬 MOLECULES (Moléculas)

**Definição**: Combinações simples de átomos que funcionam juntos como uma unidade.

**Localização**: `components/molecules/`

**Componentes**:
- `WorldConnectionsMap.jsx` - Mapa de conexões mundiais
- `img/` - Componentes de imagem

**Características**:
- Combinam 2-3 átomos
- Têm responsabilidade específica
- São reutilizáveis em diferentes contextos

## 🧬 ORGANISMS (Organismos)

**Definição**: Componentes complexos que formam seções distintas da interface.

**Localização**: `components/organisms/`

**Categorias**:

### Auth Components (`organisms/auth/`)
- `ProtectedRoute.jsx` - Rota protegida

### Section Components (`organisms/sections/`)
- `AiFeatureSection.jsx` - Seção de recursos de IA
- `CtaSection.jsx` - Seção de call-to-action
- `FeaturesSection.jsx` - Seção de funcionalidades
- `HeroSection.jsx` - Seção hero
- `HowItWorksSection.jsx` - Seção "Como funciona"

**Características**:
- Componentes complexos e funcionais
- Podem conter múltiplas moléculas e organismos
- Representam seções completas da interface

## 📄 TEMPLATES (Templates)

**Definição**: Layouts e estruturas que definem a organização dos organismos.

**Localização**: `components/templates/`

**Componentes** (`templates/layout/`):
- `AuthCard.jsx` - Card de autenticação
- `AuthLayoutLogin.jsx` - Layout para login
- `AuthLayoutRegister.jsx` - Layout para registro
- `Footer.jsx` - Rodapé
- `GeometricBackground.jsx` - Background geométrico
- `Header.jsx` - Cabeçalho
- `OnboardingLayout.jsx` - Layout do onboarding
- `OnboardingLayoutExamples.jsx` - Exemplos de layouts

**Características**:
- Definem a estrutura da página
- Organizam organismos em layouts
- São reutilizáveis entre páginas similares

## 📱 PAGES (Páginas)

**Definição**: Instâncias específicas dos templates com conteúdo real.

**Localização**: `src/pages/` e arquivos na raiz do `src/`

**Páginas Principais**:
- `App.jsx` - Aplicação principal
- `Login.jsx` - Página de login
- `Register.jsx` - Página de registro
- `Onboarding.jsx` - Página de onboarding
- `HomePage.jsx` - Página inicial
- `MainPage.jsx` - Página principal
- `PricingPage.jsx` - Página de preços

**Páginas Específicas** (`pages/`):
- `Talk.jsx` - Página de conversas
- `Contacts.jsx` - Página de contatos
- `Profile.jsx` - Página de perfil
- `Agents.jsx` - Página de agentes
- `CallPage.jsx` - Página de chamada
- `CallLoadingPage.jsx` - Página de carregamento
- `Certifications.jsx` - Página de certificações
- `ConfigurationsPage.jsx` - Página de configurações

## 🔄 Importações Centralizadas

### Arquivo de Índice Principal (`components/index.js`)

Todas as exportações estão centralizadas através de arquivos de índice específicos:

```jsx
// Antes (importações individuais)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Depois (importação centralizada)
import { Button, Input, Card } from '@/components';
```

### Estrutura de Índices

```
components/
├── index.js              # Índice principal
├── atoms/
│   └── index.js         # Índice dos átomos
├── organisms/
│   └── index.js         # Índice dos organismos
└── templates/
    └── index.js         # Índice dos templates
```

### Vantagens da Estrutura Hierárquica:
- **Organização clara**: Cada nível tem seu próprio índice
- **Manutenção facilitada**: Mudanças isoladas por categoria
- **Escalabilidade**: Fácil adição de novos componentes
- **Importações limpas**: Uma única linha para todos os componentes

### Vantagens da Centralização:
- **Menos linhas de código**: Uma única linha de importação
- **Manutenção facilitada**: Mudanças de localização em um só lugar
- **Consistência**: Padrão único de importação
- **Descoberta**: Fácil visualização de todos os componentes disponíveis

## 🎯 Benefícios do Atomic Design

### 1. **Reutilização**
- Componentes podem ser reutilizados em diferentes contextos
- Redução de código duplicado
- Consistência visual

### 2. **Manutenibilidade**
- Estrutura clara e organizada
- Fácil localização de componentes
- Mudanças isoladas

### 3. **Escalabilidade**
- Fácil adição de novos componentes
- Hierarquia clara de dependências
- Padrões consistentes

### 4. **Colaboração**
- Estrutura compreensível para toda a equipe
- Padrões claros de nomenclatura
- Documentação integrada

## 🚀 Como Usar

### Criando um Novo Átomo

```jsx
// components/atoms/MyAtom.jsx
import React from 'react';

const MyAtom = ({ children, ...props }) => {
  return (
    <div className="my-atom" {...props}>
      {children}
    </div>
  );
};

export default MyAtom;
```

### Criando uma Nova Molécula

```jsx
// components/molecules/MyMolecule.jsx
import React from 'react';
import { Button, Input } from '@/components/atoms';

const MyMolecule = () => {
  return (
    <div className="my-molecule">
      <Input placeholder="Digite algo..." />
      <Button>Enviar</Button>
    </div>
  );
};

export default MyMolecule;
```

### Atualizando o Índice

```jsx
// components/index.js
export { default as MyAtom } from './atoms/MyAtom.jsx';
export { default as MyMolecule } from './molecules/MyMolecule.jsx';
```

## 📝 Convenções de Nomenclatura

- **Arquivos**: PascalCase (ex: `MyComponent.jsx`)
- **Componentes**: PascalCase (ex: `MyComponent`)
- **Pastas**: camelCase (ex: `myFolder`)
- **Props**: camelCase (ex: `myProp`)
- **Classes CSS**: kebab-case (ex: `my-class`)

## 🔧 Próximos Passos

1. **Documentação de Componentes**: Criar Storybook para documentação visual
2. **Testes**: Implementar testes unitários para átomos e moléculas
3. **Design Tokens**: Estabelecer sistema de tokens de design
4. **Acessibilidade**: Implementar padrões de acessibilidade
5. **Performance**: Otimizar carregamento de componentes

## 📚 Recursos Adicionais

- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [Storybook](https://storybook.js.org/) - Para documentação de componentes
- [Design Systems](https://www.designsystems.com/) - Comunidade e recursos
