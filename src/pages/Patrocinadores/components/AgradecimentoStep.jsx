import { useNavigate } from "react-router-dom";

export default function AgradecimentoStep() {
    const navigate = useNavigate();

    return (
        <div className="text-center space-y-6 w-full">
            <img
                src="/icons/verified1-icon.svg"
                alt="Ícone de verificação"
                className="w-12 h-12 mx-auto"
            />
            <h2 className="text-xl text-white font-bold">
                Muito obrigado por contribuir como patrocinador da instituição!!!
            </h2>
            <img
                src="/photos/dog-agradecimento-photo.svg"
                alt="Cachorro agradecendo"
                className="w-24 mx-auto"
            />
            <h4 className="text-sm text-white/80">
                Entraremos em contato com você pelo nosso Whatsapp, fique atento!
            </h4>

            <button
                onClick={() => navigate("/")}
                className="w-64 bg-[#FFB114] text-white rounded-lg py-2 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
            >
                Finalizar
            </button>
        </div>
    );
}
