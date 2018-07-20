using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data;

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
                    parameters.AddWithValue("@Subject", request.Subject);
                    parameters.AddWithValue("@Content", request.Content);
                    parameters.AddWithValue("@ImageUrl", request.ImageUrl);
                });
        }

        public int Create(BlogCreateRequest request)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "Blog_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@Title", request.Title);
                    parameters.AddWithValue("@Subject", request.Subject);
                    parameters.AddWithValue("@Content", request.Content);
                    parameters.AddWithValue("@Slug", request.Slug);
                    parameters.AddWithValue("@AuthorId", request.AuthorId); //TODO: replace this with provided userID
                    parameters.AddWithValue("@ImageUrl", request.ImageUrl);

                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                }
                );
            return newId;
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
                        Slug = (string)reader["Slug"],
                        AuthorId = (int)reader["AuthorId"],
                        PublishDate = (DateTime)reader["PublishDate"],
                        IsPublished = (bool)reader["IsPublished"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        AvatarUrl = (string)reader["AvatarUrl"]

                    };

                    object imageUrlObj = reader["ImageUrl"];
                    if (imageUrlObj != DBNull.Value)
                    {
                        blog.ImageUrl = (string)imageUrlObj;
                    }

                    object dateModifiedObj = reader["DateModified"];
                    if (dateModifiedObj != DBNull.Value)
                    {
                        blog.DateModified = (DateTime)dateModifiedObj;
                    }

                    pagedItemResponse.TotalCount = (int)reader["TotalRows"];

                    blogList.Add(blog);

                });
            pagedItemResponse.PagedItems = blogList;

            return pagedItemResponse;

        }
    }
}
