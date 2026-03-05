export default function KpiValue({ label, img, color }) {
    return (
        <div className="flex justify-between items-center relative min-h-[64px]">
            <div
                className={`bg-gradient-to-r ${color} rounded-full px-4 py-1.5 shadow-lg`}
            >
                <p className="font-bold text-base text-white drop-shadow-md">
                    {label}
                </p>
            </div>
            <img
                className="absolute bottom-[-12px] right-[-12px] w-20 h-20 object-contain drop-shadow-lg"
                src={img}
            />
        </div>
    );
}
