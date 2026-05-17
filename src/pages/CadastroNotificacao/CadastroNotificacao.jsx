import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAlertUtils } from "../../hooks/useAlertUtils";
import useCadastroNotificacao from "./hooks/useCadastroNotificacao";
import FormularioNotificacao from "./components/FormularioNotificacao";
import AgendadorNotificacoes from "./components/AgendadorNotificacoes";

export default function CadastroNotificacao() {
    const location = useLocation();
    const alert = useAlertUtils();

    useEffect(() => {
        console.log('✅ CadastroNotificacao MONTADO');
        return () => {
            console.log('❌ CadastroNotificacao DESMONTADO');
        };
    }, []);

    const {
        form,
        notificacoes,
        feiras,
        datasAgendadas,
        atualizarForm,
        atualizarNotificacao,
        adicionarNotificacao,
        removerNotificacao,
        enviarFormulario,
        valorDataInput,
    } = useCadastroNotificacao(alert);

    return (
        <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center py-8 pt-14">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-[#052759] mb-2">
                    Cadastrar Notificação
                </h1>
                <p className="text-[#052759] text-sm">
                    Existe algum evento ou necessidade? Notifique aqui seus usuários
                    cadastrados!
                </p>
            </div>

            <div className="w-11/12 max-w-5xl bg-[#052759] p-8 rounded-xl shadow-lg relative">
                <form
                    onSubmit={enviarFormulario}
                    className="grid lg:grid-cols-2 gap-8 items-start"
                >
                    <FormularioNotificacao
                        form={form}
                        feiras={feiras}
                        onChange={atualizarForm}
                        valorDataInput={valorDataInput}
                    />

                    <AgendadorNotificacoes
                        form={form}
                        datasAgendadas={datasAgendadas}
                        notificacoes={notificacoes}
                        onAdicionar={adicionarNotificacao}
                        onRemover={removerNotificacao}
                        onAtualizar={atualizarNotificacao}
                    />
                </form>

                <img
                    src="/img-cadastro.png"
                    alt="Cachorrinho"
                    className="absolute bottom-0 left-0 w-40 max-h-32 object-contain pointer-events-none"
                />
            </div>
        </div>
    );
}