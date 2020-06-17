import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './criar-anuncio.component.html',
  styleUrls: ['./criar-anuncio.component.scss']
})
export class CriarAnuncioComponent implements OnInit {

  public dados_cadastrais: FormGroup;
  titulo = new FormControl();
  tipo = new FormControl();
  local = {
    cep: new FormControl(),
    pais: new FormControl(),
    rua: new FormControl(),
    cidade: new FormControl(),
    estado: new FormControl(),
    complemento: new FormControl()
  }


  constructor(
    private form: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
