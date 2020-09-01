import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { BancosService } from 'src/app/shared/service/bancos.service';
import { DocumentosService } from 'src/app/shared/service/documentos.service';
import { ContaBancariaService } from 'src/app/shared/service/conta-bancaria.service';

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
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
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
export class InfoComponent implements OnInit {

  public dadosPessoaisValido = true;
  public editDadosPessoais = false;
  public editDadosBancarios = false;

  public dataNascimento = '';
  public selectedFile: File = null;

  public imgUrl;
  public bankAccountTypes = [ 'Conta Corrente', 'Conta Poupança' ];

  public bancos: any = [];
  public filteredBanks: Observable<string[]>;

  public documentos = [];
  public displayedColumns = [ 'Nome', 'action' ];

  public editInfoForm: FormGroup;
  public editBankAccountForm: FormGroup;
  public data_nascimento = new FormControl(moment());

  public canEditCPF = false;

  constructor(
    private http: HttpClient,
    public snack: MatSnackBar,
    public login: LoginService,
    public formBuilder: FormBuilder,
    public userService: UserService,
    private bancoService: BancosService,
    public documentosService: DocumentosService,
    private contaBancariaService: ContaBancariaService
  ) {
    this.editBankAccountForm = formBuilder.group({
      banco: [null, Validators.required],
      tipo: ["", Validators.required],
      agencia: ["", Validators.required],
      numero: ["", Validators.required]
    });

    this.editInfoForm = formBuilder.group({
      id: [null, Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}')]],
      numero_1: ['', [Validators.required]],
      numero_2: ['', []],
      data_nascimento: this.data_nascimento
    });
  }

  ngOnInit(): void {
    if(!this.userService.user_data) this.login.logout();
    this.imgUrl = this.userService.user_data.img_perfil;
    if(
      !this.userService.user_data.cpf ||
      !this.userService.user_data.email_validado ||
      !this.userService.user_data.data_nascimento ||
      !this.userService.user_data.data_nascimento ||
      !this.userService.user_data.numero_1) this.dadosPessoaisValido =  false;
  
    if(this.userService.user_data.data_nascimento){
      this.userService.user_data.data_nascimento = this.userService.user_data.data_nascimento.split('T')[0];
      this.dataNascimento = this.formatDate(new Date(this.userService.user_data.data_nascimento));
    }

    this.canEditCPF = this.userService.user_data.cpf? false : true;
    this.resetInfoForm();

    this.bancoService.getAll().subscribe(response => {
      this.bancos = response;
    });

    this.filteredBanks = this.editBankAccountForm.controls.banco.valueChanges.pipe(
      startWith(''),
      map(value => this.bankFilter(value))
    );

    if (this.userService.user_data.conta_bancaria) {
      this.resetBankAccountForm();
    }

    this.configDocumentsTable();
  }

  private bankFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.bancos.map(banco => banco.nome).filter(banco => banco.toLowerCase().includes(filterValue));
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
        const documentosEnviados = response.map(documento => documento.documento_id);
        this.documentos = this.documentos.filter(documento => !documentosEnviados.includes(documento.id));
      });
    });
  }

  public actionBankAccountForm() {
    this.snack.open('Salvando ...', 'OK', {verticalPosition: 'top'});
    this.contaBancariaService.updateOrSaveAccount(this.editBankAccountForm.value, this.bancos).subscribe((response: any) => {
      this.userService.user_data.conta_bancaria = response;
      this.resetBankAccountForm();
      this.snack.open('Salvo com sucesso!', 'OK', {duration: 2000, verticalPosition: 'top'});
    }, (error) => {
      this.snack.open('Ocorreu algum erro!', 'OK', {duration: 2000, verticalPosition: 'top'});
      //console.log("Update account error: ", error);
    });
  }

  public actionInfoForm() {
    this.snack.open('Salvando ...', 'OK', {verticalPosition: 'top'});
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
      this.login.verifySession().subscribe(res =>{
        this.editDadosPessoais = false;
        this.resetInfoForm();
        this.snack.open('Salvo com sucesso!', 'OK', {duration: 2000, verticalPosition: 'top'});
      });
    }, (error) => {
      this.snack.dismiss();
      if(error.error.item == "CPF"){
        this.snack.open('CPF já em uso!', 'OK', {duration: 2000, verticalPosition: 'top'});
      }else{
        this.snack.open('Ocorreu algum erro!', 'OK', {duration: 2000, verticalPosition: 'top'});
      }
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
      formattedDate = date.getDate() + 1 < 10? `0${date.getDate() + 1}/` : `${date.getDate() + 1}/`;
      formattedDate += date.getMonth() + 1 < 10? `0${date.getMonth() + 1}/` : `${date.getMonth() + 1}/`;
      formattedDate += date.getFullYear();
    } else {
      formattedDate = `${date.getFullYear()}-`;
      formattedDate += date.getMonth() + 1 < 10? `0${date.getMonth() + 1}-` : `${date.getMonth() + 1}-`;
      formattedDate += date.getDate() + 1 < 10? `0${date.getDate() + 1}` : `${date.getDate() + 1}`;
    }
    return formattedDate;
  }
}
