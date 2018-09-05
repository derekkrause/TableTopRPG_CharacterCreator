using Newtonsoft.Json.Linq;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;

namespace Sabio.Services
{
    public class CoachSearchService
    {
        readonly IDataProvider dataProvider;
        public CoachSearchService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<CoachSearch> Search (int pageIndex, int pageSize, string q="")
        {
            PagedItemResponse<CoachSearch> pagedItemResponse = new PagedItemResponse<CoachSearch>();
            List<CoachSearch> listCoachSearch = new List<CoachSearch>();

            dataProvider.ExecuteCmd(
                "Coach_Search_FullText",
                (parameter) =>
                {
                    parameter.AddWithValue("@SearchQuery", q);
                    parameter.AddWithValue("@PageIndex", pageIndex);
                    parameter.AddWithValue("@PageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    CoachSearch coachSearch = new CoachSearch
                    {
                        Rank = (int)reader["Rank"],
                        TableName = (string)reader["TableName"],
                        ItemData = new JRaw((string)reader["ItemData"])
                    };

                    pagedItemResponse.TotalCount = (int)reader["TotalRows"];
                    pagedItemResponse.PageIndex = pageIndex;
                    pagedItemResponse.PageSize = pageSize;

                    listCoachSearch.Add(coachSearch);

                });
            pagedItemResponse.TotalPages = (int)Math.Ceiling(pagedItemResponse.TotalCount / (double)pageSize);
            pagedItemResponse.PagedItems = listCoachSearch;
            return pagedItemResponse;
        }
    }
}
