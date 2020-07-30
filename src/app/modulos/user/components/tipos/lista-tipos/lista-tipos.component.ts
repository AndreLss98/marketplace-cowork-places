import { Component, OnInit } from '@angular/core';

import { TiposService } from 'src/app/shared/service/tipos.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipos',
  templateUrl: './lista-tipos.component.html',
  styleUrls: ['./lista-tipos.component.scss']
})
export class ListaTiposComponent implements OnInit {

  public tipo;
  public tipos = [];
  public displayedColumns: string[] = ['id', 'nome', 'disponivel'];

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
    private tiposServive: TiposService,
    private formBuilder: FormBuilder,
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
}