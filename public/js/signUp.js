import { stringFormatter } from "../utils/formatter";
import { validateAddress, validateCpf, validateEmail, validatePassword, validatePhoneNumber, validateUserName } from "../utils/validators";
import { Swal } from "Swal"

async function signUp() {
    const username = input_nome.value;
    const userEmail = input_email.value;
    const userPassword = input_senha.value;
    const userCPF = input_cpf.value;
    const userPhone = input_phone.value;
    const userCep = input_cep.value;
    const userAddress = input_endereco.value;
    const userAddressNumber = input_numero.value;

    const allValid = await [
        validateUserName(username),
        validateEmail(userEmail),
        validatePassword(userPassword),
        validateCpf(userCPF),
        validatePhoneNumber(userPhone),
        validateAddress(userAddress, userAddressNumber)
    ].every((validation) => validation.isValid)

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
        }).then((res) => {
            if (res.ok) {
                console.log("Dados cadastrados!")
                Swal.fire({
                    icon: "success",
                    title: "Perfeito!",
                    text: "Cadastro realizado com sucesso!",
                    color: "#FFFFFF",
                    background: "#2C3E50",
                    confirmButtonColor: "#C45824"
                })
            }
        })
    } else {
        console.log("Houve um erro ao cadastrar")
        Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Verifique seus dados!",
            color: "#FFFFFF",
            background: "#2C3E50",
            confirmButtonColor: "#C45824"
        })
    }
}

