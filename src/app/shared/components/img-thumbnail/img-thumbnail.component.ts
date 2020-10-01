import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'img-thumbnail',
  templateUrl: './img-thumbnail.component.html',
  styleUrls: ['./img-thumbnail.component.scss']
})
export class ImgThumbnailComponent implements OnInit {

  @Input()
  public src: any;

  public safetyUrl: any;

  public isDoc: boolean = false;

  constructor() { }
  
  ngOnInit(): void {
    if ((typeof(this.src) === 'string' && (this.src.endsWith('.pdf') || this.src.endsWith('.md'))) ||
      this.src.changingThisBreaksApplicationSecurity.includes('application/pdf')) {
      this.isDoc = true;
    }
  }
}
