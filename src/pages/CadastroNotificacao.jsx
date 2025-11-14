import { useState, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import { FaRegClock, FaCalendarAlt, FaMapPin, FaCity, FaHome, FaGlobeAmericas, FaTimes } from 'react-icons/fa';
import Button from '../components/ui/Button'

export default function CadastroNotificacao() {
    const [formData, setFormData] = useState({
        hora: '',
        data: '',
        cep: '',
        estado: '',
        cidade: '',
        rua: '',
        numero: '',
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

        const dadosParaEnviar = {
            ...formData,
            fotos: formData.fotos
        };

        try {
            const response = await fetch('/api/feiras-adocao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (response.ok) {
                alert('Feira cadastrada com sucesso!');
                setFormData({
                    hora: '', data: '', cep: '', estado: '', cidade: '', rua: '', numero: '', fotos: []
                });
            } else {
                alert('Erro ao cadastrar feira');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão');
        }
    };

    const FotoPreview = ({ foto, index }) => (
        <div className="relative group">
            <img
                src={URL.createObjectURL(foto)}
                alt={`Preview ${index + 1}`}
                className="w-12 h-12 object-cover rounded-lg border-2 border-[#052759]"
            />
            <button
                type="button"
                onClick={() => removerFoto(index)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
                className="w-full pr-3 py-2 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white"
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

            <div className="w-11/12 max-w-4xl bg-[#052759] p-6 rounded-xl shadow-lg relative">

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">

                    <div className="space-y-4">

                        <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden">
                            <span className="p-3 text-[#052759]">
                                <FaRegClock className="text-lg" />
                            </span>
                            <div className="flex items-center w-full pr-3 py-2">
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
                                className="w-full pr-3 py-2 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white"
                                value={formData.data}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="bg-white rounded-2xl p-4 border-2 border-[#052759]">
                            <div className="text-center">
                                <label htmlFor="fotos" className="cursor-pointer w-48 h-40 bg-gray-100 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-200 transition mx-auto">
                                    {formData.fotos.length > 0 ? (
                                        <>
                                            <img src="/img-doacao-livre-upload-photo.png" alt="Câmera" className="w-16 h-16 mb-2" />
                                            <span className="text-[#052759] font-bold text-xs">Adicionar mais fotos</span>
                                        </>
                                    ) : (
                                        <>
                                            <img src="/img-doacao-livre-upload-photo.png" alt="Câmera" className="w-16 h-16 mb-4" />
                                            <span className="text-[#052759] font-bold text-xs">Clique para selecionar</span>
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
                                <div className="mt-4">
                                    <p className="text-[#052759] text-xs text-center mb-2">
                                        {formData.fotos.length} foto(s) selecionada(s)
                                    </p>
                                    <div className="grid grid-cols-4 gap-2 max-h-24 overflow-y-auto p-2 border border-gray-300 rounded-lg">
                                        {formData.fotos.map((foto, index) => (
                                            <FotoPreview key={index} foto={foto} index={index} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <p className="text-[#052759] text-xs text-center mt-3">
                                *Coloque aqui as fotos dos pets presentes na feira!
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <InputComIcone icon={FaMapPin} name="cep" placeholder="CEP:" />
                        <InputComIcone icon={FaGlobeAmericas} name="estado" placeholder="Estado:" />
                        <InputComIcone icon={FaCity} name="cidade" placeholder="Cidade:" />
                        <InputComIcone icon={FaHome} name="rua" placeholder="Rua:" />
                        <InputComIcone icon={FaHome} name="numero" placeholder="Número:" />

                        <Button
                            className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] hover:[#052759] text-sm mx-auto w-full py-3"
                        >
                            Cadastrar Feira
                        </Button>
                    </div>
                </form>

                <img
                    src="/img-cadastro.png"
                    alt="Cachorrinho"
                    className="absolute bottom-0 left-0 w-32 max-h-28 object-contain pointer-events-none"
                />
            </div>
        </div>
    );
}