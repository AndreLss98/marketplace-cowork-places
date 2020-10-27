import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PublicAlvoService } from 'src/app/shared/service/public-alvo.service';

import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';

@Component({
  selector: 'lista-public-alvo',
  templateUrl: './lista-public-alvo.component.html',
  styleUrls: ['./lista-public-alvo.component.scss']
})
export class ListaPublicAlvoComponent extends BasicTableComponent
implements OnInit {

  public createForm: FormGroup;
  public editForm: FormGroup;

  public publicoAlvo;
  public isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public publicoAlvoService: PublicAlvoService
  ) {
    super();

    this.createForm = formBuilder.group({
      nome: ['', [Validators.maxLength(100), Validators.required]]
    });
    
    this.editForm = formBuilder.group({
      id: [null, [Validators.required]],
      nome: ['', [Validators.maxLength(100), Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchAll();
    this.configTable();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "id", columnHeaderName: "Id", objectProperty: "id" },
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" }
    ];
    this.displayedColumns = ["id", "nome", "actions"];
    this.actions = { editar: true, excluir: true, visualizar: false };
  }

  private fetchAll() {
    this.publicoAlvoService.getAll().subscribe(response => {
      this.data = this.publicoAlvoService.publicoAlvo = response;
    }, (error) => {
      console.log('Fetch error: ', error)
    });
  }

  public create() {
    this.isLoading = true;

    this.publicoAlvoService.save(this.createForm.value).subscribe(() => {
      this.isLoading = false;
      this.fetchAll();
      this.resetCreateForm();
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  public update() {
    this.isLoading = true;
    this.publicoAlvoService.update(this.publicoAlvo.id, this.editForm.value).subscribe(() => {
      this.isLoading = false;
      this.publicoAlvo = null;
      this.fetchAll();  
    }, (error) => {
      console.log("Update failed", error);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  private resetCreateForm() {
    this.createForm.reset({
      nome: ''
    });
  }

  public deletar({ id }) {
    this.publicoAlvoService.delete(id).subscribe(() => {
      this.fetchAll();
    }, (error) => {
      console.log('Delete failed: ', error);
    })
  }

  public select({ id }) {
    this.publicoAlvo = this.data.find(el => el.id === id);

    this.editForm.reset({
      id: this.publicoAlvo.id,
      nome: this.publicoAlvo.nome
    });

    this.editForm.updateValueAndValidity();
  }
}
