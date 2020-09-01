import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'img-circular',
  templateUrl: './img-circular.component.html',
  styleUrls: ['./img-circular.component.scss']
})
export class ImgCircularComponent implements OnInit {

  @Input() firstLetter: string;
  @Input() imgUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.validateImg(this.imgUrl);
  }

  private validateImg(img: string) {
    if (img && img.startsWith('https://') && img.includes('/AAAAAAAAAAI')) {
      this.imgUrl = '';
    } else if (img && !img.startsWith('https://') && !img.startsWith('file://')) {
      this.imgUrl = `${environment.apiUrl}/imgs/${img}`;
    }
  }
}
