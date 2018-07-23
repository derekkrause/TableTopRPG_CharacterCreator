
using Sabio.Data.Models;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data;

namespace Sabio.Data.Services
{
    public class AthletesService
    {

        readonly IDataProvider dataProvider;

        public AthletesService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }
        public int Insert(AthleteInsertRequest request)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "Athlete_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", request.UserId);
                    parameters.AddWithValue("@DOB", request.DOB);
                    parameters.AddWithValue("@BirthPlace", request.BirthPlace);
                    parameters.AddWithValue("@SchoolId", request.SchoolId);
                    parameters.AddWithValue("@ClassYearId", request.ClassYearId ?? (object)DBNull.Value);
                    parameters.AddWithValue("@HighSchoolGraduationYear", request.HighSchoolGraduationYear ?? (object)DBNull.Value);
                    parameters.AddWithValue("@ShortBio", request.ShortBio);
                    parameters.AddWithValue("@ResidencyState", request.ResidencyState);

                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    newId = (int)parameters["@id"].Value;
                });

            return newId;
        }
        public PagedItemResponse<Athlete> GetAll(int pageIndex, int pageSize)
        {
            PagedItemResponse<Athlete> pagedItemResponse = new PagedItemResponse<Athlete>();
            List<Athlete> listOfAthletes = new List<Athlete>();

            // use the data provider to execute our SQL stored procedure

            dataProvider.ExecuteCmd(
                "Athlete_SelectAll",
                (parameters) =>
                {
                    parameters.AddWithValue("@pageIndex", pageIndex);
                    parameters.AddWithValue("@pageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    Athlete athlete = new Athlete
                    {
                        Id = (int)reader["Id"],
                        UserId = (int)reader["UserId"],
                        DOB = (DateTime)reader["DOB"],
                        BirthPlace = (string)reader["Birthplace"],
                        SchoolId = (int)reader["SchoolId"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]
                    };

                    object classYearId = reader["ClassYearId"];
                    if (classYearId != DBNull.Value)
                    {
                        athlete.ClassYearId = (int)classYearId;
                    }
                    object highSchoolGraduationYear = reader["HighSchoolGraduationYear"];
                    if (highSchoolGraduationYear != DBNull.Value)
                    {
                        athlete.HighSchoolGraduationYear = (int)highSchoolGraduationYear;
                    }
                    object shortBio = reader["ShortBio"];
                    if (shortBio != DBNull.Value)
                    {
                        athlete.ShortBio = (string)shortBio;
                    }
                    object residencyState = reader["ResidencyState"];
                    if (residencyState != DBNull.Value)
                    {
                        athlete.ResidencyState = (string)residencyState;
                    }
                    pagedItemResponse.TotalCount = (int)reader["TotalRows"];
                    pagedItemResponse.PageSize = pageSize;
                    listOfAthletes.Add(athlete);
                });

            pagedItemResponse.PagedItems = listOfAthletes;

            return pagedItemResponse;
        }
        //public PagedItemResponse<Athlete> searchPeoples(int pageIndex, int pageSize, string q)
        //{

        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        con.Open();

        //        SqlCommand cmd = con.CreateCommand();
        //        cmd.CommandText = "People_Search";
        //        cmd.CommandType = System.Data.CommandType.StoredProcedure;


        //        cmd.Parameters.AddWithValue("@PageSize", pageSize);
        //        cmd.Parameters.AddWithValue("@PageIndex", pageIndex);
        //        cmd.Parameters.AddWithValue("@Search", q);

        //        SqlParameter totalCountParameter = new SqlParameter("@TotalCount", System.Data.SqlDbType.Int);
        //        totalCountParameter.Direction = ParameterDirection.Output;
        //        cmd.Parameters.Add(totalCountParameter);

        //        List<Person> peopleList = new List<Person>();

        //        using (SqlDataReader reader = cmd.ExecuteReader())
        //        {

        //            while (reader.Read())
        //            {
        //                // this loop will happen once per row of the result set

        //                Person people = new Person();
        //                people.Id = (int)reader["Id"];
        //                people.Title = (string)reader["Title"];
        //                people.Bio = (string)reader["Bio"];
        //                people.Summary = (string)reader["Summary"];
        //                people.Headline = (string)reader["Headline"];
        //                people.Slug = (string)reader["Slug"];
        //                people.StatusId = (int)reader["StatusId"];
        //                people.Skills = (string)reader["Skills"];
        //                people.PrimaryImage = (string)reader["PrimaryImage"];


        //                // This is how you deal with a NULL coming out of the database:
        //                object statusIdValue = reader["StatusId"];
        //                if (statusIdValue != DBNull.Value)
        //                {
        //                    people.StatusId = (int)statusIdValue;
        //                }

        //                people.DateCreated = (DateTime)reader["DateCreated"];
        //                people.DateModified = (DateTime)reader["DateModified"];
        //                peopleList.Add(people);
        //            }

        //        }
        //        int pageTotal = ((int)totalCountParameter.Value + (int)pageSize - 1) / (int)pageSize;
        //        PageOfItems<Person> peoples = new PageOfItems<Person>
        //        {

        //            PagedItems = peopleList,
        //            PageIndex = pageIndex,
        //            PageSize = pageSize,
        //            TotalCount = (int)totalCountParameter.Value,
        //            TotalPages = pageTotal
        //        };

        //        return peoples;
        //    }
        //}
        public void Update(AthleteUpdateRequest request)
        {
            dataProvider.ExecuteNonQuery(
                "Athlete_Update",
                (parameters) =>
                {
                parameters.AddWithValue("@Id", request.Id);
                parameters.AddWithValue("@UserId", request.UserId);
                parameters.AddWithValue("@DOB", request.DOB);
                parameters.AddWithValue("@BirthPlace", request.BirthPlace);
                parameters.AddWithValue("@SchoolId", request.SchoolId);
                parameters.AddWithValue("@ClassYearId", request.ClassYearId ?? (object)DBNull.Value);
                parameters.AddWithValue("@HighSchoolGraduationYear", request.HighSchoolGraduationYear ?? (object)DBNull.Value);
                parameters.AddWithValue("@ShortBio", request.ShortBio);
                parameters.AddWithValue("@ResidencyState", request.ResidencyState);
                });

        }
        public void Delete(int Id)
        {
            dataProvider.ExecuteNonQuery(
            "Athlete_Delete",
            (parameters) =>
            {
                parameters.AddWithValue("@Id", Id);
            });
        }

        public Athlete GetById(int Id)
        {
            Athlete newAthlete = new Athlete();
            dataProvider.ExecuteCmd(
                "Athlete_SelectById",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", Id);
                },
                (reader, resultSetIndex) =>
                {
                    Athlete athlete = new Athlete
                    {
                        Id = (int)reader["Id"],
                        UserId = (int)reader["UserId"],
                        DOB = (DateTime)reader["DOB"],
                        BirthPlace = (string)reader["Birthplace"],
                        SchoolId = (int)reader["SchoolId"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"]
                    };
                    object classYearId = reader["ClassYearId"];
                    if (classYearId != DBNull.Value)
                    {
                       athlete.ClassYearId = (int)classYearId;
                    }
                    object highSchoolGraduationYear = reader["HighSchoolGraduationYear"];
                    if (highSchoolGraduationYear != DBNull.Value)
                    {
                        athlete.HighSchoolGraduationYear = (int)highSchoolGraduationYear;
                    }
                    object shortBio = reader["ShortBio"];
                    if (shortBio != DBNull.Value)
                    {
                        athlete.ShortBio = (string)shortBio;
                    }
                    object residencyState = reader["ResidencyState"];
                    if (residencyState != DBNull.Value)
                    {
                       athlete.ResidencyState = (string)residencyState;
                    }
                    newAthlete = athlete;
                });
            return newAthlete;
        }
    }
}
