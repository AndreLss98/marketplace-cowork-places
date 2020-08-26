import { Component, OnInit } from '@angular/core';

import { QuestionarioService } from 'src/app/shared/service/questionario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-perguntas',
  templateUrl: './lista-perguntas.component.html',
  styleUrls: ['./lista-perguntas.component.scss']
})
export class ListaPerguntasComponent implements OnInit {

  public perguntas = [];
  public pergunta;
  public displayedColumns = [ 'id', 'pergunta', 'action' ];

  public editForm: FormGroup;
  public createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private questionarioService: QuestionarioService,
  ) {
    this.createForm = formBuilder.group({
      pergunta: ["", Validators.required]
    });
    this.editForm = formBuilder.group({
      id: [null, Validators.required],
      pergunta: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchAll()
  }

  fetchAll() {
    this.questionarioService.getAll().subscribe(response => {
      this.perguntas = response;
    });
  }

  selectQuestion(pergunta) {
    this.pergunta = pergunta;
    this.editForm.reset({
      id: this.pergunta.id,
      pergunta: this.pergunta.pergunta
    })
  }

  saveQuestion() {
    this.questionarioService.save(this.createForm.value).subscribe(response => {
      this.createForm.reset({
        pergunta: ''
      });
      this.fetchAll();
    });
  }

  editQuestion() {
    const id = this.editForm.value.id;
    this.questionarioService.update(id, this.editForm.value).subscribe(response => {
      this.fetchAll();
      this.pergunta = null;
    });
  }

  deletar(id) {
    this.questionarioService.delete(id).subscribe(response => {
      this.fetchAll();
    });
  }

}
