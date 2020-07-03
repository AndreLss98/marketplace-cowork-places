import { element } from 'protractor';
import { environment } from './../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HighlightService } from 'src/app/shared/service/highlight.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class SpacesComponent implements OnInit {

  // Datas de entrada e saida
  public entrada;
  public saida;
  public hoje = moment().format();

  public backUrl = environment.apiUrl;
  public espaco;
  public data = {
    dadosCompra: {
      dadosEspaco: {
        condicoes: [
          'Para locações com prazo superior a 30 dias é necessário a utilização de um contrato e contratação de um seguro.',
          'Poderá ser dividido em até 10x a 1ª locação. Limitada a cada usuario.',
          'Caso o prazo se estenda por mais de 30 dias, o locador poderá aprovar ou não a solicitação.'
        ]
      },
    }
  }
  
  constructor(
    private highlight: HighlightService,
    private route: ActivatedRoute
    ) { }
    
    ngOnInit(): void {
      console.log(this.hoje);
      this.espaco = this.route.snapshot.data['data'];
  
      console.log('Resolver: ', this.espaco);
  
      // if(window.innerWidth <= 600){
      //   this.espacos_similares = this.highlight.getSomeSpaces(1);
      // } else if(window.innerWidth <= 900){
      //   this.espacos_similares = this.highlight.getSomeSpaces(2);
      // } else if(window.innerWidth <= 1224){
      //   this.espacos_similares = this.highlight.getSomeSpaces(3);
      // } else {
      //   this.espacos_similares = this.highlight.getSomeSpaces(4);
      // }
    }
    /**
     * Retorna um array com os nomes dos icones, para as estrelas da avalição
     * pode ser star, star_half, star_outline
     */
    public countStars(n: number): string[] {
      // let n:number = ;
      let array = [];
      let j = 0;
      
      for (let index = 0; index < Math.floor(n); index++) {
        j++
        array.push('start');
      }
      
      if(n-j){
      array.push('star_half');
    }

    while(array.length < 5){
      array.push('star_outline')
    }
   
    return array;
  }

  public calculaCustoDia(taxa, custo_dia): number{
    if(taxa == 7){
      return Number(custo_dia);
    }else if(taxa == 3.5){
      return Number(custo_dia * (taxa/100 + 1))
    }else{
      return Number(custo_dia * 1.07)
    }
  }

  public calculaTaxa(taxa, custo_dia): number{
    return Number(custo_dia * (taxa/100))
  }

  public calculaTotal(taxa, custo_dia): number{
    return Number(this.calculaCustoDia(taxa, custo_dia) + this.calculaTaxa(taxa, custo_dia));
  }

  public calculaTotalPeriodo(taxa, custo_dia):number{
    let b = this.entrada;
    let a = this.saida;
    if(a == undefined || b == undefined){ 
      return Number(this.calculaTotal(taxa, custo_dia));
    }else{
      return Number(a.diff(b, 'days') * this.calculaTotal(taxa, custo_dia));
    }
  }

  selecionaData(type: string, event: MatDatepickerInputEvent<Date>) {
    if(type == 'entrada'){
      this.entrada = moment(event.value)
    }else if(type == 'saida'){
      this.saida = moment(event.value)
    }
  }


}
