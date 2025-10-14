import React from 'react'

const ButtonNav = ({ children, bgColor, onClick, type = 'button', isFirst = false }) => {
    return (
        <button
            type={type} // Tipo do botão, padrão 'button'
            onClick={onClick} // Função executada ao clicar no botão
            className={`
                h-32                 // Altura fixa do botão
                cursor-pointer       // Cursor muda para pointer ao passar o mouse
                px-4                 // Espaçamento horizontal interno
                ${bgColor}           // Cor de fundo passada via prop
                shadow-lg            // Sombra padrão
                hover:shadow-xl      // Sombra maior ao passar o mouse
                hover:scale-105      // Leve aumento de escala no hover
                transition-all       // Transições suaves para todas propriedades
                duration-300         // Duração da transição em milissegundos
                ease-in-out          // Curva de transição suave
                flex items-center justify-center // Centraliza conteúdo com flexbox
                border-r border-gray-600 // Borda direita para separação visual
                rounded-br-md        // Arredondamento no canto inferior direito
            `}
        >
            {children} {/* Conteúdo interno do botão, geralmente um ícone ou texto */}
        </button>
    )
}

export default ButtonNav
