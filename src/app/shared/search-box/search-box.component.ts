import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  styles: [`
    mat-input-container {
      width: 100%;
    }
  `],
  template: `
    <!--<div *ngIf="!autoComplete">-->
      <!--<mat-input-container>-->
        <!--<input mdInput [placeholder]="placeholder" type="text" (keyup)="onKey($event)">-->
      <!--</mat-input-container>-->
    <!--</div>-->

    <!--<div *ngIf="autoComplete">-->
      <!--<mat-input-container>-->
        <!--<input mdInput [placeholder]="placeholder" [mdAutocomplete]="auto" [formControl]="itemsCtrl"  (keyup)="onKey($event)">-->
      <!--</mat-input-container>-->

      <!--<mat-autocomplete #auto="mdAutocomplete">-->
        <!--<mat-option *ngFor="let item of filteredItems | async" [value]="item">-->
          <!--{{ item }}-->
        <!--</mat-option>-->
      <!--</mat-autocomplete>-->
    <!--</div>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent {

  itemsCtrl: FormControl;
  filteredItems: any;

  _items = [];

  @Input() placeholder = 'Search...';
  @Input() autoComplete = false;
  @Input() set items(data: any) {

    data.forEach(dt => {
      if (dt.length !== 0) {
        if (dt.names !== undefined && dt.names['en'] !== undefined) {
          this._items.push(dt.names['en'].name);
        }
      }
    })
  }

  @Output('search') search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.itemsCtrl = new FormControl();
    this.filteredItems = this.itemsCtrl.valueChanges
      .map(name => this.filterItems(name));
  }

  onKey(event: any) {
    this.search.emit(event.target.value);
  }

  filterItems(val: string) {
    return val ? this._items.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0) : this._items;
  }
}
