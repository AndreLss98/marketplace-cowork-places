export class Financeiro {

    constructor() { }

    public calcularDiaria(valor, taxaAtual, taxaMaxima) {
        return valor - valor * ((taxaMaxima - taxaAtual)/100);
    }

    public totalNoValorDiaria(qtdDias, valorDiaria) {
        return valorDiaria * qtdDias;
    }

    public totalNoValorMensal(qtdDias, valorMensal) {
        return (valorMensal / 31) * qtdDias;
    }

    public totalTaxas(qtdDias, taxaDiaria) {
        return qtdDias * taxaDiaria;
    }

    public calcularTaxa(taxaMaxima, valorReferencia) {
        return valorReferencia * (taxaMaxima/100);
    }

    public total(totalPeriodo, totalTaxas) {
        return totalPeriodo + totalTaxas;
    }
}