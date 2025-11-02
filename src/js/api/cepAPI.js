import axios from 'axios';

export async function buscarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, '');

  if (cepLimpo.length !== 8) {
    throw new Error("CEP inválido. Deve conter 8 números.");
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = response.data;

    if (data.erro) {
      throw new Error("CEP não encontrado.");
    }

    return data;

  } catch (Error) {
    throw new Error("Erro ao buscar o CEP. Tente novamente.");
  }
}