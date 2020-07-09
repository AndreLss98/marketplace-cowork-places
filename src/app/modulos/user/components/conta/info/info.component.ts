import { UserService } from './../../../../../shared/service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { LoginService } from 'src/app/shared/service/login.service';
import { DocumentosService } from 'src/app/shared/service/documentos.service';
import { ContaBancariaService } from 'src/app/shared/service/conta-bancaria.service';

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

  public editInfoForm: FormGroup;
  public editBankAccountForm: FormGroup;

  constructor(
    private http: HttpClient,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public documentosService: DocumentosService,
    private contaBancariaService: ContaBancariaService,
  ) {
    this.editBankAccountForm = formBuilder.group({
      banco: ["", Validators.required],
      tipo: ["", Validators.required],
      agencia: ["", Validators.required],
      numero: ["", Validators.required]
    });

    this.editInfoForm = formBuilder.group({
      id: [null, Validators.required],
      numero_1: ["", [Validators.required]],
      numero_2: ["", []]
    });
  }

  ngOnInit(): void {
    console.log("User: ", this.userService.user_data);
    this.dataNascimento = this.formatDate(new Date(this.userService.user_data.data_nascimento));
    this.resetInfoForm();

    if (this.userService.user_data.conta_bancaria) {
      this.resetBankAccountForm();
    }

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

  public actionBankAccountForm() {
    this.contaBancariaService.updateOrSaveAccount(this.editBankAccountForm.value).subscribe((response: any) => {
      this.userService.user_data.conta_bancaria = response;
      this.resetBankAccountForm();
    }, (error) => {
      console.log("Update account error: ", error);
    });
  }

  public actionInfoForm() {
    this.userService.atualizarDadosPessoais(this.editInfoForm.value).subscribe(response => {
      this.editInfoForm.markAsPristine()
    }, (error) => {
      console.log("Edit info error: ", error);
    });
  }

  private resetBankAccountForm() {
    this.editBankAccountForm.reset({
      banco: this.userService.user_data.conta_bancaria.banco,
      tipo: this.userService.user_data.conta_bancaria.tipo,
      agencia: this.userService.user_data.conta_bancaria.agencia,
      numero: this.userService.user_data.conta_bancaria.numero,
    });
  }

  private resetInfoForm() {
    this.editInfoForm.reset({
      id: this.userService.user_data.id,
      numero_1: this.userService.user_data.numero_1,
      numero_2: this.userService.user_data.numero_2
    });
  }

}
