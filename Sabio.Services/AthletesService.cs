using Sabio.Data.Providers;
using Sabio.Models;
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
                    parameters.AddWithValue("@User", request.User);
                    parameters.AddWithValue("@User", request.User);
                    parameters.AddWithValue("@DOB", request.DOB);
                    parameters.AddWithValue("@BirthPlace", request.BirthPlace);
                    parameters.AddWithValue("@SchoolId", request.SchoolId);
                    parameters.AddWithValue("@SportLevelId", request.SportLevelId);
                    parameters.AddWithValue("@ClassYearId", request.ClassYearId);
                    parameters.AddWithValue("@HighSchoolGraduationYear", request.HighSchoolGraduationYear);
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
            }
        }
}
