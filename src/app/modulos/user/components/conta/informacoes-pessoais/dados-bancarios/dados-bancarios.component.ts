import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { BancosService } from 'src/app/shared/service/bancos.service';
import { DocumentosService } from 'src/app/shared/service/documentos.service';
import { ContaBancariaService } from 'src/app/shared/service/conta-bancaria.service';

@Component({
  selector: 'app-dados-bancarios',
  templateUrl: './dados-bancarios.component.html',
  styleUrls: ['./dados-bancarios.component.scss']
})
export class DadosBancariosComponent implements OnInit {

  public editBankAccountForm: FormGroup;
  public editBankAccountJuridicForm: FormGroup;
  public filteredBanks: Observable<string[]>;
  public filteredJuridicBanks: Observable<string[]>;
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
      id: [null, []],
      banco: [null, Validators.required],
      tipo: ["", Validators.required],
      agencia: ["", Validators.required],
      numero: ["", Validators.required]
    });

    this.editBankAccountJuridicForm = formBuilder.group({
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

    this.filteredJuridicBanks = this.editBankAccountJuridicForm.controls.banco.valueChanges.pipe(
      startWith(''),
      map(value => this.bankFilter(value))
    );
  }

  private validateUserDatas() {
    if (this.userService.user_data.conta_bancaria)
      this.resetBankAccountForm();

    if (this.userService.user_data.pessoa_juridica
        && this.userService.user_data.pessoa_juridica.conta_bancaria)
          this.resetBankAccountJuridicForm();
  }

  private bankFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.bancos.map(banco => banco.nome).filter(banco => banco.toLowerCase().includes(filterValue));
  }

  public actionBankAccountForm() {
    this.snack.open('Salvando ...', '', { verticalPosition: 'bottom', duration: 2000 });

    this.contaBancariaService.updateOrSaveAccount(this.editBankAccountForm.value, this.bancos).subscribe((response: any) => {
      this.userService.user_data.conta_bancaria = response;
      this.resetBankAccountForm();
      this.snack.open('Salvo com sucesso!', 'OK', { duration: 2000, verticalPosition: 'bottom' });
    }, (error) => {
      this.snack.open('Ocorreu algum erro!', 'OK', { duration: 2000, verticalPosition: 'bottom' });
    });
  }

  public actionBankAccountJuridicForm() {
    this.snack.open('Salvando ...', '', { verticalPosition: 'bottom', duration: 3000 });
    console.log(this.editBankAccountJuridicForm.value);

    this.contaBancariaService.updateOrSaveAccount(this.editBankAccountJuridicForm.value, this.bancos, true)
    .subscribe((response: any) => {
      this.userService.user_data.pessoa_juridica.conta_bancaria = response;
      // this.resetBankAccountForm();
      this.snack.open('Salvo com sucesso!', 'OK', { duration: 2000, verticalPosition: 'bottom' });
    }, (error) => {
      this.snack.open('Ocorreu algum erro!', 'OK', { duration: 2000, verticalPosition: 'bottom' });
    });
  }

  private resetBankAccountForm() {
    this.editBankAccountForm.reset({
      id: this.userService.user_data.conta_bancaria.id,
      banco: this.userService.user_data.conta_bancaria.banco,
      tipo: this.userService.user_data.conta_bancaria.tipo,
      agencia: this.userService.user_data.conta_bancaria.agencia,
      numero: this.userService.user_data.conta_bancaria.numero,
    });
  }

  private resetBankAccountJuridicForm() {

    this.editBankAccountJuridicForm.reset({
      id: this.userService.user_data.pessoa_juridica.conta_bancaria.id,
      banco: this.userService.user_data.pessoa_juridica.conta_bancaria.banco,
      tipo: this.userService.user_data.pessoa_juridica.conta_bancaria.tipo,
      agencia: this.userService.user_data.pessoa_juridica.conta_bancaria.agencia,
      numero: this.userService.user_data.pessoa_juridica.conta_bancaria.numero,
    });
  }
}
