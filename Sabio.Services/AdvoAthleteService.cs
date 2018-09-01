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
    public class AdvoAthleteService
    {
        readonly IDataProvider dataProvider;

        public AdvoAthleteService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public PagedItemResponse<AdvoAthlete> GetAllAdvoAthletesById(int advoAthleteId)
        {
            PagedItemResponse<AdvoAthlete> pagedItemResponse = new PagedItemResponse<AdvoAthlete>();
            List<AdvoAthlete> list = new List<AdvoAthlete>();

            dataProvider.ExecuteCmd(
                "AdvoAthlete_GetByAdvocateId",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", advoAthleteId);

                },
                (reader, ResultSetIndex) =>
                {
                    AdvoAthlete advoAthlete = new AdvoAthlete
                    {
                        Id = (int)reader["Id"],
                        AdvocateUserId = (int)reader["AdvocateUserId"],
                        AthleteUserId = (int)reader["AthleteUserId"],
                        Verify = (bool)reader["Verify"],
                        Name = (string)reader["Name"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        DateModified = (DateTime)reader["DateModified"],
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"]

                    };

                    object Notes = reader["Notes"];
                    if (Notes != DBNull.Value)
                    {
                        advoAthlete.Notes = (string)Notes;
                    }

                    list.Add(advoAthlete);
                    pagedItemResponse.PagedItems = list;
                });

            return pagedItemResponse;
        }

        public int AdvoAthleteInsert(AdvoAthleteInsert advoAthleteInsert)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "AdvoAthlete_Insert",
                (parameters) =>
                {
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    parameters.AddWithValue("@AdvocateUserId", advoAthleteInsert.AdvocateUserId);
                    parameters.AddWithValue("@AthleteUserId", advoAthleteInsert.AthleteUserId);
                    parameters.AddWithValue("@Notes", advoAthleteInsert.Notes ?? (object)DBNull.Value);
                    parameters.AddWithValue("@Verify", advoAthleteInsert.Verify);

                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });

            return newId;
        }

        public void AdvoAthleteUpdate(AdvoAthleteUpdate advoAthleteUpdate)
        {

            dataProvider.ExecuteNonQuery(
                "AdvoAthlete_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", advoAthleteUpdate.Id);
                    parameters.AddWithValue("@AdvocateUserId", advoAthleteUpdate.AdvocateUserId);
                    parameters.AddWithValue("@AthleteUserId", advoAthleteUpdate.AthleteUserId);
                    parameters.AddWithValue("@Notes", advoAthleteUpdate.Notes);
                    parameters.AddWithValue("@Verify", advoAthleteUpdate.Verify);

                });
        }

        public void AdvoAthleteDelete(int advoAthleteId)
        {

            dataProvider.ExecuteNonQuery(
                "AdvoAthlete_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", advoAthleteId);

                });
        }
    }
}
