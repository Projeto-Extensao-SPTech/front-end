import { useState } from "react";

export function Login({ onSuccess }) {
    // Estado para controlar se a senha está visível (texto) ou oculta (password)
    const [eyeOpen, setEyeOpen] = useState(false);

    // Função chamada quando o formulário é enviado
    // Previne comportamento padrão e chama a função onSuccess passada como prop
    const handleSubmit = (e) => {
        e.preventDefault();
        onSuccess();
    }

    return (
        <div className="flex flex-col gap-4 w-full justify-center items-center px-2">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 justify-center items-center">
                {/* Campo de email com ícone dentro */}
                <div className="relative w-full max-w-xs md:max-w-sm">
                    <img
                        src="/icons/email-icon.svg"
                        alt=""
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 opacity-40"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        id="input_email"
                        className="w-full h-8 md:h-10 py-2 pl-9 md:pl-10 pr-4 border rounded-lg text-sm md:text-base text-center"
                    />
                </div>

                {/* Campo de senha com ícone e botão para mostrar/ocultar a senha */}
                <div className="relative w-full max-w-xs md:max-w-sm">
                    <img
                        src="/icons/password-icon.svg"
                        alt=""
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 opacity-40"
                    />
                    <input
                        type={eyeOpen ? "text" : "password"}
                        placeholder="Senha"
                        id="input_senha"
                        className="w-full h-8 md:h-10 py-2 pl-9 md:pl-10 pr-4 border rounded-lg text-sm md:text-base text-center"
                    />

                    {/* Ícone para alternar entre mostrar e esconder a senha */}
                    <img
                        src={eyeOpen ? "/icons/opened-eye-icon.svg" : "/icons/closed-eye-icon.svg"}
                        alt="Toggle password visibility"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 opacity-40 cursor-pointer"
                        onClick={() => setEyeOpen(!eyeOpen)}
                    />
                </div>

                {/* Link para "Esqueci minha senha" */}
                <span className="w-28 md:w-31 border-b-[1px] border-b-black text-xs text-gray-400 hover:text-black self-end cursor-pointer transition duration-300 mr-4 md:mr-0">
                    Esqueci minha senha
                </span>

                {/* Botão para enviar o formulário */}
                <button type="submit" className="w-48 md:w-64 h-8 md:h-10 bg-[#052759] text-[#FCAD0B] rounded-xl hover:text-[#052759] hover:bg-[#FCAD0B] transition duration-150 ease-in-out cursor-pointer text-sm md:text-base">
                    Entrar
                </button>
            </form>
        </div>
    )
}
