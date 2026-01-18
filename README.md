<h1>📌 Projeto: API de Usuários com Node.js & Express</h1><br>
📖 Descrição<br>
Este projeto consiste em uma API RESTful desenvolvida em Node.js utilizando o framework Express, integrada a um banco de dados MySQL. O sistema implementa autenticação com JWT, criptografia de senhas com bcrypt, proteção contra ataques de força bruta com rate limiting e boas práticas de segurança como sanitização e validação de entradas.

## 📸 API Demonstration
### Server Running
![Server Running](assets/server-running.png)

### User Registration
![User Registration](assets/postman-register.png)

### User Login (JWT)
![User Login](assets/postman-login.png)

### User READ
![User READ](assets/postman-READ.png)

<h2>🔐 User Authentication API<br></h2>
API REST desenvolvida em Node.js para gerenciamento de usuários, com foco em segurança, boas práticas e autenticação JWT.<br>
Este projeto implementa um CRUD completo de usuários com proteção contra ataques comuns como SQL Injection, XSS, Brute Force e DoS, além de criptografia de senhas.<br>
<br>

<h2>🚀 Tecnologias Utilizadas:<br></h2>
✔Node.js<br>
✔Express<br>
✔MySQL<br>
✔bcrypt<br>
✔JSON Web Token (JWT)<br>
✔express-validator<br>
✔express-rate-limit<br>
✔dotenv<br>
<br>
<h2>📌 Funcionalidades<br></h2>
✔Cadastro de usuários<br>
✔ com autenticação JWT<br>
✔Listagem de usuários<br>
✔Busca por ID<br>
✔Atualização de dados<br>
✔Remoção de usuários<br>
✔Criptografia de senha<br>
✔Validação de dados<br>
<br>
Proteção contra:<br>
✔SQL Injection<br>
✔XSS<br>
✔Brute Force<br>
✔DoS<br>
✔Emails duplicados<br>
<br>
<h2>🔒 Segurança Implementada</h2>
<br>
✔Hash de senha com bcrypt<br>
✔Queries parametrizadas (SQL Injection)<br>
✔Sanitização de inputs (XSS)<br>
✔Rate Limit global (DoS)<br>
✔Rate Limit específico para login (Brute Force)<br>
✔Validação de dados com express-validator<br>
✔Variáveis de ambiente para dados sensíveis<br>
<br>
<h2>⚙️ Configuração do Ambiente</h2>
<br>
Crie um arquivo .env na raiz do projeto:<br>
DB_HOST=localhost<br>
DB_USER=root<br>
DB_PASSWORD=12345<br>
DB_NAME=sistema_cadastro<br>
SECRET_KEY=sua_chave_secreta<br>
<br>
<h2>📦 Instalação<br></h2>
npm install<br>

<h2>▶️ Executar o projeto<br></h2>
node app.js<br>

Servidor rodando em:<br>
http://localhost:3000<br>
<br>
<h2>📚 Rotas da API<br></h2>
🔹 Cadastro de usuário<br>
POST /users/register<br>
🔹 Login<br>
POST /users/login<br>
🔹 Listar usuários<br>
GET /users<br>
🔹 Buscar usuário por ID<br>
GET /users/:id<br>
🔹 Atualizar usuário<br>
PUT /users/:id<br>
🔹 Remover usuário<br>
DELETE /users/:id<br>
<br>
<h2>🗄️ Estrutura do Projeto:<br></h2>
<h2>📂 Estrutura<br></h2>
Código<br>
├── app.js<br>
├── routes/<br>
│ └── userRoutes.js<br>
├── controllers/<br>
│ └── userController.js<br>
├── models/<br>
│ └── db.js<br>
├── middlewares/<br>
│ ├── limiters.js<br>
│ └── validator.js<br>
└── package.json
<br>


<h2>📈 Objetivo do Projeto<br></h2>
Este projeto foi desenvolvido para:<br>
Praticar APIs REST<br>
Aplicar conceitos de segurança<br>
Demonstrar boas práticas de backend<br>
Servir como portfólio para vagas de Desenvolvedor Júnior<br>

<h2>👨‍💻 Autor<br></h2>
Rikael Ribeiro
Desenvolvedor em formação focado em backend, segurança e boas práticas.

<h2>⭐ Considerações Finais<br></h2>
Este projeto demonstra:<br>
✔ Organização de código<br>
✔ Segurança<br>
✔ Boas práticas<br>
✔ Conhecimento real de backend<br>

Ideal para portfólio e entrevistas técnicas.
