using Newtonsoft.Json.Linq;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data;
using Sabio.Data;

namespace Sabio.Services
{
    public class BlogsService
    {
        readonly IDataProvider dataProvider;

        public BlogsService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public void Delete(int id)
        {
            dataProvider.ExecuteNonQuery(
                "Blog_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                });
        }

        public void Update(BlogUpdateRequest request)
        {
            dataProvider.ExecuteNonQuery(
                "Blog_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", request.Id);
                    parameters.AddWithValue("@Title", request.Title);
                    parameters.AddWithValue("@Content", request.Content);
                    parameters.AddWithValue("@ImageUrl", request.ImageUrl.ToString());
                    parameters.AddWithValue("@VideoUrl", request.VideoUrl.ToString());
                });
        }

        public int Create(BlogCreateRequest request, int authorId)
        {
            int newId = 0;
        

            dataProvider.ExecuteNonQuery(
                "Blog_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@Title", request.Title);
                    parameters.AddWithValue("@Content", request.Content);
                    parameters.AddWithValue("@ImageUrl", request.ImageUrl.ToString());
                    parameters.AddWithValue("@VideoUrl", request.VideoUrl.ToString());
                    parameters.AddWithValue("@AuthorId", authorId);

                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                }
                );

            return newId;
        }
        public PagedItemResponse<Blog>GetByUserId(int userId)
        {
            PagedItemResponse<Blog> pagedItemResponse = new PagedItemResponse<Blog>();
            List<Blog> blogListByUserId = new List<Blog>();

            dataProvider.ExecuteCmd(
                "Blog_GetByUserId",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                },
                (reader, resultSetIndex) =>
                {
                    Blog blog = new Blog
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Content = (string)reader["Content"],
                        AuthorId = (int)reader["AuthorId"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = reader.GetSafeDateTimeNullable("DateModified"),
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        AvatarUrl = (string)reader["AvatarUrl"],
                        ImageUrl = new JRaw((string)reader["ImageUrl"]),
                        VideoUrl = new JRaw((string)reader["VideoUrl"])
                    };

                    blogListByUserId.Add(blog);
                });
            pagedItemResponse.PagedItems = blogListByUserId;
            return pagedItemResponse;
        }
        public PagedItemResponse<Blog> GetAll(int pageIndex, int pageSize)
        {
            

            PagedItemResponse<Blog> pagedItemResponse = new PagedItemResponse<Blog>();
            List<Blog> blogList = new List<Blog>();

            dataProvider.ExecuteCmd(
                "Blog_SelectAll",
                (parameters) =>
                {
                    parameters.AddWithValue("@PageIndex", pageIndex);
                    parameters.AddWithValue("@PageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    Blog blog = new Blog
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Content = (string)reader["Content"],
                        AuthorId = (int)reader["AuthorId"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = reader.GetSafeDateTimeNullable("DateModified"),
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        AvatarUrl = (string)reader["AvatarUrl"],
                        ImageUrl = new JRaw((string)reader["ImageUrl"]),
                        VideoUrl = new JRaw((string)reader["VideoUrl"])

                    };


                    pagedItemResponse.TotalCount = (int)reader["TotalRows"];

                    blogList.Add(blog);

                });
            pagedItemResponse.PagedItems = blogList;

            return pagedItemResponse;

        }
    }
}
