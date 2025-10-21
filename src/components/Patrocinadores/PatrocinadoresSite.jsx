// src/components/Patrocinadores.js
import NavbarSite from "../NavbarSite"
import { Apoiar } from "./Apoiar"
import { Informacoes } from "./Informacoes"
import { useState } from "react"

export function PatrocinadoresSite() {
    const [telaAtual, setTelaAtual] = useState("apoio")

    function handleTelas() {
        if (telaAtual === "apoio") {
            return <Apoiar />
        }
        if (telaAtual === "info") {
            return <Informacoes />
        }
        return null
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarSite />
            {/* container flex principal: imagem (esquerda) + painel (direita) */}
            <div className="flex flex-1 relative min-h-0">
                <div className="flex-1 relative">
                    <img src="./img-dog.svg" alt="" className="w-1/2 absolute bottom-0 right-3" />
                </div>

                {/* painel direito (azul) deve ser irmão do flex-1 acima */}
                <div className="flex flex-col w-1/2 bg-[#052759] text-white border-l rounded-l-3xl p-10 items-center gap-6">
                    {handleTelas()}
                </div>
            </div>
        </div>
    )
}

export default PatrocinadoresSite
