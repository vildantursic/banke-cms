import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-ds-selectable-tags',
  styles: [`
    :host {
      display: block;
      height: calc(80vh - 61px);
      overflow: auto;
    }
    .ds-margin {
      margin: 10px 20px;
      display: block;
    }
  `],
  template: `
    <mat-checkbox class="ds-margin"
                 color="primary"
                 *ngFor="let tag of tags"
                 [(ngModel)]="tag.selected"
                 [disabled]="tag.selected ? false : isSelectedLimit()">
      {{tag.name}}
    </mat-checkbox>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsSelectableTagsComponent {

  @Input() tags = [];
  @Input() limit = 3;

  isSelectedLimit(): boolean {
    return this.tags.filter(t => t.selected).length + 1 > this.limit;
  }

}
