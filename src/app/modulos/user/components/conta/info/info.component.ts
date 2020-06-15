import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public dataNascimento = '';
  public selectedFile: File = null;

  public imgName = 'assets/svg/avatar.svg';

  constructor(
    private http: HttpClient,
    public loginService: LoginService
  ) {

  }

  ngOnInit(): void {
    console.log('User: ', this.loginService.user_data);
    this.dataNascimento = this.formatDate(new Date(this.loginService.user_data.data_nascimento));
    if (this.loginService.user_data.img_perfil) {
      this.imgName = `${environment.apiUrl}/imgs/${this.loginService.user_data.img_perfil}`;
    }
  }

  private formatDate(date: Date): string {
    let formattedDate = '';
    formattedDate = date.getDate() + 1 < 10? `0${date.getDate() + 1}/` : `${date.getDate() + 1}/`;
    formattedDate += date.getMonth() + 1 < 10? `0${date.getMonth() + 1}/` : `${date.getMonth() + 1}/`;
    formattedDate += date.getFullYear();
    return formattedDate;
  }

  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  public updateNewImage() {
    if (this.selectedFile) {
      let form = new FormData();
      form.append('file', this.selectedFile, this.selectedFile.name);
      this.http.post(`${environment.apiUrl}/usuarios/img-perfil`, form, {
        reportProgress: true,
        observe: 'events'
      }).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("Upload progress: ", Math.round(event.loaded / event.total * 100) + "%")
        } else if (event.type === HttpEventType.Response) {
          this.imgName = `${environment.apiUrl}/imgs/${event.body.image_name}`;
          this.selectedFile = null;
        }
      }, (error) => {
        console.log("Error: ", error);
      });
    }
  }

}
