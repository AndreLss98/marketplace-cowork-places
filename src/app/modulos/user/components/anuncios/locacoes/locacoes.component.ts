import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  templateUrl: './locacoes.component.html',
  styleUrls: ['./locacoes.component.scss']
})
export class LocacoesComponent implements OnInit {

  private alugueis;
  public ativos = [];
  public inativos = [];


  constructor(
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.alugueis = this.route.snapshot.data.alugueis;
    console.log(this.alugueis)
    
    this.processaAlugueis();
  }

  private processaAlugueis(){
    var today = moment().format();
    this.alugueis.forEach(element => {
      
      // Unico
      if(element.paypal_order_id){
        
        if(moment(element.data_saida).isAfter(today)){
          this.ativos.push(element);
        }else{
          this.inativos.push(element)
        }

      // Mensal
      }else if(element.paypal_plan_id){

        if(moment(element.data_saida).isAfter(today)){
          this.ativos.push(element);
        }else{
          this.inativos.push(element)
        }

      }

    });
  }

}
