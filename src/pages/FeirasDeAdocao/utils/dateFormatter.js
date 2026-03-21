import { parseISO, format } from "date-fns";

export function formatHour(iso) {
    if (!iso) return "";
    const afterT = iso.split("T")[1] || "";
    return afterT.slice(0, 5);
}

export function formatDate(isoDate) {
    if (!isoDate) return "";
    const date = parseISO(isoDate);
    return format(date, "dd/MM");
}
