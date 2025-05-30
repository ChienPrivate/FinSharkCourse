using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.Extensions
{
    public static class ClaimExtension
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {

            return user.Claims
               .SingleOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")
               ?.Value;

            /*return user.Claims
                .FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Name)
                ?.Value;*/
        }
    }
}