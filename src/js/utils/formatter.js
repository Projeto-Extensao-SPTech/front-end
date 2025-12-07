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
