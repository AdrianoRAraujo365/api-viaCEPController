const axios = require('axios');

class ViaCEPModel {
  /**
   * Busca dados de endereço pelo CEP na API ViaCEP
   * @param {string} cep - CEP sem formatação (apenas números)
   * @returns {Promise<Object>} Dados do endereço ou erro
   */
  static async buscarEnderecoPorCEP(cep) {
    try {
      // Remove caracteres não numéricos
      const cepLimpo = cep.replace(/\D/g, '');

      // Valida se o CEP tem 8 dígitos
      if (cepLimpo.length !== 8) {
        return {
          erro: true,
          mensagem: 'CEP deve conter 8 dígitos'
        };
      }

      // Faz a requisição à API ViaCEP
      const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);

      // Verifica se o CEP foi encontrado
      if (response.data.erro) {
        return {
          erro: true,
          mensagem: 'CEP não encontrado'
        };
      }

      // Retorna os dados formatados
      return {
        erro: false,
        dados: response.data
      };
    } catch (error) {
      return {
        erro: true,
        mensagem: 'Erro ao consultar a API ViaCEP',
        detalhes: error.message
      };
    }
  }
}

module.exports = ViaCEPModel;
