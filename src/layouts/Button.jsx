import React from 'react'

const Button = (props) => {
    return (
        <div>
            {/* Botão estilizado com cores, arredondamento e animação no hover */}
            <button 
                className={`
                    ${props.backgroundColor}  /* Cor de fundo passada via prop */
                    text-[#052759]            /* Cor do texto padrão */
                    rounded-full             /* Botão com bordas totalmente arredondadas */
                    px-8 py-2                /* Espaçamento interno horizontal e vertical */
                    font-500                 /* Peso da fonte */
                    transition-all           /* Transição suave para todas as propriedades */
                    duration-300             /* Duração da transição em ms */
                    ease-in-out              /* Curva da transição */
                    transform                /* Permite transformações CSS */
                    hover:scale-105          /* Aumenta o tamanho no hover */
                    hover:bg-[#052759]       /* Muda a cor de fundo no hover */
                    hover:text-white         /* Muda a cor do texto no hover */
                `}
                style={{ fontFamily: 'Poppins, sans-serif' }}  /* Fonte personalizada */
            >
                {props.title} {/* Texto do botão passado como prop */}
            </button>
        </div>
    )
}

export default Button
