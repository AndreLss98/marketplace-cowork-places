import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

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

  @Input('url')
  public url: string;

  @Input('label')
  public label: string = 'Clique ou arraste uma ou mais imagens';

  @ViewChild('dropzone', { static: true })
  public dropzone: ElementRef;

  public files: displayFile[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void { }

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

  public handleFiles(files) {
    for (let index = 0; index < files.length; index++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[index]);
      reader.onload = (read) => {
        let file = {
          src: read.target.result,
          object: files[index]
        };
        this.files.push(file);
        this.sendImg(file);
      }
    }
  }

  public sendImg(file: displayFile) {
    const form = new FormData();
    form.append('file', file.object, file.object.name);

    this.http.post(this.url, form, {
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
