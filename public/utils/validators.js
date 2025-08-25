import joi from "joi"

export function validateEmail(email){
    const schema = joi.string().email().min(10).max(30).required()

    const { error } = schema.validate(email)

    return {
        isValid: !error,
        message: error ? error.details[0].message : "E-mail validation: Success"
    }
}

console.log(validateEmail("teste@gmail.com"))

export function validatePassword(password){
    const schema = joi.string().min(5).max(12).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

    const { error } = schema.validate(password)

    return {
        isValid: !error,
        message: error ? error.details[0].message : "Password validation: Success"
    }
}

export function validateCpf(str){

}

