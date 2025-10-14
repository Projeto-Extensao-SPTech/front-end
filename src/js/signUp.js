import { stringFormatter } from "./utils/formatter";
import { validateAddress, validateCpf, validateEmail, validatePassword, validatePhoneNumber, validateUserName } from "./utils/validators";

export async function signUp(formData) {
    const username = formData.nome;
    const userEmail = formData.email;
    const userPassword = formData.senha;
    const userCPF = formData.cpf;
    const userPhone = formData.telefone;
    // const userCep = formData.cep;
    const userAddress = formData.rua;
    const userAddressNumber = formData.numero;

    const validationResults = await Promise.all([
        validateUserName(username),
        validateEmail(userEmail),
        validatePassword(userPassword),
        validateCpf(userCPF),
        validatePhoneNumber(userPhone),
        validateAddress(userAddress, userAddressNumber)
    ])
    
    const allValid = validationResults.every((validation) => validation.isValid)

    if (allValid) {
        const user = {
            "name": stringFormatter(username),
            "cpf": userCPF,
            "email": userEmail,
            "phone": userPhone,
            "address": userAddress,
            "address_number": userAddressNumber
        }

        await fetch("/users", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user)
        })
        
    } else {
        console.log("Houve um erro ao cadastrar")
    }
}

