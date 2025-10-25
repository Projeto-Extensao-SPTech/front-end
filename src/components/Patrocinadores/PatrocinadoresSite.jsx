import NavbarSite from "../navbar/NavbarSite"
import { Apoiar } from "./Apoiar"
import { Informacoes } from "./Informacoes"
import { Descricao } from "./Descricao"
import { Agradecimento } from "./Agradecimento"
import { PatrocinadoresProvider, usePatrocinadores } from "../../contexts/PatrocinadoresContext"
import { Indicador } from "../Patrocinadores/Indicator";


function InnerPatrocinadores() {
    const { telaAtual } = usePatrocinadores();

    function handleTelas() {
        if (telaAtual === "apoio") return <Apoiar />
        if (telaAtual === "info") return <Informacoes />
        if(telaAtual === "descricao") return <Descricao />
        if(telaAtual === "agradecimento") return <Agradecimento />
        
        return null
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarSite />
            <div className="flex flex-1 relative min-h-0">
                <div className="flex-1 relative">
                    <div className="absolute left-8 top-16">
                        <Indicador />
                    </div>

                    <img src="./img-dog.svg" alt="" className="w-1/2 absolute bottom-0 right-3" />
                </div>

                <div className="flex flex-col w-1/2 bg-[#052759] text-white border-l rounded-l-3xl p-10 items-center gap-6">
                    {handleTelas()}
                </div>
            </div>
        </div>
    )
}

export function PatrocinadoresSite() {
    return (
        <PatrocinadoresProvider>
            <InnerPatrocinadores />
        </PatrocinadoresProvider>
    )
}

export default PatrocinadoresSite
