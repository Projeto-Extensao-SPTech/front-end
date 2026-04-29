export function maskCPF(value) {
    if (!value) return "";
    return value
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{2})$/, "$1-$2");
}

export function maskCNPJ(value) {
    if (!value) return "";
    return value
        .replace(/\D/g, "")
        .slice(0, 14)
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
}

export function maskTelefone(value) {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "").slice(0, 11);

    if (cleaned.length <= 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d)/, "($1) $2-$3");
    }

    return cleaned.replace(/(\d{2})(\d{5})(\d)/, "($1) $2-$3");
}

export function maskCEP(value) {
    if (!value) return "";
    return value
        .replace(/\D/g, "")
        .slice(0, 8)
        .replace(/(\d{5})(\d)/, "$1-$2");
}

export function parseCEP(value) {
    if (!value) return "";
    return value.replace(/\D/g, "").slice(0, 8);
}

export function formatBRLCurrency(value) {
    if (value === null || value === undefined || value === "") return "";
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return "";
    return numberValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export function maskBRLCurrency(value) {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";

    const number = parseInt(digits, 10);
    const cents = (number % 100).toString().padStart(2, "0");
    const integerPart = Math.floor(number / 100).toString();
    const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `R$ ${integerFormatted},${cents}`;
}

export function parseBRLCurrency(value) {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    return parseInt(digits, 10) / 100;
}
