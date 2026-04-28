import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  //importa la variabile HttpClient questo è un servizio di Angular che permette di effettuare chiamate HTTP al server,
  // in questo caso lo utilizzeremo per effettuare il login
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null); //creo una variabile di stato che conterrà l'utente loggato, inizialmente è null


  baseUrl = 'https://localhost:5001/api/';
  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );;
  }


  //creo la funzione login che prende in input le credenziali e restituisce una chiamata post al server per effettuare il login
  // se il login è andato a buon fine, salvo l'utente loggato nel localStorage del browser e imposto la variabile di stato curruentUser con l'utente loggato
  login(creds: LoginCreds) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user)); //localStorage è un oggetto che permette di salvare dati nel browser, in questo caso salvo l'utente loggato come stringa JSON
    this.currentUser.set(user);
  }

  logOut() {
    localStorage.removeItem('user'); //rimuovo l'utente dal localStorage del browser
    this.currentUser.set(null); //imposto l'utente loggato a null
  }
}
