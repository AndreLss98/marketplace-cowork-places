import { Component, OnInit } from '@angular/core';

import { CaracteristicasService } from 'src/app/shared/service/caracteristicas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-caracteristicas',
  templateUrl: './lista-caracteristicas.component.html',
  styleUrls: ['./lista-caracteristicas.component.scss']
})
export class ListaCaracteristicasComponent implements OnInit {

  public caracteristicas = [];
  public caracteristica;
  public displayedColumns = [ 'id', 'nome' ];

  public editForm: FormGroup;
  public createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private caracteristicasService: CaracteristicasService
  ) {
    this.createForm = formBuilder.group({
      nome: ["", Validators.required]
    });

    this.editForm = formBuilder.group({
      id: [null, Validators.required],
      nome: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll() {
    this.caracteristicasService.getAll().subscribe((response: any) => {
      this.caracteristicas = response;
    }, (error) => {
      console.log("Fetch error: ", error);
    });    
  }

  public saveCaracteristica() {
    if (this.createForm.valid) {
      this.caracteristicasService.save(this.createForm.value).subscribe((response) => {
        this.resetCreateForm();
        this.fetchAll();
      });
    }
  }

  public updateCaracteristica() {
    if (this.editForm.valid) {
      console.log('Form: ', this.editForm);
      this.caracteristicasService.update(this.editForm.value).subscribe((response) => {
        this.caracteristica = null;
        this.fetchAll();
      });
    }
  }

  private resetCreateForm() {
    this.createForm.reset({
      nome: ""
    })
  }

  public setCaracteristica(caracteristica) {
    this.caracteristica = caracteristica;
    this.editForm.reset({
      id: this.caracteristica.id,
      nome: this.caracteristica.nome
    })
  }

}
