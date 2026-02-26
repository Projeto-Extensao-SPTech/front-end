import { useNavigate } from "react-router-dom";
import FormButton from "./FormButton";

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
                Muito obrigado por contribuir como doador da instituição!
            </h2>
            <img
                src="/img-doacao-livre-cat-2.png"
                alt="Cachorro agradecendo"
                className="w-48 mx-auto"
            />
            <h4 className="text-lg text-white/80 font-normal">
                Entraremos em contato com você pelo nosso Whatsapp, fique atento!
            </h4>

            <FormButton onClick={() => navigate("/")}>
                Retornar para a home
            </FormButton>
        </div>
    );
}
