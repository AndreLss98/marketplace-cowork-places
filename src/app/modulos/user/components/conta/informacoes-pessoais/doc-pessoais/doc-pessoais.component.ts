import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { UserService } from 'src/app/shared/service/user.service';
import { DocumentosService } from 'src/app/shared/service/documentos.service';

@Component({
  selector: 'app-doc-pessoais',
  templateUrl: './doc-pessoais.component.html',
  styleUrls: ['./doc-pessoais.component.scss']
})
export class DocPessoaisComponent implements OnInit {

  readonly backEndUrl = environment.apiUrl;
  readonly sendDocsUrl = `${this.backEndUrl}/usuarios/doc`;

  public documentsForm: FormGroup;
  public documentos = [];

  constructor(
    private http: HttpClient,
    public userService: UserService,
    private formBuilder: FormBuilder,
    public documentosService: DocumentosService,
  ) {
    this.documentsForm = formBuilder.group({});
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

  private validateUserDatas() {

  }

  // public updateDocument(event, element) {
  //   if (element) {
  //     const file = <File>event.target.files[0];
  //     element.arquivo = file.name;

  //     let form = new FormData();
  //     form.append('file', file, file.name);
  //     form.append('documento_id', element.id);
  //     this.http.post(`${environment.apiUrl}/usuarios/doc`, form, {
  //       reportProgress: true,
  //       observe: 'events'
  //     }).subscribe((event: any) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         //console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
  //       } else if (event.type === HttpEventType.Response) {
  //         this.configDocumentsTable();
  //       }
  //     }, (error) => {
  //       //console.log("Error: ", error);
  //     });
  //   }
  // }

  private configDocumentsTable() {
    // this.documentosService.getAll().subscribe((response: any) => {
    //   this.documentos = response;
    //   console.log(this.documentos);
    //   this.documentosService.getAllSended().subscribe((response: any) => {
    //     this.documentosEnviados = response;
    //     const enviados = response.map(documento => documento.documento_id);
    //     this.documentos = this.documentos.filter(documento => !enviados.includes(documento.id));
    //   });
    // });
  }
}