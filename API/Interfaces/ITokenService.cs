using API.Entities;

namespace API.Interfaces;

public interface ITokenService
{/*cosa è una interface? 
   Un'interfaccia in C# è un contratto che definisce un insieme di metodi e proprietà
   che una classe deve implementare. Non contiene implementazioni concrete,
   ma solo le firme dei membri. */
    string CreateToken(AppUser user);
    
    /*Il metodo CreateToken è definito nell'interfaccia ITokenService e accetta un parametro di tipo AppUser.
    Il metodo restituisce una stringa, che presumibilmente rappresenta un token di autenticazione generato per l'utente specificato. */
}
