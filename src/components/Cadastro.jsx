import { useState } from "react";
import { Login } from "./Login";

export function Cadastro() {
    const [eyeOpen, setEyeOpen] = useState(false);
    const [tela, setTela] = useState(1);

    const inputs = {
        1: [
            { icon: "user-icon.svg", placeholder: "Nome", type: "text", id: "input_nome" },
            { icon: "email-icon.svg", placeholder: "Email", type: "text", id: "input_email" },
            { icon: "password-icon.svg", placeholder: "Senha", type: eyeOpen ? "text" : "password", id: "input_senha", hasEye: true },
            { icon: "cpf-icon.svg", placeholder: "CPF", type: "text", id: "input_cpf" },
            { icon: "phone-icon.svg", placeholder: "Telefone", type: "text", id: "input_phone" }
        ],
        2: [
            { icon: "user-icon.svg", placeholder: "CEP", type: "text", id: "input_cep" },
            { icon: "email-icon.svg", placeholder: "Estado", type: "text", id: "input_estado" },
            { icon: "password-icon.svg", placeholder: "Municipio", type: "text", id: "input_municipio" },
            { icon: "cpf-icon.svg", placeholder: "Rua", type: "text", id: "input_rua" },
            { icon: "phone-icon.svg", placeholder: "Número", type: "text", id: "input_numero" }
        ]
    };

    return (
        <div className="flex flex-col gap-4 m-4 justify-center items-center">
            <form className="w-80% flex flex-col gap-4 justify-center items-center">
                {inputs[tela].map((input, index) => (
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
                <button
                    onClick={tela === 1 ? () => setTela(2) : Login}
                    className="w-80 h-8 bg-primary text-secondary rounded-xl hover:text-primary hover:bg-secondary transition duration-150 ease-in-out cursor-pointer"
                >
                    {tela === 1 ? "Continuar" : "Cadastrar"}
                </button>
            </form>
        </div>
    );
}