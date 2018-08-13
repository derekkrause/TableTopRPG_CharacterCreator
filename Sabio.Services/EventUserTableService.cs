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
    public class EventUserTableService : IEventUserTableService
    {
        readonly IDataProvider dataProvider;

        public EventUserTableService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public int Create(EventUserTableCreateRequest request)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery("EventUser_Insert", (parameters) =>
            {
                parameters.AddWithValue("@EventId", request.EventId);
                parameters.AddWithValue("@UserId", request.UserId);

                parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
            }, (parameters) =>
            {
                newId = (int)parameters["@Id"].Value;
            });

            return newId;
        }

        public List<EventUserTable> GetAll()
        {
            List<EventUserTable> eventUserTableItems = new List<EventUserTable>();

            dataProvider.ExecuteCmd("EventUser_SelectAll", (parameters) => { }, (reader, resultSetIndex) =>
            {
                EventUserTable eventUserTableItem = new EventUserTable
                {
                    Id = (int)reader["Id"],
                    EventId = (int)reader["EventId"],
                    UserId = (int)reader["UserId"],
                    DateCreated = (DateTime)reader["DateCreated"]
                };

                object ratingObj = reader["Rating"];
                if (ratingObj != DBNull.Value)
                {
                    eventUserTableItem.Rating = (int)ratingObj;
                }

                object dateModifiedObj = reader["DateModified"];
                if (dateModifiedObj != DBNull.Value)
                {
                    eventUserTableItem.DateModified = (DateTime)dateModifiedObj;
                }

                eventUserTableItems.Add(eventUserTableItem);
            });

            return eventUserTableItems;
        }

        public List<EventUserTable> GetByEventId(int id)
        {
            List<EventUserTable> eventUserTableItems = new List<EventUserTable>();

            dataProvider.ExecuteCmd("EventUser_SelectByEventId", (parameters) => 
            {
                parameters.AddWithValue("@EventId", id);
            }, (reader, resultSetIndex) =>
            {
                EventUserTable eventUserTableItem = new EventUserTable
                {
                    Id = (int)reader["Id"],
                    EventId = (int)reader["EventId"],
                    UserId = (int)reader["UserId"],
                    DateCreated = (DateTime)reader["DateCreated"]
                };

                object ratingObj = reader["Rating"];
                if (ratingObj != DBNull.Value)
                {
                    eventUserTableItem.Rating = (int)ratingObj;
                }

                object dateModifiedObj = reader["DateModified"];
                if (dateModifiedObj != DBNull.Value)
                {
                    eventUserTableItem.DateModified = (DateTime)dateModifiedObj;
                }

                eventUserTableItems.Add(eventUserTableItem);
            });

            return eventUserTableItems;
        }

        public void DeleteByEventIdUserId(int eventId, int userId)
        {
            dataProvider.ExecuteNonQuery("EventUser_DeleteByEventIdUserId", (parameters) =>
            {
                parameters.AddWithValue("@EventId", eventId);
                parameters.AddWithValue("@UserId", userId);
            });
        }

        public List<EventUserAttendee> GetByEventIdWithAttendees(int id)
        {
            List<EventUserAttendee> eventUserAttendees = new List<EventUserAttendee>();

            dataProvider.ExecuteCmd("EventUser_SelectByEventIdWithAttendees", (parameters) =>
            {
                parameters.AddWithValue("@EventId", id);
            }, (reader, resultSetIndex) =>
            {
                EventUserAttendee eventUserAttendee = new EventUserAttendee
                {
                    Id = (int)reader["Id"],
                    EventId = (int)reader["EventId"],
                    UserId = (int)reader["UserId"],
                    DateCreated = (DateTime)reader["DateCreated"],
                    FirstName = (string)reader["FirstName"],
                    LastName = (string)reader["LastName"],
                    AvatarUrl = (string)reader["AvatarUrl"],
                    Email = (string)reader["Email"]
                };

                object ratingObj = reader["Rating"];
                if (ratingObj != DBNull.Value)
                {
                    eventUserAttendee.Rating = (int)ratingObj;
                }

                object dateModifiedObj = reader["DateModified"];
                if (dateModifiedObj != DBNull.Value)
                {
                    eventUserAttendee.DateModified = (DateTime)dateModifiedObj;
                }

                object middleNameObj = reader["MiddleName"];
                if (middleNameObj != DBNull.Value)
                {
                    eventUserAttendee.MiddleName = (string)middleNameObj;
                }
                
                eventUserAttendees.Add(eventUserAttendee);
            });

            return eventUserAttendees;
        }
    }
}
