export default function InputComIcone({
    icon: Icon,
    name,
    placeholder,
    value,
    onChange,
    error,
}) {
    return (
        <div className="w-full">
            <div
                className={`flex items-center border-2 rounded-lg bg-white ${
                    error ? "border-red-500" : "border-[#052759]"
                }`}
            >
                <span className="p-2.5 text-[#052759]">
                    <Icon />
                </span>

                <input
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 text-xs text-[#052759] bg-white outline-none"
                />
            </div>

            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );
}