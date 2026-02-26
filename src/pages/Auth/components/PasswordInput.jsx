export default function PasswordInput({ name, placeholder, value, onChange, eyeOpen, setEyeOpen }) {
    return (
        <div className="relative w-full group">
            <img
                src="/icons/password-icon.svg"
                alt="senha"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-40 group-focus-within:opacity-60 transition-opacity duration-200"
            />
            <input
                type={eyeOpen ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                className="w-full h-9 md:h-10 py-2 pl-10 pr-10 border-2 border-gray-200 rounded-xl text-sm text-left bg-white transition-all duration-200 focus:border-[#052759] focus:shadow-lg focus:scale-[1.01] outline-none"
                value={value}
                onChange={onChange}
                required
            />
            <img
                src={eyeOpen ? "/icons/opened-eye-icon.svg" : "/icons/closed-eye-icon.svg"}
                alt="eye"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 opacity-40 cursor-pointer hover:opacity-70 transition-all duration-200 hover:scale-110"
                onClick={() => setEyeOpen(!eyeOpen)}
            />
        </div>
    );
}
