export default function InputField({ field, value, onChange }) {
    return (
        <div
            className={`flex flex-col text-left ${field.fullWidth ? "w-full" : "w-[48%]"
                }`}
        >
            <label
                htmlFor={field.name}
                className="text-white mb-1 font-medium text-sm"
            >
                {field.label}:
            </label>

            {field.component === "select" ? (
                <select
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={onChange}
                    className="rounded-lg w-full text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm"
                >
                    <option value="">Selecione...</option>
                    {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : field.component === "textarea" ? (
                <textarea
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={onChange}
                    className="rounded-lg w-full h-16 text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm resize-none"
                    placeholder="Descreva brevemente o item"
                />
            ) : (
                <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={value}
                    onChange={onChange}
                    className="rounded-lg w-full text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm"
                />
            )}
        </div>
    );
}
