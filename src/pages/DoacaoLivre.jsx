import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/apiUserService";
import { useAlertUtils } from "../hooks/useAlertUtils";

function InputField({ field, value, onChange }) {
  return (
    <div
      className={`flex flex-col text-left ${field.fullWidth ? "w-full" : "w-[48%]"
        }`}
    >
      <label
        htmlFor={field.name}
        className="text-white mb-1 font-medium text-sm"
      >
        {field.label}:
      </label>

      {field.component === "select" ? (
        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={onChange}
          className="rounded-lg w-full text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm"
        >
          <option value="">Selecione...</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.component === "textarea" ? (
        <textarea
          id={field.name}
          name={field.name}
          value={value}
          onChange={onChange}
          className="rounded-lg w-full h-16 text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm resize-none"
          placeholder="Descreva o estado do item"
        />
      ) : (
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          value={value}
          onChange={onChange}
          className="rounded-lg w-full text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm"
        />
      )}
    </div>
  );
}

function FormButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-64 bg-[#FFB114] text-white rounded-lg py-2 mt-4 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
    >
      {children}
    </button>
  );
}

function RadioOption({ id, checked, onChange, label }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="radio"
        name="envio"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="text-white">
        {label}
      </label>
    </div>
  );
}

function Informacoes({ data, updateData, onNext }) {
  const storedData = sessionStorage.getItem("USER_DATA");
  const alertUtils = useAlertUtils();
  const fields = [
    {
      label: "Nome do Produto",
      type: "text",
      name: "nomeProduto",
      component: "input",
      fullWidth: true,
    },
    {
      label: "Categoria",
      type: "select",
      name: "categoria",
      component: "select",
      options: [
        "Alimento",
        "Medicamento",
        "Vestimentas",
        "Materiais de Construção",
      ],
      fullWidth: true,
    },
    {
      label: "Quantidade",
      type: "number",
      name: "quantidade",
      component: "input",
      fullWidth: false,
    },
    {
      label: "Estado",
      type: "text",
      name: "estado",
      component: "select",
      options: ["Novo", "Usado"],
      fullWidth: false,
    },
    {
      label: "Descrição",
      type: "text",
      name: "descricao",
      component: "textarea",
      fullWidth: true,
    },
  ];

  const handleChange = (e) => updateData(e.target.name, e.target.value);

  return (
    <div className="text-center space-y-6 w-full">
      <h2 className="text-2xl text-white font-bold">Doação Livre</h2>
      <h3 className="text-lg text-white/80 font-normal">
        Preencha as informações do item que deseja doar
      </h3>

      <form className="flex flex-wrap w-full gap-4 justify-between">
        {fields.map((f) => (
          <InputField
            key={f.name}
            field={f}
            value={data[f.name]}
            onChange={handleChange}
          />
        ))}
      </form>

      <FormButton
        onClick={(e) => {
          e.preventDefault();

          if (
            !data.nomeProduto ||
            !data.categoria ||
            !data.quantidade ||
            !data.estado ||
            !data.descricao
          ) {
            return alertUtils.warn(
              "Por favor, preencha todos os campos antes de avançar!"
            );
          }

          if (storedData === null) {
            alertUtils.close();
            alertUtils.warn("Faça o login", "Por favor, faça login ou cadastre-se.");
            return;
          }

          onNext();
        }}
      >
        Avançar
      </FormButton>
    </div>
  );
}

