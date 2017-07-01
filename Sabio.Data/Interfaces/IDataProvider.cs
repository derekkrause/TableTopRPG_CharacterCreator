using System;
using System.Data;
using System.Data.SqlClient;
namespace Sabio.Data.Providers
{
    public interface IDataProvider
    {
        /// <param name="storedProc">The name of the procedure we want to execute</param>
        /// <param name="inputParamMapper"></param>
        /// <param name="map"></param>
        /// <param name="returnParameters"></param>
        /// <param name="cmdModifier"></param>
        void ExecuteCmd(
            string storedProc,
            Action<SqlParameterCollection> inputParamMapper,
            Action<IDataReader, short> map, 
            Action<SqlParameterCollection> returnParameters = null, 
            Action<SqlCommand> cmdModifier = null
        );

        int ExecuteNonQuery(
            string storedProc, 
            Action<System.Data.SqlClient.SqlParameterCollection> inputParamMapper, 
            Action<System.Data.SqlClient.SqlParameterCollection> returnParameters = null
        );
    }
}
