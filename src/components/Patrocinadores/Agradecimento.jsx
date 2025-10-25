// import { usePatrocinadores } from "../../contexts/PatrocinadoresContext";

export function Agradecimento() {
    // const { setTelaAtual } = usePatrocinadores();

    return (
        <>

            <img src="./icons/verified1-icon.svg" alt="Ícone de verificação" className="w-16 h-16 mx-auto" />
            <h2 className="w-[80%] text-2xl m-0 text-center">Muito obrigado por contribuir como patrocinador da instituição!!!</h2>
            <img src="/photos/dog-agradecimento-photo.svg" alt="" className="w-32" />
            <h4 className="w-[60%] text-xl m-0 text-center">Entraremos em contato com você pelo nosso Whatsapp, fique atento!</h4>

            <button className="w-[50%] bg-[#FFB114] text-white rounded-lg p-2 mt-6 hover:bg-[#ffd175] transition-colors duration-300">Finalizar</button>
        </>
    )
}