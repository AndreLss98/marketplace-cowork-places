import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DocumentosService } from 'src/app/shared/service/documentos.service';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doc-pessoais',
  templateUrl: './doc-pessoais.component.html',
  styleUrls: ['./doc-pessoais.component.scss']
})
export class DocPessoaisComponent implements OnInit {

  public documentos = [];
  public displayedColumns = ['Nome', 'action'];
  public documentosEnviados: any;

  constructor(
    private http: HttpClient,
    public userService: UserService,
    public documentosService: DocumentosService,
  ) { }

  ngOnInit(): void {
    if (this.userService.user_data) this.validateUserDatas();

  }

  private validateUserDatas() {
    this.configDocumentsTable();
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
          //console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
        } else if (event.type === HttpEventType.Response) {
          this.configDocumentsTable();
        }
      }, (error) => {
        //console.log("Error: ", error);
      });
    }
  }

  private configDocumentsTable() {
    this.documentosService.getAll().subscribe((response: any) => {
      this.documentos = response;
      this.documentosService.getAllSended().subscribe((response: any) => {
        this.documentosEnviados = response;
        const enviados = response.map(documento => documento.documento_id);
        this.documentos = this.documentos.filter(documento => !enviados.includes(documento.id));
      });
    });
  }
}