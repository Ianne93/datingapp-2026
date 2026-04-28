import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  //creo una proprietà protetta chiamata creds che è un oggetto vuoto di tipo RegisterCreds. Questo oggetto conterrà le credenziali di registrazione dell'utente, come nome, email e password.
  protected creds = {} as RegisterCreds;
  showPassword: boolean = false;
  cancelRegister = output<boolean>();
  private accountService = inject(AccountService);
  //creo una proprietà protetta chiamata cancelRegister che è un output di tipo boolean.
  // Questo output verrà utilizzato per comunicare al componente genitore quando l'utente decide di annullare la registrazione.

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {
    // Qui puoi implementare la logica per inviare le credenziali di registrazione al server o eseguire altre azioni necessarie per completare la registrazione dell'utente.
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log('Registrazione avvenuta con successo', response);
        this.cancel();
      },
      error: error => console.log('Errore durante la registrazione', error)
    });
  }

  cancel() {
    // Qui puoi implementare la logica per annullare la registrazione, ad esempio reindirizzando l'utente a una pagina precedente o cancellando i dati inseriti.
    this.cancelRegister.emit(false); //emetto un evento con valore false per indicare al componente genitore che l'utente ha annullato la registrazione
    console.log('Registrazione annullata');
  }
}
