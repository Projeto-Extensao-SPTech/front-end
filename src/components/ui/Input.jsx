import { useState } from 'react'

export default function Input({ label, type = 'text', value, onChange, required = false, ...props }) {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-[#052759]">
                    {label} {required && '*'}
                </label>
            )}

            <div className="relative">
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCAD0B] focus:border-transparent outline-none transition-all"
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#052759]"
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                )}
            </div>
        </div>
    )
}