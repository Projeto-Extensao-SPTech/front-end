import Input from "./Input";
import LGPDConsent from "./LGPDConsent";
import { maskCEP } from "../../../js/utils/formatter";

export default function CadastroStep2({ formData, onChange, onMaskedChange, onSubmit, aceiteLGPD, onAceiteLGPDChange }) {
    return (
        <div className="w-full flex flex-col gap-2.5 items-center">
            <Input
                name="cep"
                placeholder="CEP"
                value={maskCEP(formData.cep)}
                onChange={onMaskedChange}
            />

            <Input
                name="estado"
                placeholder="Estado"
                value={formData.estado}
                onChange={onChange}
            />

            <Input
                name="municipio"
                placeholder="Município"
                value={formData.municipio}
                onChange={onChange}
            />

            <Input
                name="rua"
                placeholder="Rua"
                value={formData.rua}
                onChange={onChange}
            />

            <Input
                name="numero"
                placeholder="Número"
                value={formData.numero}
                onChange={onChange}
            />

            <Input
                name="complemento"
                placeholder="Complemento"
                value={formData.complemento}
                onChange={onChange}
            />

            <LGPDConsent
                aceite={aceiteLGPD}
                onChange={onAceiteLGPDChange}
            />

            <button
                onClick={onSubmit}
                disabled={!aceiteLGPD}
                className={`w-full h-10 md:h-11 mt-1 rounded-xl font-bold text-sm shadow-lg transition-all duration-200 ${aceiteLGPD
                    ? "bg-gradient-to-r from-[#052759] to-[#063a7a] text-[#FCAD0B] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    }`}
            >
                Finalizar Cadastro
            </button>
        </div>
    );
}