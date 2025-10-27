export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const baseStyles = 'px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
        primary: 'bg-[#FCAD0B] text-[#052759] hover:bg-yellow-400 focus:ring-[#FCAD0B]',
        secondary: 'bg-[#052759] text-white hover:bg-blue-900 focus:ring-[#052759]',
        outline: 'border-2 border-[#052759] text-[#052759] hover:bg-[#052759] hover:text-white'
    }

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}