import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PoliticasService } from 'src/app/shared/service/politicas.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-lista-politicas',
  templateUrl: './lista-politicas.component.html',
  styleUrls: ['./lista-politicas.component.scss']
})
export class ListaPoliticasComponent implements OnInit {

  public selectedFile: File;
  public updateFile: File;
  public politica;
  public politicas = [];
  public displayedColumns: string[] = ['id', 'nome', 'versao', 'aprovado'];

  public saveForm: FormGroup;
  public editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private politicasService: PoliticasService,
  ) {
    this.saveForm = formBuilder.group({
      nome: ["", Validators.required],
      arquivo: [null, Validators.required]
    });

    this.editForm = formBuilder.group({
      id: [null, Validators.required],
      nome: ["", Validators.required],
      arquivo: [null, Validators.required],
      versao: ["1.0.0", Validators.required],
      aprovado: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchPoliticas();
  }

  private fetchPoliticas() {
    this.politicasService.getAll().subscribe((response: any) => {
      this.politicas = response;
    });
  }

  public changeFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.saveForm.patchValue({
      arquivo: this.selectedFile.name
    });
  }

  public updateFileSelected(event) {
    this.updateFile = <File>event.target.files[0];
    this.editForm.patchValue({
      arquivo: this.selectedFile.name
    });
  }

  public savePolitica(event) {
    if (this.saveForm.valid) {
      this.politicasService.save(this.saveForm.value, this.selectedFile).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
        } else if (event.type === HttpEventType.Response) {
          this.fetchPoliticas();
          this.resetSaveForm();
        }
      }, (error) => {
        console.log('Save error: ', error);
      });
    };
  }

  public updatePolitica(event) {
    if (this.editForm.valid) {
      this.politicasService.update(this.editForm.value, this.updateFile).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
        } else if (event.type === HttpEventType.Response) {
          this.politica = null;
          this.updateFile = null;
          this.fetchPoliticas();
        }
      }, (error) => {
        console.log('Update error: ', error);
      });
    };
  }

  public resetSaveForm() {
    this.saveForm.reset({
      nome: "",
      arquivo: ""
    })
  }

  public setEditForm(politica) {
    this.politica = politica;
    this.editForm.reset({
      id: this.politica.id,
      nome: this.politica.nome,
      arquivo: this.politica.sluq,
      versao: this.politica.versao,
      aprovado: this.politica.aprovado
    });
  }

}
