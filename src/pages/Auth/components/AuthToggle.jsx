export default function AuthToggle({ isLogin, onSwitch }) {
    return (
        <div className="flex justify-center mb-4 w-full relative">
            <div className="relative bg-gradient-to-r from-gray-100 to-gray-50 p-1 rounded-2xl shadow-inner">
                <div
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-[#052759] to-[#063a7a] rounded-xl transition-all duration-300 shadow-lg ${isLogin ? "left-1" : "left-[calc(50%+2px)]"
                        }`}
                ></div>
                <button
                    className={`relative z-10 w-28 md:w-32 h-11 md:h-12 rounded-xl text-sm font-bold transition-all duration-300 ${isLogin ? "text-[#FCAD0B]" : "text-gray-600"
                        }`}
                    onClick={() => onSwitch("login")}
                >
                    Login
                </button>
                <button
                    className={`relative z-10 w-28 md:w-32 h-11 md:h-12 rounded-xl text-sm font-bold transition-all duration-300 ${!isLogin ? "text-[#FCAD0B]" : "text-gray-600"
                        }`}
                    onClick={() => onSwitch("cadastro")}
                >
                    Cadastro
                </button>
            </div>
        </div>
    );
}
