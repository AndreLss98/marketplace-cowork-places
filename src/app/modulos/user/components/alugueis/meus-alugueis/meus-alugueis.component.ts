import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  templateUrl: './meus-alugueis.component.html',
  styleUrls: ['./meus-alugueis.component.scss']
})
export class MeusAlugueisComponent implements OnInit {

  private alugueis;
  // public em_processamento = [];
  // public cancelados = [];
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
