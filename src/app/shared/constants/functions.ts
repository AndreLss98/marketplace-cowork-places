import * as moment from 'moment';

export function formatDate(date: any) {
    if (typeof date === "string") date = new Date(date);
    const day = date.getDate() + 1 < 10? `0${date.getDate() + 1}`: date.getDate() + 1;
    const month = date.getMonth() + 1 < 10? `0${date.getMonth() + 1}`: date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
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

export function desformatMoneyValue(value: string) {
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
    return value? "Sim" : "Não";
}