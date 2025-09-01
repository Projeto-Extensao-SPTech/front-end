import joi, { func } from "joi"

// Função para proibir o usuário de acessar outras telas sem estar logado
export async function isLoggedIn() {
    const name = sessionStorage.getItem("USER_NAME")
    const email = sessionStorage.getItem("USER_EMAIL")

    if(!name || !email){
        window.location = "../html/client-side/home.html"
    }
}


export function validateEmail(email) {
    const schema = joi.string().email().min(10).max(30).required()

    try {
        const { error } = schema.validate(email)
        return {
            isValid: !error,
            message: error ? error.details[0].message : "E-mail validation: Success"
        }

    } catch (err) {
        throw new Error("Email validation: FAILED!", err.message)
    }
}


export function validatePassword(password) {
    const schema = joi.string().min(5).max(12).required().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$'))

    try {
        const { error } = schema.validate(password)

        return {
            isValid: !error,
            message: error ? error.details[0].message : "Password validation: Success"
        }
    } catch (err) {
        throw new Error("Password validation: FAILED!!", err.message)
    }

}


export function validateCpf(cpf) {
    cpf.split("").map((element) => element == "-" || element == "." ? "" : element).join("")

    const schema = joi.string().pattern(/^{11\d}$/).required()

    try {
        const { error } = schema.validate(cpf)

        return {
            isValid: !error,
            message: error ? error.details[0].message : "CPF validation: Success"
        }
    } catch (err) {
        throw new Error("CPF validation: FAILED!", err.message)
    }

}

export function validatePhoneNumber(phoneNumber) {
    const schema = joi.string().required(/^\d{10,11}$/)

    try {
        const { error } = schema.validate(phoneNumber)
        return {
            isValid: !error,
            message: error ? error.details[0].message : "Phone number validation: Success"
        }
    } catch (err) {
        throw new Error("Phone validation: FAILED", err.message)
    }
}

export function validateAddress(address, number) {
    try {
        const addressSchema = joi.string().required().address()
        const numberSchema = joi.number().required().min(1).max(4)

        const { error } = [addressSchema.validade(address), numberSchema.validate(number)]

        return {
            isValid: !error,
            message: error ? error.details[0].message : "Address validation: Success!"
        }
    } catch (err) {
        throw new Error("Address validation: FAILED!", err.message)
    }
}
