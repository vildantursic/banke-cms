import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  template: `
    <nav mat-tab-nav-bar>
      <a mat-tab-link
         *ngFor="let tab of tabs"
         routerLinkActive
         (click)="selectTab(tab)">
        {{ tab }}
      </a>
    </nav>
  `
})
export class TabsComponent implements OnInit {

  tabName = '';

  @Input() tabs;

  @Output('onTabClick') onTabClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.tabName = this.tabs[0];
  }

  selectTab(tab): void {
    this.tabName = tab;
    this.onTabClick.emit(this.tabName);
  }

}
