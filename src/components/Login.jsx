import { useState } from "react";
export function Login() {

    const [eyeOpen, setEyeOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4 m-4 justify-center items-center">
            <form className="w-80% flex flex-col gap-4 justify-center items-center">
                <div className="relative">
                    <img
                        src="/icons/email-icon.svg"
                        alt=""
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        id="input_email"
                        className="w-80 h-8 py-2 pl-10 pr-4 border rounded-lg text-m text-center"
                    />
                </div>
                <div className="relative">
                    <img
                        src="/icons/password-icon.svg"
                        alt=""
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 "
                    />
                    <input
                        type={eyeOpen ? "text" : "password"}
                        placeholder="Senha"
                        id="input_senha"
                        className="w-80 h-8 py-2 pl-10 pr-4 border rounded-lg text-center"
                    />

                    <img 
                    src={eyeOpen ? "/icons/opened-eye-icon.svg" : "/icons/closed-eye-icon.svg"} 
                    alt="" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 cursor-pointer"
                    onClick={() => setEyeOpen(!eyeOpen)}
                    />
                </div>
                <span className="w-31 border-b-[1px] border-b-black text-xs text-gray-400 hover:text-black self-end cursor-pointer transition duration-300">
                    Esqueci minha senha
                </span>
                <button className="w-64 h-8 bg-primary text-secondary rounded-xl hover:text-primary hover:bg-secondary transition duration-150 ease-in-out cursor-pointer">
                    Entrar
                </button>
            </form>
        </div>
    )
}