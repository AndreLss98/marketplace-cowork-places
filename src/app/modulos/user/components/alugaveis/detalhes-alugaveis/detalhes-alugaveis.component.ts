import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';

import { ALUGAVEL_STATUS } from './../../../../../shared/constants/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalhes-alugaveis',
  templateUrl: './detalhes-alugaveis.component.html',
  styleUrls: ['./detalhes-alugaveis.component.scss']
})
export class DetalhesAlugaveisComponent implements OnInit {

  public alugavel: any;
  public backURL = `${environment.apiUrl}/`;

  public displayedColumns = [ 'caracteristica', 'valor' ];
  public displayedDocumentsColumns = [ 'documento', 'action' ];

  public status = Object.values(ALUGAVEL_STATUS);
  readonly STATUS = ALUGAVEL_STATUS;

  public statusForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alugavelService: AlugavelService
  ) {
    this.statusForm = formBuilder.group({
      status: ['', [Validators.required]],
      observacao: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.alugavel = this.route.snapshot.data.alugavel;
    this.resetStatusForm();
  }

  statusChange() {
    this.alugavel.status = this.statusForm.value.status;
    this.alugavel.observacao = this.statusForm.value.observacao;
    this.alugavelService.alterStatus(this.alugavel.id, this.statusForm.value).subscribe(response => {
      console.log('Alterado');
      this.resetStatusForm()
    }, (error) => {
      this.alugavel.disponivel = !this.alugavel.disponivel;
    })
  }

  private resetStatusForm() {
    this.statusForm.reset({
      status: this.alugavel.status,
      observacao: this.alugavel.observacao
    })
  }

}
