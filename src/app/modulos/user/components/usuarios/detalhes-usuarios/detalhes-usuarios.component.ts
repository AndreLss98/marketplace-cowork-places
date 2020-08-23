import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { USUARIO_STATUS } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { DocumentosService } from 'src/app/shared/service/documentos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalhes-usuarios',
  templateUrl: './detalhes-usuarios.component.html',
  styleUrls: ['./detalhes-usuarios.component.scss']
})
export class DetalhesUsuariosComponent implements OnInit {

  readonly USUARIO_STATUS = USUARIO_STATUS;
  public status: any =  Object.values(USUARIO_STATUS);

  public documentos = [];
  public userDocuments = [];
  public documentsTableColumns = [ 'nome', 'action' ];

  public user: any;
  public dataNascimento: string;

  readonly BACK_BASE_URL = environment.apiUrl;

  public validateForm: FormGroup;
  public isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private documentosService: DocumentosService,
    private snack: MatSnackBar
  ) {
    this.validateForm = formBuilder.group({
      id: [null, [Validators.required]],
      status_cadastro: ["", [Validators.required]],
      observacao: ["", []]
    });
  }

  ngOnInit(): void {
    this.fetchDocuments();
    this.user = this.route.snapshot.data.user;
    if (this.user.data_nascimento) this.dataNascimento = this.formatDate(new Date(this.user.data_nascimento));

    this.validateForm.controls.id.setValue(this.user.id);
    this.validateForm.controls.status_cadastro.setValue(this.user.status_cadastro);
    this.validateForm.controls.observacao.setValue(this.user.observacao);
  }

  private formatDate(date: Date): string {
    let formattedDate = '';
    formattedDate = date.getDate() + 1 < 10? `0${date.getDate() + 1}/` : `${date.getDate() + 1}/`;
    formattedDate += date.getMonth() + 1 < 10? `0${date.getMonth() + 1}/` : `${date.getMonth() + 1}/`;
    formattedDate += date.getFullYear();
    return formattedDate;
  }

  private fetchDocuments() {
    this.documentosService.getAll().subscribe(response => {
      const documentosEnviados = this.user.documentos.map(document => document.documento_id);
      this.documentos = response.filter(document => documentosEnviados.includes(document.id));
      this.documentos.forEach(document => {
        document.url = this.user.documentos.find(temp => temp.documento_id === document.id).url;
      });
    });
  }

  validate() {
    this.snack.open('Salvando ...', '', {duration: 2000, verticalPosition: 'top'});
    this.isLoading = true;
    this.userService.validarPerfil(this.validateForm.controls.id.value, this.validateForm.value).subscribe(response => {
      this.isLoading = false;
      this.validateForm.reset({
        id: this.user.id,
        status_cadastro: this.validateForm.controls.status_cadastro.value,
        observacao: this.validateForm.controls.observacao.value
      })
      this.snack.open('Salvo com sucesso!', 'OK', {duration: 2000, verticalPosition: 'top'});
    }, (error) => {
      this.snack.open('Não foi possível salvar', 'OK', {duration: 2000, verticalPosition: 'top'});
      this.isLoading = false;
      this.user.cadastro_validado = !this.user.cadastro_validado;
    });
  }

}
