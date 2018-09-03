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
    public class AdvoTeamService
    {
        readonly IDataProvider dataProvider;

        public AdvoTeamService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public int InsertAdvoTeam(AdvoTeamInsert advoTeamInsert)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "AdvocateTeam_Insert",
                (parameters) =>
                {
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    parameters.AddWithValue("@AdvocateUserId", advoTeamInsert.AdvocateUserId);
                    parameters.AddWithValue("@TeamId", advoTeamInsert.TeamId);

                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });
            return newId;
        }

        public void UpdateAdvoTeam(AdvoTeamUpdate advoTeamUpdate)
        {

            dataProvider.ExecuteNonQuery(
                "AdvocateTeam_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", advoTeamUpdate.Id);
                    parameters.AddWithValue("@AdvocateUserId", advoTeamUpdate.AdvocateUserId);
                    parameters.AddWithValue("@TeamId", advoTeamUpdate.TeamId);

                });
        }

        public void DeleteAdvoTeam(int advoTeamId)
        {
            dataProvider.ExecuteNonQuery(
                "AdvocateTeam_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@TeamId", advoTeamId);
                    
                });
        }
    }
}
