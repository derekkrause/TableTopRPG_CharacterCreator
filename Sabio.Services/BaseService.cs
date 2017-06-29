using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Sabio.Services
{
    /// <summary>
    /// 
    /// </summary>
    public abstract class BaseService
    {
        protected IDao DataProvider
        {

            get { return Sabio.Data.DataProvider.Instance; }
        }

        protected SqlConnection GetConnection()
        {

            throw new NotImplementedException();

        }
    }
}