using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{   /*Il metodo CreateToken è definito nell'interfaccia ITokenService
    e deve essere implementato nella classe TokenService.*/
    public string CreateToken(AppUser user)
    {
        // Il metodo CreateToken accetta un oggetto AppUser come parametro e restituisce una stringa che rappresenta il token creato.
        // Il tokenKey viene recuperato dalla configurazione dell'applicazione utilizzando la chiave "TokenKey".
        // Questo tokenKey viene utilizzato per firmare il token e garantire la sua integrità.
        // Il simbolo "??" è l'operatore di coalescenza null in C#. Viene utilizzato per fornire un valore predefinito nel caso in cui l'espressione a sinistra dell'operatore sia null.
        // In questo caso, se config["TokenKey"] restituisce null, verrà lanciata un'eccezione InvalidOperationException con il messaggio "TokenKey not found in configuration". Se invece config["TokenKey"] 
        // restituisce un valore non null, quel valore verrà assegnato alla variabile tokenKey.
        var tokenKey = config["TokenKey"] ?? throw new Exception("Cannot t token key");
        //vericheremo la lunghezza del tokenKey e, se è null o vuoto, lanceremo un'eccezione InvalidOperationException con un messaggio di errore che indica che il tokenKey non è stato trovato nella configurazione.
        if(tokenKey.Length < 64) throw new Exception("TokenKey needs to be >= 64 characters");
        
        //La crittografia simmetrica viene utilizzata per firmare il token, garantendo che solo chi possiede la chiave segreta (tokenKey) possa generare token validi.
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            //Viene creato un oggetto SigningCredentials utilizzando la chiave simmetrica e l'algoritmo di firma HMAC-SHA512.
        };

        //ora creo le credenziali di firma utilizzando la chiave simmetrica e l'algoritmo di firma HMAC-SHA512.
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //creazione del token descriptor, che contiene le informazioni necessarie per creare il token, come i claims e le credenziali di firma.
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),//7 giorni di validità del token (è tanto, ma è solo per scopi dimostrativi)
            SigningCredentials = creds
        };

        //creazione del token handler, che è responsabile della creazione e della scrittura del token.
        var tokenHandler = new JwtSecurityTokenHandler();
        //creazione del token utilizzando il token descriptor e il token handler.
        var token = tokenHandler.CreateToken(tokenDescriptor);

        //return del token come stringa utilizzando il metodo WriteToken del token handler.
        return tokenHandler.WriteToken(token);  
    }
}
 