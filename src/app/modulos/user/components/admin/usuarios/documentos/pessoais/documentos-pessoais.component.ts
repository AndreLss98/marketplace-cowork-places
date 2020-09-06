import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DocumentosService } from 'src/app/shared/service/documentos.service';

@Component({
  selector: 'documentos-pessoais',
  templateUrl: './documentos-pessoais.component.html',
  styleUrls: ['./documentos-pessoais.component.scss']
})
export class DocumentosPessoaisComponent implements OnInit {

  public documentos = [];
  public documento;

  public editForm: FormGroup;
  public createForm: FormGroup;

  public icones = [ 'rg_verde.svg', 'cnh_verde.svg', 'selfie_verde.svg' ];
  public displayedColumns = [ 'id', 'nome', 'avancado', 'action' ];

  constructor(
    private formBuilder: FormBuilder,
    private documentosService: DocumentosService
  ) {
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
  }

  private fetchAll() {
    this.documentosService.getAll().subscribe(response => {
      this.documentos = response;
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
      this.documento;
      this.fetchAll();
    });
  }

  public selectDocument(document) {
    this.documento = document;
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

  public deletar(id) {
    this.documentosService.deletar(id).subscribe(response => {
      this.fetchAll();
    })
  }

}
