using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class EventTypeService : IEventTypeService
    {
        readonly IDataProvider dataProvider;

        public EventTypeService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public int Create(EventTypeCreateRequest request)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery("EventType_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@Code", request.Code);
                    parameters.AddWithValue("@Name", request.Name);
                    parameters.AddWithValue("@DisplayOrder", request.DisplayOrder);
                    parameters.AddWithValue("@Inactive", request.Inactive);

                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                }, (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });

            return newId;
        }

        public List<EventType> GetAll()
        {
            List<EventType> eventTypes = new List<EventType>();

            dataProvider.ExecuteCmd("EventType_SelectAll", (parameters) => { }, (reader, resultSetIndex) =>
            {
                EventType evtType = new EventType
                {
                    Id = (int)reader["Id"],
                    Code = (string)reader["Code"],
                    Name = (string)reader["Name"],
                    DisplayOrder = (int)reader["DisplayOrder"],
                    Inactive = (bool)reader["Inactive"],
                    DateCreated = (DateTime)reader["DateCreated"],
                    DateModified = (DateTime)reader["DateModified"]
                };

                object displayOrderObj = reader["DisplayOrder"];
                if (displayOrderObj != DBNull.Value)
                {
                    evtType.DisplayOrder = (int)displayOrderObj;
                }

                object inactiveObj = reader["Inactive"];
                if (inactiveObj != DBNull.Value)
                {
                    evtType.Inactive = (bool)inactiveObj;
                }

                object dateCreatedObj = reader["DateCreated"];
                if (dateCreatedObj != DBNull.Value)
                {
                    evtType.DateCreated = (DateTime)dateCreatedObj;
                }

                object dateModifiedObj = reader["DateModified"];
                if (dateModifiedObj != DBNull.Value)
                {
                    evtType.DateModified = (DateTime)dateModifiedObj;
                }

                eventTypes.Add(evtType);
            });

            return eventTypes;
        }

        public EventType GetById(int id)
        {
            EventType eventType = new EventType();

            dataProvider.ExecuteCmd("EventType_SelectById", (parameters) =>
            {
                parameters.AddWithValue("@Id", id);
            }, (reader, resultSetIndex) =>
            {
                EventType evtType = new EventType
                {
                    Id = (int)reader["Id"],
                    Code = (string)reader["Code"],
                    Name = (string)reader["Name"],
                    DisplayOrder = (int)reader["DisplayOrder"],
                    Inactive = (bool)reader["Inactive"],
                    DateCreated = (DateTime)reader["DateCreated"],
                    DateModified = (DateTime)reader["DateModified"]
                };

                object displayOrderObj = reader["DisplayOrder"];
                if (displayOrderObj != DBNull.Value)
                {
                    evtType.DisplayOrder = (int)displayOrderObj;
                }

                object inactiveObj = reader["Inactive"];
                if (inactiveObj != DBNull.Value)
                {
                    evtType.Inactive = (bool)inactiveObj;
                }

                object dateCreatedObj = reader["DateCreated"];
                if (dateCreatedObj != DBNull.Value)
                {
                    evtType.DateCreated = (DateTime)dateCreatedObj;
                }

                object dateModifiedObj = reader["DateModified"];
                if (dateModifiedObj != DBNull.Value)
                {
                    evtType.DateModified = (DateTime)dateModifiedObj;
                }

                eventType = evtType;
            });

            return eventType;
        }

        public void Update(EventTypeUpdateRequest request)
        {
            dataProvider.ExecuteNonQuery("EventType_Update", (parameters) =>
            {
                parameters.AddWithValue("@Code", request.Code);
                parameters.AddWithValue("@Name", request.Name);
                parameters.AddWithValue("@DisplayOrder", request.DisplayOrder);
                parameters.AddWithValue("@Inactive", request.Inactive);
                parameters.AddWithValue("@Id", request.Id);
            });
        }

        public void Delete(int id)
        {
            dataProvider.ExecuteNonQuery("EventType_Delete", (parameters) =>
            {
                parameters.AddWithValue("@Id", id);
            });
        }

        public List<EventType> SearchAll(string searchTerms)
        {
            List<EventType> resultEventTypes = new List<EventType>();

            dataProvider.ExecuteCmd("EventType_SearchAll", (parameters) =>
            {
                parameters.AddWithValue("@SearchTerms", searchTerms);
            }, (reader, resultSetIndex) =>
            {
                EventType eventType = new EventType
                {
                    Id = (int)reader["Id"],
                    Code = (string)reader["Code"],
                    Name = (string)reader["Name"]
                };

                object dateCreatedObj = reader["DateCreated"];
                if (dateCreatedObj != DBNull.Value)
                {
                    eventType.DateCreated = (DateTime)dateCreatedObj;
                }

                object dateModifiedObj = reader["DateModified"];
                if (dateModifiedObj != DBNull.Value)
                {
                    eventType.DateModified = (DateTime)dateModifiedObj;
                }

                resultEventTypes.Add(eventType);
            });

            return resultEventTypes;
        }
    }
}
