using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Jwt;
using Owin;
using Sabio.Web.Core.Services.Security;
using System;
using System.Configuration;
using System.Web;
using Sabio.Services.Security;
using Sabio.Web.Core.Security.Jwt;

namespace Sabio.Web
{
    public partial class Startup
    {
        // Sabio: this is a system generated file. Google the hell out of this file. it could kill you.

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
#if (AUTH_COOKIE)
            ConfigureCookieAuth(app);
#elif  AUTH_JWT
            ConfigureJwtAuth(app);
#endif
        }


        /// <summary>
        /// This method of Authentication currently does not support the generatio of the token with an "Login" flow.
        /// The token is expected to have been generated elsewhere and then passed in the headers of any request.
        /// The format of the JWT will be validted as long as the Algo and Secrect used to generate and validate package are the same.
        /// </summary>
        /// <param name="app"></param>
        private static void ConfigureJwtAuth(IAppBuilder app)
        {
            string _jwtSecret;
            TokenValidationParameters tokenParams;
            SetTokenValidationParameters(out _jwtSecret, out tokenParams);

            JwtBearerAuthenticationOptions authOptions = new JwtBearerAuthenticationOptions();
            authOptions.TokenValidationParameters = tokenParams;

            app.UseJwtBearerAuthentication(authOptions);
        }

        /// <summary>
        /// Will store Authentication information in a cookie in of two formats. The default format is 
        /// standard to ASP.Net applications. The second format stores and unpacks a JWT
        /// </summary>
        /// <param name="app"></param>
        private static void ConfigureCookieAuth(IAppBuilder app)
        { 

            CookieAuthenticationOptions cookieAuthenticationOptions = new CookieAuthenticationOptions();
            {
                cookieAuthenticationOptions.SlidingExpiration = true;
                cookieAuthenticationOptions.AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie;
                cookieAuthenticationOptions.LoginPath = new PathString("/");
                cookieAuthenticationOptions.Provider = new CookieAuthenticationProvider
                {
                    OnApplyRedirect = ctx =>
                    {
                        if (!IsAjaxRequest(ctx.Request) && !IsApiRequest(ctx.Request))
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                    }
                };

                cookieAuthenticationOptions.CookieName = "authentication";

                SetCookieFormatter(cookieAuthenticationOptions);

                app.UseCookieAuthentication(cookieAuthenticationOptions);
            };

            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Enables the application to temporarily store user information when they are verifying the second factor in the two-factor authentication process.
            app.UseTwoFactorSignInCookie(DefaultAuthenticationTypes.TwoFactorCookie, TimeSpan.FromMinutes(5));

            // Enables the application to remember the second login verification factor such as phone or email.
            // Once you check this option, your second step of verification during the login process will be remembered on the device where you logged in from.
            // This is similar to the RememberMe option when you log in.
            app.UseTwoFactorRememberBrowserCookie(DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");

            //app.UseFacebookAuthentication(
            //   appId: "",
            //   appSecret: "");

            //app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            //{
            //    ClientId = "",
            //    ClientSecret = ""
            //});
        }

        private static void SetCookieFormatter(CookieAuthenticationOptions cookieAuthenticationOptions)
        {
            // No need to ever use this as it is too buggy.
            //if (ConfigurationManager.AppSettings["UsePlaintextAuthCookie"] == "true")
            //{
            //    cookieAuthenticationOptions.TicketDataFormat = new PlaintextSecureDataFormat();
            //}
            
            if (ConfigurationManager.AppSettings["UseJwtAuthCookie"] == "true")
            {
                string _jwtSecret;
                TokenValidationParameters tokenParams;
                SetTokenValidationParameters(out _jwtSecret, out tokenParams);

                cookieAuthenticationOptions.TicketDataFormat = new AppJwtFormat(tokenParams, _jwtSecret);
            }
        }

        private static void SetTokenValidationParameters(out string _jwtSecret, out TokenValidationParameters tokenParams)
        {
            string _appDomain = ConfigurationManager.AppSettings["Security.AppDomain"];
            _jwtSecret = ConfigurationManager.AppSettings["Jwt.Secret"];
            tokenParams = new TokenValidationParameters
            {
                // The same _jwtSecret and _appDomain as in JwtTokenProvider were used here
                IssuerSigningKey = _jwtSecret.ToSymmetricSecurityKey(),
                ValidIssuer = _appDomain,
                ValidAudience = _appDomain,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(0),
                RequireExpirationTime = true,
               
                
            };
        }

        /*Sabio: this one method illustrates how one would tell if a given request
         was made as an Ajax request
         */
        private static bool IsAjaxRequest(IOwinRequest request)
        {
            IReadableStringCollection query = request.Query;
            if ((query != null) && (query["X-Requested-With"] == "XMLHttpRequest"))
            {
                return true;
            }
            IHeaderDictionary headers = request.Headers;
            return ((headers != null) && (headers["X-Requested-With"] == "XMLHttpRequest"));
        }

        /*Sabio: this one method illustrates how one would tell if a given request
         was made as an API endpoint instead of a view controller endpoint
         */
        private static bool IsApiRequest(IOwinRequest request)
        {
            string apiPath = VirtualPathUtility.ToAbsolute("~/api/");
            return request.Uri.LocalPath.StartsWith(apiPath);
        }
    }
}