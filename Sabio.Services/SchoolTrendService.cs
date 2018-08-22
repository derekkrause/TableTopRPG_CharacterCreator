

using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Services.Interfaces;
using System.Collections.Generic;

namespace Sabio.Services
{
    public class SchoolTrendService : ISchoolTrendService
    {
        readonly IDataProvider dataProvider;

        public SchoolTrendService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<SchoolTrend> GetAll()
        {
            PagedItemResponse<SchoolTrend> pagedItemResponse = new PagedItemResponse<SchoolTrend>();
            List<SchoolTrend> schoolTrendList = new List<SchoolTrend>();

            dataProvider.ExecuteCmd(
                "School_Trend",
                (parameters) =>
                {

                },
                (reader, resultSetIndex) =>
                {
                    SchoolTrend schoolTrend = new SchoolTrend
                    {
                        SchoolId = (int)reader["SchoolId"],
                        FavSchoolCount = (int)reader["FavSchoolCount"],
                        Name = (string)reader["Name"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Url = (string)reader["Url"]
                    };

                    schoolTrendList.Add(schoolTrend);

                });
            pagedItemResponse.PagedItems = schoolTrendList;
            return pagedItemResponse;
        }
    }
}
