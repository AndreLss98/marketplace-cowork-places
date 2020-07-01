import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { UserService } from 'src/app/shared/service/user.service';
import { DocumentosService } from 'src/app/shared/service/documentos.service';

@Component({
  selector: 'app-detalhes-usuarios',
  templateUrl: './detalhes-usuarios.component.html',
  styleUrls: ['./detalhes-usuarios.component.scss']
})
export class DetalhesUsuariosComponent implements OnInit {

  public documentos = [];
  public userDocuments = [];
  public documentsTableColumns = [ 'nome', 'action' ];

  public user: any;
  public dataNascimento: string;

  public backBaseUrl = environment.apiUrl + '/docs/';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private documentosService: DocumentosService,
  ) {
    
  }

  ngOnInit(): void {
    this.fetchDocuments();
    this.user = this.route.snapshot.data.user;
    if (this.user.data_nascimento) this.dataNascimento = this.formatDate(new Date(this.user.data_nascimento));
  }

  private formatDate(date: Date): string {
    let formattedDate = '';
    formattedDate = date.getDate() + 1 < 10? `0${date.getDate() + 1}/` : `${date.getDate() + 1}/`;
    formattedDate += date.getMonth() + 1 < 10? `0${date.getMonth() + 1}/` : `${date.getMonth() + 1}/`;
    formattedDate += date.getFullYear();
    return formattedDate;
  }

  private fetchDocuments() {
    this.documentosService.getAll().subscribe(response => {
      const documentosEnviados = this.user.documentos.map(document => document.documento_id);
      this.documentos = response.filter(document => documentosEnviados.includes(document.id));
      this.documentos.forEach(document => {
        document.url = this.user.documentos.find(temp => temp.documento_id === document.id).url;
      });
    });
  }

  onChangeValidate() {
    this.userService.validarPerfil(this.user.id, this.user.cadastro_validado).subscribe(response => {
      console.log("Alterou status");
    }, (error) => {
      this.user.cadastro_validado = !this.user.cadastro_validado;
    });
  }

}
