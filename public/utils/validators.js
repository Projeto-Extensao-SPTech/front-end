import joi, { func } from "joi"

export function validateEmail(email) {
    const schema = joi.string().email().min(10).max(30).required()

    try {
        const { error } = schema.validate(email)
        return {
            isValid: !error,
            message: error ? error.details[0].message : "E-mail validation: Success"
        }

    } catch (err) {
        throw new Error("Falha na validação do email!", err.message)
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
        throw new Error("Falha na validação da senha!", err.message)
    }

}


export function validateCpf(cpf) {
    const schema = joi.string().pattern(/^\d{11}$/).required()

    try {
        const { error } = schema.validate(cpf)

        return {
            isValid: !error,
            message: error ? error.details[0].message : "CPF validation: Success"
        }
    } catch (err) {
        throw new Error("Falha na validação do CPF!", err.message)
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

    }
}
