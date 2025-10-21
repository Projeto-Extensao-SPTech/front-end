export function Apoiar() {

    const checkBoxes = [
        { label: "Financeiramente", id: "financeiramente" },
        { label: "Alimentos", id: "alimentos" },
        { label: "Remédios", id: "remedios" },
        { label: "Divulgação", id: "divulgacao" },
        { label: "Campanhas", id: "campanhas" },
        { label: "Obras", id: "obras" },
        { label: "Transporte", id: "transporte" },
        { label: "Higiene", id: "higiene" }
    ]

    function createCheckbox() {
        return checkBoxes.map((checkbox) => (
            <label key={checkbox.id} className="flex items-center gap-3 cursor-pointer text-lg">
                <input
                    type="checkbox"
                    className="appearance-none w-6 h-6 rounded-full border-2 border-white checked:bg-[#FFB114] checked:border-[#FFB114] hover:bg-[#d1ac61] cursor-pointer flex-shrink-0 "
                />
                <span>{checkbox.label}</span>
            </label>
        ))
    }

    return (
        <>
            <h2 className="text-4xl">Seja um Patrocinador</h2>
            <h3 className="font-normal">Escolha com o que deseja apoiar</h3>

            <div className="grid grid-cols-2 gap-6 mt-6 w-[70%]">
                {createCheckbox()}
            </div>

            <div className="flex flex-col w-[70%] mt-4">
                <span className="mb-2">Outro:</span>
                <input type="text" className="rounded-lg w-full text-black font-normal p-2" />
            </div>

            <button className="w-[50%] bg-[#FFB114] text-white rounded-lg p-2 mt-6 hover:bg-[#ffd175] transition-colors duration-300">
                Avançar
            </button>
        </>
    )
}