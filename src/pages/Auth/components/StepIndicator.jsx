export default function StepIndicator({ currentStep }) {
    return (
        <div className="flex justify-center mb-3 w-full">
            <div className="flex items-center space-x-2">
                <div className="flex flex-col items-center">
                    <div
                        className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${currentStep === 1
                                ? "bg-gradient-to-br from-[#052759] to-[#063a7a] text-[#FCAD0B] shadow-lg scale-110"
                                : "bg-gray-200 text-gray-400"
                            }`}
                    >
                        1
                    </div>
                    <span className="text-[10px] mt-0.5 text-gray-500">Dados</span>
                </div>
                <div
                    className={`h-1 w-10 md:w-12 rounded-full transition-all duration-300 ${currentStep === 2
                            ? "bg-gradient-to-r from-[#052759] to-[#FCAD0B]"
                            : "bg-gray-200"
                        }`}
                ></div>
                <div className="flex flex-col items-center">
                    <div
                        className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${currentStep === 2
                                ? "bg-gradient-to-br from-[#052759] to-[#063a7a] text-[#FCAD0B] shadow-lg scale-110"
                                : "bg-gray-200 text-gray-400"
                            }`}
                    >
                        2
                    </div>
                    <span className="text-[10px] mt-0.5 text-gray-500">Endereço</span>
                </div>
            </div>
        </div>
    );
}
