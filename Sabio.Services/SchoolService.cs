using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
