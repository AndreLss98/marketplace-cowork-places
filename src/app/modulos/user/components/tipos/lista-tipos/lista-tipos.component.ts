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
      id: [null]
    });

    this.createForm = formBuilder.group({
      disponivel: [false, [Validators.required]],
      nome: ["", [Validators.required]],
      icone: ["", [Validators.required]]
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
    if (this.createForm.status === "VALID") {
      this.tiposServive.create(this.createForm.value).subscribe((response) => {
        this.fetchAllType();
        this.createForm.reset({
          disponivel: false,
          nome: "",
          icone: ""
        });
      })
    }
  }
}