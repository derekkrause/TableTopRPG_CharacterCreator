using Sabio.Data.Providers;
using System;
using System.Data.SqlClient;

namespace Sabio.Services
{
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