using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    // "public" means this class is visible from other projects (e.g. Sabio.Web)
    // ": IPogsService" means "this class implements that IPogsService interface"
    public class PogsService : IPogsService
    {
        // This is the pattern you use for "dependency injection":

        // 1. create a field to hold what we were given
        readonly IDataProvider dataProvider;

        // 2. create a constructor for this class
        public PogsService(IDataProvider dataProvider)
        {
            // 3. store the parameter in the field
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<Pog> GetAll(int pageIndex, int pageSize)
        {
            PagedItemResponse<Pog> pagedItemResponse = new PagedItemResponse<Pog>();
            List<Pog> listOfPogs = new List<Pog>();

            // use the data provider to execute our SQL stored procedure

            dataProvider.ExecuteCmd(
                "Pog_SelectAll",
                (parameters) =>
                {
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    // this arrow function gets called zero or more times
                    // (once for every row that comes out of the database)
                    Pog pog = new Pog
                    {
                        Id = (int)reader["id"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        //StartDate = (DateTime)reader["StartDate"],
                        //Country = (string)reader["Country"],
                        //Points = (int)reader["Points"]
                    };

                    object startDateObj = reader["StartDate"];
                    if (startDateObj != DBNull.Value)
                    {
                        pog.StartDate = (DateTime)startDateObj;
                    }

                    pagedItemResponse.TotalCount = (int)reader["TotalRows"];

                    listOfPogs.Add(pog);
                });

            pagedItemResponse.PagedItems = listOfPogs;

            return pagedItemResponse;
        }

        public int Create(PogCreateRequest request)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "Pog_Insert",
                (parameters) =>
                {
                    // this first arrow function is called by the dataProvider BEFORE
                    // the command is executed. This is where you set up the parameters.

                    parameters.AddWithValue("@Name", request.Name);
                    parameters.AddWithValue("@StartDate", request.StartDate);
                    parameters.AddWithValue("@Country", request.Country);
                    parameters.AddWithValue("@Points", request.Points);
                    parameters.AddWithValue("@Inactive", request.Inactive);
                    parameters.AddWithValue("@Url", request.Url);

                    parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    // in this second arrow function, it's safe to look in the output parameters
                    // and retreive the value(s) you want.

                    newId = (int)parameters["@id"].Value;
                });

            return newId;
        }
    }
}
