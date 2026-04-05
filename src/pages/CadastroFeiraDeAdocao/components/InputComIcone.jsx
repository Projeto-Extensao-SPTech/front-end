import React from "react";

const InputComIcone = React.memo(
    ({ icon: Icon, name, placeholder, type = "text", value, onChange, onBlur, error }) => (
        <div className="w-full">
            <div
                className={`flex items-center border-2 rounded-lg bg-white ${
                    error ? "border-red-500" : "border-[#052759]"
                }`}
            >
                <span className="p-3 text-[#052759]">
                    <Icon className="text-lg" />
                </span>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="w-full p-3 text-sm text-[#052759] bg-white outline-none"
                    value={value || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>

            {error && (
                <p className="text-red-400 text-xs mt-1">{error}</p>
            )}
        </div>
    )
);

export default InputComIcone;