import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { translateBoolValue } from 'src/app/shared/constants/functions';

import { DocumentosService } from 'src/app/shared/service/documentos.service';

import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';

@Component({
  selector: 'documentos-pessoais',
  templateUrl: './documentos-pessoais.component.html',
  styleUrls: ['./documentos-pessoais.component.scss']
})
export class DocumentosPessoaisComponent extends BasicTableComponent {

  public documento;
  public editForm: FormGroup;
  public createForm: FormGroup;
  public icones = [ 'rg_verde.svg', 'cnh_verde.svg', 'selfie_verde.svg' ];

  constructor(
    private formBuilder: FormBuilder,
    private documentosService: DocumentosService
  ) {
    super();

    this.createForm = formBuilder.group({
      nome: ["", Validators.required],
      icone: ["", []],
      avancado: [false, Validators.required]
    });

    this.editForm = formBuilder.group({
      id: [null, [Validators.required]],
      nome: ["", [Validators.required]],
      icone: ["", []],
      avancado: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchAll();
    this.configTable();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" },
      {
        columnDef: "avancado",
        columnHeaderName: "Cadastro Avançado?",
        objectProperty: "avancado",
        formatFunction: translateBoolValue
      }
    ];
    this.displayedColumns = ["nome", "avancado", "actions"];
    this.actions = { editar: true, excluir: true, visualizar: false };
  }

  private fetchAll() {
    this.documentosService.getAll().subscribe(response => {
      this.data = response;
    });
  }

  public saveDocument() {
    this.documentosService.save(this.createForm.value).subscribe(response => {
      this.fetchAll();
      this.resetCreateForm();
    });
  }

  public updateDocument() {
    this.documentosService.update(this.editForm.value.id, this.editForm.value).subscribe(response => {
      this.documento = null;
      this.fetchAll();
    });
  }

  public selectDocument(event) {
    this.documento = this.data.find(element => element.id === event.id);
    this.editForm.reset({
      id: this.documento.id,
      nome: this.documento.nome,
      icone: this.documento.icone,
      avancado: this.documento.avancado
    })
  }

  private resetCreateForm() {
    this.createForm.reset({
      nome: "",
      avancado: false
    });
  }

  private resetEditForm() {
    this.editForm.reset({
      nome: "",
      avancado: false
    });
  }

  public deletar(event) {
    this.documentosService.deletar(event.id).subscribe(response => {
      this.fetchAll();
    });
  }

  public cancelar(){
    this.documento = null;
  }
}
