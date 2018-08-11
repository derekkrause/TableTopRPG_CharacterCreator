using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class SportLevelService
    {
            readonly IDataProvider dataProvider;

            public SportLevelService(IDataProvider dataProvider)

            {
                this.dataProvider = dataProvider;
            }

            public List<SportLevel> GetAll()
            {
                List<SportLevel> listOfSportLevels = new List<SportLevel>();

                dataProvider.ExecuteCmd(
                    "SportLevel_SelectAll",
                    (parameters) =>
                    { },
                    (reader, resultSetIndex) =>
                    {
                        SportLevel sportLevel = new SportLevel
                        {
                            Id = (int)reader["Id"],
                            CompetitionLevel = (string)reader["SportLevel"]
                        };
                        listOfSportLevels.Add(sportLevel);
                    });
                return listOfSportLevels;
            }
        }
    }
