import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountService = inject(AccountService);

  init() {
    const userString = localStorage.getItem('user'); //prendo l'utente loggato dal localStorage del browser
    if (!userString) return of(null); //se non c'è un utente loggato, esco dalla funzione
    const user = JSON.parse(userString); //se c'è un utente loggato, lo trasformo da stringa JSON a oggetto JavaScript
    this.accountService.currentUser.set(user);

    return of(null); // Restituisci un Observable vuoto o qualsiasi altro valore se necessario
  }
}
