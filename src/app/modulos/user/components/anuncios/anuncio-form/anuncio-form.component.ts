import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { TIPOS_CAMPOS } from 'src/app/shared/constants/constants';
import {
  formatCEP,
  formatCPF,
  formatCNPJ,
  formatMoneyValue,
  desformatMoneyValue,
  stringValueToBoolean,
  formatFieldMoneyValue
} from 'src/app/shared/constants/functions';

import { UserService } from 'src/app/shared/service/user.service';
import { TiposService } from 'src/app/shared/service/tipos.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { PublicAlvoService } from 'src/app/shared/service/public-alvo.service';

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
  readonly formatFieldMoneyValue = formatFieldMoneyValue;
  readonly formatCEP = formatCEP;
  readonly formatCPF = formatCPF;
  readonly formatCNPJ = formatCNPJ;

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
  public documentos = [];
  public valoresForm: FormGroup;
  public publicoAlvo = [];

  public enviadoComSucesso: boolean = false;
  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private tiposService: TiposService,
    private alugavelService: AlugavelService,
    public publicAlvoService: PublicAlvoService
  ) {

  }

  ngOnInit(): void {
    this.informacoesForm = this.formBuilder.group({
      titulo: ['', [Validators.minLength(1), Validators.maxLength(40), Validators.required]],
      tipo_id: [null, [Validators.required]],
      descricao: ['', [Validators.minLength(1), Validators.maxLength(500), Validators.required]],
      qtd_maxima_reservas: [1, [Validators.min(1), Validators.required]],
      publico_alvo: [null, []]
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
        pessoajuridica: new FormControl(false, []),
        cadastro_terceiro: new FormGroup({}),
        aceite_condicoes: new FormControl(false, [Validators.requiredTrue])
      };

      this.documentos.map(doc => doc.id).forEach(id => {
        tempDocFormGroup[`${id}`] = new FormControl([null, []]);
      });

      this.documentosForm = new FormGroup(tempDocFormGroup);

      this.documentosForm.valueChanges.subscribe(() => {
        this.checkDocs();
      });

      this.documentosForm.controls['pessoajuridica'].valueChanges.subscribe(() => {
        if (this.documentosForm.controls['pessoajuridica'].value && !this.documentosForm.controls['proprietario'].value) {
          this.documentosForm.get('cadastro_terceiro')['controls']['cnpj'].setValidators([Validators.required]);
          this.documentosForm.get('cadastro_terceiro')['controls']['razao_social'].setValidators([Validators.required]);
          this.documentosForm.get('cadastro_terceiro')['controls']['cpf'].setValidators([]);
          this.documentosForm.get('cadastro_terceiro')['controls']['nome'].setValidators([]);
        } else if (!this.documentosForm.controls['pessoajuridica'].value && !this.documentosForm.controls['proprietario'].value) {
          this.documentosForm.get('cadastro_terceiro')['controls']['cnpj'].setValidators([]);
          this.documentosForm.get('cadastro_terceiro')['controls']['razao_social'].setValidators([]);
          this.documentosForm.get('cadastro_terceiro')['controls']['cpf'].setValidators([Validators.required]);
          this.documentosForm.get('cadastro_terceiro')['controls']['nome'].setValidators([Validators.required]);
        }

        setTimeout(() => {
          this.documentosForm.updateValueAndValidity();
        }, 200);
      });

      this.documentosForm.controls['proprietario'].valueChanges.subscribe(() => {
        if (this.documentosForm.controls['proprietario'].value) {
          this.documentosForm.controls['cadastro_terceiro'] = new FormGroup({});
        } else {
          this.documentosForm.controls['cadastro_terceiro'] = new FormGroup({
            cnpj: new FormControl('', []),
            razao_social: new FormControl('', []),
            cpf: new FormControl('', []),
            nome: new FormControl('', []),
            local: new FormGroup({})
          });
          if (this.documentosForm.controls['pessoajuridica'].value) {
            this.documentosForm.get('cadastro_terceiro')['controls']['cnpj'].setValidators([Validators.required]);
            this.documentosForm.get('cadastro_terceiro')['controls']['razao_social'].setValidators([Validators.required]);
            this.documentosForm.get('cadastro_terceiro')['controls']['cpf'].setValidators([]);
            this.documentosForm.get('cadastro_terceiro')['controls']['nome'].setValidators([]);
          } else {
            this.documentosForm.get('cadastro_terceiro')['controls']['cnpj'].setValidators([]);
            this.documentosForm.get('cadastro_terceiro')['controls']['razao_social'].setValidators([]);
            this.documentosForm.get('cadastro_terceiro')['controls']['cpf'].setValidators([Validators.required]);
            this.documentosForm.get('cadastro_terceiro')['controls']['nome'].setValidators([Validators.required]);
          }
  
          setTimeout(() => {
            this.documentosForm.updateValueAndValidity();
          }, 200);
        }

        this.documentosForm.controls['cadastro_terceiro'].valueChanges.subscribe(() => {
          this.documentosForm.updateValueAndValidity();
        });
      });
    });

    this.caracteristicasForm = this.formBuilder.group({});
    this.documentosForm = this.formBuilder.group({
      proprietario: [null, [Validators.required]],
      pessoajuridica: [false, []],
      cadastro_terceiro: new FormGroup({}),
      aceite_condicoes: [false, [Validators.requiredTrue]]
    });

    this.valoresForm = this.formBuilder.group({
      valor: ['', []],
      valor_mes: ['', []],
      taxa: [0, []]
    });

    this.documentosForm.valueChanges.subscribe(() => {
      this.checkDocs();
    });
    
    this.configTax();
    this.publicoAlvo = this.route.snapshot.data['publico_alvo'];
    this.tipos_documentos = this.route.snapshot.data['tipos_documentos'];
    this.tipos = this.route.snapshot.data['tipos'].filter(tipo => tipo.disponivel);
  }

  checkDocs() {
    const docs = Object
      .keys(this.documentosForm.value)
      .map(key => Number(key))
      .filter(key => key);
    
    let valid = true;
    docs.forEach(key => {
      if (!this.documentosForm.value[key][0]) valid = false;
    });
    
    if (valid) {
      this.documentosForm.controls['aceite_condicoes'].setValidators([]);
    } else {
      this.documentosForm.controls['aceite_condicoes'].setValidators([Validators.requiredTrue]);
    }

    setTimeout(() => {
      this.documentosForm.controls['aceite_condicoes'].updateValueAndValidity();
    }, 1000);
  }
  
  ngAfterViewInit() {
    if (this.router.url.includes('/edit')) this.configEditForm();
  }

  ngOnDestroy() {
    if (this.router.url.includes('/new') && !this.enviadoComSucesso) {
      const imagens = this.imgsForm.controls['imgs'].value.map(element => element.img.id);
      const documentos = Object.keys(this.documentosForm.value)
        .filter(key => this.documentosForm.value[key][0])
        .map(key => this.documentosForm.value[key][0].id);
        
      this.alugavelService.clearFilesSendNotSaved(imagens, documentos)
    }
  }

  private configTax() {
    this.maxTax = this.route.snapshot.data['taxa'].taxa;
    this.thumbsTaxs = [0, this.maxTax/2, this.maxTax]
  }

  public formatField(field: string, form, formatFunction) {
    form.controls[field].setValue(formatFunction(form.controls[field].value));
  }

  public bindingFormField(field, form: FormGroup, data: any) {
    form.controls[field].setValue(data);
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
    this.isSending = true;

    let anuncio = this.buildAnuncioObject();

    this.alugavelService.createAlugavel(anuncio).subscribe(response => {
      this.isSending = false;
      this.enviadoComSucesso = true;
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
        message: 'Algo deu errado enquanto tentávamos salvar o seu anúncio, Por favor tente novamente.',
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
    console.log(this.anuncio)
    this.informacoesForm.controls['publico_alvo'].setValue(this.anuncio.publico_alvo);

    this.anuncio.caracteristicas.forEach(carac => {
      if (carac.tipo_campo.tipo === TIPOS_CAMPOS.BINARIO.nome) carac.valor = stringValueToBoolean(carac.valor);
    });

    this.informacoesForm.controls['titulo'].setValue(this.anuncio.titulo);
    this.informacoesForm.controls['tipo_id'].setValue(this.anuncio.tipo.id);
    this.informacoesForm.controls['descricao'].setValue(this.anuncio.descricao);
    this.informacoesForm.controls['qtd_maxima_reservas'].setValue(this.anuncio.qtd_maxima_reservas);

    this.imgsForm.controls['imgs'].setValue(this.anuncio.imagens.map(img => {
      return { img: { id: img.id, url: img.url } }
    }));

    this.imgs = this.anuncio.imagens.map(img => {
      return { id: img.id, src: img.url, success: true }
    });

    this.infoAdicionais = this.anuncio.infos;

    this.documentosForm.controls['proprietario'].setValue(this.anuncio.proprietario);
    this.documentosForm.controls['pessoajuridica'].setValue(this.anuncio.pessoajuridica);
    
    this.anuncio.documentos.forEach(documento => {
      let doc = this.documentos.find(doc => doc.id === documento.tipo_alugavel_documento_id);
      if (doc) {
        doc.files = [{ src: documento.url, success: true }];
        this.documentosForm.controls[`${doc.id}`].setValue([{ id: documento.id }]);
      }
    });

    this.documentosForm.controls['cadastro_terceiro'].reset({
      ...this.anuncio.cadastro_terceiro
    });
    
    setTimeout(() => {
      this.documentosForm.get('cadastro_terceiro')['controls']['local'].reset({
        ...this.anuncio.cadastro_terceiro.local
      });
    }, 1000);

    this.enderecoForm.reset({
      ...this.anuncio.local
    });

    Object.keys(this.valoresForm.value).forEach(key => {
      if (key === 'valor' || key === 'valor_mes') {
        this.valoresForm.controls[key]
          .setValue(Number(this.anuncio[key])
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
          .replace(/(\,[0-9]{2})/, ''));
      } else {
        this.valoresForm.controls[key].setValue(this.anuncio[key]);
      }
    });
  }

  public update() {
    let anuncio = this.anuncio.cadastro_terceiro? this.buildAnuncioObject(this.anuncio.id, this.anuncio.cadastro_terceiro.id) : this.buildAnuncioObject(this.anuncio.id);
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

  private buildAnuncioObject(id?: number, cadastro_terceiro_id?: number) {
    const configCadastroTerceiro = () => {
      let temp = {};
      if (this.documentosForm.controls['pessoajuridica'].value) {
        temp = {
          cnpj: this.documentosForm.controls['cadastro_terceiro'].value['cnpj'],
          razao_social: this.documentosForm.controls['cadastro_terceiro'].value['razao_social']
        }
      } else {
        temp = {
          cpf: this.documentosForm.controls['cadastro_terceiro'].value['cpf'],
          nome: this.documentosForm.controls['cadastro_terceiro'].value['nome']
        }
      }
      let tempLocal = this.documentosForm.controls['cadastro_terceiro'].value['local'];
      delete tempLocal.latitude;
      delete tempLocal.longitude;
      tempLocal.pais = 'Brasil';
      
      return { ...temp, local: this.documentosForm.controls['cadastro_terceiro'].value['local'] }
    }

    let anuncio = {
      ...this.informacoesForm.value,
      proprietario: this.documentosForm.controls['proprietario'].value,
      pessoajuridica: this.documentosForm.controls['pessoajuridica'].value,
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
    if (!this.documentosForm.controls['proprietario'].value) anuncio.cadastro_terceiro = configCadastroTerceiro()

    if (id) anuncio.id = id;
    if (cadastro_terceiro_id) anuncio.cadastro_terceiro.id = cadastro_terceiro_id;
    
    return anuncio;
  }

  public addInfo(descricao: string) {
    if (descricao) this.infoAdicionais.unshift({ descricao });
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
