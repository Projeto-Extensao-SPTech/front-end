import { useNavigate } from "react-router-dom";
import useScrollReveal from "./hooks/useScrollReveal";
import SecaoPix from "./components/SecaoPix";
import CardAjuda from "./components/CardAjuda";

export default function Ajudar() {
    const navigate = useNavigate();

    const [pixRef, pixVisible] = useScrollReveal(0.1);
    const [card1Ref, card1Visible] = useScrollReveal(0.1);
    const [card2Ref, card2Visible] = useScrollReveal(0.1);

    return (
        <div className="min-h-screen bg-[#052759] text-gray-800 relative">
            <main className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-white drop-shadow-md mb-1">
                        Ajude e transforme vidas
                    </h1>
                    <p className="text-lg text-white/90">
                        Com amor, carinho e generosidade.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                    <SecaoPix pixRef={pixRef} pixVisible={pixVisible} />

                    <section className="lg:w-3/5 flex flex-col gap-4">
                        <CardAjuda
                            cardRef={card1Ref}
                            cardVisible={card1Visible}
                            imagem="/img-secao-patroc.png"
                            titulo="Quero ser patrocinador"
                            descricao="Contribua regularmente para vacinas, alimentação e cuidados essenciais."
                            onSaibaMais={() => navigate("/patrocinadores")}
                        />

                        <CardAjuda
                            cardRef={card2Ref}
                            cardVisible={card2Visible}
                            imagem="/img-secao-doar.png"
                            titulo="Quero doar produtos"
                            descricao="Doe ração, remédios, tapetes higiênicos e outros itens essenciais para nossos animais."
                            onSaibaMais={() => navigate("/doacao-livre")}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}
