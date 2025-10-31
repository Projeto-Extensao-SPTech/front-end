import * as validators from './utils/validators'

export function sendVoluntariado(formData) {
    if (!formData) return;
    console.log('Dados do voluntário:', formData)

    const allValid = validators.validateVoluntariadoForm(formData);

    if (!allValid.isValid) {
        console.error("Form validation failed:", allValid.errors);
        return;
    }

    // const url = "http://localhost:3000/users/voluntariados"

    // fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(formData)
    // }).then(response => {
    //     if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //     }

    //     console.log("Voluntariado data sent successfully!");
    // })
    //     .catch(error => {
    //         console.error("There was a problem with the fetch operation:", error);
    //     });
}