export function validarCampos(formData, tipoPessoa) {
    if (tipoPessoa === "PF") {
        if (formData.nome.length < 8 || formData.nome.length > 40) {
            return {
                campo: "nome",
                mensagem: "O nome deve ter entre 8 e 40 caracteres.",
            };
        }

        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(formData.documento)) {
            return {
                campo: "cpf",
                mensagem: "O CPF deve conter exatamente 11 números.",
            };
        }
    } else {
        if (formData.nome.length < 5 || formData.nome.length > 100) {
            return {
                campo: "nome",
                mensagem: "A razão social deve ter entre 5 e 100 caracteres.",
            };
        }

        const cnpjRegex = /^\d{14}$/;
        if (!cnpjRegex.test(formData.documento)) {
            return {
                campo: "cpf",
                mensagem: "O CNPJ deve conter exatamente 14 números.",
            };
        }
    }

    const telefoneRegex = /^\d{10,11}$/;
    if (!telefoneRegex.test(formData.telefone)) {
        return {
            campo: "telefone",
            mensagem:
                "O telefone deve conter apenas números e ter 10 ou 11 dígitos.",
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido =
        emailRegex.test(formData.email) &&
        formData.email.length >= 8 &&
        formData.email.length <= 100;
    if (!emailValido) {
        return {
            campo: "email",
            mensagem: "O e-mail deve ter formato válido e entre 8 e 100 caracteres.",
        };
    }

    if (formData.senha.length < 8) {
        return {
            campo: "senha",
            mensagem: "A senha deve ter pelo menos 8 caracteres.",
        };
    }

    const obrigatoriosEndereco = ["cep", "estado", "municipio", "rua", "numero"];
    const faltandoEndereco = obrigatoriosEndereco.filter(
        (campo) => !formData[campo]
    );
    if (faltandoEndereco.length > 0) {
        return {
            campo: "endereco",
            mensagem: `Preencha todos os campos de endereço: ${faltandoEndereco.join(", ")}`,
        };
    }

    return null;
}
