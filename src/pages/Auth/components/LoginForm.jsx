import Input from "./Input";
import PasswordInput from "./PasswordInput";

export default function LoginForm({ formData, onChange, eyeOpen, setEyeOpen, onSubmit, onForgotPassword }) {
    return (
        <>
            <div className="w-full flex flex-col gap-2.5 items-center">
                <Input
                    name="email"
                    placeholder="Email"
                    icon="/icons/email-icon.svg"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                />

                <PasswordInput
                    name="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={onChange}
                    eyeOpen={eyeOpen}
                    setEyeOpen={setEyeOpen}
                />

                <button
                    onClick={onSubmit}
                    className="w-full h-10 md:h-11 mt-1 bg-gradient-to-r from-[#052759] to-[#063a7a] text-[#FCAD0B] rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                    Entrar
                </button>
            </div>

            <span
                onClick={onForgotPassword}
                className="text-xs text-gray-500 hover:text-[#052759] self-end cursor-pointer transition-all duration-200 mt-2 hover:underline"
            >
                Esqueci minha senha
            </span>
        </>
    );
}
