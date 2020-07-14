import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alugavel } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class AlugavelService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAllByUser(anunciante_id?: number): Observable<any> {
    let params = {};
    if (anunciante_id) {
      params = new HttpParams().set('anunciante_id', anunciante_id.toString());
    }
    return this.http.get<any>(environment.apiUrl + '/alugaveis/usuario', { params });
  }


  public getTaxa(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/alugaveis/taxa');
  }

  public createAlugavel(alugavel: Alugavel): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/alugaveis', alugavel);
  }

  public saveAlugavel(alugavel: Alugavel, id): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/alugaveis/' + id, alugavel);
  }

  public alterStatus(id, update) {
    return this.http.put(`${environment.apiUrl}/alugaveis/${id}/status`, update);
  }

  public saveImage(base64): Observable<any> {
    let file = this.base64toBlobtoFile(base64);
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');

    let upload = new FormData();
    upload.append('file', file);

    console.log
    return this.http.post<any>(environment.apiUrl + '/alugaveis/imagem', upload, { headers });
  }

  public saveDoc(doc, field): Observable<any> {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');

    let upload = new FormData();
    upload.append('file', doc);
    upload.append('nome', field);
    return this.http.post<any>(environment.apiUrl + '/alugaveis/documentos', upload, { headers });
  }



  private base64toBlobtoFile(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab]);
    var imageFile: File = new File([bb], 'algo.jpeg', {
      type: "image/jpeg"
    });

    return imageFile;
  }
}
