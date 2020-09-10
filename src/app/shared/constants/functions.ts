export function formatDate(date: any) {
    if (typeof date === "string") date = new Date(date);
    const day = date.getDate() + 1 < 10? `0${date.getDate() + 1}`: date.getDate() + 1;
    const month = date.getMonth() + 1 < 10? `0${date.getMonth() + 1}`: date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
}

export function formatMoneyValue(value) {
    return `R$ ${value.replace(/\./g, ',')}`;
}

export function translateBoolValue(value): string {
    return value? "Sim" : "Não";
}