function EnviarFoto({ data, updateData, onNext }) {
  const alertUtils = useAlertUtils();
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      updateData("foto", e.target.files[0]);
    }
  };

  return (
    <div className="text-center space-y-6 w-full">
      <h2 className="text-2xl text-white font-bold">Doação Livre</h2>
      <h3 className="text-lg text-white/80 font-normal">
        Agora, envie uma foto do item
      </h3>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        <label
          htmlFor="foto"
          className="cursor-pointer w-72 h-64 bg-gray-200 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-300 transition"
        >
          {data.foto ? (
            <img
              src={URL.createObjectURL(data.foto)}
              alt="Pré-visualização"
              className="w-full h-full object-contain rounded-2xl"
            />
          ) : (
            <>
              <img
                src="/img-doacao-livre-upload-photo.png"
                alt="Ícone de câmera"
                className="w-24 h-24 mb-10"
              />
              <span className="text-[#052759] font-bold">
                Clique aqui para selecionar
              </span>
            </>
          )}
        </label>
        <input
          id="foto"
          name="foto"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="text-lg text-white/80 font-normal">
        *Essa é apenas uma pré-visualização, o tamanho e a proporção originais
        serão mantidos
      </p>


      <FormButton
        onClick={(e) => {
          e.preventDefault();

          if (!data.foto) {
            return alertUtils.warn(
              "Erro ao processar foto",
              "Por favor, selecione uma foto do item antes de avançar!"
            );
          }

          onNext();
        }}
      >
        Avançar
      </FormButton>
    </div>
  );
}

