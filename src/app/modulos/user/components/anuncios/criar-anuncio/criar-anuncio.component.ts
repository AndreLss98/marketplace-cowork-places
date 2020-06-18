import { TiposService } from 'src/app/shared/service/tipos.service';
import { ViacepService } from './../../../../../shared/service/viacep.service';
import { IbgeService } from './../../../../../shared/service/ibge.service';
import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './criar-anuncio.component.html',
  styleUrls: ['./criar-anuncio.component.scss']
})
export class CriarAnuncioComponent implements OnInit {

  // Custom erro matcher
  matcher = new MyErrorStateMatcher();

  // Tipos 
  public categorias;
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
  cep = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/), Validators.minLength(8), Validators.maxLength(8)]);
  pais = new FormControl('Brasil', [Validators.required]);
  rua = new FormControl('', [Validators.required]);
  bairro = new FormControl('', [Validators.required]);
  numero = new FormControl('');
  cidade = new FormControl('', [Validators.required]);
  estado = new FormControl('', [Validators.required]);
  complemento = new FormControl('', [Validators.required]);

  constructor(
    private form: FormBuilder,
    private ibge: IbgeService,
    private viacep: ViacepService,
    private tipos: TiposService
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
      this.estados = response;
    });
    this.tipos.getAll().subscribe( response => {
      this.categorias = response;
    })
  }

  loadDistritoByEstado(){
    let uf_id = this.estado.value;
    this.ibge.getCidadesPorEstado(uf_id).subscribe( response => {
      this.distritos = response;
    })
  }

  validarCep(){
    this.viacep.validaCep(this.cep.value).subscribe( response => {
      if(response['erro'] == true){
        this.cep.setErrors({'notfound': true})
        return;
      }
      this.rua.setValue(response['logradouro']);
      this.bairro.setValue(response['bairro']);

      this.ibge.getCidadePorId(response['ibge']).subscribe( data => {
        this.estado.setValue(data['microrregiao']['mesorregiao']['UF'].id);
        this.loadDistritoByEstado();
      })
    }, err => {
      console.log(err);
    })
  }

  formatarNumerio(campo){
    let v = this[campo].value;
    v=v.replace(/\D/g,"");
    this[campo].setValue(v);
  }

}
