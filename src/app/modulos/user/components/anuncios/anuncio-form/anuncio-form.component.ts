import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss']
})
export class AnuncioFormComponent implements OnInit {

  public tipos = [];

  public informacoesForm: FormGroup;
  public caracteristicasForm: FormGroup;
  public enderecoForm: FormGroup;
  public documentosForm: FormGroup;
  public valoresForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.informacoesForm = formBuilder.group({
      titulo: ['', [Validators.minLength(1), Validators.maxLength(40), Validators.required]],
      tipo: [null, [Validators.required]],
      descricao: ['', [Validators.minLength(1), Validators.maxLength(500), Validators.required]]
    });

    this.caracteristicasForm = formBuilder.group({});

    this.enderecoForm = formBuilder.group({
      cep: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.required]],
      rua: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      numero: [null, []],
      bairro: ['', [Validators.required]],
      complemento: ['', [Validators.minLength(1), Validators.maxLength(250)]],
      estado: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      cidade: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]]
    });

    this.documentosForm = formBuilder.group({
      proprietario: [null, [Validators.required]]
    });

    this.valoresForm = formBuilder.group({
      valor: ['', [Validators.required]],
      valor_mes: ['', []],
      taxa: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.tipos = this.route.snapshot.data['tipos'];
  }

}
