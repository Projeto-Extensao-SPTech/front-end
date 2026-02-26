import Input from "./Input";
import PasswordInput from "./PasswordInput";
import { maskCPF, maskCNPJ, maskTelefone } from "../../../js/utils/formatter";

export default function CadastroStep1({
    formData,
    tipoPessoa,
    onChange,
    onMaskedChange,
    eyeOpen,
    setEyeOpen,
    onSubmit,
}) {
    return (
        <div className="w-full flex flex-col gap-2.5 items-center">
            <Input
                name="nome"
                placeholder={tipoPessoa === "PF" ? "Nome completo" : "Razão Social"}
                icon="/icons/user-icon.svg"
                value={formData.nome}
                onChange={onChange}
            />

            <Input
                name="documento"
                placeholder={tipoPessoa === "PF" ? "CPF" : "CNPJ"}
                icon="/icons/cpf-icon.svg"
                value={
                    tipoPessoa === "PF"
                        ? maskCPF(formData.documento)
                        : maskCNPJ(formData.documento)
                }
                onChange={onMaskedChange}
            />

            <Input
                name="email"
                placeholder="Email"
                icon="/icons/email-icon.svg"
                type="email"
                value={formData.email}
                onChange={onChange}
            />

            <PasswordInput
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={onChange}
                eyeOpen={eyeOpen}
                setEyeOpen={setEyeOpen}
            />

            <Input
                name="telefone"
                placeholder="Telefone"
                icon="/icons/phone-icon.svg"
                value={maskTelefone(formData.telefone)}
                onChange={onMaskedChange}
            />

            <button
                onClick={onSubmit}
                className="w-full h-10 md:h-11 mt-1 bg-gradient-to-r from-[#052759] to-[#063a7a] text-[#FCAD0B] rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
                Continuar
            </button>
        </div>
    );
}
