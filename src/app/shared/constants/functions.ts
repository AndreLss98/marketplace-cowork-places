export function formatDate(date: Date) {
    const day = date.getDate() + 1 < 10? `0${date.getDate() + 1}`: date.getDate() + 1;
    const month = date.getMonth() + 1 < 10? `0${date.getMonth() + 1}`: date.getMonth() + 1;
    return `${day}/${month}/${date.getFullYear()}`;
}