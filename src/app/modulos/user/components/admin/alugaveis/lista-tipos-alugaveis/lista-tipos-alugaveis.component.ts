import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { translateBoolValue } from 'src/app/shared/constants/functions';

import { TiposService } from 'src/app/shared/service/tipos.service';
import { CaracteristicasService } from 'src/app/shared/service/caracteristicas.service';

import { BasicModalComponent } from 'src/app/shared/modal/basic-modal/basic-modal.component';
import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';
import { TiposAlugaveisDocumentosService } from 'src/app/shared/service/tipos-alugaveis-documentos.service';


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

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private tiposServive: TiposService,
    public caracteristicasService: CaracteristicasService,
    public tipoAlugavelDocumento: TiposAlugaveisDocumentosService
  ) {
    super();

    this.caracteristicasService.getAll().subscribe(response => {
      this.caracteristicas = this.caracteristicasService.caracteristicas = response;
    });

    this.editForm = formBuilder.group({
      id: [null],
      disponivel: [false, [Validators.required]],
      nome: ["", [Validators.required]],
      icone: ["", []],
      descricao: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      caracteristicas: [null, [Validators.required]],
      documentos: [null, [Validators.required]],
      chamado: ['', [Validators.minLength(1), Validators.maxLength(100), Validators.required]],
      desc_chamado: ['', [Validators.minLength(1), Validators.maxLength(100)]]
    });

    this.createForm = formBuilder.group({
      disponivel: [false, [Validators.required]],
      nome: ["", [Validators.required]],
      icone: ["", []],
      descricao: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      caracteristicas: [null, [Validators.required]],
      documentos: [null, [Validators.required]],
      chamado: ['', [Validators.minLength(1), Validators.maxLength(100), Validators.required]],
      desc_chamado: ['', [Validators.minLength(1), Validators.maxLength(100)]]
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
        columnHeaderName: "Dispon??vel?",
        objectProperty: "disponivel",
        formatFunction: translateBoolValue
      }
    ];
    this.displayedColumns = ["nome", "disponibilidade", "actions"];
    this.actions = { editar: true, excluir: true, visualizar: false };
  }

  private fetchAll() {
    this.tiposServive.getAll().subscribe((response: any) => {
      this.data = response;
    });
  }

  public select(event) {
    this.tipo = this.data.find(element => element.id === event.id);
    this.editForm.reset({
      id: this.tipo.id,
      nome: this.tipo.nome,
      icone: this.tipo.icone,
      descricao: this.tipo.descricao,
      disponivel: this.tipo.disponivel,
      documentos: this.tipo.documentos,
      caracteristicas: this.tipo.caracteristicas,
      chamado: this.tipo.chamado,
      desc_chamado: this.tipo.desc_chamado
    });
  }

  public update() {
    let update = this.editForm.value;
    const id = update.id;
    delete update.id;
    this.tiposServive.update(id, update).subscribe((response) => {
      this.fetchAll();
      this.tipo = null;
    }, (error) => {
      console.log(error);
    });
  }

  public create() {
    this.tiposServive.create(this.createForm.value).subscribe((response) => {
      this.fetchAll();
      this.createForm.reset({
        disponivel: false,
        nome: "",
        icone: ""
      });
    }, (error) => {
      this.dialog.open(BasicModalComponent, {
        data: { title: "Aviso!", message: "Ocorreu um erro ao criar o tipo de an??ncio." }
      });
    });
  }

  public deletar(event) {
    this.tiposServive.delete(event.id).subscribe(response => {
      this.fetchAll();
      this.tipo = null;
    }, (error) => {
      this.dialog.open(BasicModalComponent, {
        data: { title: "Aviso!", message: "N??o foi poss??vel remover o tipo de an??ncio pois j?? est?? sendo utilizado." }
      });
    });
  }
}