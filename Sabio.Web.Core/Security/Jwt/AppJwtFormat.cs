using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Jwt;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Services.Security;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Sabio.Web.Core.Security.Jwt
{
    public class AppJwtFormat : JwtFormat, ISecureDataFormat<AuthenticationTicket>
    {
        private string _appDomain = "localhost";
        private string _jwtSecret = null;
        private TokenValidationParameters _tokenValidationParams;
        private static readonly string[] _specialTypes = new[]{
                                                                ClaimTypes.Role,
                                                                ClaimTypes.Name,
                                                                ClaimTypes.NameIdentifier,
                                                                "http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider"
                                                            };


      

        public AppJwtFormat(TokenValidationParameters tokenParams, string jwtSecret) : base(tokenParams)
        {
            this._tokenValidationParams = tokenParams;
            this._jwtSecret = jwtSecret;
        }

        string ISecureDataFormat<AuthenticationTicket>.Protect(AuthenticationTicket data)
        {
            //var roles = data.Identity.FindAll(ClaimTypes.Role);

            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken
            (
                issuer: this._tokenValidationParams.ValidIssuer,
                audience: this._tokenValidationParams.ValidAudience,
                claims: data.Identity.Claims,

                expires: DateTime.UtcNow.Add(TimeSpan.FromDays(7)),
                signingCredentials: _jwtSecret.ToIdentitySigningCredentials()
            );

            var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            return token;
        }

        AuthenticationTicket ISecureDataFormat<AuthenticationTicket>.Unprotect(string protectedText)
        {
            AuthenticationTicket tic = base.Unprotect(protectedText); ;//; AuthenticationTicket(claimsIdentity, authenticationProperties);

            return tic;
        }
    }
}
