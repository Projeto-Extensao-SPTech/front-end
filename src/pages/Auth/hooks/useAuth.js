import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import { buscarCep } from "../../../api/apiCep";
import { cadastroUser, loginUser } from "../services/authService";
import { validarCampos } from "../services/validators";
import { maskCPF, maskCNPJ, maskTelefone, maskCEP } from "../../../js/utils/formatter";

export function useAuth() {
    const alertUtils = useAlertUtils();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialMode = searchParams.get("mode") || "login";

    const [isLogin, setIsLogin] = useState(initialMode === "login");
    const [cadastroStep, setCadastroStep] = useState(1);
    const [eyeOpen, setEyeOpen] = useState(false);
    const [tipoPessoa, setTipoPessoa] = useState("PF");

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        documento: "",
        telefone: "",
        cep: "",
        estado: "",
        municipio: "",
        rua: "",
        numero: "",
        complemento: "",
    });

    // Sincronizar com URL params
    useEffect(() => {
        const mode = searchParams.get("mode") || "login";
        setIsLogin(mode === "login");
    }, [searchParams]);

    // Buscar CEP automaticamente
    useEffect(() => {
        const cepLimpo = formData.cep.replace(/\D/g, "");
        if (cepLimpo.length === 8) {
            const buscaEndereco = async () => {
                try {
                    const data = await buscarCep(cepLimpo);

                    setFormData((prev) => ({
                        ...prev,
                        rua: data.logradouro,
                        municipio: data.localidade,
                        estado: data.uf,
                    }));
                } catch {
                    setFormData((prev) => ({
                        ...prev,
                        rua: "",
                        municipio: "",
                        estado: "",
                    }));
                }
            };

            buscaEndereco();
        }
    }, [formData.cep]);

    // Reset ao mudar modo
    useEffect(() => {
        setIsLogin(initialMode === "login");
        setCadastroStep(1);
        setTipoPessoa("PF");
    }, [initialMode]);

    const handleInputMaskedChange = (e) => {
        const { name, value } = e.target;

        let masked = value;
        let clean = value.replace(/\D/g, "");

        if (name === "documento") {
            masked = tipoPessoa === "PF" ? maskCPF(value) : maskCNPJ(value);
            clean = clean.substring(0, tipoPessoa === "PF" ? 11 : 14);
        }

        if (name === "telefone") {
            masked = maskTelefone(value);
            clean = clean.substring(0, 11);
        }

        if (name === "cep") {
            masked = maskCEP(value);
            clean = clean.substring(0, 8);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: clean,
        }));

        e.target.value = masked;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin && cadastroStep === 1) {
            const erro = validarCampos(formData, tipoPessoa);
            if (
                erro &&
                ["nome", "email", "senha", "cpf", "telefone"].includes(erro.campo)
            ) {
                alertUtils.error(`Erro no campo ${erro.campo}`, erro.mensagem);
                return;
            }

            setCadastroStep(2);
            return;
        }

        if (!isLogin && cadastroStep === 2) {
            const erro = validarCampos(formData, tipoPessoa);
            if (erro) {
                alertUtils.error(`Erro no campo ${erro.campo}`, erro.mensagem);
                return;
            }
        }

        try {
            if (isLogin) {
                await loginUser(formData, alertUtils);
                navigate("/");
            } else {
                await cadastroUser(formData, tipoPessoa, alertUtils);
                navigate("/auth?mode=login");
            }
        } catch (error) {
            alertUtils.error(
                "Erro!",
                error.message || "Ocorreu um erro. Tente novamente."
            );
        }
    };

    const switchMode = (mode) => {
        setIsLogin(mode === "login");
        setCadastroStep(1);
        setTipoPessoa("PF");
        setFormData({
            nome: "",
            email: "",
            senha: "",
            documento: "",
            telefone: "",
            cep: "",
            estado: "",
            municipio: "",
            rua: "",
            numero: "",
            complemento: "",
        });
        navigate(`/auth?mode=${mode}`);
    };

    const handleTipoPessoaChange = (novoTipo) => {
        setTipoPessoa(novoTipo);
        setFormData((prev) => ({
            ...prev,
            nome: "",
            documento: "",
        }));
    };

    return {
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
    };
}
