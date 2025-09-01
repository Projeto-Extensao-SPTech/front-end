
import { validateCpf } from "./validators.js"

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

// console.log(stringFormatter("GUSTAVO PEREIRA DE ALMEIDA"))
// console.log(stringFormatter("vitor hugo"))

export function dateFormatterToClient() {

}

export async function cpfFormatter(cpf) {

    const cpfValidated = await validateCpf(cpf)

    if(!cpfValidated) return // Se não for validado, para a função

    const cpfNumbers = cpf.split("")
    return (
        cpfNumbers.slice(0, 3).join("") + "." +
        cpfNumbers.slice(3, 6).join("") + "." +
        cpfNumbers.slice(6, 9).join("") + "-" +
        cpfNumbers.slice(9,11).join("")
    )
}

console.log(cpfFormatter("441241212880"))
console.log(cpfFormatter("vitor hugo"))