function Envio({ data, updateData, onNext }) {
  const alertUtils = useAlertUtils();
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [freightInfo, setFreightInfo] = useState(null);

  const cep_fixo_usuario = "01414-001";

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const storedData = sessionStorage.getItem("USER_DATA");
        const token = storedData ? JSON.parse(storedData).token : null;
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        const response = await api.get("/collection-centers", config);
        setCollectionPoints(response.data);
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      }
    };
    fetchPoints();
  }, []);

  const handleChange = (e) => updateData(e.target.name, e.target.value);

  const handleRadioChange = (tipo) => {
    updateData("tipoEnvio", tipo);
    setFreightInfo(null);
    if (tipo === "envio") updateData("pontoColetaId", null);
    if (tipo === "ponto de coleta") {
      updateData("cep_origem", cep_fixo_usuario);
      updateData("cep_destino", collectionPoints[0]?.address.zipCode || "");
      setFreightInfo(null);
    }
  };

  const handleCalculateFreight = async () => {
    if (!data.cep_origem || !data.cep_destino) {
      alertUtils.warn("Atenção", "Preencha os dois CEPs para calcular.");
      return;
    }
    const storedData = sessionStorage.getItem("USER_DATA");
    const token = storedData ? JSON.parse(storedData).token : null;
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    alertUtils.loading("Calculando...", "Consultando opções de entrega");

    try {
      const response = await api.get(
        `/shipment/calculate_origem_destination?origin=${data.cep_origem}&destination=${data.cep_destino}`,
        config
      );

      setFreightInfo(response.data);

      alertUtils.close();

      if (response.data.price == null || response.data.price === 0) {
        return alertUtils.warn(
          "Aviso!",
          "Não foi possível calcular o frete, mas você pode prosseguir normalmente. O valor será confirmado depois."
        );
      }

    } catch (error) {
      alertUtils.close();
      alertUtils.error("Não foi possível calcular o frete", "Tente novamente mais tarde.");
    }
  };

  const handleManualFreight = (e) => {
    e.preventDefault();
    if (!data.cep_origem || !data.cep_destino) {
      alertUtils.warn("Atenção", "Preencha os dois CEPs.");
      return;
    }
    handleCalculateFreight(data.cep_origem, data.cep_destino);
  }

  const handlePointClick = (point) => {
    updateData("pontoColetaId", point.id);
    updateData("cep_destino", point.address.zipCode);

    handleCalculateFreight(cep_fixo_usuario, point.address.zipCode);
  };


  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storedData = sessionStorage.getItem("USER_DATA");

      if (!storedData) {
        alertUtils.warn("Sessão expirada. Por favor, faça login novamente.");
        setLoading(false);
        return;
      }
      const token = JSON.parse(storedData).token;

      const formData = new FormData();

      formData.append("name", data.nomeProduto);
      formData.append("type", data.categoria);
      formData.append("amount", parseInt(data.quantidade));
      formData.append("state", data.estado);
      formData.append("description", data.descricao);
      formData.append(
        "shippingMethod",
        data.tipoEnvio === "envio" ? "Correios" : "Ponto de Coleta"
      );

      if (data.pontoColetaId) {
        formData.append("collectionCenterId", data.pontoColetaId);
      }

      if (data.foto) {
        formData.append("image", data.foto);
      }

      await api.post("/donations", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alertUtils.success("Sucesso!", "Doação realizada com sucesso!");

      onNext();
    } catch (error) {
      console.error("Erro no envio:", error);
      const msg = error.response?.data || "Erro desconhecido.";
      alertUtils.error(
        "Erro ao enviar doação: " +
        (typeof msg === "object" ? JSON.stringify(msg) : msg)
      );
    } finally {
      setLoading(false);
    }
  };


  const FreightResultCard = () => {
    if (!freightInfo) return null;
    return (
      <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg border border-white/30 animate-fade-in mt-4 w-full">
        <p className="text-white font-bold text-lg">
          {data.tipoEnvio === "envio" ? "Estimativa de Entrega" : "Custo Estimado de Deslocamento"}
        </p>
        <div className="flex gap-8 mt-2">
          <div className="text-center">
            <span className="block text-xs text-white/70">Valor</span>
            <span className="text-[#FFB114] font-bold text-xl">
              {Number(freightInfo.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-xs text-white/70">Prazo</span>
            <span className="text-white font-bold text-xl">
              {freightInfo.deliveryTime} dias
            </span>
          </div>
        </div>
        <p className="text-xs text-white/50 mt-2">
          {data.tipoEnvio === "ponto de coleta" && `CEP do Usuário (${cep_fixo_usuario})`}
        </p>
      </div>
    );
  };

  return (
    <div className="text-center space-y-6 w-full">
      <h2 className="text-2xl text-white font-bold">Doação Livre</h2>
      <p className="text-lg text-white/80 font-normal">
        Selecione um método de envio para que possamos receber a sua doação
      </p>

      <form className="flex flex-col w-full gap-4">
        <div className="flex items-center justify-center text-left gap-4">
          <RadioOption
            id="pontoColeta"
            checked={data.tipoEnvio === "ponto de coleta"}
            onChange={() => handleRadioChange("ponto de coleta")}
            label="Levar ao ponto de coleta"
          />
          <RadioOption
            id="envio"
            checked={data.tipoEnvio === "envio"}
            onChange={() => handleRadioChange("envio")}
            label="Enviar para o abrigo"
          />
        </div>

        {data.tipoEnvio === "envio" && (
          <div className="flex flex-wrap gap-4 mt-4">
            <InputField
              field={{
                label: "CEP Origem",
                name: "cep_origem",
                component: "input",
                fullWidth: true,
              }}
              value={data.cep_origem}
              onChange={handleChange}
            />
            <InputField
              field={{
                label: "CEP Destino (Abrigo)",
                name: "cep_destino",
                component: "input",
                fullWidth: true,
              }}
              value={data.cep_destino}
              onChange={handleChange}
            />


            <div className="w-full flex justify-center">
              <button onClick={handleManualFreight} className="text-white text-sm underline hover:text-[#FFB114] transition-colors">
                Calcular Frete e Prazo
              </button>
            </div>

            <FreightResultCard />

            <div className="w-full flex justify-center mt-4">
              <FormButton onClick={handleFinalSubmit} disabled={loading}>
                {loading ? "Enviando..." : "Finalizar Doação"}
              </FormButton>
            </div>
          </div>
        )}



        {data.tipoEnvio === "ponto de coleta" && (
          <>
            <div className="flex justify-center flex-col items-center mt-4 w-full">
              <p className="text-lg text-white/80 font-normal mb-2">
                Escolha um ponto de coleta
              </p>
              <div className="flex flex-col gap-2 w-full max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FFB114] scrollbar-track-[#E5E7EB] rounded-md p-2">
                {collectionPoints.length === 0 && (
                  <p className="text-white">Carregando pontos...</p>
                )}
                {collectionPoints.map((p) => (
                  <div
                    key={p.id}
                    // onClick={() => updateData("pontoColetaId", p.id)}
                    onClick={() => handlePointClick(p)}
                    className={`flex flex-col items-start rounded-md p-3 w-full transition-colors duration-200 ${data.collectionCenterId === p.id
                      ? "bg-white border-2 border-[#FFB114]"
                      : "bg-[#d9d9d9] hover:bg-white"
                      }`}
                  >
                    <p className="text-[#052759] font-bold">{p.name}</p>
                    {p.address && (
                      <p className="text-[#052759] font-normal text-sm">
                        {p.address.street}, {p.address.number} -{" "}
                        {p.address.city}/{p.address.state}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <FreightResultCard />

            <div className="flex justify-center mt-4">
              <FormButton onClick={handleFinalSubmit} disabled={loading}>
                {loading ? "Enviando..." : "Finalizar Doação"}
              </FormButton>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

function Agradecimento() {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6 w-full">
      <img
        src="/icons/verified1-icon.svg"
        alt="Ícone de verificação"
        className="w-12 h-12 mx-auto"
      />
      <h2 className="text-xl text-white font-bold">
        Muito obrigado por contribuir como doador da instituição!
      </h2>
      <img
        src="/img-doacao-livre-cat-2.png"
        alt="Cachorro agradecendo"
        className="w-48 mx-auto"
      />
      <h4 className="text-lg text-white/80 font-normal">
        Entraremos em contato com você pelo nosso Whatsapp, fique atento!
      </h4>

      <FormButton onClick={() => navigate("/")}>
        Retornar para a home
      </FormButton>
    </div>
  );
}

function Identificador({ steps, currentIndex }) {
  return (
    <nav className="flex flex-col items-start gap-1 py-4">
      {steps.map((step, i) => {
        const active = i === currentIndex;
        const done = i < currentIndex;

        return (
          <div key={step.key} className="flex items-start gap-3 z-10">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 border-2 ${done || active
                  ? "bg-[#052759] border-[#052759] text-white"
                  : "bg-white border-gray-400 text-gray-400"
                  }`}
              />
              {i < steps.length - 1 && (
                <div
                  className={`w-[2px] mt-1 transition-colors duration-200 ${i < currentIndex ? "bg-[#052759]" : "bg-gray-300"
                    }`}
                  style={{ height: "1.5rem" }}
                />
              )}
            </div>
            <span
              className={`text-sm ${active
                ? "text-[#052759] font-semibold"
                : done
                  ? "text-[#052759] font-medium"
                  : "text-gray-600"
                }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

export default function DoacaoLivre() {
  const [step, setStep] = useState(0);
  // const nextStep = () => setStep(prev => Math.min(prev + 1, 3));

  const [formData, setFormData] = useState({
    nomeProduto: "",
    categoria: "",
    quantidade: "",
    estado: "",
    descricao: "",
    foto: null, // Guarda o arquivo, mas o backend atual ainda não salva
    tipoEnvio: "",
    pontoColetaId: null,
    cep_origem: "",
    cep_destino: "09609-000", // Fixo do abrigo
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const nextStep = () => setStep((prev) => prev + 1);

  const steps = [
    { key: "sobre", label: "Sobre a doação" },
    { key: "foto", label: "Foto do item" },
    { key: "entrega", label: "Entrega" },
    { key: "finalizacao", label: "Finalização" },
  ];

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex flex-col w-1/2 bg-[#052759] text-white border-l rounded-r-3xl items-center justify-center p-8 gap-6">
        <div className="w-full max-w-md">
          {step === 0 && (
            <Informacoes
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
            />
          )}
          {step === 1 && (
            <EnviarFoto
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <Envio
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
            />
          )}
          {step === 3 && <Agradecimento />}
        </div>
      </div>

      <div className="flex-1 relative bg-[#EFEFEF] flex items-center">
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <Identificador steps={steps} currentIndex={step} />
        </div>
        <img
          src="/img-doacao-livre-cat.png"
          alt="Gato"
          className="w-2/3 absolute bottom-0 right-0 opacity-90"
        />
      </div>
    </div>
  );
}
