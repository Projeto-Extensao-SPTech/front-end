import { useState, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import { FaRegClock, FaCalendarAlt, FaMapPin, FaCity, FaHome, FaGlobeAmericas, FaTimes, FaSortNumericUpAlt } from 'react-icons/fa';
import Button from '../components/ui/Button'
import { useAlertUtils } from '../hooks/useAlertUtils';
import { handleHttpFeedback } from '../js/utils/handleHttpFeedback';
import { api, setHeaderParam } from '../api/apiUserService';

export default function CadastroFeiraDeAdocao() {

  const alert = useAlertUtils();

  const [formData, setFormData] = useState({
    hora: '',
    data: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    pais: '',
    fotos: []
  });

  useEffect(() => {
    const fp = flatpickr("#calendario", {
      locale: Portuguese,
      dateFormat: "d/m/Y",
      minDate: "today",
      disableMobile: true,
      onChange: (dates) => {
        const dataFormatada = dates.length > 0 ? flatpickr.formatDate(dates[0], "d/m/Y") : '';
        setFormData(prev => ({ ...prev, data: dataFormatada }));
      },
    });

    return () => fp.destroy();
  }, []);

  const convertDateToISO = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFotos = (e) => {
    const novasFotos = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, fotos: [...prev.fotos, ...novasFotos] }));
    e.target.value = '';
  };

  const removerFoto = (index) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formDataToSend = new FormData();

    const fairData = {
      fair_date: convertDateToISO(formData.data),
      fair_hour: `${convertDateToISO(formData.data)}T${formData.hora}`,
      address: {
        zip_code: formData.cep,
        street: formData.rua,
        number: formData.numero ? parseInt(formData.numero) : null,
        complement: formData.complemento,
        city: formData.cidade,
        state: formData.estado,
        country: formData.pais
      }
    };

    formDataToSend.append(
      "fair",
      new Blob([JSON.stringify(fairData)], { type: "application/json" })
    );

    formData.fotos.forEach((foto) => {
      formDataToSend.append("imagem", foto);
    });


    try {

      const response = await api.post("/feiras/cadastrar", formDataToSend);

      handleHttpFeedback(alert, response, {
        successTitle: "Feira cadastrada com sucesso!",
        successMessage: `A feira de adoção na rua ${formData.rua} foi cadastrada com sucesso.`,
      });
    }
    catch (error) {
      handleHttpFeedback(alert, error.response, {
        errorTitle: "Erro ao cadastrar feira",
        errorMessage: "Não foi possível cadastrar a feira de adoção. Tente novamente mais tarde.",
      })

    }
  };

  const FotoPreview = ({ foto, index }) => (
    <div className="relative group">
      <img
        src={URL.createObjectURL(foto)}
        alt={`Preview ${index + 1}`}
        className="w-16 h-16 object-cover rounded-lg border-2 border-[#052759]"
      />
      <button
        type="button"
        onClick={() => removerFoto(index)}
        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaTimes className="text-xs" />
      </button>
    </div>
  );

  const InputComIcone = ({ icon: Icon, name, placeholder, type = "text" }) => (
    <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden">
      <span className="p-3 text-[#052759]">
        <Icon className="text-lg" />
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white"
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  );

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

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">

          <div className="space-y-6">

            <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden">
              <span className="p-3 text-[#052759]">
                <FaRegClock className="text-lg" />
              </span>
              <div className="flex items-center w-full pr-3 py-3">
                <span className="text-sm text-[#052759] font-medium pl-3 whitespace-nowrap">
                  Horário da Feira:
                </span>
                <input
                  type="time"
                  name="hora"
                  className="ml-2 text-sm text-[#052759] focus:outline-none font-medium bg-white flex-1"
                  value={formData.hora}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white">
              <span className="p-3 text-[#052759]">
                <FaCalendarAlt className="text-lg" />
              </span>
              <input
                id="calendario"
                name="data"
                placeholder="Data da Feira:"
                className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white"
                value={formData.data}
                readOnly
                onChange={handleChange}
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-[#052759]">
              <div className="text-center">
                <label htmlFor="fotos" className="cursor-pointer w-56 h-48 bg-gray-100 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-200 transition mx-auto">
                  {formData.fotos.length > 0 ? (
                    <>
                      <img src="/img-doacao-livre-upload-photo.png" alt="Câmera" className="w-20 h-20 mb-3" />
                      <span className="text-[#052759] font-bold text-sm">Adicionar mais fotos</span>
                    </>
                  ) : (
                    <>
                      <img src="/img-doacao-livre-upload-photo.png" alt="Câmera" className="w-20 h-20 mb-4" />
                      <span className="text-[#052759] font-bold text-sm">Clique para selecionar</span>
                    </>
                  )}
                </label>
                <input
                  id="fotos"
                  type="file"
                  accept="image/*"
                  onChange={handleFotos}
                  className="hidden"
                  multiple
                />
              </div>

              {formData.fotos.length > 0 && (
                <div className="mt-6">
                  <p className="text-[#052759] text-sm text-center mb-3">
                    {formData.fotos.length} foto(s) selecionada(s)
                  </p>
                  <div className="grid grid-cols-4 gap-3 max-h-32 overflow-y-auto p-3 border border-gray-300 rounded-lg">
                    {formData.fotos.map((foto, index) => (
                      <FotoPreview key={index} foto={foto} index={index} />
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[#052759] text-sm text-center mt-4">
                *Coloque aqui as fotos dos pets presentes na feira!
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <InputComIcone icon={FaMapPin} name="cep" placeholder="CEP:" />
            <InputComIcone icon={FaHome} name="rua" placeholder="Rua:" />
            <InputComIcone icon={FaMapPin} name="numero" placeholder="Número:" />
            <InputComIcone icon={FaHome} name="complemento" placeholder="Complemento:" />
            <InputComIcone icon={FaCity} name="cidade" placeholder="Cidade:" />
            <InputComIcone icon={FaCity} name="estado" placeholder="Estado:" />
            <InputComIcone icon={FaGlobeAmericas} name="pais" placeholder="Pais:" />

            <Button
              className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] hover:[#052759] text-sm mx-auto w-full py-4"
            >
              Cadastrar Feira
            </Button>
          </div>
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
