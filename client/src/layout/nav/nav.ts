import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected creds: any = {};
  //per utilizzare il metodo login, devo importare il servizio AccountService e iniettarlo nel costruttore
  protected accountService = inject(AccountService);
  //creo una variabile loggedIn che mi permette di sapere se l'utente è loggato o meno, inizialmente è false
  //protected loggedIn = signal(false); posso eliminarlo ora perché utilizzerò la variabile di stato currentUser del servizio AccountService per sapere se l'utente è loggato o meno
  showPassword: boolean = false;
  //creo la funzione login che chiama il metodo login del servizio AccountService e passa le credenziali come parametro
  login() {
    //la funzione subscribe permette di gestire la risposta del server, in caso di successo stampa la risposta, in caso di errore stampa l'errore
    this.accountService.login(this.creds).subscribe({
      //la funzione next viene chiamata quando la risposta del server è positiva, la funzione error viene chiamata quando la risposta del server è negativa
      next: (result) => {
        console.log(result);
        this.creds = {};
      },
      error: (error) => alert('Login failed: ' + error.message),
    });
  }

  logout() {
    //utilizzo il metodo logOut del servizio AccountService per effettuare il logout, questo metodo rimuove l'utente dal localStorage del browser e imposta la variabile di stato currentUser a null
    this.accountService.logOut();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
