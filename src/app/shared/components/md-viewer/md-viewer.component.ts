import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdViewerComponent implements OnInit {

  @Input('source') source: string;

  constructor() { }

  ngOnInit(): void {
  }

}
