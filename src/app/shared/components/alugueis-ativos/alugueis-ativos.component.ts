import { map } from 'rxjs/operators';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';
import { AluguelService } from './../../service/aluguel.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alugueis-ativos',
  templateUrl: './alugueis-ativos.component.html',
  styleUrls: ['./alugueis-ativos.component.scss']
})
export class AlugueisAtivosComponent implements OnInit {

  @Input('locadorBool') locadorBool: boolean = false;
  @Input('locatarioBool') locatarioBool: boolean = false;
  @Input('aluguel_id') aluguel_id: any;

  public aluguel;

  constructor(
    public aluguelService: AluguelService,
  ) { }

  ngOnInit(): void {
    this.aluguelService.getDetailsAluguel(this.aluguel_id)
    .subscribe(res =>{
      this.aluguel = res;
      console.log(res);
    });
  }

}
