import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from '../layout/nav/nav';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  //importa il servizio AccountService che contiene le funzioni per effettuare il login e il logout,
  //e la variabile di stato currentUser che contiene l'utente loggato
  protected accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected title = 'Dating App';
  protected members = signal<any>([]);

  //in questa funzione chiamo la funzione getMembers per ottenere la lista dei membri dal server
  //e impostare la variabile di stato members con la lista ottenuta
  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser(); //chiamo la funzione setCurrentUser per impostare l'utente loggato nella variabile di stato currentUser del servizio AccountService
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user'); //prendo l'utente loggato dal localStorage del browser
    if (!userString) return; //se non c'è un utente loggato, esco dalla funzione
    const user = JSON.parse(userString); //se c'è un utente loggato, lo trasformo da stringa JSON a oggetto JavaScript
    this.accountService.currentUser.set(user); //imposto la variabile di stato curruentUser con l'utente loggato
  }

  //creo una funzione asincrona che restituisce una chiamata get al server per ottenere la lista dei membri, se la chiamata è andata a buon fine,
  //imposto la variabile di stato members con la lista dei membri ottenuta dal server
  async getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
