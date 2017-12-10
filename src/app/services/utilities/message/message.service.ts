import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  show(message): void {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }
}
