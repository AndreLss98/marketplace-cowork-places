import { translateBoolValue } from 'src/app/shared/constants/functions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';
import { TiposAlugaveisDocumentosService } from 'src/app/shared/service/tipos-alugaveis-documentos.service';
import { acceptableFileType } from 'src/app/shared/components/dropzone/dropzone.component';

@Component({
  selector: 'lista-tipos-documentos',
  templateUrl: './lista-tipos-documentos.component.html',
  styleUrls: ['./lista-tipos-documentos.component.scss']
})
export class ListaTiposDocumentosComponent extends BasicTableComponent implements OnInit {

  readonly docsTypes: acceptableFileType[] = [
    { mime_type: "application/pdf", nome: ".pdf"}
  ];

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
      exclusivo_locatario: [false, [Validators.required]]
    });

    this.updateForm = formBuilder.group({
      id: [null, [Validators.required]],
      nome: ['', [Validators.maxLength(200), Validators.required]],
      exclusivo_locatario: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchAll();
    this.configTable();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "id", columnHeaderName: "Id", objectProperty: "id" },
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" },
      {
        columnDef: "exclusivo",
        columnHeaderName: "Exclusivo Locatário",
        objectProperty: "exclusivo_locatario",
        formatFunction: translateBoolValue
      },
    ];

    this.displayedColumns = ["id", "nome", "exclusivo", "actions"];
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
    this.tipoDocumento = this.data.find(tipoDoc => tipoDoc.id === id);
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
      exclusivo_locatario: false
    });

    this.createForm.updateValueAndValidity();
  }
}
