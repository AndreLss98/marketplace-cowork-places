import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { t as Typy } from 'typy';

import { ConfirmModalComponent } from 'src/app/shared/modal/confirm-modal/confirm-modal.component';

export interface customFormField {
  fieldName: string;
  value: any;
}

export interface displayFile {
  src: any;
  object?: any;
  id?: number;
  success?: boolean;
  error?: boolean;
  img?: any;
}

export interface acceptableFileType {
  mime_type: string;
  nome: string;
}

@Component({
  selector: 'dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

  @ViewChild('dropzone', { static: true })
  public dropzone: ElementRef;

  @Input('url')
  public url: string;

  @Input('deleteUrl')
  public deleteUrl: string;

  @Input('label')
  public label: string;

  @Input('single')
  public singleFile: boolean = false;

  @Input('fileField')
  public fileField: string = 'file';

  @Input('idObjectPath')
  public idObjectPath: string;

  @Input('customFields')
  public customFields: customFormField[] = [];

  @Input()
  public files: displayFile[] = [];

  @Input()
  public listFileTypes: acceptableFileType[] = [];

  @Input()
  public canDelete: boolean = true;

  private _data = [];

  @Output('data')
  public dataChange = new EventEmitter();

  @Input('data')
  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
    this.dataChange.emit(this._data);
  }

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    if (!this.label) this.label = this.singleFile? 'Clique ou arraste uma imagem' : 'Clique ou arraste uma ou mais imagens';
  }

  ngAfterViewInit() {
    this.dropzone.nativeElement.addEventListener('drop', (event) => {
      event.preventDefault();
      this.handleFiles(event.dataTransfer.files);
    });

    this.dropzone.nativeElement.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
  }

  public handleFiles(files) {

    if (this.singleFile && this.files.length) {
      this.files = [];
      this.data = [];
    }

    for (let index = 0; this.singleFile? index < 1 : index < files.length ; index++) {
      if ( this.listFileTypes.map(type => type.mime_type).includes(files[index].type)) {
        
        let reader = new FileReader();
        reader.readAsDataURL(files[index]);
        reader.onload = (read) => {
          let file = {
            src: this.sanitizer.bypassSecurityTrustUrl(read.target.result as any),
            object: files[index]
          };
          this.files.push(file);
          this.sendFile(file);
        }
      } else {
        console.log("arquivo invalido")
      }
    }
  }

  public sendFile(file: displayFile) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    
    const form = new FormData();
    form.append(this.fileField, file.object, file.object.name);

    this.customFields.forEach(field => {
      form.append(field.fieldName, field.value)
    });

    this.http.post(this.url, form, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        
      } else if (event.type === HttpEventType.Response) {
        file.success = true;
        file.error = false;
        if (this.idObjectPath) file.id = Typy(event.body, this.idObjectPath).safeObject;
        this.data = [ ...this.data, event.body ];
      }
    }, (error) => {
      file.error = true;
      console.log('Error sending file: ', error);
    });
  }

  public resendFile(file: displayFile) {
    file.error = null;
    file.success = null;
    this.sendFile(file);
  }

  public removeFile(index: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: "Aviso!", message: "A imagem será excluída permanentemente. Tem certeza que deseja excluir ?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case true:
          if (this.files[index].id && this.deleteUrl) {
            this.http.delete(`${this.deleteUrl}/${this.files[index].id}`).subscribe(() => {
              this.files.splice(index, 1);
              this.data.splice(index, 1);
              this.dataChange.emit(this.data);  
            }, (error) => {
              console.log(error);
            });
          } else {
            this.files.splice(index, 1);
            this.data.splice(index, 1);
            this.dataChange.emit(this.data);
          }
        break;
      }
    });
  }
}
