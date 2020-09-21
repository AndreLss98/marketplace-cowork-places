import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { formatMoneyValue, desformatMoneyValue, formatCEP, desformatCEP } from 'src/app/shared/constants/functions';

import { IbgeService } from 'src/app/shared/service/ibge.service';
import { MapsService } from 'src/app/shared/service/maps.service';
import { TiposService } from 'src/app/shared/service/tipos.service';
import { ViacepService } from 'src/app/shared/service/viacep.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { BasicModalComponent } from 'src/app/shared/modal/basic-modal/basic-modal.component';

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss']
})
export class AnuncioFormComponent implements OnInit {

  readonly sendImgsUrl = `${environment.apiUrl}/alugaveis/imagem`;
  public deleteImgUrl;
  readonly sendDocsUrl = `${environment.apiUrl}/alugaveis/documentos`;

  public editMode: boolean = false;
  private anuncio: any;

  readonly formatMoneyValue = formatMoneyValue;
  readonly desformatMoneyValue = desformatMoneyValue;
  readonly formatCEP = formatCEP;

  public tipos = [];
  public maxTax: number;
  public thumbsTaxs = [];

  public isSending: boolean = false;

  public informacoesForm: FormGroup;
  public infoAdicionais = [];
  public imgsForm: FormGroup;
  public imgs = [];
  public caracteristicasForm: FormGroup;
  public caracteristicas = [];
  public enderecoForm: FormGroup;
  public lngLatPlace;
  public estados;
  public distritos;
  public documentosForm: FormGroup;
  public documentos = [
    { proprietario: null, nome: "Escritura pública ou contrato de alienação", nome_campo: 'escritura', files: [] },
    { proprietario: false, nome: "Contrato de locação", nome_campo: 'contrato' },
    { proprietario: false, nome: "Documento com foto e CPF do proprietário", nome_campo: 'cpf_selfie' }
  ];
  public valoresForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private mapService: MapsService,
    private ibgeService: IbgeService,
    private formBuilder: FormBuilder,
    private cepService: ViacepService,
    private tiposService: TiposService,
    private alugavelService: AlugavelService,
  ) {
    this.informacoesForm = formBuilder.group({
      titulo: ['', [Validators.minLength(1), Validators.maxLength(40), Validators.required]],
      tipo_id: [null, [Validators.required]],
      descricao: ['', [Validators.minLength(1), Validators.maxLength(500), Validators.required]]
    });

    this.imgsForm = formBuilder.group({
      imgs: [[], [Validators.required]]
    });

    this.informacoesForm.controls['tipo_id'].valueChanges.subscribe(() => {
      this.tiposService.getAllCaracteristicasByTipo(this.informacoesForm.controls['tipo_id'].value).subscribe(response => {
        this.caracteristicas = response;
        this.configCaracteristicasForm();
      });
    });

    this.caracteristicasForm = formBuilder.group({});

    this.enderecoForm = formBuilder.group({
      cep: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.required]],
      rua: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      numero: [null, []],
      bairro: ['', [Validators.required]],
      complemento: ['', [Validators.minLength(1), Validators.maxLength(250)]],
      estado: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      cidade: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
    });

    this.documentosForm = formBuilder.group({
      proprietario: [null, [Validators.required]],
      escritura: [null, []],
      contrato: [null, []],
      cpf_selfie: [null, []]
    });

    this.valoresForm = formBuilder.group({
      valor: ['', [Validators.required]],
      valor_mes: ['', []],
      taxa: [null, []]
    });
  }

  ngOnInit(): void {
    this.tipos = this.route.snapshot.data['tipos'];

    if (this.router.url.includes('/edit')) this.configEditForm();
    this.configTax();

    this.ibgeService.getEstados().subscribe( response => {
      this.estados = response;
    });
  }

  private configTax() {
    this.maxTax = this.route.snapshot.data['taxa'].taxa;
    this.thumbsTaxs = [0, this.maxTax/2, this.maxTax]
  }

  public formatField(field: string, form: FormGroup, formatFunction) {
    form.controls[field].setValue(formatFunction(form.controls[field].value));
  }

  public bindingFormField(field: string, form: FormGroup, data: any) {
    console.log('Data binding: ', data);
    form.controls[field].setValue(data);
  }

  private configCaracteristicasForm() {
    let group = {};
    this.caracteristicas.forEach(caracteristica => {
      group[caracteristica.id] = new FormControl(caracteristica.tipo_campo.propriedades.standard || '', [ Validators.required ]);
    });

    this.caracteristicasForm = new FormGroup(group);

    if (this.editMode) {
      Object.keys(this.caracteristicasForm.value).forEach(key => {
        const valor = this.anuncio.caracteristicas.find(caracterictica => caracterictica.id === Number(key)).valor
        this.caracteristicasForm.controls[key].setValue(Number(valor) || valor);
      });
    }
  }

  public onLocalChange(event) {
    this.enderecoForm.controls['latitude'].setValue(event.lat);
    this.enderecoForm.controls['longitude'].setValue(event.lng);
  }

  public validarCep() {
    this.cepService.validaCep(desformatCEP(this.enderecoForm.controls['cep'].value)).subscribe( response => {
      this.lngLatPlace = null;
      this.enderecoForm.controls['estado'].enable();
      this.enderecoForm.controls['cidade'].enable();

      if(response['erro'] === true){
        this.enderecoForm.controls['cep'].setErrors({'notfound': true})
        return;
      }

      this.enderecoForm.controls['rua'].setValue(response['logradouro']);
      this.enderecoForm.controls['bairro'].setValue(response['bairro']);
      this.enderecoForm.controls['complemento'].enable();

      this.mapService.getLatitudeLongitude(this.enderecoForm.controls['cep'].value).subscribe(response => {
        this.lngLatPlace = {
          latitude: response.results[0].geometry.location.lat,
          longitude: response.results[0].geometry.location.lng
        }
      }, (error) => {
        console.log(error);
      });

      this.ibgeService.getMunicipioPorId(response['ibge']).subscribe( data => {
        this.enderecoForm.controls['estado'].setValue(data['microrregiao']['mesorregiao']['UF'].nome);
        this.enderecoForm.controls['cidade'].setValue(data['microrregiao'].nome);
        this.distritos = [{id: data['microrregiao'].id, nome: data['microrregiao'].nome}]
      }, err => {
        this.snackBar.open("Ocorreu alguem problema, tente novamente mais tarde", 'OK', {duration: 5000, verticalPosition: 'top'});
      })
    }, err => {
      // console.log(err);
    });
  }

  public loadDistritoByEstado() {
    let uf_id = this.enderecoForm.controls['estado'].value;
    this.ibgeService.getCidadesPorEstado(uf_id).subscribe(response => {
      this.distritos = response;
    });
  }

  public save() {
    let anuncio = this.buildAnuncioObject();
    this.isSending = true;

    this.alugavelService.createAlugavel(anuncio).subscribe(response => {
      this.isSending = false;
      const dialogRef = this.matDialog.open(BasicModalComponent, { data: {
        title: 'Parabéns',
        message: 'O cadastro foi realizado com sucesso, aguarde a aprovação do seu anúncio',
        nameCloseBtn: 'Ok'
      }, hasBackdrop: false});

      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/user/anuncios/meusanuncios'], { replaceUrl: true });
      });
    }, (error) => {
      this.isSending = false;
      this.matDialog.open(BasicModalComponent, { data: {
        title: 'Aviso',
        message: 'Algo deu errado enquanto Tentávamos salvar o seu anúncio, Por favor tente novamente.',
        nameCloseBtn: 'Ok'
      }});
      console.log(error);
    }, () => {
      this.isSending = false;
    });
  }

  public configEditForm() {
    this.editMode = true;
    this.anuncio = this.route.snapshot.data['anuncio'];
    this.deleteImgUrl = `${environment.apiUrl}/alugaveis/${this.anuncio.id}/imagem`;

    this.informacoesForm.controls['titulo'].setValue(this.anuncio.titulo);
    this.informacoesForm.controls['tipo_id'].setValue(this.anuncio.tipo.id);
    this.informacoesForm.controls['descricao'].setValue(this.anuncio.descricao);

    this.imgsForm.controls['imgs'].setValue(this.anuncio.imagens.map(img => {
      return { img: { id: img.id, url: img.url } }
    }));

    this.imgs = this.anuncio.imagens.map(img => {
      return { id: img.id, src: `${environment.apiUrl}/imgs/${img.url}`, success: true }
    });

    this.infoAdicionais = this.anuncio.infos;

    this.documentosForm.controls['proprietario'].setValue(this.anuncio.proprietario);

    this.anuncio.documentos.forEach(documento => {
      const doc = this.documentos.find(doc => doc.nome_campo === documento.nome);
      doc.files = [{ src: `${environment.apiUrl}/docs/${documento.url}`, success: true }];
    });

    Object.keys(this.enderecoForm.value).forEach(key => {
      this.enderecoForm.controls[key].setValue(this.anuncio.local[key]);
    });

    this.lngLatPlace = {
      latitude: this.enderecoForm.controls['latitude'].value,
      longitude: this.enderecoForm.controls['longitude'].value
    }

    Object.keys(this.valoresForm.value).forEach(key => {
      if (key === 'valor' || key === 'valor_mes') {
        this.valoresForm.controls[key].setValue(formatMoneyValue(this.anuncio[key]));
      } else {
        this.valoresForm.controls[key].setValue(this.anuncio[key]);
      }
    });
  }

  public update() {
    let anuncio = this.buildAnuncioObject(this.anuncio.id);
    this.isSending = true;
    
    this.alugavelService.updateAlugavel(anuncio).subscribe(response => {
      this.isSending = false;
      const dialogRef = this.matDialog.open(BasicModalComponent, { data: {
        title: 'Parabéns',
        message: 'O cadastro foi atualizado com sucesso, aguarde a aprovação do seu anúncio',
        nameCloseBtn: 'Ok'
      }, hasBackdrop: false});

      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/user/anuncios/meusanuncios'], { replaceUrl: true });
      });
    }, (error) => {
      this.isSending = false;
      this.matDialog.open(BasicModalComponent, { data: {
        title: 'Aviso',
        message: 'Algo deu errado enquanto Tentávamos atualizar o seu anúncio, Por favor tente novamente.',
        nameCloseBtn: 'Ok'
      }});
      console.log(error);
    }, () => {
      this.isSending = false;
    });
  }

  private buildAnuncioObject(id?: number) {
    let anuncio = {
      ...this.informacoesForm.value,
      proprietario: this.documentosForm.controls['proprietario'].value,
      local: {
        ...this.enderecoForm.value,
        pais: 'Brasil'
      },
      ...this.valoresForm.value,
      imagens: this.imgsForm.controls['imgs'].value.map(element => element.img.id),
      documentos: Object.keys(this.documentosForm.value).filter(key => key !== 'proprietario' && this.documentosForm.value[key]).map(key => this.documentosForm.value[key][0].id),
      caracteristicas: Object.keys(this.caracteristicasForm.value).map(caracteristica => {
        return { caracteristica_id: Number(caracteristica), valor: this.caracteristicasForm.value[caracteristica] }
      }),
      infos: this.infoAdicionais
    };

    anuncio.valor = desformatMoneyValue(anuncio.valor);
    anuncio.valor_mes = desformatMoneyValue(anuncio.valor_mes);

    if (id) anuncio.id = id;
    return anuncio;
  }

  public addInfo(descricao: string) {
    this.infoAdicionais.unshift({ descricao });
  }

  public removeInfo(index: number) {
    if (this.infoAdicionais[index].id) {
      this.alugavelService.removeInfo(this.anuncio.id, this.infoAdicionais[index].id).subscribe(() => {
        this.infoAdicionais.splice(index, 1);
      }, (error) => {
        console.log(error)
      });
    } else {
      this.infoAdicionais.splice(index, 1);
    }
  }
}
