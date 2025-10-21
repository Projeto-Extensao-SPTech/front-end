import { useState } from "react";
import { signUp } from "../js/signUp";

export function Cadastro({ onSuccess }) {
    // Estado para controlar visibilidade da senha
    const [eyeOpen, setEyeOpen] = useState(false);
    
    // Estado para controlar a tela atual (1 = dados pessoais, 2 = endereço)
    const [tela, setTela] = useState(1);

    // Estado para armazenar todos os dados do formulário em múltiplas etapas
    const [formData, setFormData] = useState({
        nome: "", email: "", senha: "", cpf: "", telefone: "",     // Tela 1: Dados pessoais
        cep: "", estado: "", municipio: "", rua: "", numero: ""    // Tela 2: Endereço
    });

    // Manipulador genérico para atualizar qualquer campo do formulário
    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value  // Atualiza dinamicamente o campo pelo ID
        }));
    }

    // Função que retorna a configuração dos inputs baseada na tela atual
    const getInputsForScreen = (screen) => {
        const allInputs = {
            // Tela 1: Dados pessoais do usuário
            1: [
                { icon: "user-icon.svg", placeholder: "Nome", type: "text", id: "nome" },
                { icon: "email-icon.svg", placeholder: "Email", type: "text", id: "email" },
                { icon: "password-icon.svg", placeholder: "Senha", type: eyeOpen ? "text" : "password", id: "senha", hasEye: true },
                { icon: "cpf-icon.svg", placeholder: "CPF", type: "text", id: "cpf" },
                { icon: "phone-icon.svg", placeholder: "Telefone", type: "text", id: "telefone" }
            ],
            // Tela 2: Dados de endereço
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

    // Manipulador principal do cadastro - controla o fluxo multi-etapas
    const handleCadastro = () => {
        if (tela === 1) {
            // Primeira etapa: vai para a tela de endereço
            setTela(2)
        } else {
            // Segunda etapa: envia os dados e finaliza cadastro
            console.log("Dados a serem enviados:", formData)
            signUp(formData)  // Chama a API de cadastro
            onSuccess()       // Navega para a Home após sucesso
        }
    }

    return (
        // Container principal do formulário
        <div className="flex flex-col gap-4 w-full justify-center items-center px-2">
            
            {/* Container dos inputs - renderiza dinamicamente baseado na tela atual */}
            <div className="w-full flex flex-col gap-3 md:gap-4 justify-center items-center">
                {getInputsForScreen(tela).map((input, index) => (
                    <div key={index} className="relative w-full max-w-xs md:max-w-sm">
                        
                        {/* Ícone do input - posicionado absolutamente à esquerda */}
                        <img
                            src={`/icons/${input.icon}`}
                            alt={`Ícone ${input.placeholder}`}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 opacity-40"
                        />
                        
                        {/* Input principal */}
                        <input
                            type={input.type}
                            placeholder={input.placeholder}
                            id={input.id} 
                            className="w-full h-8 md:h-10 py-2 pl-9 md:pl-10 pr-4 border rounded-lg text-sm md:text-base text-center !text-black"
                            value={formData[input.id]}
                            onChange={handleChange}
                        />
                        
                        {/* Ícone de olho (apenas para campo de senha) - toggle de visibilidade */}
                        {input.hasEye && (
                            <img
                                src={`/icons/${eyeOpen ? "opened-eye-icon.svg" : "closed-eye-icon.svg"}`}
                                alt={eyeOpen ? "Ocultar senha" : "Mostrar senha"}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 opacity-40 cursor-pointer"
                                onClick={() => setEyeOpen(!eyeOpen)}
                            />
                        )}
                    </div>
                ))}
            </div>
            
            {/* Botão de ação - texto muda conforme a tela */}
            <div className="w-full flex justify-center items-center">
                <button
                    onClick={handleCadastro}
                    className="w-full max-w-xs md:max-w-sm h-8 md:h-10 bg-[#052759] text-[#FCAD0B] rounded-xl hover:text-[#052759] hover:bg-[#FCAD0B] transition duration-150 ease-in-out cursor-pointer text-sm md:text-base"
                >
                    {tela === 1 ? "Continuar" : "Cadastrar"}
                </button>
            </div>
        </div>
    );
}

// COMENTÁRIOS PARA PRÓXIMOS DESENVOLVEDORES:
//
// OBJETIVO DO COMPONENTE:
// - Formulário de cadastro multi-etapas com validação visual
// - Coleta dados pessoais (tela 1) e endereço (tela 2)
// - Integra com sistema de autenticação
//
// FLUXO DO COMPONENTE:
// 1. Tela 1: Coleta dados pessoais (nome, email, senha, CPF, telefone)
// 2. Ao clicar "Continuar": vai para Tela 2
// 3. Tela 2: Coleta dados de endereço (CEP, estado, município, rua, número)
// 4. Ao clicar "Cadastrar": chama API e navega para Home
//
// ESTADOS PRINCIPAIS:
// - eyeOpen: controla visibilidade da senha (true = texto, false = password)
// - tela: controla a etapa atual (1 = dados pessoais, 2 = endereço)
// - formData: objeto com todos os dados do formulário
//
// FUNÇÕES CHAVE:
// - handleChange: atualiza qualquer campo do form dinamicamente
// - getInputsForScreen: retorna configuração dos inputs por tela
// - handleCadastro: controla navegação entre telas e submissão final
//
// DEPENDÊNCIAS EXTERNAS:
// - signUp: função de API para registrar usuário (em ../js/signUp)
// - onSuccess: callback prop para navegar após cadastro bem-sucedido
//
// ARQUIVOS NECESSÁRIOS (em /public/icons/):
// - user-icon.svg, email-icon.svg, password-icon.svg, cpf-icon.svg, phone-icon.svg
// - opened-eye-icon.svg, closed-eye-icon.svg
//
// PARA MODIFICAR:
// - Adicionar novas telas: expandir o objeto allInputs
// - Adicionar campos: incluir no formData e no array de inputs correspondente
// - Validação: implementar validações antes de setTela(2) e signUp()
// - Estilos: modificar classes Tailwind para ajustar aparência
//
// MELHORIAS FUTURAS SUGERIDAS:
// - [ ] Adicionar validação em tempo real nos campos
// - [ ] Implementar máscaras para CPF, telefone e CEP
// - [ ] Adicionar loading state durante o signUp
// - [ ] Implementar tratamento de erros da API
// - [ ] Adicionar confirmação de senha