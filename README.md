# 🚀 Vue Tasks

Uma aplicação moderna e reativa para gerenciamento de tarefas, desenvolvida com o ecossistema mais atual do **Vue.js**. O projeto foca em oferecer uma experiência fluida para o usuário, permitindo o controle total de suas atividades com segurança e organização.

## ✨ Funcionalidades

- **🔐 Autenticação Completa**: Sistema de login e registro de usuários com persistência de sessão.
- **📋 Gestão de Tarefas**: Criação, edição, exclusão e visualização de tarefas de forma intuitiva.
- **🔄 Drag & Drop**: Interface interativa para organizar tarefas arrastando e soltando.
- **📱 Design Responsivo**: Interface moderna e adaptável para qualquer dispositivo utilizando Tailwind CSS.
- **⚡ Performance**: Navegação instantânea e gerenciamento de estado global otimizado.

## 🛠️ Tecnologias Utilizadas

Este projeto utiliza as melhores práticas e ferramentas do desenvolvimento frontend moderno:

- [**Vue.js 3**](https://vuejs.org/) - Framework progressivo com Composition API.
- [**Vite**](https://vitejs.dev/) - Builder ultra-rápido para desenvolvimento.
- [**Pinia**](https://pinia.vuejs.org/) - Gerenciamento de estado global (Store).
- [**Vue Router**](https://router.vuejs.org/) - Navegação e controle de rotas dinâmicas.
- [**Tailwind CSS**](https://tailwindcss.com/) - Estilização moderna baseada em utilitários.
- [**Axios**](https://axios-http.com/) - Consumo de APIs REST.
- [**TypeScript**](https://www.typescriptlang.org/) - Tipagem estática para maior segurança e produtividade.

## 🚀 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/vue-tasks.git
```

2. Entre no diretório do projeto:

```bash
cd vue-tasks
```

3. Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do `.env.example`. Por padrão, o projeto usa o
modo local:

```env
VITE_DATA_MODE=local
VITE_API_URL=http://localhost:3000/api
```

### Modo de dados

O modo é escolhido pela variável `VITE_DATA_MODE` e pode ser `local` ou `api`.
Se a variável estiver ausente ou tiver qualquer outro valor, a aplicação usa
`local`.

- **`local`**: login, cadastro e tarefas funcionam no navegador. Contas e tarefas
  são mantidas no `localStorage`; as tarefas ficam separadas por conta local.
- **`api`**: os stores usam os serviços HTTP existentes. Configure
  `VITE_API_URL` com o endereço da API antes de gerar a build.

> **Aviso sobre o modo local:** ele serve para demonstração e não fornece
> autenticação nem privacidade reais. Os dados ficam no armazenamento do
> navegador, podem ser lidos ou alterados por quem tiver acesso ao navegador
> ou às ferramentas de desenvolvimento e são apagados se o armazenamento do
> site for limpo. A senha é armazenada como hash com salt, não em texto puro,
> mas isso não torna o sistema seguro: use apenas dados fictícios e não
> reutilize senhas reais. As contas e tarefas não são enviadas a um servidor,
> sincronizadas entre dispositivos nem protegidas contra alguém com acesso ao
> mesmo perfil do navegador.

### Desenvolvimento

Para rodar o projeto localmente com hot-reload:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

### Produção

Para gerar a build de produção:

```bash
npm run build
```
