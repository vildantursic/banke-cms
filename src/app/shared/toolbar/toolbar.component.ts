import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { config } from '../../app.config';
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  styles: [`
    mat-toolbar {
      position: fixed;
      z-index: 10;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    }
    .mat-menu-item {
      text-transform: inherit !important;
    }
    .ds-toolbar-spacer {
      flex: 1 1 auto;
    }
    .ds-toolbar-menu-spacer {
      margin-right: 15px;
    }
    .ds-icon {
      padding: 0 14px;
    }
    .ds-toolbar-user-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
    @media(max-width: 800px) {
      .ds-icon {
        display: none;
      }
    }
  `],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  defaultImage = config.defaultImage;
  confirmDialogGoFromRoute;

  @Input() title = 'BANK & BIZNIS';
  @Input() color = 'default';
  @Input() userData;

  @Output('toggleSidebar') toggleSidebar: EventEmitter<boolean> = new EventEmitter();
  @Output('onLogout') onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  goToRoute(routeLink): void {
    if (sessionStorage.getItem('adding') === 'true') {
      this.confirmDialogGoFromRoute = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Are you sure you want to go ... all data will be lost',
          confirmation: 'Go'
        }
      });

      this.confirmDialogGoFromRoute.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate([routeLink]);
        }
      });
    } else {
      this.router.navigate([routeLink]);
    }
  }

}
