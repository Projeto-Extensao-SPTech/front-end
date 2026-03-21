import { FaBell, FaPaw, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import SelectComIcone from "./SelectComIcone";

export default function FormularioNotificacao({
    form,
    feiras,
    onChange,
}) {
    return (
        <div className="space-y-6">
            <SelectComIcone
                key={1}
                icone={FaBell}
                nome="tipo"
                valor={form.tipo}
                onChange={onChange}
                placeholder="Selecione o tipo da notificação"
                opcoes={[
                    { value: "FAIR", label: "Feira de Adoção" },
                    { value: "DONATION", label: "Precisamos de Doações" },
                    { value: "VOLUNTEER", label: "Precisamos de Voluntários" },
                    { value: "GENERAL", label: "Outro" },
                ]}
            />

            {form.tipo === "FAIR" && (
                <SelectComIcone
                    key={2}
                    icone={FaPaw}
                    nome="id_feira"
                    valor={form.id_feira}
                    onChange={onChange}
                    placeholder="Selecione uma feira para associar a notificação"
                    opcoes={feiras}
                />
            )}

            <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white">
                <span className="p-3 text-[#052759]">
                    <FaCalendarAlt className="text-lg" />
                </span>
                <input
                    id="data-evento"
                    name="data"
                    placeholder="Data do Evento:"
                    className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white cursor-pointer"
                    value={form.data}
                    onChange={onChange}
                />
            </div>

            <div className="flex items-start border-2 border-[#052759] rounded-lg bg-white min-h-[220px]">
                <span className="p-3 text-[#052759] self-start">
                    <FaEnvelope className="text-lg" />
                </span>
                <textarea
                    name="mensagem"
                    placeholder="Mensagem"
                    className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white resize-none"
                    value={form.mensagem}
                    onChange={onChange}
                    rows={4}
                />
            </div>
        </div>
    );
}
