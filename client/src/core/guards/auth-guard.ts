import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core/primitives/di';
import { ToastService } from '../services/toast-service';

// authGuard è una funzione che implementa l'interfaccia CanActivateFn, utilizzata per proteggere le rotte dell'applicazione. Verifica se l'utente è autenticato tramite AccountService e, 
// in caso contrario, mostra un messaggio di errore utilizzando ToastService.
export const authGuard: CanActivateFn = () => {
  const accoutService = inject(AccountService);
  const toast = inject(ToastService);

  if (accoutService.currentUser()) {
    return true;
  } else {
    toast.error('You shall not pass.');
    return false;
  }
};
