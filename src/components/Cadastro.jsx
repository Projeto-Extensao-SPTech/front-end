import { useState } from "react";
import { Login } from "./Login";
import { signUp } from "../js/signUp";

export function Cadastro() {
    const [eyeOpen, setEyeOpen] = useState(false);
    const [tela, setTela] = useState(1);

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        cpf: "",
        telefone: "",
        cep: "",
        estado: "",
        municipio: "",
        rua: "",
        numero: ""
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    }

    const getInputsForScreen = (screen) => {
        const allInputs = {
            1: [
                { icon: "user-icon.svg", placeholder: "Nome", type: "text", id: "nome" },
                { icon: "email-icon.svg", placeholder: "Email", type: "text", id: "email" },
                // Agora 'eyeOpen' está no escopo correto
                { icon: "password-icon.svg", placeholder: "Senha", type: eyeOpen ? "text" : "password", id: "senha", hasEye: true },
                { icon: "cpf-icon.svg", placeholder: "CPF", type: "text", id: "cpf" },
                { icon: "phone-icon.svg", placeholder: "Telefone", type: "text", id: "telefone" }
            ],
            2: [
                { icon: "user-icon.svg", placeholder: "CEP", type: "text", id: "cep" },
                { icon: "email-icon.svg", placeholder: "Estado", type: "text", id: "estado" },
                { icon: "password-icon.svg", placeholder: "Municipio", type: "text", id: "municipio" },
                { icon: "cpf-icon.svg", placeholder: "Rua", type: "text", id: "rua" },
                { icon: "phone-icon.svg", placeholder: "Número", type: "text", id: "numero" }
            ]
        };
        return allInputs[screen];
    };

    return (
        <div className="flex flex-col gap-4 m-4 justify-center items-center">
            <div className="w-80% flex flex-col gap-4 justify-center items-center">
                {getInputsForScreen(tela).map((input, index) => (
                    <div key={index} className="relative">
                        <img
                            src={`/icons/${input.icon}`}
                            alt=""
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40"
                        />
                        <input
                            type={input.type}
                            placeholder={input.placeholder}
                            id={input.id} 
                            className="w-80 h-8 py-2 pl-10 pr-4 border rounded-lg text-center"
                            value={formData[input.id]}
                            onChange={handleChange}
                        />
                        {input.hasEye && (
                            <img
                                src={`/icons/${eyeOpen ? "opened-eye-icon.svg" : "closed-eye-icon.svg"}`}
                                alt=""
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 cursor-pointer"
                                onClick={() => setEyeOpen(!eyeOpen)}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="w-80% flex justify-center items-center">
                <button
                    onClick={() => {
                        if (tela === 1) {
                            setTela(2)
                        } else {
                            console.log("Dados a serem enviados:", formData)
                            signUp(formData)
                            setTela(1)
                        }
                    }}
                    className="w-80 h-8 bg-primary text-secondary rounded-xl hover:text-primary hover:bg-secondary transition duration-150 ease-in-out cursor-pointer"
                >
                    {tela === 1 ? "Continuar" : "Cadastrar"}
                </button>
            </div>
        </div>
    );
}