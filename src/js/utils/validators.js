import joi from "joi"

export async function isLoggedIn() {
    const name = sessionStorage.getItem("USER_NAME")
    const email = sessionStorage.getItem("USER_EMAIL")

    if(!name || !email){
        console.error("Usuário não logado, redirecionamento necessário.");
    }
}

export function validateUserName(username) {
    const schema = joi.string().min(3).max(50).required();
    try {
        const { error } = schema.validate(username);
        return {
            isValid: !error,
            message: error ? error.details[0].message : "Username validation: Success"
        };
    } catch (err) {
        throw new Error("Username validation: FAILED!", err.message);
    }
}


export function validateEmail(email) {
    const schema = joi.string().email({ tlds: { allow: false } }).required();

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
    const schema = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')).required();

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
    const cleanedCpf = cpf.replace(/[.-]/g, "");
    const schema = joi.string().length(11).pattern(/^\d+$/).required();

    try {
        const { error } = schema.validate(cleanedCpf);

        return {
            isValid: !error,
            message: error ? error.details[0].message : "CPF validation: Success"
        }
    } catch (err) {
        throw new Error("CPF validation: FAILED!", err.message)
    }

}

export function validatePhoneNumber(phoneNumber) {
    const schema = joi.string().pattern(/^\d{10,11}$/).required();

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
        const addressSchema = joi.string().min(3).required();
        const numberSchema = joi.number().integer().min(1).required();

        const addressValidation = addressSchema.validate(address);
        const numberValidation = numberSchema.validate(number);

        const error = addressValidation.error || numberValidation.error;

        return {
            isValid: !error,
            message: error ? error.details[0].message : "Address validation: Success!"
        }
    } catch (err) {
        throw new Error("Address validation: FAILED!", err.message)
    }
}


export function validateVoluntariadoForm(formData) {
    const nameValidation = validateUserName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const cpfValidation = validateCpf(formData.cpf);
    const phoneValidation = validatePhoneNumber(formData.whatsapp);

    return {
        isValid: nameValidation.isValid && emailValidation.isValid && cpfValidation.isValid && phoneValidation.isValid,
        errors: [
            ...(!nameValidation.isValid ? [nameValidation.message] : []),
            ...(!emailValidation.isValid ? [emailValidation.message] : []),
            ...(!cpfValidation.isValid ? [cpfValidation.message] : []),
            ...(!phoneValidation.isValid ? [phoneValidation.message] : [])
        ]
    };
}


export function validateSponsorForm(formData) {
    const nameValidation = validateUserName(formData.name);
    const cpfValidation = validateCpf(formData.cpf);
    const phoneValidation = validatePhoneNumber(formData.telefone);
    const emailValidation = validateEmail(formData.email);

    return {
        isValid: nameValidation.isValid && cpfValidation.isValid && phoneValidation.isValid && emailValidation.isValid,
        errors: [
            ...(!nameValidation.isValid ? [nameValidation.message] : []),
            ...(!cpfValidation.isValid ? [cpfValidation.message] : []),
            ...(!phoneValidation.isValid ? [phoneValidation.message] : []),
            ...(!emailValidation.isValid ? [emailValidation.message] : [])
        ]
    };
}