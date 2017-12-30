import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-blog-card',
  styles: [`
    :host {
      display: flex;
      margin: 10px;
      float: left;
      flex-grow: 1;
      height: auto;
      width: calc(100% * (1/4) - 20px);
    }
    @media (max-width: 1024px) {
      :host {
        width: calc(100% * (1/2) - 20px);
      }
    }
    @media (max-width: 800px) {
      :host {
        width: calc(100% - 20px);
      }
    }
    mat-card {
      width: 100%;
      height: 400px;
      overflow: hidden;
    }
    mat-card-content {
      height: 30px;
    }
    .card-image {
      width: 100%;
      height: 70%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-image img {
      width: auto;
      margin: auto;
    }
    .mat-card-image {
      width: calc(100% + 48px);
      margin: 0;
    }
  `],
  template: `
    <mat-card>
      <div class="card-image">
        <img mat-card-image [src]="item?.image.length !== 0 ? item?.image[0] : '' " alt="">
      </div>
      <mat-card-content>
        <div class="glob_ds-card-form">
          <p>
            {{item?.title}}
          </p>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <div class="glob_ds-card-form" style="display: flex; align-items: center; justify-content: flex-end">
          <button mat-raised-button color="primary" (click)="onEdit.emit(item.slug)">EDIT</button>
          <button mat-raised-button color="warn" (click)="onRemove.emit(item.slug)">REMOVE</button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
})
export class BlogCardComponent implements OnInit {

  @Input() item;

  @Output('onEdit') onEdit: EventEmitter<number> = new EventEmitter();
  @Output('onRemove') onRemove: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
