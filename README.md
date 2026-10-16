# 🚀 Vue Tasks

Uma aplicação moderna e reativa para gerenciamento de tarefas, desenvolvida com o ecossistema mais atual do **Vue.js**. O projeto foca em oferecer uma experiência fluida para o usuário, permitindo o controle total de suas atividades com segurança e organização.

## ✨ Funcionalidades

- **🔐 Autenticação Completa**: Sistema de login e registro locais para simular contas de usuários.
- **📋 Gestão de Tarefas**: Criação, edição, exclusão e visualização de tarefas de forma intuitiva.
- **🔄 Drag & Drop**: Interface interativa para organizar tarefas arrastando e soltando.
- **🛡️ Segurança Local**: Senhas armazenadas como hash PBKDF2 com salt, garantindo maior segurança no armazenamento local.
- **🗂️ Armazenamento Local**: Todas as informações são salvas no `localStorage`, permitindo persistência de dados entre sessões.
- **🎨 Dark Mode**: Suporte a tema escuro para melhor experiência visual com Tailwind CSS.

## 🛠️ Tecnologias Utilizadas

Este projeto utiliza as melhores práticas e ferramentas do desenvolvimento frontend moderno:

- [**Vue.js 3**](https://vuejs.org/) - Framework progressivo com Composition API.
- [**Vite**](https://vitejs.dev/) - Builder ultra-rápido para desenvolvimento.
- [**Pinia**](https://pinia.vuejs.org/) - Gerenciamento de estado global (Store).
- [**Vue Router**](https://router.vuejs.org/) - Navegação e controle de rotas dinâmicas.
- [**Tailwind CSS**](https://tailwindcss.com/) - Estilização moderna baseada em utilitários.
- [**TypeScript**](https://www.typescriptlang.org/) - Tipagem estática para maior segurança e produtividade.

## 🚀 Como Executar o Projeto

A aplicação está publicada na **Vercel**:

[https://vue-tasks-one.vercel.app/](https://vue-tasks-one.vercel.app/)

Mas se você quiser rodar localmente, siga os passos abaixo.

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

```bash
# 1. Clone o repositório:
git clone https://github.com/lucas-bardeli/vue-tasks.git
# 2. Entre no diretório do projeto:
cd vue-tasks
# 3. Instale as dependências:
npm install
# 4. Inicie o servidor de desenvolvimento:
npm run dev
```

O servidor de desenvolvimento informa o endereço local, normalmente
`http://localhost:5173`.

Para validar os tipos e gerar uma build de produção:

```bash
npm run build
```

> **Aviso sobre o modo local:** ele serve para demonstração e não fornece autenticação nem privacidade reais.
> Os dados ficam no armazenamento do navegador, podem ser lidos ou alterados por quem tiver acesso ao navegador
> ou às ferramentas de desenvolvimento e são apagados se o armazenamento do site for limpo.
> A senha é armazenada como hash PBKDF2 com salt, não em texto puro,
> mas isso não torna o sistema seguro: use apenas dados fictícios e não reutilize senhas reais.
> As contas e tarefas não são enviadas a um servidor,
> sincronizadas entre dispositivos nem protegidas contra alguém com acesso ao mesmo perfil do navegador.
