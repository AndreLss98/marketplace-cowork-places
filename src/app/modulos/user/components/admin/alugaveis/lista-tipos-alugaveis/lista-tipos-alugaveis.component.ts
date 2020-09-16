import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { translateBoolValue } from 'src/app/shared/constants/functions';

import { TiposService } from 'src/app/shared/service/tipos.service';
import { CaracteristicasService } from 'src/app/shared/service/caracteristicas.service';

import { BasicModalComponent } from 'src/app/shared/modal/basic-modal/basic-modal.component';
import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';


@Component({
  selector: 'lista-tipos-alugaveis',
  templateUrl: './lista-tipos-alugaveis.component.html',
  styleUrls: ['./lista-tipos-alugaveis.component.scss']
})
export class ListaTiposAlugaveisComponent extends BasicTableComponent implements OnInit {

  public tipo;
  public editForm: FormGroup;
  public createForm: FormGroup;
  public caracteristicas = [];

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
    private caracteristicasService: CaracteristicasService
  ) {
    super();

    this.caracteristicasService.getAll().subscribe(response => {
      this.caracteristicas = response;
    });

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
      descricao: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      caracteristicas: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.configTable();
    this.fetchAll();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" },
      {
        columnDef: "disponibilidade",
        columnHeaderName: "Disponível?",
        objectProperty: "disponivel",
        formatFunction: translateBoolValue
      }
    ];
    this.displayedColumns = ["nome", "disponibilidade", "actions"];
    this.actions = { editar: false, excluir: true, visualizar: false };
  }

  private fetchAll() {
    this.tiposServive.getAll().subscribe((response: any) => {
      this.data = response;
    });
  }

  public select(event) {
    this.tipo = this.data.find(element => element.id === event.id);
    this.editForm.reset({
      disponivel: this.tipo.disponivel,
      nome: this.tipo.nome,
      icone: this.tipo.icone,
      descricao: this.tipo.descricao,
      id: this.tipo.id
    });
  }

  public update() {
    if (this.editForm.status === "VALID") {
      let updateType = this.editForm.value;
      const id = updateType.id;
      delete updateType.id;
      this.tiposServive.update(id, updateType).subscribe((response) => {
        this.fetchAll();
        this.tipo = null;
      });
    }
  }

  public create() {
    this.tiposServive.create(this.createForm.value).subscribe((response) => {
      this.fetchAll();
      this.createForm.reset({
        disponivel: false,
        nome: "",
        icone: ""
      });
    });
  }

  public deletar(event) {
    this.tiposServive.delete(event.id).subscribe(response => {
      this.fetchAll();
      this.tipo = null;
    }, (error) => {
      this.dialog.open(BasicModalComponent, {
        data: { title: "Aviso!", message: "Não foi possível remover o tipo de anúncio pois já está sendo utilizado." }
      });
    });
  }
}