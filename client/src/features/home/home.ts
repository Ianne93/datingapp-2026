import { Component, signal } from '@angular/core';
import { Register } from "../account/register/register";

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  protected registerMode = signal(false)
  
  //creo una funzione showRegister che prende in input un booleano e imposta la variabile di stato registerMode con il valore passato in input.
  // Questa funzione verrà chiamata quando l'utente clicca sul pulsante di registrazione o quando annulla la registrazione.
  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
