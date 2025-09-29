import { validateCpf, validatePhoneNumber } from "./validators.js"

// Função utilizada para formatar strings (nomes próprios, por exemplo)
// exemplo: "joao da silva" -> "Joao Da Silva"
export function stringFormatter(string) {
    let formatedString = ""

    let stringArray = string.toLowerCase().split("")

    for (let i = 0; i < stringArray.length; i++) {

        if (i === 0) stringArray[i] = stringArray[i].toUpperCase()
        else if (stringArray[i] === " ") stringArray[i + 1] = stringArray[i + 1].toUpperCase()

        formatedString += stringArray[i]
    }
    return formatedString
}


// Essa função é utilizada para exibição de datas no front-end
// YYYY-MM-DD -> DD/MM/YYYY
export function dateFormatterToClient(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return `${day}/${month}/${year}`
}

// Função pode ser usada tanto para inserção no banco quanto para exibição no front-end
// 12345678909 -> 123.456.789-09
export async function cpfFormatter(cpf) {
    const cpfValidated = await validateCpf(cpf)

    if (!cpfValidated) return // Se não for validado, para a função

    const cpfNumbers = cpf.split("")
    return (
        cpfNumbers.slice(0, 3).join("") + "." +
        cpfNumbers.slice(3, 6).join("") + "." +
        cpfNumbers.slice(6, 9).join("") + "-" +
        cpfNumbers.slice(9, 11).join("")
    )
}

// Formata o número de telefone para o padrão brasileiro
// 11987654321 -> (11) 98765-4321
// 1187654321 -> (11) 8765-4321
export async function phoneFormatter(phone) {

    if(validatePhoneNumber(phone)) return // Se não for validado, para a função

    const phoneNumber = phone.split("")
    if (phoneNumber.length === 11) {
        return (
            "(" + phoneNumber.slice(0, 2).join("") + ")" +
            " " + phoneNumber.slice(2, 7).join("") + "-" +
            phoneNumber.slice(7, 11).join("")
        )
    } else if (phoneNumber.length === 10) {
        return (
            "(" + phoneNumber.slice(0, 2).join("") + ")" +
            " " + phoneNumber.slice(2, 6).join("") + "-" +
            phoneNumber.slice(6, 10).join("")
        )
    }
}

export async function priceFormatter(){
    
}