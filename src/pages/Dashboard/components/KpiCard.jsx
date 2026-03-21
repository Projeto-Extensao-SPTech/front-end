import KpiHeader from "./KpiHeader";
import KpiValue from "./KpiValue";

export default function KpiCard({
    Icon,
    iconBg,
    title,
    subtitle,
    label,
    color,
    img,
}) {
    return (
        <div className="bg-gradient-to-r from-[#0f3875] via-[#215dc4] to-[#2a69cf] rounded-xl p-4 shadow-xl relative animate-[fadeIn_0.6s_ease-out] overflow-hidden">
            <KpiHeader
                iconBg={iconBg}
                Icon={Icon}
                title={title}
                subtitle={subtitle}
            />
            <KpiValue label={label} color={color} img={img} />
        </div>
    );
}
