const monthsPtBr = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

export function formatMonth(monthIndex) {
    return monthsPtBr[monthIndex - 1] || "-";
}
