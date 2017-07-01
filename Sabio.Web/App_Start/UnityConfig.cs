using Microsoft.Practices.Unity;
using Sabio.Data;
using Sabio.Data.Providers;
using System.Configuration;
using System.Web.Http;
using System.Web.Mvc;
using Unity.WebApi;

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

            container.RegisterType<IDataProvider, SqlDataProvider>(
                new InjectionConstructor(
                    ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString
                    )
            );
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}