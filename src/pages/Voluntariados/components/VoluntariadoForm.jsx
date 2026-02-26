import {
    FaRegUser,
    FaEnvelope,
    FaWhatsapp,
    FaIdCard,
    FaPaw,
    FaCalendarAlt,
} from "react-icons/fa";
import Button from "../../../components/ui/Button";
import InputComIcone from "./InputComIcone";

export default function VoluntariadoForm({ formData, onChange, onSubmit }) {
    return (
        <div className="p-5 lg:p-7">
            <div className="mb-4">
                <h2 className="text-xl font-black text-white mb-1.5">Cadastre-se Agora</h2>
                <p className="text-white/80 text-xs">
                    Preencha os campos abaixo e faça parte da mudança
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-3.5">
                <div className="grid md:grid-cols-2 gap-3.5">
                    <InputComIcone icon={FaRegUser} name="name" placeholder="Nome completo:" />

                    <InputComIcone
                        icon={FaEnvelope}
                        name="email"
                        placeholder="E-mail:"
                        type="email"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-3.5">
                    <InputComIcone
                        icon={FaWhatsapp}
                        name="whatsapp"
                        placeholder="WhatsApp (com DDD):"
                    />

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
                        onChange={onChange}
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
                        onChange={onChange}
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
    );
}
