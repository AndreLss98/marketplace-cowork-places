import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';

const CUSTOM_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    }
  ]
})
export class DadosPessoaisComponent implements OnInit {

  public dadosPessoaisValido = true;
  public editDadosPessoais = false;
  public dataNascimento = '';
  public selectedFile: File = null;
  public imgUrl;
  public editInfoForm: FormGroup;
  public data_nascimento = new FormControl(moment());
  public canEditCPF = false;

  constructor(
    private http: HttpClient,
    public snack: MatSnackBar,
    public formBuilder: FormBuilder,
    public userService: UserService,
  ) {
    this.editInfoForm = formBuilder.group({
      id: [null, Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}')]],
      numero_1: ['', [Validators.required]],
      numero_2: ['', []],
      data_nascimento: this.data_nascimento
    });
  }

  ngOnInit(): void {
    if (this.userService.user_data) this.validateUserDatas();
  }

  private validateUserDatas() {
    this.imgUrl = this.userService.user_data.img_perfil;

    if (
      !this.userService.user_data.cpf ||
      !this.userService.user_data.email_validado ||
      !this.userService.user_data.data_nascimento ||
      !this.userService.user_data.data_nascimento ||
      !this.userService.user_data.numero_1) this.dadosPessoaisValido = false;

    if (this.userService.user_data.data_nascimento) {
      this.userService.user_data.data_nascimento = this.userService.user_data.data_nascimento.split('T')[0];
      this.dataNascimento = this.formatDate(new Date(this.userService.user_data.data_nascimento));
    }

    this.canEditCPF = this.userService.user_data.cpf ? false : true;
    this.resetInfoForm();
  }

  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let reader = new FileReader();
    reader.onload = (read) => {
      this.imgUrl = read.target.result;
      this.updateNewImage();
    };

    reader.readAsDataURL(this.selectedFile);
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
          //console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
        } else if (event.type === HttpEventType.Response) {
          this.imgUrl = `${environment.apiUrl}/imgs/${event.body.image_name}`;
          this.selectedFile = null;
        }
      }, (error) => {
        //console.log("Error: ", error);
      });
    }
  }

  public actionInfoForm() {
    this.snack.open('Salvando ...', 'OK', { verticalPosition: 'top' });
    let info = this.editInfoForm.value;
    if (!this.dataNascimento) {
      info.data_nascimento = this.formatDate(new Date(info.data_nascimento.subtract(1, 'd')), true);
    } else {
      delete info.data_nascimento;
    }
    //console.log(info);
    this.userService.atualizarDadosPessoais(info).subscribe(response => {
      if (!this.dataNascimento) this.dataNascimento = this.formatDate(new Date(info.data_nascimento));
      this.canEditCPF = false;
      this.userService.user_data.cpf = info.cpf;
      this.editInfoForm.markAsPristine();
      this.editDadosPessoais = false;
      this.resetInfoForm();

      this.snack.open('Salvo com sucesso!', 'OK', { duration: 2000, verticalPosition: 'top' });
    }, (error) => {
      this.snack.dismiss();
      if (error.error.item == "CPF") {
        this.snack.open('CPF já em uso!', 'OK', { duration: 2000, verticalPosition: 'top' });
      } else {
        this.snack.open('Ocorreu algum erro!', 'OK', { duration: 2000, verticalPosition: 'top' });
      }
    });
  }

  private resetInfoForm() {
    this.editInfoForm.reset({
      id: this.userService.user_data.id,
      cpf: this.userService.user_data.cpf,
      numero_1: this.userService.user_data.numero_1,
      numero_2: this.userService.user_data.numero_2
    });
  }

  public formatarCPF(cpf: string) {
    let formatted = cpf;
    formatted = formatted.replace(/\D/g, "")
      .replace(/([0-9]{3})([0-9]{1})/, "$1.$2")
      .replace(/([0-9]{3}\.[0-9]{3})([0-9]{1})/, "$1.$2")
      .replace(/([0-9]{3}\.[0-9]{3}\.[0-9]{3})([0-9]{1})/, "$1-$2")
      .replace(/([0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2})(.)/, "$1");
    this.editInfoForm.controls['cpf'].setValue(formatted);
  }

  public formatarTelefone(campo: string) {
    let formatted = this.editInfoForm.value[campo];
    formatted = formatted.replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/^(\(\d{2}\) \d{5})(\d)/, "$1-$2")
      .replace(/^(\(\d{2}\) \d{5}-\d{4})(.)/, "$1");
    this.editInfoForm.controls[campo].setValue(formatted);
  }

  private formatDate(date: Date, forSave = false): string {
    let formattedDate = '';
    if (!forSave) {
      formattedDate = date.getDate() + 1 < 10 ? `0${date.getDate() + 1}/` : `${date.getDate() + 1}/`;
      formattedDate += date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}/` : `${date.getMonth() + 1}/`;
      formattedDate += date.getFullYear();
    } else {
      formattedDate = `${date.getFullYear()}-`;
      formattedDate += date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}-` : `${date.getMonth() + 1}-`;
      formattedDate += date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : `${date.getDate() + 1}`;
    }
    return formattedDate;
  }
}
