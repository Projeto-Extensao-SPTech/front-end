export default function SelectComIcone({
    icone: Icone,
    nome,
    opcoes,
    valor,
    onChange,
    placeholder,
}) {
    return (
        <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden relative">
            <span className="p-3 text-[#052759]">
                <Icone className="text-lg" />
            </span>

            <select
                name={nome}
                className="w-full pr-10 py-3 text-sm text-[#052759] focus:outline-none font-medium pl-3 bg-white appearance-none cursor-pointer"
                value={valor === null ? "" : valor}
                onChange={onChange}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}

                {opcoes.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                    </option>
                ))}
            </select>

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-2 h-2 border-r-2 border-b-2 border-[#052759] rotate-45"></div>
            </div>
        </div>
    );
}
