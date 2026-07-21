const ViaCEPModel = require('../models/ViaCEPModel');

class ViaCEPController {
  /**
   * Exibe a página inicial com o formulário de busca
   */
  static async index(req, res) {
    res.render('index', {
      titulo: 'Buscar CEP',
      resultado: null,
      erro: null
    });
  }

  /**
   * Processa a busca de CEP e retorna os resultados
   */
  static async buscar(req, res) {
    try {
      const { cep } = req.body;

      // Valida se o CEP foi fornecido
      if (!cep || cep.trim() === '') {
        return res.render('index', {
          titulo: 'Buscar CEP',
          resultado: null,
          erro: 'Por favor, digite um CEP'
        });
      }

      // Busca os dados através do model
      const resposta = await ViaCEPModel.buscarEnderecoPorCEP(cep);

      // Se houver erro
      if (resposta.erro) {
        return res.render('index', {
          titulo: 'Buscar CEP',
          resultado: null,
          erro: resposta.mensagem
        });
      }

      // Sucesso - retorna os dados
      res.render('index', {
        titulo: 'Buscar CEP',
        resultado: resposta.dados,
        erro: null
      });
    } catch (error) {
      res.render('index', {
        titulo: 'Buscar CEP',
        resultado: null,
        erro: 'Erro ao processar a requisição'
      });
    }
  }
}

module.exports = ViaCEPController;
