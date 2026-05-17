import { useState } from "react";

const PIX_KEY = "8242ejwjd32847aisf";

export default function SecaoPix({ pixRef, pixVisible }) {
    const [copied, setCopied] = useState(false);

    const handleCopyPix = () => {
        navigator.clipboard.writeText(PIX_KEY);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    };

    return (
        <div
            ref={pixRef}
            className="rounded-[20px] overflow-hidden flex flex-col justify-between p-8"
            style={{
                opacity: pixVisible ? 1 : 0,
                transform: pixVisible ? "translateY(0)" : "translateY(2rem)",
                transition: "opacity 700ms ease, transform 700ms ease",
                background: "linear-gradient(160deg, #031c47 0%, #052759 100%)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.38)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            <div>
                <p className="text-[12px] uppercase tracking-widest font-medium mb-2"
                    style={{ color: "rgba(255,255,255,0.4)" }}>
                    Doe via PIX
                </p>
                <p className="text-white text-lg font-semibold leading-snug">
                    Ajude com qualquer valor
                </p>
            </div>

            <div className="text-center py-7">
                <div className="flex items-start justify-center gap-1">
                    <span className="text-[16px] font-semibold mt-2.5" style={{ color: "#fbbf24" }}>R$</span>
                    <span className="text-[64px] font-extrabold leading-none" style={{ color: "#fbbf24" }}>50</span>
                </div>
                <p className="text-[12px] mt-2" style={{ color: "rgba(255,255,255,0.28)" }}>
                    sugerido · ≈ 1 saco de ração para ~15 cães
                </p>
            </div>

            <div>
                <p className="text-[11px] uppercase tracking-[0.08em] font-medium mb-2.5"
                    style={{ color: "rgba(255,255,255,0.35)" }}>
                    Chave PIX
                </p>
                <div
                    className="flex items-center gap-2 rounded-xl px-3.5 py-3"
                    style={{
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    <code className="flex-1 text-[12px] font-mono truncate"
                        style={{ color: "rgba(255,255,255,0.6)" }}>
                        {PIX_KEY}
                    </code>
                    <button
                        onClick={handleCopyPix}
                        className="shrink-0 text-[12px] font-semibold px-3.5 py-1.5 rounded-lg border-none outline-none cursor-pointer transition-all duration-300"
                        style={{
                            background: copied ? "#22c55e" : "#fbbf24",
                            color: copied ? "#fff" : "#78350f",
                        }}
                    >
                        {copied ? "✓ Copiado" : "Copiar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
