import * as validators from './utils/validators'

export function sendSponsor(formData){
    if (!formData) return;
    
    console.log("Dados recebidos:", formData)
    
    const allValid = validators.validateSponsorForm(formData);

    if (!allValid.isValid) {
        console.error("Form validation failed:", allValid.errors);
        return;
    }

    console.log("Form data is valid. Proceeding to send data...");

    // fetch("http://localhost:3000/users/patrocinadores", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(formData)
    // }).then(response => {
    //     if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //     }
    //     console.log("Sponsor data sent successfully!");
    // })
    // .catch(error => {
    //     console.error("There was a problem with the fetch operation:", error);
    // });
}