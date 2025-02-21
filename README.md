## Cliente CRUD - Next.js

Este projeto é um CRUD de cadastro de clientes utilizando Next.js no backend e React no frontend. O objetivo é fornecer uma aplicação simples para gerenciar clientes, permitindo criar, visualizar, editar e excluir registros.

##### Tecnologias Utilizadas

- Frontend: React
- Backend: Next.js (API Routes)
- Banco de Dados: SQLite
- Estilização: Tailwind CSS
- TypeScript (Opcional)
- Validação de formulários com Zod
- Docker
- Autenticação (NextAuth)

##### Funcionalidades

- Criar, visualizar, editar e excluir clientes.
- Listagem paginada dos clientes cadastrados.
- Campo de busca para filtrar clientes.

#### Como Rodar o Projeto
Pré-requisitos
- Docker instalado na máquina
- Node.js 20+ (caso prefira rodar sem Docker)

##### Rodando com Docker
Clone o repositório:
````
git clone https://github.com/leonardoReizz/crudgin.git
cd crudgin
````

Construa e execute o container Docker:
````
docker build -t cliente-crud .
docker run -p 3000:3000 cliente-crud
````
Acesse a aplicação em http://localhost:3000


##### Rodando sem Docker

Instale as dependências:
````
npm install
````
Execute o ambiente de desenvolvimento:
````
npm run dev
````
Acesse http://localhost:3000


Variáveis de Ambiente

Crie um arquivo .env.local na raiz do projeto e configure as variáveis:

NEXTAUTH_SECRET="randomsecret"
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api


