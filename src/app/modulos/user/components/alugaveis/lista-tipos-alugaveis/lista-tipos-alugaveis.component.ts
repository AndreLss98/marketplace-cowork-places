import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TiposService } from 'src/app/shared/service/tipos.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'lista-tipos-alugaveis',
  templateUrl: './lista-tipos-alugaveis.component.html',
  styleUrls: ['./lista-tipos-alugaveis.component.scss']
})
export class ListaTiposAlugaveisComponent implements OnInit {

  public tipo;
  public tipos = [];
  public displayedColumns: string[] = ['id', 'nome', 'disponivel', 'action'];

  public editForm: FormGroup;
  public createForm: FormGroup;

  public icones = [
    'mesas.jpg',
    'servicos.jpg', 
    'palestras.jpg',
    'auditorios.jpg',
    'sala_reuniao.jpg',
    'salas_privativas.jpg',
  ];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private tiposServive: TiposService,
  ) {
    this.editForm = formBuilder.group({
      disponivel: [false, [Validators.required]],
      nome: ["", [Validators.required]],
      icone: ["", [Validators.required]],
      descricao: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      id: [null]
    });

    this.createForm = formBuilder.group({
      disponivel: [false, [Validators.required]],
      nome: ["", [Validators.required]],
      icone: ["", [Validators.required]],
      descricao: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(256)]]
    });
  }

  ngOnInit(): void {
    this.fetchAllType();
  }

  private fetchAllType() {
    this.tiposServive.getAll().subscribe((response: any) => {
      this.tipos = response;
    });
  }

  public setEditComponent(tipo) {
    this.tipo = tipo;
    this.editForm.reset({
      disponivel: this.tipo.disponivel,
      nome: this.tipo.nome,
      icone: this.tipo.icone,
      descricao: this.tipo.descricao,
      id: this.tipo.id
    });
  }

  public updateTipo() {
    if (this.editForm.status === "VALID") {
      let updateType = this.editForm.value;
      const id = updateType.id;
      delete updateType.id;
      this.tiposServive.update(id, updateType).subscribe((response) => {
        this.fetchAllType();
        this.tipo = null;
      });
    }
  }

  public createTipo() {
    this.tiposServive.create(this.createForm.value).subscribe((response) => {
      this.fetchAllType();
      this.createForm.reset({
        disponivel: false,
        nome: "",
        icone: ""
      });
    });
  }

  public deleteTipo(id) {
    this.tiposServive.delete(id).subscribe(response => {
      this.fetchAllType();
      this.tipo = null;
    }, (error) => {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: "Não foi possível remover o tipo de anúncio pois já está sendo utilizado." }
      });
    });
  }
}