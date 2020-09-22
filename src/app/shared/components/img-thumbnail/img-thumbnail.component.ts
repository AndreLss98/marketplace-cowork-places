import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'img-thumbnail',
  templateUrl: './img-thumbnail.component.html',
  styleUrls: ['./img-thumbnail.component.scss']
})
export class ImgThumbnailComponent implements OnInit {

  @Input()
  public src: any;

  public isDoc: boolean = false;

  constructor() { }
  
  ngOnInit(): void {
    if (this.src.endsWith('.pdf') || this.src.endsWith('.md')) {
      this.isDoc = true;
    }
  }
}
