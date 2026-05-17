import { Instagram, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="hidden lg:block bg-[#052759] fixed bottom-0 left-0 right-0 z-40" style={{ fontFamily: "Montserrat, sans-serif" }}>
            <div className="h-px bg-gradient-to-r from-transparent via-[#FCAD0B] to-transparent" />

            <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
                <div>
                    <p className="text-[#FCAD0B] text-sm font-bold uppercase tracking-widest">
                        Abrigo Dog Feliz
                    </p>
                    <p className="text-white/30 text-[11px] mt-0.5 flex items-center gap-1 font-medium">
                        Transformando vidas com amor e adoção
                        <Heart className="w-3 h-3 text-[#FCAD0B]/60 fill-[#FCAD0B]/60" />
                    </p>
                </div>

                <p className="text-white/20 text-xs">
                    © {new Date().getFullYear()} Todos os direitos reservados
                </p>

                <a
                    href="https://www.instagram.com/abrigodogfeliz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/40 text-xs font-semibold
                        hover:text-[#FCAD0B] transition-colors duration-200 group"
                >
                    <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center
                        group-hover:border-[#FCAD0B]/40 transition-colors duration-200">
                        <Instagram className="w-3.5 h-3.5" />
                    </span>
                    @abrigodogfeliz
                </a>
            </div>
        </footer>
    );
}
