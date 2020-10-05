import * as moment from 'moment';

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
    if (typeof value === "number") value = value.toFixed(2);
    return value
        .replace(/R\$ /, '')
        .replace(/\./g, ',')
        .replace(/^([0-9])/, 'R$ $1')
        .replace(/(R\$ [0-9]+,[0-9]{2})./, '$1');
}

export function desformatMoneyValue(value) {
    if (typeof(value) === "number") return value;
    return Number(value.replace(/[R$\s]/g, '').replace(/[,]/g, '.'));
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