/**
 * Arquivo principal da aplicação
 * Configuração do servidor Express com arquitetura MVC
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const viacepRoutes = require('./routes/viacep');

// Inicializa a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;

// ==================== MIDDLEWARE ====================

// Middleware para parsear dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// ==================== VIEW ENGINE ====================

// Configura o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ==================== ROTAS ====================

// Rota principal - ViaCEP
app.use('/', viacepRoutes);

// ==================== TRATAMENTO DE ERROS ====================

// Rota 404 - Página não encontrada
app.use((req, res) => {
  res.status(404).render('404', {
    titulo: 'Página não encontrada'
  });
});

// ==================== INICIALIZAÇÃO DO SERVIDOR ====================

app.listen(PORT, () => {
  console.log(`
  ✨ Servidor iniciado com sucesso!
  🌐 http://localhost:${PORT}
  📦 Ambiente: ${process.env.NODE_ENV || 'development'}
  ⚡ Pronto para consumir dados do ViaCEP
  `);
});

module.exports = app;
