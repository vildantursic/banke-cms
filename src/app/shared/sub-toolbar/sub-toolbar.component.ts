import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-toolbar',
  styles: [`
    mat-toolbar {
      background: transparent;
      padding: 0;
    }
    .bs-toolbar-spacer {
      flex: 1 1 auto;
    }
    .ds-sub-toolbar-image {
      width: 40px;
      height: 40px;
      border-radius: 10%;
      margin-right: 15px;
    }
  `],
  template: `
    <mat-toolbar>
      <ng-content select="[sub-toolbar-left]"></ng-content>
      <img *ngIf="image" [src]="image" alt="" class="ds-sub-toolbar-image">
      <span *ngIf="title">{{title}}</span>
      <span class="bs-toolbar-spacer"></span>
      <ng-content select="[sub-toolbar-right]"></ng-content>
    </mat-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubToolbarComponent implements OnInit {

  @Input() title;
  @Input() image;
  @Input() color = 'default';

  constructor() { }

  ngOnInit() {
  }

}
