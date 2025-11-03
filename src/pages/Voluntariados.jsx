import { useState, useEffect } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import { sendVoluntariado } from '../js/volunteering.js'
import { buildVoluntariadoState, SAMPLE_VOLUNTARIADO } from '../js/utils/formFiller'

function CalendarioStyles() {
    return (
        <style>
            {`
        .flatpickr-calendar {
          background-color: #EFEFEF;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 2px solid #052759;
        }

        .flatpickr-day{
          color: #052759;
          font-weight: 600;
        }

        .flatpicker-day:hover {
          background: #FCAD0B;
          color: white;
          border: 2px solid #FCAD0B;
        }

        .flatpickr-day.selected {
          background: #052759;
          color: white;
        }
        
        .flatpickr-day.selected:hover {
          background: #FCAD0B;
          color: white;
          border: 2px solid #FCAD0B;
        }

        .flatpickr-day.today {
          border: 2px solid #052759;
          color: #052759;
        }

        .flatpickr-day.today.selected {
          background: #052759;
          color: white;
        }
        
        .flatpickr-day.today:hover {
          background: #FCAD0B;
          color: white;
          border: 2px solid #FCAD0B;
        }

        .flatpickr-months .flatpickr-month {
          color: #052759;
          font-weight: 800;
        }

        span.flatpickr-weekday {
          color: #052759;
          font-weight: 800;
        }
      `}
        </style>
    )
}

export default function Voluntariados() {
    const [formData, setFormData] = useState({
        name: '', email: '', whatsapp: '', cpf: '', message: '', calendario: ''
    })

    useEffect(() => {
        flatpickr("#calendario", {
            locale: Portuguese,
            dateFormat: "d/m/Y",
            minDate: "today",
            disableMobile: true,
        })
    }, [])

    useEffect(() => {
        const el = document.querySelector('#calendario')
        if (el && el._flatpickr) {
            if (!formData.calendario) el._flatpickr.clear()
            else el._flatpickr.setDate(formData.calendario)
        }
    }, [formData.calendario])

    const handleSubmit = (e) => {
        e.preventDefault()
        sendVoluntariado(formData)
    }

    const fillExample = () => {
        setFormData(buildVoluntariadoState(SAMPLE_VOLUNTARIADO))
    }

    return (
        <div className='mb-12'>
            {/* botão de preenchimento rápido para testes */}
            {/* <div className="max-w-7xl mx-auto px-8 mb-4">
                <button
                    type="button"
                    onClick={fillExample}
                    className="bg-[#052759] text-white px-3 py-1 rounded-md hover:bg-[#023582] transition"
                >
                    Preencher exemplo
                </button>
            </div> */}
            <section id="voluntariados" className="py-8 max-w-full">
                <CalendarioStyles />

                <h1 className="text-3xl font-black mb-3 text-center text-[#052759]">
                    Cadastro de Voluntários
                </h1>
                <h2 className="font-bold mb-6 text-center text-[#052759]">
                    Faça parte de uma causa muito importante e ajude um "aumigo" a encontrar um lar!
                </h2>

                <div className="grid lg:grid-cols-2 gap-8 items-start px-8">

                    <div className="bg-white pb-8 p-8 w-full rounded-2xl shadow-[10px_9px_4px_rgba(0,0,0,0.4)] border border-gray-200">
                        <h2 className="text-lg font-bold text-[#052759] mb-4">
                            Venha fazer um dog feliz conosco!
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    className="pl-3 pr-3 py-2 text-sm border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-[#052759]"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    className="pl-3 pr-3 py-2 text-sm border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-[#052759]"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />

                                <input
                                    type="tel"
                                    name="whatsapp"
                                    placeholder="Whatsapp"
                                    className="pl-3 pr-3 py-2 text-sm border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-[#052759]"
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                />

                                <input
                                    type="text"
                                    name="cpf"
                                    placeholder="CPF"
                                    className="pl-3 pr-3 py-2 text-sm border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-[#052759]"
                                    value={formData.cpf}
                                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                                />

                                <textarea
                                    name="message"
                                    placeholder="Enviar mensagem (opcional):"
                                    rows="3"
                                    className="pl-3 pr-3 py-2 text-sm border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none resize-none placeholder-[#052759]"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <div className="w-full rounded-lg p-3 border-2 border-[#052759] text-[#052759]">
                                    <p className="mb-3 font-black text-start text-sm">
                                        Qual data você tem disponibilidade para ser voluntário na ONG?
                                    </p>
                                    <input
                                        id="calendario"
                                        name="calendario"
                                        placeholder="DD/MM/AAAA"
                                        className="w-full pl-3 pr-3 py-2 text-sm border-2 border-[#052759] text-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none"
                                        value={formData.calendario}
                                        onChange={(e) => setFormData({ ...formData, calendario: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="w-full bg-[#052759] text-lg text-white font-bold py-3 rounded-lg hover:bg-[#023582] transition-colors"
                                >
                                    Enviar formulário
                                </button>

                                <p className="text-xs text-[#052759] text-start italic">
                                    Ao clicar em Enviar Formulário, você concorda em receber notificações e alertas no seu número cadastrado por Whatsapp, conforme preenchido no ato de Voluntariado.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-start space-y-3">
                        <p className="text-lg font-bold text-[#052759] leading-relaxed">
                            Voluntariar: um ato de amor que resgata, cura e transforma.
                        </p>
                        <div className="w-full flex justify-center">
                            <img
                                src="/photos/pet-voluntariado.png"
                                alt="Cachorro voluntariado"
                                className="w-72"
                            />
                        </div>
                    </div>
                </div>

                <div className='bg-white mt-12 w-11/12 rounded-xl items-center mx-auto shadow-[5px_5px_3px_rgba(0,0,0,0.4)]'>
                    <div className='grid lg:grid-flow-col items-center gap-4'>
                        <div className="w-full flex justify-start">
                            <img
                                src="/photos/pata.png"
                                alt="Cachorro voluntariado"
                                className="w-64"
                            />
                        </div>

                        <div className='space-y-3 pr-8 py-6'>
                            <p className='text-right text-[#052759] text-3xl font-black'>Porque ser um voluntário?</p>
                            <p className='text-right text-base leading-7' style={{ color: '#052759' }}>
                                Ser voluntário em um abrigo é transformar compaixão em ação.<br /><br />
                                Cada carinho, passeio ou momento de cuidado restaura a confiança de um animal
                                à espera de um lar. Você se torna o elo vital entre o abandono e uma segunda chance.<br />
                                Enquanto você doa seu tempo, ganha em troca gratidão pura, alivia o estresse e encontra uma profunda
                                sensação de propósito. É um ato que salva vidas— tanto as deles, quanto a sua, renovando a fé no que há
                                de mais simples e verdadeiro.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}