import { useAlertUtils } from "../../hooks/useAlertUtils";
import useCadastroFeira from "./hooks/useCadastroFeira";
import FormularioCadastroFeira from "./components/FormularioCadastroFeira";

export default function CadastroFeiraDeAdocao() {
    const alert = useAlertUtils();

    const {
        formData,
        fotos,
        handleChange,
        handleBuscaCep,
        handleFotosChange,
        removerFoto,
        handleSubmit,
    } = useCadastroFeira(alert);

    return (
        <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center py-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-[#052759] mb-2">
                    Cadastrar Feira de Adoção
                </h1>
                <p className="text-[#052759] text-sm">
                    Cadastre aqui as Feiras de Adoção que irão ocorrer nos próximos dias!
                </p>
            </div>

            <div className="w-11/12 max-w-5xl bg-[#052759] p-8 rounded-xl shadow-lg relative">
                <FormularioCadastroFeira
                    formData={formData}
                    onChange={handleChange}
                    onBuscaCep={handleBuscaCep}
                    fotos={fotos}
                    onFotosChange={handleFotosChange}
                    onRemoverFoto={removerFoto}
                    onSubmit={handleSubmit}
                />

                <img
                    src="/img-cadastro.png"
                    alt="Cachorrinho"
                    className="absolute bottom-0 left-0 w-40 max-h-32 object-contain pointer-events-none"
                />
            </div>
        </div>
    );
}
