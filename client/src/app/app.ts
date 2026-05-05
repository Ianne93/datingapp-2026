import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from '../layout/nav/nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {  
  protected router = inject(Router);
}


  // =========================
  // CODICE DISABILITATO (SEZIONE 6)
  // =========================

  // importa il servizio AccountService che contiene le funzioni per effettuare il login e il logout,
  // e la variabile di stato currentUser che contiene l'utente loggato
  // protected accountService = inject(AccountService);

  // section 6: la funzione setCurrentUser è stata spostata in app.config.ts,
  // quindi non è più necessario importare il servizio AccountService qui,
  // altrimenti verrebbe importato due volte all'avvio dell'applicazione

  // private http = inject(HttpClient);
  // protected title = 'Dating App';
  // protected members = signal<any>([]);

  // in questa funzione chiamo la funzione getMembers per ottenere la lista dei membri dal server
  // e impostare la variabile di stato members con la lista ottenuta
  // async ngOnInit() {
  //   this.members.set(await this.getMembers());

  //   // section 6, ora setCurrentUser è stata spostata in app.config.ts,
  //   // quindi non è più necessario chiamarla qui, altrimenti verrebbe chiamata due volte all'avvio dell'applicazione
  //   // this.setCurrentUser(); // chiamo la funzione setCurrentUser per impostare l'utente loggato nella variabile di stato currentUser del servizio AccountService
  // }

  // creo una funzione asincrona che restituisce una chiamata get al server per ottenere la lista dei membri,
  // se la chiamata è andata a buon fine, imposto la variabile di stato members con la lista dei membri ottenuta dal server
  // sectio n 6, questa funzione è stata spostata in app.config.ts,
  // quindi non è più necessario chiamarla qui, altrimenti verrebbe chiamata due volte all'avvio dell'applicazione
  // async getMembers() {
  //   try {
  //     return lastValueFrom(
  //       this.http.get('https://localhost:5001/api/members')
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  // setCurrentUser() {
  //   const userString = localStorage.getItem('user'); // prendo l'utente loggato dal localStorage del browser
  //   if (!userString) return; // se non c'è un utente loggato, esco dalla funzione
  //   const user = JSON.parse(userString); // se c'è un utente loggato, lo trasformo da stringa JSON a oggetto JavaScript
  //   this.accountService.currentUser.set(user); // imposto la variabile di stato curruentUser con l'utente loggato
  // }
