using Newtonsoft.Json.Linq;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using Sabio.Data;
using System;

namespace Sabio.Services
{
    public class SchoolSearchService : ISchoolSearchService
    {
        readonly IDataProvider dataProvider;
        public SchoolSearchService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<SchoolSearch> Search( int pageIndex, int pageSize, string q ="" , double? lat =null, double? lon =null, double? radius =null )
        {
            PagedItemResponse<SchoolSearch> pagedItemResponse = new PagedItemResponse<SchoolSearch>();
            List<SchoolSearch> listSchoolSearch = new List<SchoolSearch>();

            dataProvider.ExecuteCmd(
                "School_Search_FullText",
                (parameters) =>
                {
                    parameters.AddWithValue("@SearchQuery", q);
                    parameters.AddWithValue("@Lat", lat);
                    parameters.AddWithValue("@lon", lon);
                    parameters.AddWithValue("@radius", radius);
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    SchoolSearch schoolSearch = new SchoolSearch
                    {
                        //Key = (int)reader["Key"],
                        Rank = (int)reader["Rank"],
                        TableName = (string)reader["TableName"],
                        SchoolType = (int)reader["SchoolType"],
                        SchoolId = (int)reader["SchoolId"],
                        Name = (string)reader["Name"],
                        Street = reader.GetSafeString("Street"),
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = reader.GetSafeString("Zip"),
                        Url = (string)reader["Url"],
                        ItemData = new JRaw((string)reader["ItemData"]),
                        Lat = reader.GetSafeDoubleNullable("Lat"),
                        Lon = reader.GetSafeDoubleNullable("Lon")
                        //Distance = reader.GetSafeDoubleNullable("Distance")
                    };
                    pagedItemResponse.TotalCount = (int)reader["TotalRows"];
                    pagedItemResponse.PageIndex = pageIndex;
                    pagedItemResponse.PageSize = pageSize;

                    listSchoolSearch.Add(schoolSearch);
                });

            pagedItemResponse.TotalPages = (int)Math.Ceiling(pagedItemResponse.TotalCount / (double)pageSize);
            pagedItemResponse.PagedItems = listSchoolSearch;
            return pagedItemResponse;

        }

    }
}
