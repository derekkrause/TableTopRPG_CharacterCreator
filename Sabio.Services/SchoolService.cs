using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;

namespace Sabio.Services
{
    public class SchoolService
    {
            readonly IDataProvider dataProvider;

            public SchoolService(IDataProvider dataProvider)

            {
                this.dataProvider = dataProvider;
            }

        public List<Schools> GetAll()
        {
            List<Schools> listOfSchools = new List<Schools>();

            dataProvider.ExecuteCmd(
                "School_GetAllTest",
                (parameters) =>
                { },
                (reader, resultSetIndex) =>
                {
                    Schools school = new Schools
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        SchoolTypeId = (int)reader["SchoolTypeId"]
                    };
                    listOfSchools.Add(school);
                });
            return listOfSchools;
        }

        public List<Schools> Search(string q, string city, string state)
        {
            List<Schools> schoolList = new List<Schools>();
            


            dataProvider.ExecuteCmd(
                "School_SearchByName",
                (parameters) =>
                {
                    parameters.AddWithValue("@SearchString", q);
                    parameters.AddWithValue("@City", city ?? (object)DBNull.Value);
                    parameters.AddWithValue("@State", state ?? (object)DBNull.Value);
                },
                (reader, resultSetIndex) =>
                {
                    Schools school = new Schools
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        City = (string)reader["City"],
                        State = (string)reader["State"]
                    };
                    schoolList.Add(school);
                });
            return schoolList;
        }
    }
}
