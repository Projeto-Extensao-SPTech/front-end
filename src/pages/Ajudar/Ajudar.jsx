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
        <div
            className="min-h-screen relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #010e22 0%, #052759 55%, #062f6e 100%)" }}
        >
            <div className="absolute pointer-events-none" style={{
                top: "-120px", left: "-100px", width: "380px", height: "380px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(79,163,224,0.13) 0%, transparent 70%)"
            }} />
            <div className="absolute pointer-events-none" style={{
                bottom: "-60px", right: "-80px", width: "300px", height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(245,158,11,0.09) 0%, transparent 70%)"
            }} />

            <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 flex flex-col gap-14">

                <header className="text-center">
                    <h1
                        className="font-extrabold text-white tracking-tight"
                        style={{ fontSize: "clamp(28px, 5vw, 40px)", marginBottom: "12px" }}
                    >
                        Ajude e transforme vidas
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "15px", maxWidth: "300px", margin: "0 auto", lineHeight: 1.65 }}>
                        Escolha como você quer fazer a diferença para nossos animais.
                    </p>
                    <div style={{ marginTop: "18px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                        <div style={{ height: "1px", width: "48px", background: "rgba(255,255,255,0.15)" }} />
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <div style={{ height: "1px", width: "48px", background: "rgba(255,255,255,0.15)" }} />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                    <CardAjuda
                        cardRef={card1Ref}
                        cardVisible={card1Visible}
                        bgInicio="#fffbeb"
                        bgFim="#fef3c7"
                        icone={
                            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        }
                        titulo="Quero ser patrocinador"
                        descricao="Contribua regularmente para vacinas, alimentação e cuidados essenciais dos nossos animais."
                        onSaibaMais={() => navigate("/patrocinadores")}
                        accentColor="#f59e0b"
                    />
                    <SecaoPix pixRef={pixRef} pixVisible={pixVisible} />
                    <CardAjuda
                        cardRef={card2Ref}
                        cardVisible={card2Visible}
                        bgInicio="#f0fdf4"
                        bgFim="#dcfce7"
                        icone={
                            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 12v10H4V12"/>
                                <path d="M22 7H2v5h20V7z"/>
                                <path d="M12 22V7"/>
                                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                            </svg>
                        }
                        titulo="Quero doar produtos"
                        descricao="Doe ração, remédios, tapetes higiênicos e outros itens essenciais para nossos animais."
                        onSaibaMais={() => navigate("/doacao-livre")}
                        accentColor="#22c55e"
                    />
                </div>

            </main>
        </div>
    );
}
