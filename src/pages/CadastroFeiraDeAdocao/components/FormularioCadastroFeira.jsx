import { FaRegClock, FaCalendarAlt, FaMapMarkerAlt, FaCity, FaHome, FaGlobeAmericas } from "react-icons/fa";
import InputComIcone from "./InputComIcone";
import SeletorFotos from "./SeletorFotos";
import Button from "../../../components/ui/Button";

export default function FormularioCadastroFeira({
    formData,
    onChange,
    onBuscaCep,
    fotos,
    onFotosChange,
    onRemoverFoto,
    onSubmit,
}) {
    return (
        <form onSubmit={onSubmit} className="grid lg:grid-cols-2 gap-8">
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
                            name="horario"
                            className="ml-2 text-sm text-[#052759] focus:outline-none font-medium bg-white flex-1"
                            value={formData.horario}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white">
                    <span className="p-3 text-[#052759]">
                        <FaCalendarAlt className="text-lg" />
                    </span>
                    <input
                        id="calendar-input"
                        name="data"
                        placeholder="Data da Feira:"
                        className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white"
                        value={formData.data}
                        readOnly
                        onChange={onChange}
                    />
                </div>

                <SeletorFotos
                    fotos={fotos}
                    onFotosChange={onFotosChange}
                    onRemoverFoto={onRemoverFoto}
                />
            </div>

            <div className="space-y-6">
                <InputComIcone
                    icon={FaMapMarkerAlt}
                    name="cep"
                    placeholder="CEP:"
                    value={formData.cep}
                    onChange={onChange}
                    onBlur={onBuscaCep}
                />
                <InputComIcone
                    icon={FaHome}
                    name="logradouro"
                    placeholder="Rua:"
                    value={formData.logradouro}
                    onChange={onChange}
                />
                <InputComIcone
                    icon={FaMapMarkerAlt}
                    name="numero"
                    placeholder="Número:"
                    type="number"
                    value={formData.numero}
                    onChange={onChange}
                />
                <InputComIcone
                    icon={FaHome}
                    name="complemento"
                    placeholder="Complemento:"
                    value={formData.complemento}
                    onChange={onChange}
                />
                <InputComIcone
                    icon={FaCity}
                    name="cidade"
                    placeholder="Cidade:"
                    value={formData.cidade}
                    onChange={onChange}
                />
                <InputComIcone
                    icon={FaCity}
                    name="estado"
                    placeholder="Estado:"
                    value={formData.estado}
                    onChange={onChange}
                />
                <InputComIcone
                    icon={FaGlobeAmericas}
                    name="pais"
                    placeholder="País:"
                    value={formData.pais}
                    onChange={onChange}
                />

                <Button
                    className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#e09a0a] text-sm mx-auto w-full py-4"
                >
                    Cadastrar Feira
                </Button>
            </div>
        </form>
    );
}
