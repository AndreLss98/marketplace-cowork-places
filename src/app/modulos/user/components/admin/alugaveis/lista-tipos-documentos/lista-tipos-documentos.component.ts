import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';
import { TiposAlugaveisDocumentosService } from 'src/app/shared/service/tipos-alugaveis-documentos.service';

@Component({
  selector: 'lista-tipos-documentos',
  templateUrl: './lista-tipos-documentos.component.html',
  styleUrls: ['./lista-tipos-documentos.component.scss']
})
export class ListaTiposDocumentosComponent extends BasicTableComponent implements OnInit {

  public isLoading: boolean = false;

  public createForm: FormGroup;
  public updateForm: FormGroup;

  public tipoDocumento;

  constructor(
    private formBuilder: FormBuilder,
    private tipoAlugavelDocumentosService: TiposAlugaveisDocumentosService
  ) {
    super();

    this.createForm = formBuilder.group({
      nome: ['', [Validators.maxLength(200), Validators.required]],
      dono: [false, [Validators.required]]
    });

    this.updateForm = formBuilder.group({
      id: [null, [Validators.required]],
      nome: ['', [Validators.maxLength(200), Validators.required]],
      dono: [false, [Validators.required]]
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
    this.tipoAlugavelDocumentosService.getAll().subscribe((response: any) => {
      this.data = this.tipoAlugavelDocumentosService.tiposDocumentos = response;
    }, (error) => {
      console.log("Fetch error: ", error);
    });
  }

  create() {
    this.isLoading = true;
    this.tipoAlugavelDocumentosService.save(this.createForm.value).subscribe(response => {
      this.fetchAll();
      this.resetCreateForm();
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  update() {
    this.isLoading = true;
    this.tipoAlugavelDocumentosService.update(this.updateForm.value.id, this.updateForm.value).subscribe(response => {
      this.tipoDocumento = null;
      this.fetchAll();
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  select({ id }) {
    const temp = this.data.find(tipoDoc => tipoDoc.id === id);
    this.tipoDocumento = temp;
    this.updateForm.reset({
      id: this.tipoDocumento.id,
      nome: this.tipoDocumento.nome,
      dono: this.tipoDocumento.dono
    });
  }

  deletar({ id }) {
    this.tipoAlugavelDocumentosService.delete(id).subscribe(response => {
      this.fetchAll();
    }, (error) => {
      console.log(error);
    });
  }

  private resetCreateForm() {
    this.createForm.reset({
      nome: '',
      dono: false
    });

    this.createForm.markAsPristine();
  }
}
