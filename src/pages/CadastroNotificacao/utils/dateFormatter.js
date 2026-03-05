export function formatDate(dateStr, currentSplit, desiredSplit) {
    const parts = dateStr.split(currentSplit);
    if (parts.length !== 3) return dateStr;

    if (parts[0].length === 2) {
        const [day, month, year] = parts;
        return `${year}${desiredSplit}${month}${desiredSplit}${day}`;
    }

    if (parts[0].length === 4) {
        const [year, month, day] = parts;
        return `${day}${desiredSplit}${month}${desiredSplit}${year}`;
    }

    return dateStr;
}

export function formatFeira(feira) {
    const date = feira.fair_date.split("-").reverse().join("/");
    const { street, number, city, state } = feira.address;
    const addressFormatted = `${street}, n° ${number} | ${city}/${state}`;
    return `${date} - ${addressFormatted}`;
}
