import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  public sendNotification(message: string, state: 'error-notification' | 'neutral-notification' | 'success-notification'): void {
    this.snackBar.open(message, null, {
      duration: 4000,
      panelClass: [state]
    });
  }

  public sendActionNotification(message: string, actionMessage: string, state: 'error-notification' | 'neutral-notification' | 'success-notification'): Observable<void> {
    return this.snackBar.open(message, actionMessage, {
      duration: 4000,
      panelClass: [state]
    }).onAction();
  }
}
