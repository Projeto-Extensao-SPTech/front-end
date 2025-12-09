import { useState, useEffect, useRef } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import { FaRegUser, FaEnvelope, FaWhatsapp, FaIdCard, FaPaw, FaCalendarAlt } from 'react-icons/fa'
import { useAlertUtils } from '../hooks/useAlertUtils';
import { handleHttpFeedback } from '../js/utils/handleHttpFeedback';
import Button from '../components/ui/Button'
import { api } from '../api/apiUserService'

function useScrollReveal(threshold = 0.1) {

    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [threshold])

    return [ref, isVisible]
}

export default function Voluntariados() {
    const alert = useAlertUtils();

    const [headerRef, headerVisible] = useScrollReveal(0.1)
    const [formRef, formVisible] = useScrollReveal(0.1)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        cpf: '',
        message: '',
        calendario: ''
    })


    useEffect(() => {
        const token = sessionStorage.getItem("USER_DATA")

        if (token) {
            const jsonData = JSON.parse(token)
            console.log("JSON DATA COMPLETO:", jsonData);

            setFormData(prev => ({
                ...prev,
                name: jsonData?.name || '',
                email: jsonData?.mail_address || '',
                cpf: jsonData?.document || '',
                whatsapp: jsonData?.phone || ''
            }))
        }
    }, [])


    useEffect(() => {
        const fp = flatpickr("#calendario", {
            locale: Portuguese,
            dateFormat: "d/m/Y",
            minDate: "today",
            disableMobile: true,
            onChange: (dates) => {
                const dataFormatada =
                    dates.length > 0 ? flatpickr.formatDate(dates[0], "d/m/Y") : ''

                setFormData(prev => ({ ...prev, calendario: dataFormatada }))
            }
        })
        return () => fp.destroy()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = sessionStorage.getItem("USER_DATA");

            if (!token) {
                handleHttpFeedback(alert, {
                    errorTitle: "Erro de autenticação",
                    errorMessage: "Você precisa estar logado para se voluntariar.",
                })
                return;
            }

            const jsonData = JSON.parse(token);
            console.log("JSON DATA:", jsonData);
            const userId = jsonData?.id;

            if (!userId) {
                handleHttpFeedback(alert, {
                    errorTitle: "Erro de autenticação",
                    errorMessage: "ID do usuário não encontrado. Faça login novamente.",
                });
                return;
            }


            const [dia, mes, ano] = formData.calendario.split("/");
            const isoDate = `${ano}-${mes}-${dia}`;

            const payload = {
                user_id: userId,
                message: formData.message,
                available_date: isoDate
            };


            console.log("Payload enviado:", payload);

            const response = await api.post("/volunteers", payload);

            console.log("Voluntário cadastrado:", response.data);
            handleHttpFeedback(alert, response, {
                successTitle: "Cadastro realizado",
                successMessage: "Obrigado por se voluntariar! Entraremos em contato em breve.",
            });

            await sendWhatsApp(isoDate);
            handleHttpFeedback(alert, response, {
                successTitle: "Mensagem enviada",
                successMessage: "Uma mensagem de desejo de voluntariado foi enviada via WhatsApp para nossa equipe.",
            });

        } catch (error) {
            console.error("Erro ao cadastrar voluntário:", error);
            handleHttpFeedback(alert, error.response, {
                errorTitle: "Erro no cadastro",
                errorMessage: "Ocorreu um erro ao realizar seu cadastro. Tente novamente mais tarde.",
            });
        }
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const sendWhatsApp = async () => {

        const token = sessionStorage.getItem("USER_DATA");
        if (!token) return handleHttpFeedback(alert, {
            errorTitle: "Erro de autenticação",
            errorMessage: "Você precisa estar logado para enviar a mensagem pelo WhatsApp.",
        });
        const user = JSON.parse(token);


        const msg = `Olá!\nSou um voluntário interessado! 🐶\n\n` +
            `Nome: ${user.name || formData.name}\n` +
            `Email: ${user.mail_address || formData.email}\n` +
            `Mensagem: ${formData.message || "Não informado"}\n` +
            `Data disponível: ${formData.calendario}`;

        const beneficiaryNumber = `5511930144580`;
        const payload = {
            number: beneficiaryNumber,
            text: msg
        };

        const instance = "api-manager";
        try {
            const response = await api.post(`/messages/sendText/${instance}`, payload);
            console.log("Mensagem enviada com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao enviar WhatsApp:", error.response);
            handleHttpFeedback(alert, {
                errorTitle: "Erro ao enviar mensagem",
                errorMessage: "Não foi possível enviar a mensagem via WhatsApp. Tente novamente mais tarde.",
            });
        }
    }

    const InputComIcone = ({ icon: Icon, name, placeholder, type = "text" }) => (
        <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden">
            <span className="p-2.5 text-[#052759]">
                <Icon className="text-base" />
            </span>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full pr-2.5 py-2 text-xs text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-2 bg-white"
                value={formData[name]}
                onChange={handleChange}
            />
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-[#E8E8E8]">


            <div className="relative bg-gradient-to-br from-[#052759] via-[#0d3a7a] to-[#052759] py-7 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FCAD0B] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div
                    ref={headerRef}
                    className={`max-w-6xl mx-auto px-4 text-center relative z-10 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                        }`}
                >
                    <h1 className="text-2xl lg:text-3xl font-black text-white mb-2">
                        Quero ser Voluntário
                    </h1>
                    <p className="text-white/90 text-sm lg:text-base max-w-2xl mx-auto">
                        Faça parte de uma causa muito importante e ajude um "aumigo" a encontrar um lar!
                    </p>
                </div>
            </div>


            <div className="max-w-6xl mx-auto px-4 py-8">
                <div
                    ref={formRef}
                    className={`bg-[#052759] rounded-xl shadow-2xl overflow-hidden transition-all duration-700 ${formVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                >
                    <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-0">


                        <div className="p-5 lg:p-7">
                            <div className="mb-4">
                                <h2 className="text-xl font-black text-white mb-1.5">Cadastre-se Agora</h2>
                                <p className="text-white/80 text-xs">Preencha os campos abaixo e faça parte da mudança</p>
                            </div>


                            <form onSubmit={handleSubmit} className="space-y-3.5">


                                <div className="grid md:grid-cols-2 gap-3.5">
                                    <InputComIcone icon={FaRegUser} name="name" placeholder="Nome completo:" />


                                    <InputComIcone icon={FaEnvelope} name="email" placeholder="E-mail:" type="email" />
                                </div>

                                <div className="grid md:grid-cols-2 gap-3.5">

                                    <InputComIcone icon={FaWhatsapp} name="whatsapp" placeholder="WhatsApp (com DDD):" />

                                    <InputComIcone icon={FaIdCard} name="cpf" placeholder="CPF:" />
                                </div>

                                <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white">
                                    <span className="p-2.5 text-[#052759]">
                                        <FaCalendarAlt className="text-base" />
                                    </span>
                                    <input
                                        id="calendario"
                                        type="text"
                                        name="calendario"
                                        placeholder="Disponibilidade:"
                                        className="w-full pr-2.5 py-2 text-xs text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-2 bg-white cursor-pointer"
                                        value={formData.calendario}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>

                                <div className="flex items-start border-2 border-[#052759] rounded-lg bg-white">
                                    <span className="p-2.5 text-[#052759] pt-3">
                                        <FaPaw className="text-base" />
                                    </span>
                                    <textarea
                                        name="message"
                                        placeholder="Mensagem (opcional):"
                                        rows="2"
                                        className="w-full pr-2.5 py-2 text-xs text-[#052759] resize-none focus:outline-none placeholder-[#052759] font-medium pl-2 bg-white"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>

                                <Button className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] text-sm w-full py-2.5">
                                    Tenho interesse
                                </Button>

                                <p className="text-xs text-white/70 text-center pt-1">
                                    Ao enviar, você concorda em receber notificações via WhatsApp e E-mail.
                                </p>
                            </form>
                        </div>

                        <div className="bg-gradient-to-br from-[#0d3a7a] to-[#052759] p-5 lg:p-7 flex flex-col justify-center relative overflow-hidden">

                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FCAD0B]/10 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                            <div className="relative z-10 space-y-3.5">
                                <img
                                    src="/img-voluntariar.png"
                                    className="w-20 h-auto mx-auto mb-1.5"
                                    alt="Voluntário"
                                />

                                <div className="text-center">
                                    <div className="inline-block bg-[#FCAD0B] px-3.5 py-1 rounded-full shadow-md mb-2.5">
                                        <span className="text-[#052759] font-bold text-xs">Por que me voluntariar?</span>
                                    </div>

                                    <h3 className="text-lg font-black text-white mb-1.5">
                                        Transforme vidas!
                                    </h3>

                                    <p className="text-xs text-white/90 leading-relaxed mb-1.5">
                                        Ser voluntário é transformar compaixão em ação.
                                    </p>

                                    <p className="text-xs text-white/90 leading-relaxed">
                                        Cada carinho, passeio ou cuidado restaura a confiança de um animal que espera por um lar.
                                    </p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5 border border-white/20">
                                    <p className="text-[11px] italic text-white text-center">
                                        "É um ato que salva vidas — tanto as deles quanto a sua."
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-2 pt-1.5">
                                    <div className="text-center">
                                        <div className="text-[#FCAD0B] font-black text-base"></div>
                                        <div className="text-white/70 text-[10px] leading-tight"></div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[#FCAD0B] font-black text-base">Somos gratos</div>
                                        <div className="text-white/70 text-[10px] leading-tight">pelo seu apoio!</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[#FCAD0B] font-black text-base"></div>
                                        <div className="text-white/70 text-[10px] leading-tight"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}