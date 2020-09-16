import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

export interface customFormField {
  fieldName: string;
  value: any;
}

export interface displayFile {
  src: any;
  object: any;
  success?: boolean;
  error?: boolean;
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

  @Input('label')
  public label: string;

  @Input('single')
  public singleFile: boolean = false;

  @Input('fileField')
  public fileField: string = 'file';

  @Input('customFields')
  public customFields: customFormField[] = [];

  public files: displayFile[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.label = this.singleFile && !this.label? 'Clique ou arraste uma imagem' : 'Clique ou arraste uma ou mais imagens';
  }

  ngAfterViewInit() {
    this.dropzone.nativeElement.addEventListener('drop', (event) => {
      event.preventDefault();
      console.log(event.dataTransfer.files);
      this.handleFiles(event.dataTransfer.files);
    });

    this.dropzone.nativeElement.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
  }

  // index < this.singleFile? files.length : 1

  public handleFiles(files) {
    for (let index = 0; this.singleFile? index < 1 : index < files.length ; index++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[index]);
      reader.onload = (read) => {
        let file = {
          src: read.target.result,
          object: files[index]
        };
        this.files.push(file);
        this.sendFile(file);
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
      }
    }, (error) => {
      file.error = true;
    });
  }

  public removeFile(index: number) {
    this.files.splice(index, 1);
  }
}
