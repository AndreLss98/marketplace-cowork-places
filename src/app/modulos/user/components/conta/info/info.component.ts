import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { LoginService } from 'src/app/shared/service/login.service';
import { DocumentosService } from 'src/app/shared/service/documentos.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public dataNascimento = '';
  public selectedFile: File = null;

  public imgName = 'assets/svg/avatar.svg';

  public documentos = [];
  public displayedColumns = [ 'Nome', 'Action' ];

  constructor(
    private http: HttpClient,
    public loginService: LoginService,
    public documentosService: DocumentosService
  ) {

  }

  ngOnInit(): void {
    this.dataNascimento = this.formatDate(new Date(this.loginService.user_data.data_nascimento));

    this.configDocumentsTable();
  }

  private formatDate(date: Date): string {
    let formattedDate = '';
    formattedDate = date.getDate() + 1 < 10? `0${date.getDate() + 1}/` : `${date.getDate() + 1}/`;
    formattedDate += date.getMonth() + 1 < 10? `0${date.getMonth() + 1}/` : `${date.getMonth() + 1}/`;
    formattedDate += date.getFullYear();
    return formattedDate;
  }

  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  public updateNewImage() {
    if (this.selectedFile) {
      let form = new FormData();
      form.append('file', this.selectedFile, this.selectedFile.name);
      this.http.post(`${environment.apiUrl}/usuarios/img-perfil`, form, {
        reportProgress: true,
        observe: 'events'
      }).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
        } else if (event.type === HttpEventType.Response) {
          this.imgName = `${environment.apiUrl}/imgs/${event.body.image_name}`;
          this.selectedFile = null;
        }
      }, (error) => {
        console.log("Error: ", error);
      });
    }
  }

  public updateDocument(event, element) {
    if (element) {
      const file = <File>event.target.files[0];
      element.arquivo = file.name;

      let form = new FormData();
      form.append('file', file, file.name);
      form.append('documento_id', element.id);
      this.http.post(`${environment.apiUrl}/usuarios/doc`, form, {
        reportProgress: true,
        observe: 'events'
      }).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
        } else if (event.type === HttpEventType.Response) {
          this.configDocumentsTable();
        }
      }, (error) => {
        console.log("Error: ", error);
      });
    }
  }

  private configDocumentsTable() {
    this.documentosService.getAll().subscribe((response: any) => {
      this.documentos = response;
      this.documentosService.getAllSended().subscribe((response: any) => {
        const documentosEnviados = response.map(documento => documento.documento_id);
        this.documentos = this.documentos.filter(documento => !documentosEnviados.includes(documento.id));
      });
    });
  }

}
