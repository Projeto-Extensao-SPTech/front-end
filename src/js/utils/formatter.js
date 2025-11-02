// Função utilizada para formatar strings (nomes próprios, por exemplo)
// exemplo: "joao da silva" -> "Joao Da Silva"
export function stringFormatter(string) {
    if (!string) return "";
    
    return string
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Essa função é utilizada para exibição de datas no front-end
// YYYY-MM-DD -> DD/MM/YYYY
export function dateFormatterToClient(date) {
    if (!date || date.length < 10) return "";
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return `${day}/${month}/${year}`;
}

// Função pode ser usada tanto para inserção no banco quanto para exibição no front-end
// 12345678909 -> 123.456.789-09
export function cpfFormatter(cpf) {
    if (!cpf) return "";

    const cleanedCpf = cpf.replace(/\D/g, '');

    if (cleanedCpf.length !== 11) {
        return cpf
    }

    return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Formata o número de telefone para o padrão brasileiro
// 11987654321 -> (11) 98765-4321
// 1187654321 -> (11) 8765-4321
export function phoneFormatter(phone) {
    if (!phone) return "";
    const cleanedPhone = phone.replace(/\D/g, '');

    if (cleanedPhone.length === 11) {
        return cleanedPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleanedPhone.length === 10) {
        return cleanedPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
}

// Função para formatar preços (exemplo de implementação)
// 1234.5 -> R$ 1.234,50
export function priceFormatter(value) {
    if (isNaN(value)) return "";

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}