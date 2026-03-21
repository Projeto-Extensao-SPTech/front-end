export default function KpiHeader({ Icon, iconBg, title, subtitle }) {
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 mb-2 shadow-sm relative flex items-center gap-2">
            <div className={`bg-gradient-to-br ${iconBg} p-1.5 rounded-lg`}>
                <Icon className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
                <p
                    className="font-bold text-sm text-[#052759]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                >
                    {title}
                </p>
                <p className="text-gray-500 text-xs">{subtitle}</p>
            </div>
        </div>
    );
}
