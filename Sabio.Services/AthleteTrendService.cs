using Sabio.Data.Providers;
using Sabio.Models.Responses;
using System.Collections.Generic;
using Sabio.Models.Domain;
using Newtonsoft.Json.Linq;
using System;

namespace Sabio.Services
{
    public class AthleteTrendService
    {
        readonly IDataProvider dataProvider;

        public AthleteTrendService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<AthleteTrend> GetAll(string q)
        {
            PagedItemResponse<AthleteTrend> pagedItemResponse = new PagedItemResponse<AthleteTrend>();
            List<AthleteTrend> athleteTrendsList = new List<AthleteTrend>();

            dataProvider.ExecuteCmd(
                "Athlete_Trend",
                (parameters) =>
                {
                    parameters.AddWithValue("@SearchString", q);
                },
                (reader, resultSetIndex) =>
                {
                    AthleteTrend athleteTrend = new AthleteTrend
                    {
                        UserId = (int)reader["UserId"],
                        AthleteId = (int)reader["AthleteId"],
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        AvatarUrl = (string)reader["AvatarUrl"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Sport = (string)reader["Sport"],
                        SportPosition = new JRaw (reader["SportPosition"])
                    };

                    athleteTrendsList.Add(athleteTrend);
                });
            pagedItemResponse.PagedItems = athleteTrendsList;
            return pagedItemResponse;

        }
    }
}
