export default function InputComIcone({ icon: Icon, name, placeholder, type = "text", value, onChange }) {
    return (
        <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden">
            <span className="p-2.5 text-[#052759]">
                <Icon className="text-base" />
            </span>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pr-2.5 py-2 text-xs text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-2 bg-white"
            />
        </div>
    );
}
