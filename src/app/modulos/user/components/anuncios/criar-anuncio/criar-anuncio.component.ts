import { IbgeService } from './../../../../../shared/service/ibge.service';
import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './criar-anuncio.component.html',
  styleUrls: ['./criar-anuncio.component.scss']
})
export class CriarAnuncioComponent implements OnInit {

  // Estados e distritos
  public estados;
  public distritos;

  // Politica de uso
  public politica_de_uso = environment.apiUrl + '/md/politica_de_uso.md';

  // Dados cadastrais
  public dados_cadastrais: FormGroup;
  titulo = new FormControl('', [Validators.required]);
  tipo = new FormControl('', [Validators.required]);
  descricao = new FormControl('', [Validators.required]);
  cep = new FormControl('', [Validators.required]);
  pais = new FormControl('', [Validators.required]);
  rua = new FormControl('', [Validators.required]);
  bairro = new FormControl('', [Validators.required]);
  numero = new FormControl('');
  cidade = new FormControl('', [Validators.required]);
  estado = new FormControl('', [Validators.required]);
  complemento = new FormControl('', [Validators.required]);


  constructor(
    private form: FormBuilder,
    private ibge: IbgeService
  ) {
    this.dados_cadastrais = this.form.group({
      titulo: this.titulo,
      tipo: this.tipo,
      descricao: this.descricao,
      cep: this.cep,
      pais: this.pais,
      rua: this.rua,
      bairro: this.bairro,
      numero: this.numero,
      cidade: this.cidade,
      estado: this.estado,
      complemento: this.complemento
    })
  }

  ngOnInit(): void {
    this.ibge.getEstados().subscribe( response => {
      console.log(response);
      this.estados = response;
    })
  }

}
