import React, { useEffect } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import Calendario from '../../layouts/Calendario'

export default function Voluntariados() {

    useEffect(() => {
        flatpickr("#calendario", {
            locale: Portuguese,
            dateFormat: "d/m/Y",
            minDate: "today",
            disableMobile: true,
        })
    }, [])

    return (
        <div className='mb-20'>
            <section id="voluntariados" className="py-12 max-w-full">
                <h1 className="text-4xl font-black mb-4 text-center text-[#052759] ">
                    Cadastro de Voluntários
                </h1>
                <h2 className="text-lg font-bold mb-10 text-center text-black">
                    Faça parte de uma causa muito importante e ajude um “aumigo” a encontrar um lar!
                </h2>

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="bg-white ml-16 pb-14 p-12 w-full rounded-2xl shadow-[10px_9px_4px_rgba(0,0,0,0.4)] border border-gray-200">
                        <h2 className="text-xl font-bold text-[#052759] mb-6">
                            Venha fazer um dog feliz conosco!
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-10">

                            <div className="flex flex-col gap-5 space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    className="pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-[#052759]"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    className="pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-[#052759]"
                                />

                                <input
                                    type="tel"
                                    name="whatsapp"
                                    placeholder="Whatsapp"
                                    className="pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-[#052759]"
                                />

                                <input
                                    type="text"
                                    name="cpf"
                                    placeholder="CPF"
                                    className="pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-[#052759]"
                                />

                                <textarea
                                    name="message"
                                    placeholder="Enviar mensagem (opcional):"
                                    rows="4"
                                    className="pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none resize-none placeholder-[#052759]"
                                />
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <div className="w-full rounded-lg p-4 border-2 border-[#052759] text-[#052759] mb-36">
                                    <p className="mb-5 font-black text-start">
                                        Qual data você tem disponibilidade para ser voluntário na ONG?
                                    </p>
                                    <input
                                        id="calendario"
                                        name="calendario"
                                        placeholder="DD/MM/AAAA"
                                        className="w-full pl-4 pr-4 py-3 border-2 border-[#052759] text-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#052759] text-xl text-white font-bold py-4 rounded-lg hover:bg-[#023582] transition-colors"
                                >
                                    Enviar formulário
                                </button>

                                <p className="text-sm text-[#052759] text-start italic w-12/12">
                                    Ao clicar em Enviar Formulário, você concorda em receber notificações e alertas no seu número cadastrado por Whatsapp, conforme preenchido no ato de Voluntariado.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col items-center text-start space-y-4">
                        <p className="text-xl w-9/12 font-bold text-[#052759] leading-relaxed mt-10">
                            O voluntariado é mais do que doar tempo — é um gesto de empatia que transforma vidas.
                            Ao participar dessa causa, você contribui para o bem-estar dos animais e fortalece
                            o vínculo entre humanos e seus fiéis companheiros.
                        </p>
                        <div className="w-full flex justify-center">
                            <img
                                src="photos/pet-voluntariado.png"
                                alt="Cachorro voluntariado"
                                className="w-96"
                            />
                        </div>
                    </div>
                </div>
                < Calendario />
            </section>

            <div className='bg-white mt-20 w-full md:w-11/12 rounded-xl items-center mx-auto shadow-[5px_5px_3px_rgba(0,0,0,0.4)]'>

                <div className='grid lg: grid-flow-col'>

                    <div className="w-full flex justify-start relative">
                        <img
                            src="photos/pata.png"
                            alt="Cachorro voluntariado"
                            className="w-80"
                        />
                    </div>

                    <div className='space-y-2'>
                        <p className='text-right text-[#052759] text-4xl font-black py-10 mr-14'>Porque ser um voluntário?</p>
                        <p className='text-[#052759] w-12/12 text-right justify-end text-xl mr-14 leading-9'>
                            Ser voluntário em um abrigo é transformar compaixão em ação.<br/><br/>
                            Cada carinho, passeio ou momento de cuidado restaura a confiança de um animal
                            à espera de um lar.<br/> 
                            Você se torna o elo vital entre o abandono e uma segunda chance.<br/>
                            Enquanto você doa seu tempo, ganha em troca gratidão pura, alivia o estresse e encontra uma profunda <br/> 
                            sensação de propósito. É um ato que salva vidas— tanto as deles, quanto a sua, renovando a fé no que há <br/>
                            de mais simples e verdadeiro.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )
}
