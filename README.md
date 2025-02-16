# Frontend - Plataforma de Jornadas

## Visão Geral
Este é o frontend da plataforma Eva, desenvolvido com **Next.js** e integrado com a API de jornadas para colaboradores.

## Tecnologias Utilizadas
- **Next.js** para renderização do frontend
- **React** para componentes reutilizáveis
- **Tailwind CSS** para estilização
- **React Hook Form** para manipulação de formulários
- **shadcn/ui** para componentes prontos e estilizados

## Instalação e Configuração
### 1. Clonar o repositório
```sh
git clone https://github.com/seu-usuario/eva-front-end.git
cd eva-front-end
```

### 2. Instalar as dependências
```sh
yarn install
```
Ou, se preferir **npm**:
```sh
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto com base no `.env.example`.
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3333"
#NEXT_PUBLIC_API_BASE_URL="http://18.212.35.168:3333"
```

### 4. Executar o projeto
```sh
yarn dev
```
Ou, com **npm**:
```sh
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`.

## Funcionalidades Principais
- Listagem de jornadas
- Cadastro de novos colaboradores
- Execução de jornadas e automação de ações

