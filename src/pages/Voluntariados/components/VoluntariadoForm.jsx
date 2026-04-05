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

export default function VoluntariadoForm({ formData, errors, onChange, onSubmit }) {
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
                    <InputComIcone
                        icon={FaRegUser}
                        name="name"
                        placeholder="Nome completo:"
                        value={formData.name}
                        onChange={onChange}
                        error={errors?.name}
                    />

                    <InputComIcone
                        icon={FaEnvelope}
                        name="email"
                        placeholder="E-mail:"
                        value={formData.email}
                        onChange={onChange}
                        error={errors?.email}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-3.5">
                    <InputComIcone
                        icon={FaWhatsapp}
                        name="whatsapp"
                        placeholder="WhatsApp:"
                        value={formData.whatsapp}
                        onChange={onChange}
                        error={errors?.whatsapp}
                    />

                    <InputComIcone
                        icon={FaIdCard}
                        name="cpf"
                        placeholder="CPF:"
                        value={formData.cpf}
                        onChange={onChange}
                        error={errors?.cpf}
                    />
                </div>

                <div className="flex items-center border-2 rounded-lg bg-white border-[#052759]">
                    <span className="p-2.5 text-[#052759]">
                        <FaCalendarAlt />
                    </span>
                    <input
                        id="calendario"
                        name="calendario"
                        value={formData.calendario}
                        readOnly
                        className="w-full p-2 text-xs text-[#052759] bg-white"
                        placeholder="Disponibilidade"
                    />
                </div>

                <div className="flex items-start border-2 rounded-lg bg-white border-[#052759]">
                    <span className="p-2.5 text-[#052759] pt-3">
                        <FaPaw />
                    </span>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={onChange}
                        className="w-full p-2 text-xs text-[#052759] resize-none"
                        placeholder="Mensagem"
                    />
                </div>

                <Button className="w-full bg-[#FCAD0B] py-2.5">
                    Tenho interesse
                </Button>
            </form>
        </div>
    );
}