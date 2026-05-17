import { useAlertUtils } from "../../hooks/useAlertUtils";
import useCadastroFeira from "./hooks/useCadastroFeira";
import FormularioCadastroFeira from "./components/FormularioCadastroFeira";

export default function CadastroFeiraDeAdocao() {
    const alert = useAlertUtils();

    const {
        formData,
        fotos,
        errors,
        handleChange,
        handleBuscaCep,
        handleFotosChange,
        removerFoto,
        handleSubmit,
    } = useCadastroFeira(alert);

    return (
        <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center py-4">
            <div className="text-center mb-4 mt-6">
                <h1 className="text-2xl font-black text-[#052759] mb-1">
                    Cadastrar Feira de Adoção
                </h1>
                <p className="text-[#052759] text-sm">
                    Cadastre aqui as Feiras de Adoção!
                </p>
            </div>

            <div className="w-11/12 max-w-5xl bg-[#052759] p-6 rounded-xl shadow-lg relative">
                <FormularioCadastroFeira
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                    onBuscaCep={handleBuscaCep}
                    fotos={fotos}
                    onFotosChange={handleFotosChange}
                    onRemoverFoto={removerFoto}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}