import React from 'react'

const FaleConosco = () => {
    return (
        // Seção principal - fundo azul da marca com altura mínima responsiva
        <div className="min-h-[50vh] flex items-center justify-center bg-[#052759] py-6">

            {/* Container responsivo - muda de coluna para linha em desktop */}
            <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto gap-10 px-4 lg:px-8">

                {/* Card do formulário de contato - ocupa 3/5 em desktop */}
                <div className="lg:w-3/5 bg-[#EFEFEF] rounded-2xl p-4 lg:p-5 shadow-2xl">
                    
                    {/* Título da seção */}
                    <h2 className="text-xl lg:text-2xl font-extrabold text-[#052759] mb-3">
                        FALE CONOSCO
                    </h2>

                    {/* Formulário de contato com campos básicos */}
                    <div className="flex flex-col gap-2">
                        
                        {/* Campo Nome */}
                        <div>
                            <label className="block text-[#052759] font-semibold mb-1 text-sm">Nome:</label>
                            <input
                                type="text"
                                className="w-full px-3 py-1.5 rounded-md bg-white text-sm"
                                placeholder="Seu nome completo"
                            />
                        </div>

                        {/* Campo E-mail */}
                        <div>
                            <label className="block text-[#052759] font-semibold mb-1 text-sm">E-mail:</label>
                            <input
                                type="email"
                                className="w-full px-3 py-1.5 rounded-md bg-white text-sm"
                                placeholder="seu.email@exemplo.com"
                            />
                        </div>

                        {/* Campo Mensagem (textarea) */}
                        <div>
                            <label className="block text-[#052759] font-semibold mb-1 text-sm">Mensagem:</label>
                            <textarea
                                rows="2"
                                className="w-full px-3 py-1.5 rounded-md bg-white text-sm resize-none"
                                placeholder="Digite sua mensagem aqui..."
                            />
                        </div>

                        {/* Botão de envio */}
                        <button className="bg-[#052759] text-white font-bold py-2 px-5 rounded-md hover:scale-105 transition-transform self-start mt-1">
                            Enviar
                        </button>
                    </div>

                </div>

                {/* Card de contatos alternativos - ocupa 2/5 em desktop */}
                <div className="lg:w-2/5 rounded-2xl p-4 lg:p-5 flex flex-col justify-center items-center">
                    
                    {/* Título de transição */}
                    <h3 className="text-xl lg:text-2xl font-bold text-[#EFEFEF] mb-4 text-center">
                        ou...
                    </h3>

                    {/* Container dos contatos alternativos */}
                    <div className="flex gap-8 justify-center items-center">
                        
                        {/* Link para Instagram */}
                        <a
                            href="https://instagram.com/abrigodogfeliz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                        >
                            <img src="/img-ig.png" alt="Instagram" className="w-45 lg:w-48 h-auto" />
                            <p className="text-sm font-bold text-[#EFEFEF]">Instagram</p>
                        </a>

                        {/* Link para WhatsApp */}
                        <a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                        >
                            <img src="/img-wpp.png" alt="WhatsApp" className="w-45 lg:w-48 h-auto" />
                            <p className="text-sm font-bold text-[#EFEFEF]">WhatsApp</p>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FaleConosco

// COMENTÁRIOS PARA PRÓXIMOS DESENVOLVEDORES:
//
// OBJETIVO DO COMPONENTE:
// - Fornecer múltiplos canais de contato para usuários interessados no abrigo
// - Oferecer formulário direto + links para redes sociais
//
// LAYOUT E DESIGN:
// - Design responsivo: coluna em mobile, linha em desktop
// - Proporção: 60% formulário / 40% contatos em desktop
// - Cores da marca: azul (#052759), branco, cinza claro (#EFEFEF)
// - Sombras e bordas arredondadas para cards modernos
//
// ESTRUTURA DA SEÇÃO:
// ┌─────────────────────────────────────────────┐
// │           FALE CONOSCO (Formulário)         │  │    ou... (Contatos)     │
// │ - Nome                                      │  │  ┌─────┐  ┌──────┐      │
// │ - E-mail                                    │  │  │ IG  │  │ WPP  │      │
// │ - Mensagem                                  │  │  └─────┘  └──────┘      │
// │ [ Enviar ]                                  │  │ Instagram  WhatsApp     │
// └─────────────────────────────────────────────┘  └────────────────────────┘
//
// FUNCIONALIDADES ATUAIS:
// - Formulário visual (sem backend integrado)
// - Links diretos para Instagram e WhatsApp
// - Design responsivo e acessível
//
// ARQUIVOS NECESSÁRIOS (em /public/):
// - /img-ig.png (ícone do Instagram)
// - /img-wpp.png (ícone do WhatsApp)
//
// PARA MODIFICAR/EXPANDIR:
//
// 1. INTEGRAÇÃO COM BACKEND:
//    - Adicionar estados para os campos: const [nome, setNome] = useState('')
//    - Implementar onSubmit no formulário
//    - Adicionar validação de campos
//    - Incluir feedback de loading/erro/sucesso
//
// 2. ADICIONAR NOVOS CAMPOS:
//    - Telefone, Assunto, Tipo de Contato, etc.
//    - Exemplo:
//      <div>
//        <label>Telefone:</label>
//        <input type="tel" />
//      </div>
//
// 3. ADICIONAR NOVOS CONTATOS:
//    - Facebook, Telegram, E-mail direto, etc.
//    - Exemplo:
//      <a href="mailto:contato@abrigo.com">
//        <img src="/img-email.png" alt="Email" />
//        <p>E-mail</p>
//      </a>
//
// 4. MELHORIAS DE ACESSIBILIDADE:
//    - Adicionar aria-labels nos inputs
//    - Incluir focus states
//    - Adicionar descrições para screen readers
//
// 5. VALIDAÇÕES SUGERIDAS:
//    - E-mail válido
//    - Campos obrigatórios
//    - Tamanho mínimo/máximo de mensagem
//
// LINKS ATUAIS (ATUALIZAR CONFORME NECESSÁRIO):
// - Instagram: https://instagram.com/abrigodogfeliz
// - WhatsApp: https://wa.me/5511999999999 (substituir número)
//
// ESTILOS PRINCIPAIS:
// - bg-[#052759]: azul principal do abrigo
// - bg-[#EFEFEF]: cinza claro para cards
// - shadow-2xl: sombra pronunciada para destaque
// - hover:scale-105: efeito de escala ao passar mouse