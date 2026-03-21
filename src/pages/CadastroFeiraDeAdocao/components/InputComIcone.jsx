import React from "react";

const InputComIcone = React.memo(
    ({ icon: Icon, name, placeholder, type = "text", value, onChange, onBlur }) => (
        <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden">
            <span className="p-3 text-[#052759]">
                <Icon className="text-lg" />
            </span>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white"
                value={value || ""}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
);

export default InputComIcone;
