require('dotenv').config();

const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

/* =========================
   FUNÇÕES DE SEGURANÇA
========================= */

// Remove caracteres perigosos para evitar XSS
const sanitize = (str) => {
  if (!str) return "";
  return str
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/"/g, "")
    .replace(/'/g, "");
};
// Limita o tamanho do input
const limitar = (str, max) => str.substring(0, max);

/* =========================
   CREATE - CADASTRO
========================= */
exports.cadastrarUsuario = async (req, res) => {
  let { nome, email, senha } = req.body;

  // Sanitização + Limite de tamanho
  nome = limitar(sanitize(nome), 100);
  email = limitar(sanitize(email), 150);
  senha = limitar(senha, 100);

  // Validação de campos obrigatórios
  if (!nome || !email || !senha)
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  // Validação de tamanho mínimo
  if (nome.length < 3 || senha.length < 6 || email.length < 6)
    return res.status(400).json({ erro: "Número de caracteres abaixo do mínimo" });


  // Criptografia da senha
  const hashSenha = await bcrypt.hash(senha, 10);


  // Query segura contra SQL Injection
  db.query(
    'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, hashSenha],
    (err, result) => {

      // Proteção contra email duplicado
      if (err && err.code === 'ER_DUP_ENTRY')
        return res.status(409).json({ erro: 'Email já cadastrado!' });
      if (err)
        return res.status(500).json({ erro: err.message });


      res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso!',
        id: result.insertId
      });
    }
  );
};
/* =========================
   READ - LISTAR
========================= */


// ler apenas meu user
exports.sobremim = (req, res) => {
  const id = req.usuario.id; // vem do token

  db.query(
    'SELECT id, nome, email, telefone, data_nascimento, endereco, bio FROM users WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (result.length === 0)
        return res.status(404).json({ erro: 'Usuário não encontrado!' });

      res.json(result[0]);
    }
  );
};



// ler todos os users
exports.listarUsuarios = (req, res) => {
  db.query('SELECT id, nome, email FROM users', (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
};
/* =========================
   READ - POR ID
========================= */
exports.buscarUsuarioPorId = (req, res) => {
  const id = parseInt(req.params.id);

  // Validação de ID numérico
  if (isNaN(id))
    return res.status(400).json({ erro: "ID inválido" });

  db.query(
    'SELECT id, nome, email FROM users WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });

      if (result.length === 0)
        return res.status(404).json({ erro: 'Usuário não encontrado!' });

      res.json(result[0]);
    }
  );
};
/* =========================
   UPDATE
========================= */
exports.atualizarUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  let { nome, email } = req.body;

  // Validação de ID
  if (isNaN(id))
    return res.status(400).json({ erro: "ID inválido" });

  // Sanitização + limite
  nome = limitar(sanitize(nome), 100);
  email = limitar(sanitize(email), 150);

  // Validação mínima
  if (!nome || !email)
    return res.status(400).json({ erro: "Dados inválidos" });

  db.query(
    'UPDATE users SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id],
    err => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ mensagem: 'Usuário atualizado com sucesso!' });
    }
  );
};
/* =========================
   DELETE
========================= */
exports.removerUsuario = (req, res) => {
  const id = parseInt(req.params.id);

  // Proteção contra ID inválido
  if (isNaN(id))
    return res.status(400).json({ erro: "ID inválido" });

  db.query('DELETE FROM users WHERE id = ?', [id], err => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Usuário removido com sucesso!' });
  });
};
/* =========================
   LOGIN
========================= */
exports.login = (req, res) => {
  let { email, senha } = req.body; // pega do body da req post o email e senha

  // Sanitização + limite
  email = limitar(sanitize(email), 150); // limite de caracteres
  senha = limitar(senha, 100); // limite de senha

  // Validação
  if (!email || !senha) // se está faltando um dos dois
    return res.status(400).json({ erro: "Email e senha são obrigatórios" }); // retorna isso

  db.query( // verifica se o email existe no banco de dados
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ erro: err.message });

      if (results.length === 0)
        return res.status(404).json({ erro: 'Usuário não encontrado!' });

      // Comparação segura da senha
      const senhaValida = await bcrypt.compare(senha, results[0].senha);

      if (!senhaValida)
        return res.status(401).json({ erro: 'Senha incorreta!' });

      // Geração de JWT
      const token = jwt.sign(
        { id: results[0].id, nome: results[0].nome },
        SECRET_KEY,
        { expiresIn: '24h' }
      );

      res.json({ mensagem: 'Login realizado com sucesso!', token }); // envia login e o token
    }
  );
};
