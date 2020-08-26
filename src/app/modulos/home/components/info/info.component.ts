import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public como_funciona = [
    'QUEREMOS COM ISSO AJUDAR A OTIMIZAR O PROCESSO DE LOCAÇÃO COMPARTILHADAD E OFERTA DE SERVIÇOS',
    'COM A VARIEDADE DE OFERTAS E A CLAREZA NA DIVULGAÇÃO, ACREDITAMOS QUE ENCONTRARA O QUE PROCURA',
    'SOMOS UMA PLATAFORMA QUE AJUDA OS ESPAÇOS E SERVIÇOS A ENCONTRAREM AS PESSOAS',
    'A CONTRATAÇÃO É FEITA DIRETO COM O PROPRIETARIO NAO SOMOS INTERMEDIARIOS',
    'AJUDAMOS NA GESTÃO DE CONTRATOS E PAGAMENTOS',
  ];

  public vantagens = [
    'SEM INTERMEDIAÇÃO',
    'AGILIDADE',
    'SEM BUROCRACIA',
    'SEGURANÇA',
    'GESTAO DE CONTRATOS E PAGAMENTOS',
    'CONFORTO',
    'QUANTIDADE DE PRODUTOS',
    'QUALIDADE',
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
