import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { TIPOS_CAMPOS } from 'src/app/shared/constants/constants';

import { FeedbackService } from 'src/app/shared/service/feedback.service';
import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent extends BasicTableComponent implements OnInit {
  readonly TIPOS_CAMPOS = TIPOS_CAMPOS;

  public feedbacks = [];
  public tiposCampos = [];

  public feedbackDisplayedColumns = [];

  public feedbackForm: FormGroup;
  public novaPossibilidadeForm: FormGroup;
  public propriedadesForm: any = [];
  
  public possibilidades: any = [];
  constructor(
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
  ) {
    super();

    this.feedbackForm = formBuilder.group({
      pergunta: ['', [Validators.required]],
      nome_campo: ['', [Validators.required]],
      tipo_campo: ['', [Validators.required]],
      fixa: [false, []],
      propriedades: ['']
    });

    this.novaPossibilidadeForm = formBuilder.group({
      possibilidade: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.tiposCampos = Object.keys(TIPOS_CAMPOS);
    this.feedbacks = this.router.snapshot.data.feedbacks;
    this.fetchAll();
    this.configTable();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "pergunta", columnHeaderName: "Pergunta", objectProperty: "pergunta" }
    ];
    this.displayedColumns = ["pergunta", "actions"];
    this.actions = { editar: false, excluir: true, visualizar: false };
  }

  onSubmit() {
    const feedback = this.feedbackForm.value;
    delete feedback.tipo_campo;
    delete feedback.propriedades;
    feedback.tipo_campo = {
      tipo: this.feedbackForm.controls.tipo_campo.value.toLowerCase(),
      propriedades: this.feedbackForm.controls.propriedades.value
    };

    if (feedback.tipo_campo.tipo === TIPOS_CAMPOS.SELECAO.nome) {
      feedback.tipo_campo.propriedades.possibilidades = this.possibilidades;
    }

    this.feedbackService.save(feedback).subscribe(response => {
      this.resetForm();
      this.fetchAll();
    });
  }

  onTypeChange(event) {
    let group: any = {};
    this.propriedadesForm = [];
    let fields = [];
    Object.keys(TIPOS_CAMPOS[this.feedbackForm.controls.tipo_campo.value].campos).forEach(campo => {
      let field = TIPOS_CAMPOS[this.feedbackForm.controls.tipo_campo.value].campos[campo];
      field.name = campo;
      group[campo] = field.required ? new FormControl(null, [Validators.required]) : new FormControl(null);
      fields.push(field);
    });
    this.feedbackForm.controls.propriedades = new FormGroup(group);
    this.propriedadesForm = fields;
  }

  formatFieldName() {
    let name = this.feedbackForm.controls.nome_campo.value;
    name = name.replace(/\s/g, "");
    this.feedbackForm.controls.nome_campo.setValue(name);
  }

  onChangeFieldValue() {
    this.feedbackForm.updateValueAndValidity();
    this.feedbackForm.controls.propriedades.updateValueAndValidity();
  }

  private resetForm() {
    this.feedbackForm.reset({
      pergunta: '',
      nome_campo: '',
      tipo_campo: ''
    });
  }

  adicionarPossibilidade(valor) {
    this.possibilidades.unshift({ valor });
  }

  removerPossibilidade(index) {
    this.possibilidades.splice(index, 1);
  }

  private fetchAll() {
    this.feedbackService.getAll().subscribe(response => {
      this.data = response;
    });
  }

  public deletar(event) {
    this.feedbackService.delete(event.id).subscribe(response => {
      this.fetchAll();
      this.resetForm();
    }, (error) => {
      console.log(error);
    });
  }
}
