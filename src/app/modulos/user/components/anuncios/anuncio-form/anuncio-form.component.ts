import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { TIPOS_CAMPOS } from 'src/app/shared/constants/constants';
import { formatMoneyValue, desformatMoneyValue, formatCEP, stringValueToBoolean } from 'src/app/shared/constants/functions';

import { UserService } from 'src/app/shared/service/user.service';
import { TiposService } from 'src/app/shared/service/tipos.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';

import { acceptableFileType } from 'src/app/shared/components/dropzone/dropzone.component';
import { BasicModalComponent } from 'src/app/shared/modal/basic-modal/basic-modal.component';

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss']
})
export class AnuncioFormComponent implements OnInit {

  readonly sendImgsUrl = `${environment.apiUrl}/alugaveis/imagem`;
  public deleteImgUrl = `${environment.apiUrl}/alugaveis/imagem`;
  readonly sendDocsUrl = `${environment.apiUrl}/alugaveis/documentos`;

  readonly imgsTypes: acceptableFileType[] = [
    { mime_type: 'image/jpg', nome: '.jpg' },
    { mime_type: 'image/jpeg', nome: '.jpeg' },
    { mime_type: 'image/png', nome: '.png' }
  ];

  readonly docsTypes: acceptableFileType[] = [
    { mime_type: 'image/jpg', nome: '.jpg' },
    { mime_type: 'image/png', nome: '.png' },
    { mime_type: 'image/jpeg', nome: '.jpeg' },
    { mime_type: "application/pdf", nome: '.pdf'}
  ];

  public editMode: boolean = false;
  private anuncio: any;

  readonly formatMoneyValue = formatMoneyValue;
  readonly desformatMoneyValue = desformatMoneyValue;
  readonly formatCEP = formatCEP;

