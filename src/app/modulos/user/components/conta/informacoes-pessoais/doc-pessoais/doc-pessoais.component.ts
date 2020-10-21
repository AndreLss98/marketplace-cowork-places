import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { DocumentosService } from 'src/app/shared/service/documentos.service';
import { acceptableFileType } from 'src/app/shared/components/dropzone/dropzone.component';

@Component({
  selector: 'app-doc-pessoais',
  templateUrl: './doc-pessoais.component.html',
  styleUrls: ['./doc-pessoais.component.scss']
})
export class DocPessoaisComponent implements OnInit {

  readonly docsTypes: acceptableFileType[] = [
    { mime_type: 'image/jpg', nome: '.jpg' },
    { mime_type: 'image/png', nome: '.png' },
    { mime_type: 'image/jpeg', nome: '.jpeg' },
    { mime_type: "application/pdf", nome: '.pdf'}
  ];

  readonly backEndUrl = environment.apiUrl;
  readonly sendDocsUrl = `${this.backEndUrl}/usuarios/doc`;
  public documentos = [];

  constructor(
    public documentosService: DocumentosService,
  ) {
    
  }

  ngOnInit(): void {
    this.documentosService.getAll().subscribe(response => {
      this.documentos = response;
      this.documentos.forEach(element => {
        element.files = [];
      })
      this.documentosService.getAllSended().subscribe((response: any) => {
        response.forEach(element => {
          const temp = this.documentos.find(documento => documento.id === element.documento_id);
          if (temp) temp.files = [{src: element.url, success: true}]
        });
      });
    });
  }
}