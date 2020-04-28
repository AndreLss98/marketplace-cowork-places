import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss']
})
export class SpacesComponent implements OnInit {

  public data = {
    images: [
      {
        url: 'https://i.picsum.photos/id/237/1000/500.jpg',
        title: 'Titulo 1',
        description: 'Descrição sobre a imagem'
      },
      {
        url: 'https://i.picsum.photos/id/238/1000/500.jpg',
        title: 'Titulo 2',
        description: 'Descrição sobre a imagem'
      },
      {
        url: 'https://i.picsum.photos/id/239/1000/500.jpg',
        title: 'Titulo 3',
        description: 'Descrição sobre a imagem'
      }
    ],
    dadosCompra: {
      valores: {
        valor: '1000.00',
        taxa: '100.00',
        total: '1100.00',
      },
      dadosEspaco: {
        npessoas: 2,
        localizacao: 'Rua Central - Goiânia - Goiás',
        m2: 100,
        vagas: 2,
        mesas: 2,
        wifi: true,
        funcionamento: {
          domg: false,
          seg: true,
          terc: true,
          qua: true,
          qui: true,
          sex: true, 
          sab: false
        },
        condiçoes: [
          'Para locacoes com prazo superior a 30 dias',
          'Poderá ser dividido em até 10x a 1ª locação. Limitada a cada usuario',
          'Caso o prazo se estenda por mais de 30 dias, o locador poderá aprovar ou não a solicitação'
        ],
        adicionais: [
          'Proibido animais',
          'Proibido fumar',
          'Limite de convidados',
          'Proibido aceso de crianças',
          'Não é permitdo o consumo de bebidas alcoolicas',
          'Refeições somente na copa'
        ]
      },
      descProprietario: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      itemsDisponiveis: [
        'Internet Wi-Fi',
        'Impressora A4 com Scanner',
        'Serviços de copa (água e café)',
        'Revistaria',
        'Estacionamento',
        'Ar condicionado'
      ],
      avaliacao: {
        nota: 4.5,
        comentarios: [
          {
          autor: 'Paulo Jose',
          data: '28 de março de 2020',
          titulo: 'Incrivel! Gostei muito!',
          nota: 5,
          comentario: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
          },
          {
            autor: 'Paulo Jose',
            data: '28 de março de 2020',
            titulo: 'Incrivel! Gostei muito!',
            nota: 5,
            comentario: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
          }
        ]
      },
      disponibilidade: {
        min: '20200427',
        max: '20200527'
      }
    }
  }

  constructor(config: NgbCarouselConfig) { }

  /**
   * Retorna um array com os nomes dos icones, para as estrelas da avalição
   * pode ser star, star_half, star_outline
   */
  countStars(): string[] {
    let n:number = this.data.dadosCompra.avaliacao.nota;
    let array = [];
    let j = 0;

    for (let index = 0; index < Math.floor(n); index++) {
      j++
      array.push('start');
      console.log("entrei",j)
    }

    if(n-j){
      array.push('star_half');
    }

    while(array.length < 5){
      array.push('star_outline')
    }
   
    return array;
  }

  ngOnInit(): void {
    console.log(this.countStars());
  }

}
