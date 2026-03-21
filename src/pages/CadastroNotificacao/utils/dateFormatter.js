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

export function calcularDatasAgendadas(dataEventoStr, notificacoes) {
    if (!dataEventoStr) return [];

    try {
        const [dia, mes, ano] = dataEventoStr.split("/").map(Number);
        const dataEvento = new Date(ano, mes - 1, dia);

        return notificacoes
            .map((notif) => {
                const quantidade = Number(notif.quantidade);
                const dataAgendada = new Date(dataEvento);
                dataAgendada.setDate(dataEvento.getDate() - quantidade);

                const diaFormatado = String(dataAgendada.getDate()).padStart(2, "0");
                const mesFormatado = String(dataAgendada.getMonth() + 1).padStart(2, "0");
                const anoFormatado = dataAgendada.getFullYear();

                return {
                    data: `${diaFormatado}/${mesFormatado}/${anoFormatado}`,
                    diasAntes: quantidade,
                };
            })
            .sort((a, b) => a.diasAntes - b.diasAntes);
    } catch (error) {
        return [];
    }
}
