import Input from "./Input";
import { maskCEP } from "../../../js/utils/formatter";

export default function CadastroStep2({ formData, onChange, onMaskedChange, onSubmit }) {
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

            <button
                onClick={onSubmit}
                className="w-full h-10 md:h-11 mt-1 bg-gradient-to-r from-[#052759] to-[#063a7a] text-[#FCAD0B] rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
                Finalizar Cadastro
            </button>
        </div>
    );
}
