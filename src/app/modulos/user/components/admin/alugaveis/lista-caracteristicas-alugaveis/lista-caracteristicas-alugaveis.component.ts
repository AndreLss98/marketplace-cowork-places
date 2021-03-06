import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    private caracteristicasService: CaracteristicasService
  ) {
    super();

    this.createForm = formBuilder.group({
      nome: ["", Validators.required],
      icone: [""],
      tipo_campo: ['', [Validators.required]],
      unidade_medida: ['', []],
      descricao: ['', []],
      propriedades: ['']
    });

    this.editForm = formBuilder.group({
      id: [null, Validators.required],
      nome: ["", Validators.required],
      unidade_medida: ['', []],
      icone: [""],
      tipo_campo: ['', [Validators.required]],
      propriedades: ['']
    });
  }

  ngOnInit(): void {
    this.fetchAll();
    this.configTable();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "id", columnHeaderName: "Id", objectProperty: "id" },
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" }
    ];
    this.displayedColumns = ["id", "nome", "actions"];
    this.actions = { editar: true, excluir: true, visualizar: false };
  }

  private fetchAll() {
    this.caracteristicasService.getAll().subscribe((response: any) => {
      this.data = this.caracteristicasService.caracteristicas = response;
    }, (error) => {
      console.log("Fetch error: ", error);
    });
  }

  public create() {
    let caracteristica = this.createForm.value;
    delete caracteristica.propriedades;

    caracteristica.tipo_campo = {
      tipo: this.createForm.controls['tipo_campo'].value.toLowerCase(),
      propriedades: this.createForm.controls['propriedades'].value
    }

    if (caracteristica.tipo_campo.tipo === TIPOS_CAMPOS.SELECAO.nome) {
      caracteristica.tipo_campo.propriedades.possibilidades = this.possibilidadadesSelecao;
    }

    this.caracteristicasService.save(caracteristica).subscribe((response) => {
      this.fetchAll();
      this.resetCreateForm();
      this.possibilidadadesSelecao = [];
    });
  }

  public update() {
    const { id, nome, icone, propriedades, unidade_medida } = this.editForm.value;
    let update: any = { id, nome, icone, unidade_medida };

    update.tipo_campo = {
      id: this.caracteristica.tipo_campo.id,
      tipo: this.caracteristica.tipo_campo.tipo,
      propriedades
    }

    update.tipo_campo.propriedades.id = this.caracteristica.tipo_campo.propriedades.id;

    if (update.tipo_campo.tipo === TIPOS_CAMPOS.SELECAO.nome) {
      update.tipo_campo.propriedades.possibilidades = this.possibilidadadesSelecao.map(element => element);
    }

    this.caracteristicasService.update(update).subscribe(() => {
      this.fetchAll();
      this.caracteristica = null;
      this.possibilidadadesSelecao = [];
    }, (error) => {
      console.log(error);
    });
  }

  public deletar(event) {
    this.caracteristicasService.delete(event.id).subscribe(() => {
      this.fetchAll();
      this.caracteristica = null;
      this.possibilidadadesSelecao = [];
    }, (error) => {
      console.log(error);
    })
  }

  public select(event) {
    let propriedadesGroup = {};
    this.caracteristica = null;
    this.possibilidadadesSelecao = [];
    setTimeout(() => {
      this.caracteristica = this.data.find(element => element.id === event.id);
  
      if (this.caracteristica.tipo_campo.tipo === TIPOS_CAMPOS.SELECAO.nome) {
        this.possibilidadadesSelecao = this.caracteristica.tipo_campo.propriedades.possibilidades.map(element => element);
      }
  
      this.editForm.reset({
        id: this.caracteristica.id,
        nome: this.caracteristica.nome,
        unidade_medida: this.caracteristica.unidade_medida,
        icone: this.caracteristica.icone? this.caracteristica.icone : "",
        tipo_campo: this.caracteristica.tipo_campo.tipo.toUpperCase()
      });
  
      Object.keys(TIPOS_CAMPOS[this.caracteristica.tipo_campo.tipo.toUpperCase()].campos).forEach(campo => {
        let field = TIPOS_CAMPOS[this.caracteristica.tipo_campo.tipo.toUpperCase()].campos[campo];
        field.name = campo;
        propriedadesGroup[campo] = field.required ? new FormControl(this.caracteristica.tipo_campo.propriedades[campo], [Validators.required]) : new FormControl(this.caracteristica.tipo_campo.propriedades[campo]);
      });
  
      this.editForm.controls['propriedades'] = new FormGroup(propriedadesGroup);
    }, 200);
  }

  public cancelEdit() {
    this.possibilidadadesSelecao = [];
    this.caracteristica = null;
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
