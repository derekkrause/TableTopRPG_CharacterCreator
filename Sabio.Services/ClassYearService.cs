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
    public class ClassYearService
    {

        readonly IDataProvider dataProvider;

        public ClassYearService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<ClassYear> ClassYearGetAll()
        {
            PagedItemResponse<ClassYear> pagedItemResponse = new PagedItemResponse<ClassYear>();
            List<ClassYear> classYearList = new List<ClassYear>();

            dataProvider.ExecuteCmd(
                "ClassYear_GetAll",
                (parameter) =>
                {

                },
                (reader, ResultSetIndex) =>
                {
                    ClassYear classYear = new ClassYear
                    {
                        Id = (int)reader["Id"],
                        Code = (string)reader["Code"],
                        Name = (string)reader["Name"],
                        DisplayOrder = (int)reader["DisplayOrder"],
                        Inactive = (bool)reader["Inactive"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]

                    };

                    classYearList.Add(classYear);
                    pagedItemResponse.PagedItems = classYearList;

                });

            return pagedItemResponse;
        }

        public ItemResponse<ClassYear> GetClassById(int classYearId)
        {
            ItemResponse<ClassYear> ItemResponse = new ItemResponse<ClassYear>();

            dataProvider.ExecuteCmd(
                "ClassYear_GetById",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", classYearId);
                },
                (reader, ResultSetIndex) =>
                {
                    ClassYear classYear = new ClassYear
                    {
                        Id = (int)reader["Id"],
                        Code = (string)reader["Code"],
                        Name = (string)reader["Name"],
                        DisplayOrder = (int)reader["DisplayOrder"],
                        Inactive = (bool)reader["Inactive"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]

                    };

                    ItemResponse.Item = classYear;

                });

            return ItemResponse;

        }

        public int ClassYearInsert(ClassYearInsert classYearInsert)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "ClassYear_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@Code", classYearInsert.Code);
                    parameters.AddWithValue("@Name", classYearInsert.Name);
                    parameters.AddWithValue("@DisplayOrder", classYearInsert.DisplayOrder);
                    parameters.AddWithValue("@Inactive", classYearInsert.Inactive);
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                },

            (parameters) =>
            {
                newId = (int)parameters["@Id"].Value;

                });

            return newId;
        }

        public void ClassYearUpdate(ClassYearUpdate classYearUpdate)
        {

            dataProvider.ExecuteNonQuery(
                "ClassYear_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Code", classYearUpdate.Code);
                    parameters.AddWithValue("@Name", classYearUpdate.Name);
                    parameters.AddWithValue("@DisplayOrder", classYearUpdate.DisplayOrder);
                    parameters.AddWithValue("@Inactive", classYearUpdate.Inactive);
                    parameters.AddWithValue("@Id", classYearUpdate.Id);
                    
                });
        }

        public void ClassYearDelete(int classYearId)
        {

            dataProvider.ExecuteNonQuery(
                "ClassYear_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", classYearId);

                });
        }
    }
}
