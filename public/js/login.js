import { stringFormatter } from "../utils/formatter.js";
import { validateEmail, validatePassword, validatePhoneNumber, validateUserName } from "../utils/validators.js";
import { StatusCodes } from "http-status-codes";


async function login() {
    const username = input_nome.value;
    const userPassword = input_senha.value;
    const userEmail = input_email.value;
    const userPhone = input_phone.value;

    const allValid = [
        validateEmail(userEmail),
        validatePassword(userPassword),
        validateUserName(username),
        validatePhoneNumber(userPhone)
    ].every((validation) => validation.isValid)


    if (allValid) {
        const user = { 
            name: stringFormatter(username), 
            password: userPassword, 
            email: userEmail 
        }

        await fetch("/users", {
            method: "GET",
            headers: { "ContentType": "application/json" },
            body: JSON.stringify(user)
        })

    } else {
        res.status(StatusCodes.BAD_REQUEST).send("Dados inválidos!")
    }
}


