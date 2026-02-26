export default function Input({ name, placeholder, icon, value, onChange, type = "text" }) {
    return (
        <div className="relative w-full group">
            {icon && (
                <img
                    src={icon}
                    alt="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-40 group-focus-within:opacity-60 transition-opacity duration-200"
                />
            )}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`w-full h-9 md:h-10 py-2 border-2 border-gray-200 rounded-xl text-sm bg-white transition-all duration-200 focus:border-[#052759] focus:shadow-lg focus:scale-[1.01] outline-none ${icon ? "pl-10 pr-3 text-left" : "px-3 text-center"
                    }`}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
}
