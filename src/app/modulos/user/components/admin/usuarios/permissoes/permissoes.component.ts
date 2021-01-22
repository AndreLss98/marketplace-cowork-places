import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PublicAlvoService } from 'src/app/shared/service/public-alvo.service';

import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';
import { UserService } from 'src/app/shared/service/user.service';
import { FIRST_PAGE_SIZE } from 'src/app/shared/constants/constants';
import { FilterPageableTableComponent } from 'src/app/shared/components/filter-pageable-table/filter-pageable-table.component';
import { PerfilService } from 'src/app/shared/service/perfis.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.scss']
})
export class PermissoesComponent extends FilterPageableTableComponent
  implements OnInit {

  public createForm: FormGroup;
  public editForm: FormGroup;
  public usuario;
  public perfis = [];
  public isLoading: boolean = false;
  public id;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public perfilService: PerfilService,
    public snack: MatSnackBar,

  ) {
    super();

    this.editForm = formBuilder.group({
      id: [''],
      nome: [''],
      perfil_id: ['']
    });

    this.editForm.controls['nome'].disable();
  }

  ngOnInit(): void {
    this.fetchAll();
    this.configTable();
    this.getAllPerfis();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "id", columnHeaderName: "Id", objectProperty: "id" },
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" }
    ];
    this.displayedColumns = ["id", "nome", "actions"];
    this.actions = { editar: true, excluir: false, visualizar: false };
  }

  public fetchAll(pager?) {
    this.userService.getAll(
      pager ? pager.pageIndex + 1 : 1,
      pager ? this.pager.pageSize : FIRST_PAGE_SIZE)
      .subscribe(response => {
        this.pager.length = response.total_itens;
        this.data = response.results;
        this.data.forEach(user => {
          user.nome = `${user.nome} ${user.sobrenome}`;
          delete user.sobrenome;
        })
      }, (error) => {
        console.log("Error: ", error);
      });
  }

  public getAllPerfis() {
    this.perfilService.getAll().subscribe(perfis => {
      this.perfis = perfis;
    })
  }

  public pagerEvent(event) {
    this.pager = event;
    this.fetchAll(event);
  }

  public update() {
    this.snack.open('Salvando ...', 'OK', { verticalPosition: 'bottom' });

    let info = this.editForm.value;

    this.userService.updatePerfil(info).subscribe(response => {
      this.userService.getById(this.id).subscribe(user => {
        user = {
          ...user,
          ...info
        }
      })
      this.snack.open('Salvo com sucesso!', 'OK', { duration: 2000, verticalPosition: 'bottom' });
      this.getAllPerfis();
    }, (error) => {
      this.snack.dismiss();
      this.snack.open('Ocorreu algum erro!', 'OK', { duration: 2000, verticalPosition: 'bottom' });
    });
  }

  private resetCreateForm() {
    this.createForm.reset({
      id: '',
      nome: '',
      perfil_id: ''
    });
  }

  public select({ id }) {
    this.id = id;

    this.usuario = this.data.find(el => el.id === id);

    this.editForm.reset({
      id: this.usuario.id,
      nome: this.usuario.nome,
      perfil_id: this.usuario.perfil_id
    });

    this.editForm.updateValueAndValidity();
  }
}
