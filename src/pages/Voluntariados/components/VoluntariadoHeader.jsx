export default function VoluntariadoHeader({ headerRef, headerVisible }) {
    return (
        <div className="relative bg-gradient-to-br from-[#052759] via-[#0d3a7a] to-[#052759] py-7 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FCAD0B] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div
                ref={headerRef}
                className={`max-w-6xl mx-auto px-4 text-center relative z-10 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                    }`}
            >
                <h1 className="text-2xl lg:text-3xl font-black text-white mb-2">
                    Quero ser Voluntário
                </h1>
                <p className="text-white/90 text-sm lg:text-base max-w-2xl mx-auto">
                    Faça parte de uma causa muito importante e ajude um "aumigo" a encontrar um lar!
                </p>
            </div>
        </div>
    );
}
