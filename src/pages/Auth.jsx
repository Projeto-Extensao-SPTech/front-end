import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { buscarCep } from "../js/api/cepAPI"


export default function Auth() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialMode = searchParams.get('mode') || 'login';

    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [cadastroStep, setCadastroStep] = useState(1);
    const [eyeOpen, setEyeOpen] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        telefone: '',
        cep: '',
        estado: '',
        municipio: '',
        rua: '',
        numero: '',
        complemento: ''
    });

    useEffect(() => {
        setIsLogin(initialMode === 'login');
        setCadastroStep(1); 
    }, [initialMode]);


    const [cepCarregando, setCepCarregando] = useState(false);
    const [cepErro, setCepErro] = useState(null);

    useEffect(() => {
        const cepLimpo = formData.cep.replace(/\D/g, ''); // Remove caracteres não-numéricos

        if (cepLimpo.length === 8) {
            const buscaEndereco = async () => {
                setCepCarregando(true);
                setCepErro(null);
                try {
                    // Chama sua função da API
                    const data = await buscarCep(cepLimpo); 

                    // Preenche o formulário com os dados
                    setFormData(prev => ({
                        ...prev,
                        rua: data.logradouro,
                        municipio: data.localidade,
                        estado: data.uf,
                        // Você pode adicionar 'bairro' ao seu formData se quiser
                        // bairro: data.bairro 
                    }));

                } catch (error) {
                    setCepErro(error.message); // Ex: "CEP não encontrado."
                    // Limpa os campos em caso de erro
                    setFormData(prev => ({
                        ...prev,
                        rua: '',
                        municipio: '',
                        estado: ''
                    }));
                } finally {
                    setCepCarregando(false);
                }
            };

            buscaEndereco();
        } else {
            // Se o usuário apagar o CEP, limpa o erro
            setCepErro(null);
        }

    }, [formData.cep]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLogin && cadastroStep === 1) {
            setCadastroStep(2);
            return;
        }
        console.log('Dados do formulário completo:', formData);
        navigate('/');
    };

    const switchMode = (mode) => {
        setIsLogin(mode === 'login');
        setCadastroStep(1);
        setFormData({
            nome: '',
            email: '',
            senha: '',
            cpf: '',
            telefone: '',
            cep: '',
            estado: '',
            municipio: '',
            rua: '',
            numero: '',
            complemento: ''
        });
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

                    {!isLogin && (
                        <div className="flex justify-center mb-4 w-full">
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${cadastroStep === 1 ? 'bg-[#052759]' : 'bg-gray-300'}`}></div>
                                <div className={`w-3 h-3 rounded-full ${cadastroStep === 2 ? 'bg-[#052759]' : 'bg-gray-300'}`}></div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">

                        {!isLogin && cadastroStep === 1 && (
                            <>
                                <Input name="nome" placeholder="Nome completo" icon="/icons/user-icon.svg" value={formData.nome} onChange={handleInputChange} />
                                <Input name="email" placeholder="Email" icon="/icons/email-icon.svg" type="email" value={formData.email} onChange={handleInputChange} />
                                <PasswordInput name="senha" placeholder="Senha" value={formData.senha} onChange={handleInputChange} eyeOpen={eyeOpen} setEyeOpen={setEyeOpen} />
                                <Input name="cpf" placeholder="CPF" icon="/icons/cpf-icon.svg" value={formData.cpf} onChange={handleInputChange} />
                                <Input name="telefone" placeholder="Telefone" icon="/icons/phone-icon.svg" value={formData.telefone} onChange={handleInputChange} />
                            </>
                        )}

                        {!isLogin && cadastroStep === 2 && (
                            <>
                                 <div className="w-full max-w-xs h-4 text-center -mt-2">
                                    {cepCarregando && <span className="text-sm text-gray-500">Buscando CEP...</span>}
                                    {cepErro && <span className="text-sm text-red-500">{cepErro}</span>}
                                </div>
                                <Input name="cep" placeholder="CEP" value={formData.cep} onChange={handleInputChange} />
                                <Input name="estado" placeholder="Estado" value={formData.estado} onChange={handleInputChange} />
                                <Input name="municipio" placeholder="Município" value={formData.municipio} onChange={handleInputChange} />
                                <Input name="rua" placeholder="Rua" value={formData.rua} onChange={handleInputChange} />
                                <Input name="numero" placeholder="Número" value={formData.numero} onChange={handleInputChange} />
                                <Input name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleInputChange} />
                            </>
                        )}

                        {isLogin && (
                            <>
                                <Input name="email" placeholder="Email" icon="/icons/email-icon.svg" type="email" value={formData.email} onChange={handleInputChange} />
                                <PasswordInput name="senha" placeholder="Senha" value={formData.senha} onChange={handleInputChange} eyeOpen={eyeOpen} setEyeOpen={setEyeOpen} />
                            </>
                        )}

                        <button type="submit" className="w-full max-w-xs h-10 bg-[#052759] text-[#FCAD0B] rounded-xl hover:text-[#052759] hover:bg-[#FCAD0B] transition font-bold">
                            {isLogin ? "Entrar" : cadastroStep === 1 ? "Continuar" : "Finalizar Cadastro"}
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
            {icon && <img src={icon} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-40" />}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`w-full h-10 py-2 border rounded-lg text-base text-center text-black ${icon ? 'pl-10 pr-4' : 'px-4'}`}
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