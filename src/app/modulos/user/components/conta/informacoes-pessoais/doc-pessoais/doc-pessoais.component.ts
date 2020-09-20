import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { DocumentosService } from 'src/app/shared/service/documentos.service';

@Component({
  selector: 'app-doc-pessoais',
  templateUrl: './doc-pessoais.component.html',
  styleUrls: ['./doc-pessoais.component.scss']
})
export class DocPessoaisComponent implements OnInit {

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
        console.log('Enviados: ', response);
        response.forEach(element => {
          const temp = this.documentos.find(documento => documento.id === element.documento_id);
          if (temp) temp.files = [{src: `${this.backEndUrl}/docs/${element.url}`, success: true}]
        });
      });
    });
  }
}