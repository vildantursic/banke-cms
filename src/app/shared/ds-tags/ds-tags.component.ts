import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ds-tags',
  styles: [`    
    .tag {
      background: rgba(0,0,0,0.54);
      color: white;
      text-align: center;
    }
    .tag:focus {
      outline: none !important;
    }
    .mini {
      /*TODO remove margin on mini tags*/
      /*transform: scale(0.7);*/
      /*margin: auto -8px !important;*/
      min-width: 27px;
      min-height: 16px;
      font-size: 12px;
      padding: 4px 8px !important;
      font-weight: lighter;
    }
  `],
  template: `
    <mat-chip-list>
      <mat-chip *ngFor="let tag of tags"
               class="tag"
               [ngClass]="{'mini': mini}"
               [color]="tag?.color"
               [selected]="tag?.active"
               (click)="onItemClicked.emit(tag.id)">
        <span *ngIf="tag?.name">{{tag?.name}}</span>
      </mat-chip>
    </mat-chip-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsTagsComponent implements OnInit {

  @Input() tags = [];
  @Input() languageCode = 'en';
  @Input() mini: boolean;

  @Output('onItemClicked') onItemClicked: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
}
