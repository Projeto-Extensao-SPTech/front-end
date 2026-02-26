export default function Identificador({ steps, currentIndex }) {
    return (
        <nav className="flex flex-col items-start gap-1 py-4">
            {steps.map((step, i) => {
                const active = i === currentIndex;
                const done = i < currentIndex;

                return (
                    <div key={step.key} className="flex items-start gap-3 z-10">
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 border-2 ${done || active
                                        ? "bg-[#052759] border-[#052759] text-white"
                                        : "bg-white border-gray-400 text-gray-400"
                                    }`}
                            />
                            {i < steps.length - 1 && (
                                <div
                                    className={`w-[2px] mt-1 transition-colors duration-200 ${i < currentIndex ? "bg-[#052759]" : "bg-gray-300"
                                        }`}
                                    style={{ height: "1.5rem" }}
                                />
                            )}
                        </div>
                        <span
                            className={`text-sm ${active
                                    ? "text-[#052759] font-semibold"
                                    : done
                                        ? "text-[#052759] font-medium"
                                        : "text-gray-600"
                                }`}
                        >
                            {step.label}
                        </span>
                    </div>
                );
            })}
        </nav>
    );
}
