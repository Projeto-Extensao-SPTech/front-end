import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAlertUtils } from "../hooks/useAlertUtils"
import { buscarCep } from "../api/apiCep"
import { CardRecuperarSenha } from "../components/sections/CardRecuperarSenha"
import { CardNovaSenha } from "../components/sections/CardNovaSenha"
import { CardSenhaRedefinida } from "../components/sections/CardSenhaRedefinida"
import { CardVerificarCodigo } from "../components/sections/CardVerificarCodigo"
import { api, setHeaderParam } from "../api/apiUserService"
import { maskCPF, maskCNPJ, maskTelefone, maskCEP } from "../js/utils/formatter";

export default function Auth() {
    const alertUtils = useAlertUtils()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const initialMode = searchParams.get('mode') || 'login'
    const [isLogin, setIsLogin] = useState(initialMode === 'login')
    const [cadastroStep, setCadastroStep] = useState(1)
    const [eyeOpen, setEyeOpen] = useState(false)
    const [tipoPessoa, setTipoPessoa] = useState('PF')

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        documento: '',
        telefone: '',
        cep: '',
        estado: '',
        municipio: '',
        rua: '',
        numero: '',
        complemento: ''
    })
    const [etapaRecuperarSenha, setEtapaRecuperarSenha] = useState(0)
    const [codigoVerificacao, setCodigoVerificacao] = useState('')

    useEffect(() => {
        const mode = searchParams.get('mode') || 'login';
        setIsLogin(mode === 'login');
    }, [searchParams]);

    const handleInputMaskedChange = (e) => {
        const { name, value } = e.target

        let masked = value
        let clean = value.replace(/\D/g, '')

        if (name === "documento") {
            masked = tipoPessoa === "PF" ? maskCPF(value) : maskCNPJ(value)
            clean = clean.substring(0, tipoPessoa === "PF" ? 11 : 14)
        }

        if (name === "telefone") {
            masked = maskTelefone(value)
            clean = clean.substring(0, 11)
        }

        if (name === "cep") {
            masked = maskCEP(value)
            clean = clean.substring(0, 8)
        }

        setFormData((prev) => ({
            ...prev,
            [name]: clean
        }))

        e.target.value = masked
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const recuperacaoSenhaEnviar = async () => {
        const codigo = Math.floor(1000 + Math.random() * 9000).toString()
        setCodigoVerificacao(codigo)
        const telefoneLimpo = formData.telefone.replace(/\D/g, '')
        const numeroFormatado = `55${telefoneLimpo}`

        try {
            const telefoneCadastrado = await api.get(`/users/exists-by-phone/${telefoneLimpo}`)
            if (!telefoneCadastrado) {
                alertUtils.warn("Telefone não encontrado", "Esse telefone não pertence a nenhum usuário cadastrado")
                return
            }
            console.log("Telefone encontrado")
        } catch (error) {
            console.log("Erro ao verificar o telefone: ", error.message)
            alertUtils.error("Não foi possível continuar", "Tente novamente mais tarde.")
            return
        }

        const requestBody = {
            number: numeroFormatado,
            text: `Abrigo Dog Feliz: Seu código de verificação é: ${codigo}`
        }

        try {
            const response = await fetch('http://localhost:7000/messages/sendText/api-manager', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            })

            if (response.ok) {
                setEtapaRecuperarSenha(2)
            } else {
                const errorText = await response.text()
                alertUtils.error({ text: `Erro ao enviar mensagem: ${errorText}` })
            }
        }
        catch (error) {
            alertUtils.error({ text: "Erro ao enviar mensagem. Tente novamente mais tarde." })
        }
    }

    const recuperacaoSenhaVerificarCodigo = (codigoDigitado) => {
        if (codigoDigitado === codigoVerificacao) {
            setCodigoVerificacao('')
            setEtapaRecuperarSenha(3)
        } else {
            alertUtils.warn({ text: "Código de verificação inválido. Tente novamente." })
        }
    }

    const recuperacaoSenhaAtualizar = async (novaSenha) => {
        try {
            await api.patch("/users/update-password", {
                phone: formData.telefone.replace(/\D/g, ''),
                password: novaSenha
            })
            setEtapaRecuperarSenha(4)
        } catch (error) {
            console.error("Erro ao atualizar a senha: " + error.message)
            alertUtils.error("Não foi possível continuar", "Tente novamente mais tarde.")
            return
        }
    }

    const recuperacaoSenhaVoltarAoLogin = () => {
        setEtapaRecuperarSenha(0)
        setFormData(prev => ({ ...prev, telefone: '', senha: '', email: '' }))
        switchMode('login')
    }

    useEffect(() => {
        const cepLimpo = formData.cep.replace(/\D/g, '')
        if (cepLimpo.length === 8) {
            const buscaEndereco = async () => {
                try {
                    const data = await buscarCep(cepLimpo)

                    setFormData(prev => ({
                        ...prev,
                        rua: data.logradouro,
                        municipio: data.localidade,
                        estado: data.uf
                    }))

                } catch (error) {
                    setFormData(prev => ({
                        ...prev,
                        rua: '',
                        municipio: '',
                        estado: ''
                    }))
                }
            }

            buscaEndereco()
        }
    }, [formData.cep])

    useEffect(() => {
        setIsLogin(initialMode === 'login')
        setCadastroStep(1)
        setTipoPessoa('PF')
    }, [initialMode])

    const validarCampos = () => {
        if (tipoPessoa === 'PF') {
            if (formData.nome.length < 8 || formData.nome.length > 40) {
                return { campo: "nome", mensagem: "O nome deve ter entre 8 e 40 caracteres." }
            }

            const cpfRegex = /^\d{11}$/
            if (!cpfRegex.test(formData.documento)) {
                return { campo: "cpf", mensagem: "O CPF deve conter exatamente 11 números." }
            }
        } else {
            if (formData.nome.length < 5 || formData.nome.length > 100) {
                return { campo: "nome", mensagem: "A razão social deve ter entre 5 e 100 caracteres." }
            }

            const cnpjRegex = /^\d{14}$/
            if (!cnpjRegex.test(formData.documento)) {
                return { campo: "cpf", mensagem: "O CNPJ deve conter exatamente 14 números." }
            }
        }

        const telefoneRegex = /^\d{10,11}$/
        if (!telefoneRegex.test(formData.telefone)) {
            return { campo: "telefone", mensagem: "O telefone deve conter apenas números e ter 10 ou 11 dígitos." }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const emailValido = emailRegex.test(formData.email) && formData.email.length >= 8 && formData.email.length <= 100
        if (!emailValido) {
            return { campo: "email", mensagem: "O e-mail deve ter formato válido e entre 8 e 100 caracteres." }
        }

        if (formData.senha.length < 8) {
            return { campo: "senha", mensagem: "A senha deve ter pelo menos 8 caracteres." }
        }

        const obrigatoriosEndereco = ['cep', 'estado', 'municipio', 'rua', 'numero']
        const faltandoEndereco = obrigatoriosEndereco.filter(campo => !formData[campo])
        if (faltandoEndereco.length > 0) {
            return { campo: "endereco", mensagem: `Preencha todos os campos de endereço: ${faltandoEndereco.join(', ')}` }
        }

        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isLogin && cadastroStep === 1) {
            const erro = validarCampos()
            if (erro && ["nome", "email", "senha", "cpf", "telefone"].includes(erro.campo)) {
                alertUtils.error(`Erro no campo ${erro.campo}`, erro.mensagem)
                return
            }

            setCadastroStep(2)
            return
        }

        if (!isLogin && cadastroStep === 2) {
            const erro = validarCampos()
            if (erro) {
                alertUtils.error(`Erro no campo ${erro.campo}`, erro.mensagem)
                return
            }
        }

        try {
            if (isLogin) {
                await loginUser(formData, alertUtils)
                navigate('/')
            } else {
                await cadastroUser(formData, tipoPessoa, alertUtils)
                navigate('/auth?mode=login')
            }
        } catch (error) {
            alertUtils.error("Erro!", error.message || "Ocorreu um erro. Tente novamente.")
        } 
    }

    const switchMode = (mode) => {
        setIsLogin(mode === 'login')
        setCadastroStep(1)
        setTipoPessoa('PF')
        setFormData({
            nome: '',
            email: '',
            senha: '',
            documento: '',
            telefone: '',
            cep: '',
            estado: '',
            municipio: '',
            rua: '',
            numero: '',
            complemento: ''
        })
        navigate(`/auth?mode=${mode}`)
    }

    const handleTipoPessoaChange = (novoTipo) => {
        setTipoPessoa(novoTipo)
        setFormData(prev => ({
            ...prev,
            nome: '',
            documento: ''
        }))
    }

    return (
        <div className="w-full min-h-[calc(100vh-96px)] flex flex-col bg-[#052759] overflow-hidden">
            <div className="flex-1 flex items-center justify-center relative overflow-hidden py-8 px-4">

                <img src="/blob.svg" alt="Blob" className="hidden md:block w-[600px] absolute rotate-45 z-0 -left-40 -bottom-40 opacity-90" />
                <img src="/blob.svg" alt="Blob" className="hidden md:block w-[700px] absolute rotate-12 z-10 -right-40 -bottom-40 opacity-80" />
                <img src="/photos/dog-photo-1.svg" alt="Dog" className="hidden md:block w-64 absolute z-20 right-20 bottom-20" />

                <div className="w-full max-w-sm md:max-w-md backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl flex flex-col items-center p-4 md:p-5 z-30 relative border border-white/20 transition-all duration-500 max-h-[90vh] overflow-y-auto">

                    {etapaRecuperarSenha === 0 ? (
                        <>
                            <div className="flex justify-center mb-4 w-full relative">
                                <div className="relative bg-gradient-to-r from-gray-100 to-gray-50 p-1 rounded-2xl shadow-inner">
                                    <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-[#052759] to-[#063a7a] rounded-xl transition-all duration-300 shadow-lg ${isLogin ? 'left-1' : 'left-[calc(50%+2px)]'}`}></div>
                                    <button 
                                        className={`relative z-10 w-28 md:w-32 h-11 md:h-12 rounded-xl text-sm  font-bold transition-all duration-300 ${isLogin ? 'text-[#FCAD0B]' : 'text-gray-600'}`} 
                                        onClick={() => switchMode('login')}
                                    >
                                        Login
                                    </button>
                                    <button 
                                        className={`relative z-10 w-28 md:w-32 h-11 md:h-12 rounded-xl text-sm font-bold transition-all duration-300 ${!isLogin ? 'text-[#FCAD0B]' : 'text-gray-600'}`} 
                                        onClick={() => switchMode('cadastro')}
                                    >
                                        Cadastro
                                    </button>
                                </div>
                            </div>

                            {!isLogin && (
                                <>
                                    <div className="flex justify-center mb-3 w-full">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${cadastroStep === 1 ? 'bg-gradient-to-br from-[#052759] to-[#063a7a] text-[#FCAD0B] shadow-lg scale-110' : 'bg-gray-200 text-gray-400'}`}>
                                                    1
                                                </div>
                                                <span className="text-[10px] mt-0.5 text-gray-500">Dados</span>
                                            </div>
                                            <div className={`h-1 w-10 md:w-12 rounded-full transition-all duration-300 ${cadastroStep === 2 ? 'bg-gradient-to-r from-[#052759] to-[#FCAD0B]' : 'bg-gray-200'}`}></div>
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${cadastroStep === 2 ? 'bg-gradient-to-br from-[#052759] to-[#063a7a] text-[#FCAD0B] shadow-lg scale-110' : 'bg-gray-200 text-gray-400'}`}>
                                                    2
                                                </div>
                                                <span className="text-[10px] mt-0.5 text-gray-500">Endereço</span>
                                            </div>
                                        </div>
                                    </div>

                                    {cadastroStep === 1 && (
                                        <div className="flex justify-center mb-3 w-full">
                                            <div className="relative bg-gradient-to-r from-gray-100 to-gray-50 p-1 rounded-2xl shadow-inner">
                                                <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-[#052759] to-[#063a7a] rounded-xl transition-all duration-300 shadow-lg ${tipoPessoa === 'PF' ? 'left-1' : 'left-[calc(50%+2px)]'}`}></div>
                                                <button
                                                    className={`relative z-10 w-28 md:w-32 h-8 md:h-9 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${tipoPessoa === 'PF' ? 'text-[#FCAD0B]' : 'text-gray-600'}`}
                                                    onClick={() => handleTipoPessoaChange('PF')}
                                                >
                                                    Pessoa Física
                                                </button>
                                                <button
                                                    className={`relative z-10 w-28 md:w-32 h-8 md:h-9 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${tipoPessoa === 'PJ' ? 'text-[#FCAD0B]' : 'text-gray-600'}`}
                                                    onClick={() => handleTipoPessoaChange('PJ')}
                                                >
                                                    Pessoa Jurídica
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="w-full flex flex-col gap-2.5 items-center" onSubmit={handleSubmit}>

                                {!isLogin && cadastroStep === 1 && (
                                    <>
                                        <Input
                                            name="nome"
                                            placeholder={tipoPessoa === 'PF' ? "Nome completo" : "Razão Social"}
                                            icon="/icons/user-icon.svg"
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                        />

                                        <Input
                                            name="documento"
                                            placeholder={tipoPessoa === 'PF' ? "CPF" : "CNPJ"}
                                            icon="/icons/cpf-icon.svg"
                                            value={tipoPessoa === "PF" ? maskCPF(formData.documento) : maskCNPJ(formData.documento)}
                                            onChange={handleInputMaskedChange}
                                        />

                                        <Input name="email" placeholder="Email" icon="/icons/email-icon.svg" type="email" value={formData.email} onChange={handleInputChange} />

                                        <PasswordInput name="senha" placeholder="Senha" value={formData.senha} onChange={handleInputChange} eyeOpen={eyeOpen} setEyeOpen={setEyeOpen} />

                                        <Input
                                            name="telefone"
                                            placeholder="Telefone"
                                            icon="/icons/phone-icon.svg"
                                            value={maskTelefone(formData.telefone)}
                                            onChange={handleInputMaskedChange}
                                        />
                                    </>
                                )}

                                {!isLogin && cadastroStep === 2 && (
                                    <>
                                        <Input
                                            name="cep"
                                            placeholder="CEP"
                                            value={maskCEP(formData.cep)}
                                            onChange={handleInputMaskedChange}
                                        />

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

                                <button 
                                    onClick={handleSubmit}
                                    className="w-full h-10 md:h-11 mt-1 bg-gradient-to-r from-[#052759] to-[#063a7a] text-[#FCAD0B] rounded-xl font-bold text-sm  shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                >
                                    {isLogin ? "Entrar" : cadastroStep === 1 ? "Continuar" : "Finalizar Cadastro"}
                                </button>
                            </div>

                            {isLogin && (
                                <span onClick={() => setEtapaRecuperarSenha(1)}
                                    className="text-xs text-gray-500 hover:text-[#052759] self-end cursor-pointer transition-all duration-200 mt-2 hover:underline">
                                    Esqueci minha senha
                                </span>
                            )}
                        </>

                    ) : (

                        <>
                            {etapaRecuperarSenha === 1 && (
                                <CardRecuperarSenha
                                    telefone={formData.telefone}
                                    onTelefoneChange={(val) => handleInputMaskedChange({ target: { name: "telefone", value: val } })}
                                    onSubmit={recuperacaoSenhaEnviar}
                                />
                            )}
                            {etapaRecuperarSenha === 2 && (
                                <CardVerificarCodigo
                                    onSubmit={recuperacaoSenhaVerificarCodigo}
                                />
                            )}
                            {etapaRecuperarSenha === 3 && (
                                <CardNovaSenha
                                    onSubmit={recuperacaoSenhaAtualizar}
                                />
                            )}
                            {etapaRecuperarSenha === 4 && (
                                <CardSenhaRedefinida
                                    onIrParaLogin={recuperacaoSenhaVoltarAoLogin}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

async function cadastroUser(formData, tipoPessoa, alertUtils) {

    alertUtils.loading("Cadastrando usuário...", "Aguarde um momento")

    try {
        const requestBody = {
            name: formData.nome,
            document: formData.documento,
            phone: formData.telefone,
            address: {
                zip_code: formData.cep,
                state: formData.estado,
                city: formData.municipio,
                street: formData.rua,
                complement: formData.complemento,
                number: formData.numero,
                country: "Brasil"
            },
            mail_address: formData.email,
            password: formData.senha,
            type: tipoPessoa
        }
        console.log("Dados da requisição: ", requestBody)
        const response = await api.post('/auth/register', requestBody)

        alertUtils.close()
        await alertUtils.success("Cadastro realizado com sucesso!", "Bem-vindo ao abrigo dog feliz 🐶")
        return response.data
    } catch (error) {
        alertUtils.close()
        await alertUtils.error("Erro!", "Tentativa de cadastro falhou!", "Verifique os dados informados e tente novamente.")
        throw new Error(error.message)
    }
}

async function loginUser(formData, alertUtils) {
    alertUtils.loading("Realizando login...", "Aguarde um momento")

    try {
        const response = await api.post('/auth/login', {
            mail_address: formData.email,
            password: formData.senha
        })

        alertUtils.close()
        alertUtils.success("Login realizado com sucesso!", "Bem vindo de volta 🐾")

        const data = response.data;
        sessionStorage.setItem("USER_DATA", JSON.stringify(data));
        setHeaderParam("Authorization", `Bearer ${data.token}`);
        window.location.href = '/';
        return data;
    } catch (error) {
        alertUtils.close()
        await alertUtils.error("Falha no login!", "Verifique suas credenciais e tente novamente.")
        throw new Error(error.message)
    }
}

function Input({ name, placeholder, icon, value, onChange, type = "text" }) {
    return (
        <div className="relative w-full group">
            {icon && <img src={icon} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-40 group-focus-within:opacity-60 transition-opacity duration-200" />}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`w-full h-9 md:h-10 py-2 border-2 border-gray-200 rounded-xl text-sm bg-white transition-all duration-200 focus:border-[#052759] focus:shadow-lg focus:scale-[1.01] outline-none ${icon ? 'pl-10 pr-3 text-left' : 'px-3 text-center'}`}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    )
}

function PasswordInput({ name, placeholder, value, onChange, eyeOpen, setEyeOpen }) {
    return (
        <div className="relative w-full group">
            <img src="/icons/password-icon.svg" alt="senha" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-40 group-focus-within:opacity-60 transition-opacity duration-200" />
            <input
                type={eyeOpen ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                className="w-full h-9 md:h-10 py-2 pl-10 pr-10 border-2 border-gray-200 rounded-xl text-sm text-left bg-white transition-all duration-200 focus:border-[#052759] focus:shadow-lg focus:scale-[1.01] outline-none"
                value={value}
                onChange={onChange}
                required
            />
            <img
                src={eyeOpen ? "/icons/opened-eye-icon.svg" : "/icons/closed-eye-icon.svg"}
                alt="eye"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 opacity-40 cursor-pointer hover:opacity-70 transition-all duration-200 hover:scale-110"
                onClick={() => setEyeOpen(!eyeOpen)}
            />
        </div>
    )
}