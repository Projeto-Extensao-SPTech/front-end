import FormButton from "./FormButton";

export default function EnviarFotoStep({ data, updateData, onNext }) {
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            updateData("foto", e.target.files[0]);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        onNext();
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

            <FormButton onClick={handleNext}>Avançar</FormButton>
        </div>
    );
}
