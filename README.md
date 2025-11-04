# 🧠 Node Thoughts

Aplicação web para **registro e compartilhamento de pensamentos**, desenvolvida com **Node.js**, **Express** e **Sequelize** usando **MySQL** como banco de dados.

[![GitHub Repo](https://img.shields.io/badge/GitHub-toughts-blue?logo=github)](https://github.com/leocassiosilva/toughts)
[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)](https://www.mysql.com/)

---

## 🚀 Funcionalidades

- Cadastro e login de usuários com **hash de senha (bcryptjs)**
- Criação, edição e exclusão de pensamentos
- Associação entre usuários e pensamentos
- Sessão autenticada com **express-session**
- Mensagens de feedback com **connect-flash**
- Templates dinâmicos com **Express Handlebars**

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| **Node.js** | Ambiente de execução JavaScript |
| **Express** | Framework web |
| **Sequelize** | ORM para MySQL |
| **MySQL2** | Driver do banco de dados |
| **Express-Handlebars** | Template engine |
| **BcryptJS** | Criptografia de senhas |
| **Express-Session / Flash** | Controle de sessão e mensagens |

---

## ⚙️ Instalação e Configuração

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/leocassiosilva/toughts.git
```

### 2️⃣ Acessar a pasta do projeto

```bash
cd toughts
``` 
### 3️⃣ Instalar as dependências

```bash
npm install
```
### 4️⃣ Configurar o banco de dados

1 - Crie um banco de dados MySQL chamado nodetoughts (ou outro nome de sua preferência).

2 - Edite o arquivo db/conn.js com suas credenciais:

```js 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodetoughts', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
``` 

### 5️⃣ Sincronizar o banco de dados

Ao rodar o projeto pela primeira vez, o Sequelize criará automaticamente as tabelas necessárias.
Se quiser rodar as migrations manualmente, use:
```bash 
npx sequelize-cli db:migrate
```
###6️⃣ Iniciar o servidor

```bash
npm start
```
### 📁 Estrutura de Pastas

- 📦 **toughts**
  - 📂 **controllers/** → Lógica das rotas  
  - 📂 **models/** → Modelos Sequelize (User, Thought)  
  - 📂 **routes/** → Definição de rotas Express  
  - 📂 **views/** → Templates Handlebars  
  - 📂 **public/** → Arquivos estáticos (CSS, imagens)  
  - 📂 **db/** → Configuração do banco de dados  
  - 📜 **index.js** → Ponto de entrada da aplicação  
  - 📜 **package.json**  
  - 📜 **README.md**

### 🧩 Scripts úteis

| Comando | Descrição |
|----------|------------|
| `npm start` | Inicia o servidor com **nodemon** |
| `npm install` | Instala todas as dependências |
| `npm test` | Executa testes (se configurados) |

---

### 🧠 Como usar

1. Acesse [http://localhost:3000](http://localhost:3000)  
2. Crie um novo usuário  
3. Faça login  
4. Adicione, edite ou exclua pensamentos  
5. Aproveite 🎯

---

### 👨‍💻 Autor

**Leocassio Silva**  
📂 GitHub: [@leocassiosilva](https://github.com/leocassiosilva)
