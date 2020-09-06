import { Component, OnInit } from '@angular/core';

import { CondicoesService } from 'src/app/shared/service/condicoes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-condicoes',
  templateUrl: './condicoes.component.html',
  styleUrls: ['./condicoes.component.scss']
})
export class CondicoesComponent implements OnInit {

  public condicao;
  public condicoes = [];

  public displayedColumns = ['id', 'descricao'];

  public saveForm: FormGroup;
  public editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private condicoesService: CondicoesService
  ) {
    this.saveForm = formBuilder.group({
      descricao: ["", [Validators.required]]
    });

    this.editForm = formBuilder.group({
      id: [null, [Validators.required]],
      descricao: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll() {
    this.condicoesService.getAll().subscribe(response => {
      this.condicoes = response;
    }, (error) => {
      //console.log('Error: ', error);
    });
  }

  public selectCondition(condition) {
    this.condicao = condition;
    this.editForm.reset({
      id: this.condicao.id,
      descricao: this.condicao.descricao
    })
  }

  public saveCondition() {
    this.condicoesService.save(this.saveForm.value).subscribe(response => {
      this.resetSaveForm();
      this.fetchAll();
    }, (error) => {
      //console.log('Error: ', error);
    });
  }

  public editCondition() {
    this.condicoesService.update(this.editForm.value).subscribe(response => {
      this.condicao = null;
      this.fetchAll();
    }, (error) => {
      //console.log('Error: ', error);
    });
  }

  private resetSaveForm() {
    this.saveForm.reset({
      descricao: ""
    })
  }

}
