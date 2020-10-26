import { translateBoolValue } from 'src/app/shared/constants/functions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';

import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';
import { TiposAlugaveisDocumentosService } from 'src/app/shared/service/tipos-alugaveis-documentos.service';
import { acceptableFileType } from 'src/app/shared/components/dropzone/dropzone.component';

@Component({
  selector: 'lista-tipos-documentos',
  templateUrl: './lista-tipos-documentos.component.html',
  styleUrls: ['./lista-tipos-documentos.component.scss']
})
export class ListaTiposDocumentosComponent extends BasicTableComponent implements OnInit {

  public docsUrl = `${environment.apiUrl}/tipo-alugavel-documento/doc`;

  readonly docsTypes: acceptableFileType[] = [
    { mime_type: "application/pdf", nome: ".pdf"}
  ];

  public isLoading: boolean = false;

  public createForm: FormGroup;
  public updateForm: FormGroup;

  public tipoDocumento;

  public tempFiles = [];

  constructor(
    private formBuilder: FormBuilder,
    private tipoAlugavelDocumentosService: TiposAlugaveisDocumentosService
  ) {
    super();

    this.createForm = formBuilder.group({
      nome: ['', [Validators.maxLength(200), Validators.required]],
      exclusivo_locatario: [false, [Validators.required]],
      doc: [[], []]
    });

    this.updateForm = formBuilder.group({
      id: [null, [Validators.required]],
      nome: ['', [Validators.maxLength(200), Validators.required]],
      exclusivo_locatario: [false, [Validators.required]],
      doc: [[], []]
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
      }
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
    let temp = this.createForm.value;
    if (temp.doc[0]['url']) temp.url_arq_exemplo = temp.doc[0]['url'];
    delete temp.doc;
    
    this.isLoading = true;
    this.tipoAlugavelDocumentosService.save(temp).subscribe(response => {
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
    let temp = this.updateForm.value;
    if (temp.doc[0]['url']) temp.url_arq_exemplo = temp.doc[0]['url'];
    delete temp.doc;

    this.isLoading = true;
    this.tipoAlugavelDocumentosService.update(temp.id, temp).subscribe(response => {
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
    console.log(this.tipoDocumento);
    this.updateForm.reset({
      id: this.tipoDocumento.id,
      nome: this.tipoDocumento.nome,
      exclusivo_locatario: this.tipoDocumento.exclusivo_locatario
    });

    this.tempFiles = this.tipoDocumento.url_arq_exemplo? [ { src: this.tipoDocumento.url_arq_exemplo, success: true } ] : [];
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
      exclusivo_locatario: false,
      doc: []
    });

    this.createForm.updateValueAndValidity();
  }

  public bindingFormField(field, form: FormGroup, data: any) {
    form.controls[field].setValue(data);
    
    setTimeout(() => {
      form.markAsTouched();
      form.markAllAsTouched();
    }, 1000);
  }
}
