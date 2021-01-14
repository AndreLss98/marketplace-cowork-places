import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';

import { formatMoneyValue, translateBoolValue } from 'src/app/shared/constants/functions';
import { ALUGAVEL_STATUS, USUARIO_STATUS, TIPOS_CAMPOS } from 'src/app/shared/constants/constants';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-detalhes-alugaveis',
  templateUrl: './detalhes-alugaveis.component.html',
  styleUrls: ['./detalhes-alugaveis.component.scss']
})
export class DetalhesAlugaveisComponent implements OnInit {

  readonly formatMoneyValue = formatMoneyValue;

  public alugavel: any;
  public backURL = `${environment.apiUrl}/`;
  public imgUrl;

  public displayedColumns = ['caracteristica', 'valor'];
  public displayedDocumentsColumns = ['documento', 'action'];

  public status = Object.values(ALUGAVEL_STATUS).filter(status => status.value !== ALUGAVEL_STATUS.REMOVED.value);
  readonly STATUS = ALUGAVEL_STATUS;
  readonly USUARIO_STATUS = USUARIO_STATUS;

  public statusForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alugavelService: AlugavelService,
    private snack: MatSnackBar,
    public userService: UserService
  ) {
    this.statusForm = formBuilder.group({
      status: ['', [Validators.required]],
      observacao: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.alugavel = this.route.snapshot.data['alugavel'];

    this.alugavel.valor = Number(this.alugavel.valor);
    this.alugavel.valor_mes = Number(this.alugavel.valor_mes);

    this.alugavel.caracteristicas.forEach(caracteristica => {
      if (caracteristica.tipo_campo.tipo === TIPOS_CAMPOS.BINARIO.nome) caracteristica.valor = translateBoolValue(caracteristica.valor);
    });
    this.resetStatusForm();
    this.imgUrl = this.alugavel.anunciante_img;
  }

  statusChange() {
    this.snack.open("Salvando ...", '');

    this.alugavel.status = this.statusForm.value.status;
    this.alugavel.observacao = this.statusForm.value.observacao;

    this.alugavelService.alterStatus(this.alugavel.id, this.statusForm.value).subscribe(response => {
      this.resetStatusForm()
      this.snack.open("Salvo com sucesso!", 'OK', { duration: 4000 })
    }, (error) => {
      console.log(error);
      this.snack.open("Ocorreu um erro!", 'OK', { duration: 2000 })
      this.alugavel.disponivel = !this.alugavel.disponivel;
    });
  }

  private resetStatusForm() {
    this.statusForm.reset({
      status: this.alugavel.status,
      observacao: this.alugavel.observacao
    });
  }

  public viewUserDetails(id) {
    console.log(id);

    this.router.navigate([`user/usuarios/${id}`]);
  }
}
