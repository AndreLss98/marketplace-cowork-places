import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-contrato',
  templateUrl: './detalhes-contrato.component.html',
  styleUrls: ['./detalhes-contrato.component.scss']
})
export class DetalhesContratoComponent implements OnInit {

  public aluguel: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    this.aluguel = this.route.snapshot.data['aluguel'];
  }

  viewUser(id: number) {
    this.router.navigateByUrl(`user/usuarios/${id}`);
  }

}
