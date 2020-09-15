export class Financeiro {

    constructor() { }

    public totalDiaria(qtdDias, valorDiaria) {
        return valorDiaria * qtdDias;
    }

    public totalMensal(qtdDias, valorMensal) {
        return (valorMensal / 31) * qtdDias;
    }

    public calcularTaxas(qtdDias, valor, taxa) {
        return qtdDias * (valor * (taxa / 100));
    }

    public totalPeriodo(qtdDias, valor, taxa, mensal: boolean) {
        return mensal? this.totalMensal(qtdDias, valor) + this.calcularTaxas(qtdDias, valor / 31, taxa) : this.totalDiaria(qtdDias, valor) + this.calcularTaxas(qtdDias, valor, taxa);
    }
}