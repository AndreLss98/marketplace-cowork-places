import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { translateBoolValue } from 'src/app/shared/constants/functions';

import { PoliticasService } from 'src/app/shared/service/politicas.service';

import { BasicModalComponent } from 'src/app/shared/modal/basic-modal/basic-modal.component';
import { BasicTableComponent } from 'src/app/shared/components/basic-table/basic-table.component';

@Component({
  selector: 'app-lista-politicas',
  templateUrl: './lista-politicas.component.html',
  styleUrls: ['./lista-politicas.component.scss']
})
export class ListaPoliticasComponent extends BasicTableComponent {

  public selectedFile: File;
  public updateFile: File;
  public politica;
  public saveForm: FormGroup;
  public editForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private politicasService: PoliticasService,
  ) {
    super();

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
    this.fetchAll();
    this.configTable();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "id", columnHeaderName: "Id", objectProperty: "id" },
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" },
      { columnDef: "versao", columnHeaderName: "Versão", objectProperty: "versao" },
      {
        columnDef: "aprovado",
        columnHeaderName: "Aprovada?",
        objectProperty: "aprovado",
        formatFunction: translateBoolValue
      }
    ];
    this.displayedColumns = ["id", "nome", "versao", "aprovado", "actions"];
    this.actions = { editar: true, excluir: true, visualizar: true };
  }

  private fetchAll() {
    this.politicasService.getAll().subscribe((response: any) => {
      this.data = response;
      this.politicasService.politicas = response;
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

  public create() {
    this.isLoading = true;
    this.politicasService.save(this.saveForm.value, this.selectedFile).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        //console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
      } else if (event.type === HttpEventType.Response) {
        this.fetchAll();
        this.resetSaveForm();
      }
    }, (error) => {
      console.log('Save error: ', error);
      this.dialog.open(BasicModalComponent, {
        data: { title: "Aviso!", message: "Ocorreu um erro ao criar nova política." }
      });
    }, () => {
      this.isLoading = false;
    });
  }

  public update() {
    this.isLoading = true;
    this.politicasService.update(this.editForm.value, this.updateFile).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        //console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
      } else if (event.type === HttpEventType.Response) {
        this.politica = null;
        this.updateFile = null;
        this.fetchAll();
      }
    }, (error) => {
      //console.log('Update error: ', error);
    }, () => {
      this.isLoading = false;
    });
  }

  public resetSaveForm() {
    this.saveForm.reset({
      nome: "",
      arquivo: ""
    });
  }

  public edit(event) {
    this.politica = this.data.find(element => element.id === event.id);
    this.editForm.reset({
      id: this.politica.id,
      nome: this.politica.nome,
      arquivo: this.politica.url.substr(this.politica.url.lastIndexOf('/') + 1),
      versao: this.politica.versao,
      aprovado: this.politica.aprovado
    });
  }

  public deletar(event) {
    this.politicasService.delete(event.id).subscribe(response => {
      this.politica = null;
      this.updateFile = null;
      this.fetchAll();
    }, (error) => {
      console.log('Error: ', error);
    });
  }

  public visualizar(event) {
    const { sluq } = this.data.find(element => element.id === event.id);
    this.router.navigateByUrl(`/about/${sluq}`) ;
  }

  public cancelar(){
    this.politica = null;
  }
}
