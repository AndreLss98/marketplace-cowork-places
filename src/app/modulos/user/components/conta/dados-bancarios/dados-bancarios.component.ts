import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BancosService } from 'src/app/shared/service/bancos.service';
import { ContaBancariaService } from 'src/app/shared/service/conta-bancaria.service';
import { DocumentosService } from 'src/app/shared/service/documentos.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';


@Component({
  selector: 'app-dados-bancarios',
  templateUrl: './dados-bancarios.component.html',
  styleUrls: ['./dados-bancarios.component.scss']
})
export class DadosBancariosComponent implements OnInit {

  public editBankAccountForm: FormGroup;
  public filteredBanks: Observable<string[]>;
  public bancos: any = [];
  public bankAccountTypes = ['Conta Corrente', 'Conta Poupança'];
  public editDadosBancarios = false;

  constructor(
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
  }
  ngOnInit(): void {
    if (this.userService.user_data) this.validateUserDatas();

    this.bancoService.getAll().subscribe(response => {
      this.bancos = response;
    });

    this.filteredBanks = this.editBankAccountForm.controls.banco.valueChanges.pipe(
      startWith(''),
      map(value => this.bankFilter(value))
    );
  }

  private validateUserDatas() {
    if (this.userService.user_data.conta_bancaria) {
      this.resetBankAccountForm();
    }
  }

  private bankFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.bancos.map(banco => banco.nome).filter(banco => banco.toLowerCase().includes(filterValue));
  }

  public actionBankAccountForm() {
    this.snack.open('Salvando ...', 'OK', { verticalPosition: 'top' });
    this.contaBancariaService.updateOrSaveAccount(this.editBankAccountForm.value, this.bancos).subscribe((response: any) => {
      this.userService.user_data.conta_bancaria = response;
      this.resetBankAccountForm();
      this.snack.open('Salvo com sucesso!', 'OK', { duration: 2000, verticalPosition: 'top' });
    }, (error) => {
      this.snack.open('Ocorreu algum erro!', 'OK', { duration: 2000, verticalPosition: 'top' });
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
}
