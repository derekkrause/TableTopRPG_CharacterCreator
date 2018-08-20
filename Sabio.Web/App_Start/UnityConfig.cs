using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Services;
using Sabio.Services.Cryptography;
using Sabio.Services.Interfaces;
using Sabio.Web.Core.Services;
using System.Configuration;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using Unity;
using Unity.Injection;
using Unity.Lifetime;

namespace Sabio.Web
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            
            // when another class's constructor asks for "IPogsService",
            // give them an instance of "PogsService"
            container.RegisterType<IPogsService, FakePogService>();

            container.RegisterType<IConfiguration, HardCodedConfiguration>();

            container.RegisterType<IUserTableService, UserTableServices>();
            container.RegisterType<IEventService, EventService>();
            container.RegisterType<IEmailService, EmailService>();

            //this should be per request
            container.RegisterType<IAuthenticationService, OwinAuthenticationService>();

            container.RegisterType<ICryptographyService, Base64StringCryptographyService>(new ContainerControlledLifetimeManager());


            container.RegisterType<IDataProvider, SqlDataProvider>(
                new InjectionConstructor(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString));

            container.RegisterType<IPrincipal>(new TransientLifetimeManager(),
                     new InjectionFactory(con => HttpContext.Current.User));


            container.RegisterType<IUserService, UserService>(new ContainerControlledLifetimeManager());

            container.RegisterType<ISportServices, SportServices>(new ContainerControlledLifetimeManager());

            System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);

            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));


        }
    }
}