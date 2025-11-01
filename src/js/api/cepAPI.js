import axios from 'axios';

export async function buscarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, '');

  if (cepLimpo.length !== 8) {
    throw new Error("CEP inválido. Deve conter 8 números.");
  }

  try {
    // 1. Usa axios.get()
    const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    
    // 2. Os dados já vêm em 'response.data' (não precisa de .json())
    const data = response.data;

    if (data.erro) {
      throw new Error("CEP não encontrado.");
    }

    return data;

  } catch (Error) {
    // 3. O catch() aqui pega erros de rede E erros de HTTP (ex: 404)
    throw new Error("Erro ao buscar o CEP. Tente novamente.");
  }
}