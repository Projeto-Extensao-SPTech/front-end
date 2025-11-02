export function voluntariadoFormFiller(formData){
    try {
        const safe = (sel, val = '') => {
            const el = document.querySelector(sel)
            if (!el) return
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = val
            else el.innerText = val
        }

        safe('input[name="name"]', formData.name || '')
        safe('input[name="email"]', formData.email || '')
        safe('input[name="whatsapp"]', formData.whatsapp || '')
        safe('input[name="cpf"]', formData.cpf || '')
        safe('textarea[name="message"]', formData.message || '')

        const calendarioEl = document.querySelector('#calendario')
        if (calendarioEl && calendarioEl._flatpickr) {
            calendarioEl._flatpickr.setDate(formData.calendario || '')
        }
    } catch (err) {
        console.warn("voluntariadoFormFiller DOM failed:", err)
    }
}

export function buildVoluntariadoState(data = {}) {
    return {
        name: data.name || '',
        email: data.email || '',
        whatsapp: data.whatsapp || '',
        cpf: data.cpf || '',
        message: data.message || '',
        calendario: data.calendario || ''
    }
}

// Exemplo de dados para preencher (útil para teste / demo)
export const SAMPLE_VOLUNTARIADO = {
    name: "João Silva",
    email: "joao.silva@example.com",
    whatsapp: "11999998888",
    cpf: "123.456.789-09",
    message: "Quero ajudar nos finais de semana.",
    calendario: (new Date()).toLocaleDateString('pt-BR') // exemplo dd/mm/yyyy
}
