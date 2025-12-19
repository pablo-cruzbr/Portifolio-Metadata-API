# 🚀 Portifólio Central API & Frontend

Este projeto é uma solução full-stack desenvolvida para centralizar e exibir dinamicamente todos os meus projetos pessoais. Ele consiste em uma API RESTful robusta que serve como o "cérebro" do meu portfólio, permitindo que o frontend consuma metadados atualizados em tempo real.

🔗 **Link do Projeto:** [https://frontend-portifolio-metadata-api.vercel.app/](https://frontend-portifolio-metadata-api.vercel.app/)

<img width="1166" height="2509" alt="screencapture-localhost-5173-2025-12-19-10_55_39" src="https://github.com/user-attachments/assets/fc9bdd43-0a9b-4c16-bce2-aa923e90e02b" />

# 📋 Sobre o Projeto
A ideia nasceu da necessidade de gerenciar meus projetos de forma centralizada. Em vez de hardcodar as informações no HTML/React, criei um ecossistema onde o backend gerencia títulos, descrições, tecnologias utilizadas, links de repositório e imagens.

Frontend: Uma interface moderna e responsiva que consome a API.

Backend: Uma API escalável que gerencia a persistência dos dados e integração com serviços de nuvem.

# 🛠️ Tecnologias Utilizadas
Frontend
React.js (com Vite) para uma experiência de desenvolvimento rápida e performance otimizada.

CSS3 para estilização personalizada e responsividade.

Axios para consumo da API.

Backend & Banco de Dados
Node.js com Express para a construção da arquitetura de rotas.

Prisma ORM para modelagem de dados e consultas eficientes.

PostgreSQL como banco de dados relacional.

Serviços de Terceiros & Deploy
Neon DB: Hospedagem do banco de dados PostgreSQL (Serverless).

Cloudinary: Gerenciamento e armazenamento de imagens de forma otimizada.

Vercel: Deploy automatizado do frontend.

⚙️ Arquitetura do Sistema
🚀 Como Executar o Projeto
Clone o repositório:

Bash

git clone https://github.com/seu-usuario/seu-repositorio.git
Configure as variáveis de ambiente (.env): Crie um arquivo .env na raiz do backend com as seguintes chaves:

Snippet de código

DATABASE_URL="sua_url_do_neon_db"
CLOUDINARY_URL="sua_url_do_cloudinary"
Instale as dependências e inicie:

Bash

# No diretório do backend
npm install
npx prisma generate
npm run dev

# No diretório do frontend
npm install
npm run dev
# 🖼️ Funcionalidades Principais
Listagem Dinâmica: O portfólio é atualizado automaticamente ao adicionar um novo projeto no banco de dados.

Gestão de Mídia: Integração direta com Cloudinary para entrega rápida de imagens.

Filtros por Stacks: (Se você implementou isso, é bom mencionar).

Interface Responsiva: Adaptado para dispositivos móveis e desktop.

# 👨‍💻 Sobre Mim
Pablo Cruz - Desenvolvedor Full-Stack em busca de oportunidades como Estagiário ou Desenvolvedor Júnior. Atualmente focado no ecossistema JavaScript (TypeScript, React, Node.js) e infraestrutura.

LinkedIn: [Seu LinkedIn Aqui]

Instagram: [@seu.insta]

Email: [seu-email@exemplo.com]
