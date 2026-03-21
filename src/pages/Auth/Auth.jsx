import { useAuth } from "./hooks/useAuth";
import { useRecuperacaoSenha } from "./hooks/useRecuperacaoSenha";
import AuthToggle from "./components/AuthToggle";
import StepIndicator from "./components/StepIndicator";
import TipoPessoaToggle from "./components/TipoPessoaToggle";
import LoginForm from "./components/LoginForm";
import CadastroStep1 from "./components/CadastroStep1";
import CadastroStep2 from "./components/CadastroStep2";
import { CardRecuperarSenha } from "../../components/sections/CardRecuperarSenha";
import { CardNovaSenha } from "../../components/sections/CardNovaSenha";
import { CardSenhaRedefinida } from "../../components/sections/CardSenhaRedefinida";
import { CardVerificarCodigo } from "../../components/sections/CardVerificarCodigo";

export default function Auth() {
    const {
        isLogin,
        cadastroStep,
        eyeOpen,
        setEyeOpen,
        tipoPessoa,
        formData,
        handleInputChange,
        handleInputMaskedChange,
        handleSubmit,
        switchMode,
        handleTipoPessoaChange,
    } = useAuth();

    const {
        etapaRecuperarSenha,
        enviarCodigo,
        verificarCodigo,
        atualizarSenha,
        voltarAoLogin,
        iniciarRecuperacao,
    } = useRecuperacaoSenha();

    const handleVoltarAoLogin = () => {
        voltarAoLogin();
        switchMode("login");
    };

    return (
        <div className="w-full min-h-[calc(100vh-96px)] flex flex-col bg-[#052759] overflow-hidden">
            <div className="flex-1 flex items-center justify-center relative overflow-hidden py-8 px-4">
                <img
                    src="/blob.svg"
                    alt="Blob"
                    className="hidden md:block w-[600px] absolute rotate-45 z-0 -left-40 -bottom-40 opacity-90"
                />
                <img
                    src="/blob.svg"
                    alt="Blob"
                    className="hidden md:block w-[700px] absolute rotate-12 z-10 -right-40 -bottom-40 opacity-80"
                />
                <img
                    src="/photos/dog-photo-1.svg"
                    alt="Dog"
                    className="hidden md:block w-64 absolute z-20 right-20 bottom-20"
                />

                <div className="w-full max-w-sm md:max-w-md backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl flex flex-col items-center p-4 md:p-5 z-30 relative border border-white/20 transition-all duration-500 max-h-[90vh] overflow-y-auto">
                    {etapaRecuperarSenha === 0 ? (
                        <>
                            <AuthToggle isLogin={isLogin} onSwitch={switchMode} />

                            {!isLogin && (
                                <>
                                    <StepIndicator currentStep={cadastroStep} />
                                    {cadastroStep === 1 && (
                                        <TipoPessoaToggle
                                            tipoPessoa={tipoPessoa}
                                            onChange={handleTipoPessoaChange}
                                        />
                                    )}
                                </>
                            )}

                            {isLogin && (
                                <LoginForm
                                    formData={formData}
                                    onChange={handleInputChange}
                                    eyeOpen={eyeOpen}
                                    setEyeOpen={setEyeOpen}
                                    onSubmit={handleSubmit}
                                    onForgotPassword={iniciarRecuperacao}
                                />
                            )}

                            {!isLogin && cadastroStep === 1 && (
                                <CadastroStep1
                                    formData={formData}
                                    tipoPessoa={tipoPessoa}
                                    onChange={handleInputChange}
                                    onMaskedChange={handleInputMaskedChange}
                                    eyeOpen={eyeOpen}
                                    setEyeOpen={setEyeOpen}
                                    onSubmit={handleSubmit}
                                />
                            )}

                            {!isLogin && cadastroStep === 2 && (
                                <CadastroStep2
                                    formData={formData}
                                    onChange={handleInputChange}
                                    onMaskedChange={handleInputMaskedChange}
                                    onSubmit={handleSubmit}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {etapaRecuperarSenha === 1 && (
                                <CardRecuperarSenha
                                    telefone={formData.telefone}
                                    onTelefoneChange={(val) =>
                                        handleInputMaskedChange({
                                            target: { name: "telefone", value: val },
                                        })
                                    }
                                    onSubmit={() => enviarCodigo(formData.telefone)}
                                />
                            )}
                            {etapaRecuperarSenha === 2 && (
                                <CardVerificarCodigo onSubmit={verificarCodigo} />
                            )}
                            {etapaRecuperarSenha === 3 && (
                                <CardNovaSenha
                                    onSubmit={(novaSenha) =>
                                        atualizarSenha(formData.telefone, novaSenha)
                                    }
                                />
                            )}
                            {etapaRecuperarSenha === 4 && (
                                <CardSenhaRedefinida onIrParaLogin={handleVoltarAoLogin} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
