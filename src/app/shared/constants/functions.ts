import * as moment from 'moment';

const invalidCPFs = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999"
];

export function formatDate(date: any) {
    if (typeof date === "string") date = new Date(date);
    const day = date.getDate() + 1 < 10? `0${date.getDate() + 1}`: date.getDate() + 1;
    const month = date.getMonth() + 1 < 10? `0${date.getMonth() + 1}`: date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
}
export function formatServerDate(date: any) {
    if (typeof date === "string") date = new Date(date);
    const day = date.getDate() + 1 < 10? `0${date.getDate() + 1}`: date.getDate() + 1;
    const month = date.getMonth() + 1 < 10? `0${date.getMonth() + 1}`: date.getMonth() + 1;
    return `${date.getFullYear()}-${month}-${day}`;
}

export function dateToMomentObject(date) {
    return moment(date).add(1, 'day');
}

export function addDays(date: Date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

export function diffDates(date1: Date, date2: Date) {
    if (date1 > date2) return moment(date1).diff(moment(date2), 'days');
    return moment(date2).diff(moment(date1), 'days');
}

export function formatMoneyValue(value) {
    if (typeof value === "string" && value.startsWith('R$')) {
        value = value
            .replace(/(R\$\s)/, '')
            .replace(/\./g, '')
            .replace(/,/, '.');

        value = Number(value);
    } else if (typeof value === "string") {
        value = Number(value);
    }

    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export function formatFieldMoneyValue(value) {
    if (typeof value === "string") {
        value = value
            .replace(/(R\$\s)/, '')
            .replace(/\./g, '')
            .replace(/,/, '.');

        value = Number(value);
    }

    return value
        .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        .replace(/(\,[0-9]{2})/, '');
}

export function desformatMoneyValue(value) {
    if (typeof(value) === "number") return value;
    return Number(value
        .replace(/(R\$\s)/g, '')
        .replace(/\./g, '')
        .replace(/[,]/g, '.'));
}

export function formatCEP(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/^([0-9]{2})([0-9]{1,})/, '$1.$2')
        .replace(/^([0-9]{2}\.[0-9]{3})([0-9]{1,})/, '$1.$2');
}

export function desformatCEP(value: string) {
    return value.replace(/\D/g, '');
}

export function translateBoolValue(value): string {
    if (typeof value === "string") value = value === "false"? false : true;
    return value? "Sim" : "Não";
}

export function stringValueToBoolean(value): boolean {
    return value === 'false'? false : true;
}

export function formatCPF(cpf: string) {
    return cpf.replace(/\D/g, "")
      .replace(/([0-9]{3})([0-9]{1})/, "$1.$2")
      .replace(/([0-9]{3}\.[0-9]{3})([0-9]{1})/, "$1.$2")
      .replace(/([0-9]{3}\.[0-9]{3}\.[0-9]{3})([0-9]{1})/, "$1-$2")
      .replace(/([0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2})(.)/, "$1");
}

export function formatTelefone(telefone: string) {
    return telefone.replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/^(\(\d{2}\) \d{5})(\d)/, "$1-$2")
      .replace(/^(\(\d{2}\) \d{5}-\d{4})(.)/, "$1");
}

export function formatCNPJ(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/^([0-9]{2})([0-9]{1,})/, '$1.$2')
        .replace(/^([0-9]{2}\.[0-9]{3})([0-9]{1,})/, '$1.$2')
        .replace(/^([0-9]{2}\.[0-9]{3}\.[0-9]{3})([0-9]{1,})/, '$1/$2')
        .replace(/^([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4})([0-9]{1,})/, '$1-$2');
}

export function validateCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length != 11 || invalidCPFs.includes(cpf)) return false;
    
    // Validate first digit 
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;

    // Validate second digit
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;

    return true;
}