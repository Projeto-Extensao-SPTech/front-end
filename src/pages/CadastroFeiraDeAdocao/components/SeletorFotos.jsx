import FotoPreview from "./FotoPreview";

export default function SeletorFotos({ fotos, onFotosChange, onRemoverFoto }) {
    const handleFotos = (e) => {
        const novasFotos = Array.from(e.target.files);
        onFotosChange(novasFotos);
        e.target.value = "";
    };

    return (
        <div className="bg-white rounded-2xl p-6">
            <div className="text-center">
                <label
                    htmlFor="fotos"
                    className="cursor-pointer w-56 h-48 bg-gray-100 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-200 transition mx-auto"
                >
                    {fotos.length > 0 ? (
                        <>
                            <img
                                src="/img-doacao-livre-upload-photo.png"
                                alt="Câmera"
                                className="w-20 h-20 mb-3"
                            />
                            <span className="text-[#052759] font-bold text-sm">
                                Adicionar mais fotos
                            </span>
                        </>
                    ) : (
                        <>
                            <img
                                src="/img-doacao-livre-upload-photo.png"
                                alt="Câmera"
                                className="w-20 h-20 mb-4"
                            />
                            <span className="text-[#052759] font-bold text-sm">
                                Clique para selecionar
                            </span>
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

            {fotos.length > 0 && (
                <div className="mt-6">
                    <p className="text-[#052759] text-sm text-center mb-3">
                        {fotos.length} foto(s) selecionada(s)
                    </p>
                    <div className="grid grid-cols-4 gap-3 max-h-32 overflow-y-auto p-3 border border-gray-300 rounded-lg">
                        {fotos.map((foto, index) => (
                            <FotoPreview
                                key={index}
                                foto={foto}
                                index={index}
                                onRemove={onRemoverFoto}
                            />
                        ))}
                    </div>
                </div>
            )}

            <p className="text-[#052759] text-sm text-center mt-4">
                *Coloque aqui as fotos dos pets presentes na feira!
            </p>
        </div>
    );
}
