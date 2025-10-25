import React from 'react'

const ButtonNav = ({ children, bgColor, onClick, type = 'button', 
    isFirst = false , rounded= 'none', shadow, up,mouse}) => {
    return (
        <button
            type={type} // Tipo do botão, padrão 'button'
            onClick={onClick} // Função executada ao clicar no botão
            className={`
                h-32                 // Altura fixa do botão
                cursor-pointer       // Cursor muda para pointer ao passar o mouse
                px-4                 // Espaçamento horizontal interno
                ${bgColor}           // Cor de fundo passada via prop
                ${shadow}            // Sombra padrão
                ${mouse}      // Sombra maior ao passar o mouse
                ${up}      // Leve aumento de escala no hover
                transition-all       // Transições suaves para todas propriedades
                duration-300         // Duração da transição em milissegundos
                ease-in-out          // Curva de transição suave
                flex items-center justify-center // Centraliza conteúdo com flexbox
                ${rounded}     // Arredondamento feito por props passados no NavbarSite.jsx
            `}
        >
            {children} {/* Conteúdo interno do botão, geralmente um ícone ou texto */}
        </button>
    )
}

export default ButtonNav
