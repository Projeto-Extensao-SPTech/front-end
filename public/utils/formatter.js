
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


// Essa função é utilizada para exibição de datas no front-end
// YYYY-MM-DD
export function dateFormatterToClient(date) {
    const dateArray = date.split("")

    dateArray.map((element) => {
        if(element === "-"){
            element = "/"
        }
    })

    const year = date.slice(0,4)
    const month = date.slice(6,7)
    const day = date.slice(9,10)

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