  public tipos = [];
  public tipos_documentos = [];
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
  public documentosForm: FormGroup;
  public cadastroTerceiroForm: FormGroup;
  public documentos = [];
  public valoresForm: FormGroup;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private tiposService: TiposService,
    private alugavelService: AlugavelService,
  ) {

  }

  ngOnInit(): void {

    this.informacoesForm = this.formBuilder.group({
      titulo: ['', [Validators.minLength(1), Validators.maxLength(40), Validators.required]],
      tipo_id: [null, [Validators.required]],
      descricao: ['', [Validators.minLength(1), Validators.maxLength(500), Validators.required]],
      qtd_maxima_reservas: [1, [Validators.min(1), Validators.required]]
    });

    this.imgsForm = this.formBuilder.group({
      imgs: [[], [Validators.required]]
    });

    this.informacoesForm.controls['tipo_id'].valueChanges.subscribe(() => {
      this.tiposService.getAllCaracteristicasByTipo(this.informacoesForm.controls['tipo_id'].value)
      .subscribe(response => {
        this.caracteristicas = response;
        this.configCaracteristicasForm();
      });

      this.documentos = this.tipos_documentos
      .filter(tipo_doc => this.tipos
        .find(tipo => tipo.id === this.informacoesForm.controls['tipo_id'].value).documentos.includes(tipo_doc.id));
      
      let tempDocFormGroup = {
        proprietario: new FormControl(null, [Validators.required]),
        pessoaJuridica: new FormControl(false, []),
        cadastro_terceiro: new FormGroup({
          cnpj: new FormControl('', []),
          razao_social: new FormControl('', []),
          cpf: new FormControl('', []),
          nome: new FormControl('', []),
          local: new FormGroup({})
        })
      };

      this.documentos.map(doc => doc.id).forEach(id => {
        tempDocFormGroup[`${id}`] = new FormControl([null, []]);
      });

      this.documentosForm = new FormGroup(tempDocFormGroup);

      this.documentosForm.controls['pessoaJuridica'].valueChanges.subscribe(() => {
        if (this.documentosForm.controls['pessoaJuridica'].value) {
          this.documentosForm.get('cadastro_terceiro')['controls']['cnpj'].setValidators([Validators.required])
          this.documentosForm.get('cadastro_terceiro')['controls']['razao_social'].setValidators([Validators.required])
          this.documentosForm.get('cadastro_terceiro')['controls']['cpf'].setValidators([])
          this.documentosForm.get('cadastro_terceiro')['controls']['nome'].setValidators([])
        } else {
          this.documentosForm.get('cadastro_terceiro')['controls']['cnpj'].setValidators([])
          this.documentosForm.get('cadastro_terceiro')['controls']['razao_social'].setValidators([])
          this.documentosForm.get('cadastro_terceiro')['controls']['cpf'].setValidators([Validators.required])
          this.documentosForm.get('cadastro_terceiro')['controls']['nome'].setValidators([Validators.required])
        }

        this.documentosForm.markAllAsTouched();
      });
    });

    this.caracteristicasForm = this.formBuilder.group({});

    this.documentosForm = this.formBuilder.group({
      proprietario: [null, [Validators.required]],
      pessoaJuridica: [false, []],
      cadastro_terceiro: new FormGroup({
        cnpj: new FormControl('', []),
        razao_social: new FormControl('', []),
        cpf: new FormControl('', []),
        nome: new FormControl('', []),
        local: new FormGroup({})
      })
    });

    this.valoresForm = this.formBuilder.group({
      valor: ['', []],
      valor_mes: ['', []],
      taxa: [null, []]
    });

    this.configTax();
    this.tipos_documentos = this.route.snapshot.data['tipos_documentos'];
    this.tipos = this.route.snapshot.data['tipos'].filter(tipo => tipo.disponivel);
    if (this.router.url.includes('/edit')) this.configEditForm();
  }

  private configTax() {
    this.maxTax = this.route.snapshot.data['taxa'].taxa;
    this.thumbsTaxs = [0, this.maxTax/2, this.maxTax]
  }

  public formatField(field: string, form: FormGroup, formatFunction) {
    form.controls[field].setValue(formatFunction(form.controls[field].value));
  }

  public bindingFormField(field, form: FormGroup, data: any) {
    form.controls[field].setValue(data);
  }

  public bindingFormGroup(field, form, data) {
    form.controls[field] = data;
  }

  private configCaracteristicasForm() {
    let group = {};

    this.caracteristicas.forEach(caracteristica => {
      if (caracteristica.tipo_campo.tipo === TIPOS_CAMPOS.BINARIO.nome) {
        group[caracteristica.id] = new FormControl(caracteristica.tipo_campo.propriedades.standard, [ Validators.required ]);
      } else {
        group[caracteristica.id] = new FormControl('', [ Validators.required ]);
      }
    });

    this.caracteristicasForm = new FormGroup(group);

    if (this.editMode) {
      Object.keys(this.caracteristicasForm.value).forEach(key => {
        const valor = this.anuncio.caracteristicas.find(caracterictica => caracterictica.id === Number(key)).valor
        this.caracteristicasForm.controls[key].setValue(Number(valor) || valor);
      });
    }
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

    this.anuncio.caracteristicas.forEach(carac => {
      if (carac.tipo_campo.tipo === TIPOS_CAMPOS.BINARIO.nome) carac.valor = stringValueToBoolean(carac.valor);
    });

    this.informacoesForm.controls['titulo'].setValue(this.anuncio.titulo);
    this.informacoesForm.controls['tipo_id'].setValue(this.anuncio.tipo.id);
    this.informacoesForm.controls['descricao'].setValue(this.anuncio.descricao);

    this.imgsForm.controls['imgs'].setValue(this.anuncio.imagens.map(img => {
      return { img: { id: img.id, url: img.url } }
    }));

    this.imgs = this.anuncio.imagens.map(img => {
      return { id: img.id, src: img.url, success: true }
    });

    this.infoAdicionais = this.anuncio.infos;

    this.documentosForm.controls['proprietario'].setValue(this.anuncio.proprietario);
    
    this.anuncio.documentos.forEach(documento => {
      let doc = this.documentos.find(doc => doc.id === documento.tipo_alugavel_documento_id);
      if (doc) {
        doc.files = [{ src: documento.url, success: true }];
        this.documentosForm.controls[`${doc.id}`].setValue([{ id: documento.id }]);
      }
    });

    Object.keys(this.enderecoForm.value).forEach(key => {
      this.enderecoForm.controls[key].setValue(this.anuncio.local[key]);
    });

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
      documentos: Object.keys(this.documentosForm.value)
        .filter(key => key !== 'proprietario' && this.documentosForm.value[key][0])
        .map(key => this.documentosForm.value[key][0].id),
      caracteristicas: Object.keys(this.caracteristicasForm.value).map(caracteristica => {
        return { caracteristica_id: Number(caracteristica), valor: this.caracteristicasForm.value[caracteristica] }
      }),
      infos: this.infoAdicionais
    };

    anuncio.valor = desformatMoneyValue(anuncio.valor);
    anuncio.valor_mes = desformatMoneyValue(anuncio.valor_mes);

    if (id) anuncio.id = id;
    console.log('Temp aluguel: ', anuncio);
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
