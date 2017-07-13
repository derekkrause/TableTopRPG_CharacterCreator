using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace Sabio.Web.Core
{
    public class PlaintextSecureDataFormat : ISecureDataFormat<AuthenticationTicket>
    {
        public string Protect(AuthenticationTicket data)
        {
            return string.Format(
                "{0} {1} {2} {3}",
                data.Identity.GetUserId(),
                data.Identity.GetUserName(),
                string.Join("|", data.Identity.FindAll(ClaimTypes.Role).Select(c => c.Value)),
                string.Join("|", data.Identity.FindAll(IsNotSpecialClaim).Select(c => c.Type + "," + c.Value))
            );
        }

        private static readonly string[] _specialTypes = new[]
        {
            ClaimTypes.Role,
            ClaimTypes.Name,
            ClaimTypes.NameIdentifier,
            "http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider"
        };

        private bool IsNotSpecialClaim(Claim claim)
        {
            return !_specialTypes.Contains(claim.Type);
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            try
            {
                string[] parts = protectedText.Split(' ');

                List<Claim> claims = new List<Claim> {
                    new Claim(ClaimTypes.NameIdentifier, parts[0]),
                    new Claim(ClaimTypes.Name, parts[1]),
                    new Claim(
                        "http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider",
                        "ASP.NET Identity"
                    )
                };
                if (parts.Length > 2 && parts[2] != "")
                {
                    foreach (string role in parts[2].Split('|'))
                    {
                        if (role == "") { continue; }

                        claims.Add(new Claim(ClaimTypes.Role, role));
                    }
                }
                if (parts.Length > 3 && parts[3] != "")
                {
                    foreach (string claim in parts[3].Split('|'))
                    {
                        string[] claimParts = claim.Split(',');
                        claims.Add(new Claim(claimParts[0], claimParts[1]));
                    }
                }

                AuthenticationTicket authenticationTicket = new AuthenticationTicket(
                    new ClaimsIdentity(
                        claims,
                        "ApplicationCookie",
                        ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType
                    ),
                    new AuthenticationProperties
                    {
                        ExpiresUtc = DateTimeOffset.MaxValue,
                        IssuedUtc = DateTimeOffset.UtcNow
                    }
                );

                return authenticationTicket;
            }
            catch { return null; }
        }
    }
}