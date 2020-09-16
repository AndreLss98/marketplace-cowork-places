import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TIPOS_CAMPOS } from 'src/app/shared/constants/constants';

import { CaracteristicasService } from 'src/app/shared/service/caracteristicas.service';

import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';

@Component({
  selector: 'lista-caracteristicas-alugaveis',
  templateUrl: './lista-caracteristicas-alugaveis.component.html',
  styleUrls: ['./lista-caracteristicas-alugaveis.component.scss']
})
export class ListaCaracteristicasAlugaveisComponent extends BasicTableComponent implements OnInit {

  readonly TIPOS_CAMPOS = TIPOS_CAMPOS;

  public caracteristica;
  public editForm: FormGroup;
  public createForm: FormGroup;

  public possibilidadadesSelecao = [];

  public icones = [
    {
      nome: 'car.svg',
      material: false
    },
    {
      nome: 'desk.svg',
      material: false
    }, {
      nome: 'wifi',
      material: true
    },
    {
      nome: 'aspect_ratio',
      material: true
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private caracteristicasService: CaracteristicasService
  ) {
    super();

    this.createForm = formBuilder.group({
      nome: ["", Validators.required],
      icone: [""],
      tipo_campo: ['', [Validators.required]],
      propriedades: ['']
    });

    this.editForm = formBuilder.group({
      id: [null, Validators.required],
      nome: ["", Validators.required],
      icone: [""]
    });
  }

  ngOnInit(): void {
    this.fetchAll();
    this.configTable();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "id", columnHeaderName: "Id", objectProperty: "id" }        ,
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" }
    ];
    this.displayedColumns = ["id", "nome", "actions"];
    this.actions = { editar: true, excluir: false, visualizar: false };
  }

  private fetchAll() {
    this.caracteristicasService.getAll().subscribe((response: any) => {
      this.data = response;
    }, (error) => {
      //console.log("Fetch error: ", error);
    });
  }

  public create() {
    let caracteristica = this.createForm.value;
    delete caracteristica.propriedades;
    caracteristica.tipo_campo = {
      tipo: this.createForm.controls['tipo_campo'].value.toLowerCase(),
      propriedades: this.createForm.controls['propriedades'].value
    }

    if (caracteristica.tipo === TIPOS_CAMPOS.SELECAO.nome) {
      caracteristica.tipo_campo.propriedades.possibilidades = this.possibilidadadesSelecao;
    }

    this.caracteristicasService.save(caracteristica).subscribe((response) => {
      this.fetchAll();
      this.resetCreateForm();
      this.possibilidadadesSelecao = [];
    });
  }

  public update() {
    if (this.editForm.valid) {
      //console.log('Form: ', this.editForm);
      this.caracteristicasService.update(this.editForm.value).subscribe((response) => {
        this.caracteristica = null;
        this.fetchAll();
      });
    }
  }

  public select(event) {
    this.caracteristica = this.data.find(element => element.id === event.id);
    this.editForm.reset({
      id: this.caracteristica.id,
      nome: this.caracteristica.nome,
      icone: this.caracteristica.icone? this.caracteristica.icone : ""
    });
  }

  private resetCreateForm() {
    this.createForm.reset({
      nome: "",
      icone: "",
      tipo_campo: "",
      propriedades: ""
    });
  }
}
