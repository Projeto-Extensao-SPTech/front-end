import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Auth() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialMode = searchParams.get('mode') || 'login';

    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [eyeOpen, setEyeOpen] = useState(false);
    const [formData, setFormData] = useState({ nome: '', email: '', senha: '', cpf: '', telefone: '' });

    useEffect(() => {
        setIsLogin(initialMode === 'login');
    }, [initialMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
        navigate('/');
    };

    const switchMode = (mode) => {
        setIsLogin(mode === 'login');
        setFormData({ nome: '', email: '', senha: '', cpf: '', telefone: '' });
        navigate(`/auth?mode=${mode}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="w-full h-[calc(100vh-96px)] flex flex-col bg-white overflow-hidden">
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">

                <img src="/blob.svg" alt="Blob" className="hidden md:block w-[600px] absolute rotate-45 z-0 -left-40 -bottom-40 opacity-90" />
                <img src="/blob.svg" alt="Blob" className="hidden md:block w-[700px] absolute rotate-12 z-10 -right-40 -bottom-40 opacity-80" />
                <img src="/photos/dog-photo-1.svg" alt="Dog" className="hidden md:block w-64 absolute z-20 right-20 bottom-20" />

                <div className="w-full max-w-sm md:max-w-md lg:w-96 min-h-[450px] bg-white rounded-lg shadow-md flex flex-col items-center p-6 z-30 relative mx-4 border border-gray-200">

                    <div className="flex justify-center mb-8 w-full">
                        <button className={`${isLogin ? 'bg-[#052759] text-[#FCAD0B]' : 'bg-[#FCAD0B] text-[#052759] opacity-70'} cursor-pointer w-24 h-10 rounded-l-xl text-base hover:opacity-90 font-bold`} onClick={() => switchMode('login')}>
                            Login
                        </button>
                        <button className={`${isLogin ? 'bg-[#FCAD0B] text-[#052759] opacity-70' : 'bg-[#052759] text-[#FCAD0B]'} cursor-pointer w-24 h-10 rounded-r-xl text-base hover:opacity-90 font-bold`} onClick={() => switchMode('cadastro')}>
                            Cadastro
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">
                        {!isLogin && (
                            <Input name="nome" placeholder="Nome" icon="/icons/user-icon.svg" value={formData.nome} onChange={handleInputChange} />
                        )}
                        <Input name="email" placeholder="Email" icon="/icons/email-icon.svg" type="email" value={formData.email} onChange={handleInputChange} />
                        <PasswordInput name="senha" placeholder="Senha" value={formData.senha} onChange={handleInputChange} eyeOpen={eyeOpen} setEyeOpen={setEyeOpen} />
                        {!isLogin && (
                            <>
                                <Input name="cpf" placeholder="CPF" icon="/icons/cpf-icon.svg" value={formData.cpf} onChange={handleInputChange} />
                                <Input name="telefone" placeholder="Telefone" icon="/icons/phone-icon.svg" value={formData.telefone} onChange={handleInputChange} />
                            </>
                        )}
                        <button type="submit" className="w-full max-w-xs h-10 bg-[#052759] text-[#FCAD0B] rounded-xl hover:text-[#052759] hover:bg-[#FCAD0B] transition font-bold">
                            {isLogin ? "Entrar" : "Cadastrar"}
                        </button>
                    </form>

                    {isLogin && (
                        <span className="border-b border-b-black text-xs text-gray-400 hover:text-black self-end cursor-pointer transition mt-4">
                            Esqueci minha senha
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function Input({ name, placeholder, icon, value, onChange, type = "text" }) {
    return (
        <div className="relative w-full max-w-xs">
            <img src={icon} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-40" />
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full h-10 py-2 pl-10 pr-4 border rounded-lg text-base text-center text-black"
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
}

function PasswordInput({ name, placeholder, value, onChange, eyeOpen, setEyeOpen }) {
    return (
        <div className="relative w-full max-w-xs">
            <img src="/icons/password-icon.svg" alt="senha" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-40" />
            <input
                type={eyeOpen ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                className="w-full h-10 py-2 pl-10 pr-9 border rounded-lg text-base text-center text-black"
                value={value}
                onChange={onChange}
                required
            />
            <img
                src={eyeOpen ? "/icons/opened-eye-icon.svg" : "/icons/closed-eye-icon.svg"}
                alt="eye"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 opacity-40 cursor-pointer"
                onClick={() => setEyeOpen(!eyeOpen)}
            />
        </div>
    );
}
