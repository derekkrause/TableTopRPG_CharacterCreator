using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Sabio.Models;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;


namespace Sabio.Web.Core.Services
{
    public class OwinAuthenticationService : Sabio.Services.IAuthenticationService
    {
        private static string _title = null;
        Sabio.Models.Domain.UserBase _baseUser = null;
        static OwinAuthenticationService()
        {
            _title = GetApplicationName();
        }

        public OwinAuthenticationService()
        {

        }

        public void LogIn(IUserAuthData user, params Claim[] extraClaims)
        {
            ClaimsIdentity identity = new ClaimsIdentity(DefaultAuthenticationTypes.ApplicationCookie
                                                            , ClaimsIdentity.DefaultNameClaimType
                                                            , ClaimsIdentity.DefaultRoleClaimType);

            identity.AddClaim(new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider"
                                , _title
                                , ClaimValueTypes.String));

            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString(), ClaimValueTypes.String));

            identity.AddClaim(new Claim(ClaimsIdentity.DefaultNameClaimType, user.Name, ClaimValueTypes.String));

            if (user.Roles != null && user.Roles.Any())
            {
                foreach (string singleRole in user.Roles)
                {
                    identity.AddClaim(new Claim(ClaimsIdentity.DefaultRoleClaimType, singleRole, ClaimValueTypes.String));
                }

            }

            identity.AddClaims(extraClaims);

            AuthenticationProperties props = new AuthenticationProperties
            {
                IsPersistent = true,
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.AddDays(60),
                AllowRefresh = true
            };

            HttpContext.Current.GetOwinContext().Authentication.SignIn(props, identity);
        }

        public void LogOut()
        {
            HttpContext.Current.GetOwinContext().Authentication.SignOut();
        }


        public IUserAuthData GetCurrentUser()
        {
            if (_baseUser != null || HttpContext.Current.User.Identity.IsAuthenticated)
            {
                ClaimsIdentity identity = HttpContext.Current.User.Identity as ClaimsIdentity;

                if(identity != null)
                {
                    _baseUser = ExtractUser(identity);
                }

            }
            
            return _baseUser;
        }

        private static UserBase ExtractUser(ClaimsIdentity identity)
        {
            Sabio.Models.Domain.UserBase baseUser = new Models.Domain.UserBase();
            List<string> roles = null;

            foreach (var claim in identity.Claims)
            {
                switch (claim.Type)
                {
                    case ClaimTypes.NameIdentifier:
                        int id = 0;

                        if (Int32.TryParse(claim.Value, out id))
                        {
                            baseUser.Id = id;
                        }

                        break;
                    case ClaimTypes.Name:
                        baseUser.Name = claim.Value;
                        break;
                    case ClaimTypes.Role:
                        if (roles == null)
                        {
                            roles = new List<string>();
                        }

                        roles.Add(claim.Value);

                        break;
                    default:
                        break;
                }

            }

            baseUser.Roles = roles;

            return baseUser;
        }

        private static string GetApplicationName()
        {
            var entryAssembly = Assembly.GetExecutingAssembly();

            var titleAttribute = entryAssembly.GetCustomAttributes(typeof(AssemblyTitleAttribute), false).FirstOrDefault() as AssemblyTitleAttribute;
            //if (string.IsNullOrWhiteSpace(applicationTitle))
            //{
            //    applicationTitle = entryAssembly.GetName().Name;
            //}
            return titleAttribute == null ? entryAssembly.GetName().Name : titleAttribute.Title;

        }
    }
}
