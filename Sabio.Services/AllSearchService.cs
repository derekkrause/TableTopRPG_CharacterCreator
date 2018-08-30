using Newtonsoft.Json.Linq;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class AllSearchService : IAllSearchService
    {
        readonly IDataProvider dataProvider;

        public AllSearchService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public List<AllSearch> GetAllSearches (string query)
        {
            List<AllSearch> allSearchesResults = new List<AllSearch>();

            dataProvider.ExecuteCmd("FullText_SearchAll", 
                (parameters) => 
            {
                parameters.AddWithValue("@SearchQuery", query);
            }, 
                (reader, resultSetIndex) => 
            {
                AllSearch allSearchItem = new AllSearch
                {
                    IdInTable = (int)reader["IdInTable"],
                    RelevanceRanking = (int)reader["RelevanceRanking"],
                    TableName = (string)reader["TableName"],
                    Type = (string)reader["Type"],
                    ItemData = new JRaw((string)reader["ItemData"])
                };

                allSearchesResults.Add(allSearchItem);
            });

            return allSearchesResults;
        }

        public PagedItemResponse<AllSearch> GetAllSearchPaged (int pageIndex, int pageSize, string query)
        {
            PagedItemResponse<AllSearch> pagedItemResponse = new PagedItemResponse<AllSearch>();
            List<AllSearch> allSearchResults = new List<AllSearch>();
            int highTotalCount = 0;

            dataProvider.ExecuteCmd("FullText_SearchAllPaging", (parameters) =>
            {
                parameters.AddWithValue("@PageIndex", pageIndex);
                parameters.AddWithValue("@PageSize", pageSize);
                parameters.AddWithValue("@SearchQuery", query);
            }, (reader, resultSetIndex) =>
            {
                AllSearch allSearchItem = new AllSearch
                {
                    IdInTable = (int)reader["IdInTable"],
                    RelevanceRanking = (int)reader["RelevanceRanking"],
                    TableName = (string)reader["TableName"],
                    Type = (string)reader["Type"]
                    //ItemData = new JRaw((string)reader["ItemData"])
                };

                object itemDataObj = reader["ItemData"];
                if (itemDataObj != DBNull.Value)
                {
                    allSearchItem.ItemData = new JRaw((string)itemDataObj);
                }

                pagedItemResponse.PageIndex = (int)reader["PageIndex"];
                pagedItemResponse.PageSize = (int)reader["PageSize"];
                pagedItemResponse.TotalCount = (int)reader["TotalCount"];

                if (highTotalCount >= pagedItemResponse.TotalCount)
                {
                    pagedItemResponse.TotalCount = highTotalCount;
                }

                allSearchResults.Add(allSearchItem);

                highTotalCount++;
            });

            pagedItemResponse.PagedItems = allSearchResults;

            pagedItemResponse.TotalPages = (int)Math.Ceiling(pagedItemResponse.TotalCount / (decimal)pagedItemResponse.PageSize);

            pagedItemResponse.HasPrevPage = true;
            pagedItemResponse.HasNextPage = true;

            if (pagedItemResponse.PageIndex == 0)
            {
                pagedItemResponse.HasPrevPage = false;
                pagedItemResponse.HasNextPage = true;
            }

            if (pagedItemResponse.PageIndex == pagedItemResponse.TotalPages - 1)
            {
                pagedItemResponse.HasPrevPage = true;
                pagedItemResponse.HasNextPage = false;
            }

            if (pagedItemResponse.PageIndex == 0 && pagedItemResponse.TotalPages == 1)
            {
                pagedItemResponse.HasPrevPage = false;
                pagedItemResponse.HasNextPage = false;
            }

            return pagedItemResponse;
        }
    }
}
