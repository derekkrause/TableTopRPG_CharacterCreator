using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using Sabio.Data;
using Newtonsoft.Json.Linq;

namespace Sabio.Services
{
    public class FeedHomeService
    {
        readonly IDataProvider dataProvider;
        public  FeedHomeService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<FeedHome> GetAll(int pageIndex, int pageSize, int currentUserId)
        {
            PagedItemResponse<FeedHome> pagedItemResponse = new PagedItemResponse<FeedHome>();
            List<FeedHome> feedHomeList = new List<FeedHome>();

            dataProvider.ExecuteCmd(
                "FeedHome_SelectAll",
                (parameters) =>
                {
                    parameters.AddWithValue("@PageIndex", pageIndex);
                    parameters.AddWithValue("@PageSize", pageSize);
                    parameters.AddWithValue("@CurrentUserId", currentUserId);
                },
                (reader, resultSetIndex) =>
                {
                    FeedHome feedHome = new FeedHome
                    {
                        DateCreated = (DateTime)reader["DateCreated"],
                        Type = (string)reader["Type"],
                        ItemData = new JRaw((string)reader["ItemData"]),
                        Liked = (bool)reader["Liked"],
                        LikedId = reader.GetSafeInt32Nullable("LikedId"),
                        CommentData = new JRaw((string)reader["CommentData"])
                    };

                    feedHomeList.Add(feedHome);
                });
            pagedItemResponse.PagedItems = feedHomeList;

            return pagedItemResponse;
        }
    }
}
