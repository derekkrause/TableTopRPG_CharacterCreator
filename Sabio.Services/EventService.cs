using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class EventService : IEventService
    {
        readonly IDataProvider dataProvider;

        public EventService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public int Create(EventCreateRequest request)
        {
            int newId = 0;

            dataProvider.ExecuteNonQuery(
                "Event_Insert",
                (parameters) =>
                {
                    parameters.AddWithValue("@Name", request.Name);
                    parameters.AddWithValue("@ShortName", request.ShortName);
                    parameters.AddWithValue("@EventTypeId", request.EventTypeId);
                    parameters.AddWithValue("@StartDate", request.StartDate);
                    // parameters.AddWithValue("@AddressId", request.AddressId);
                    parameters.AddWithValue("@EndDate", request.EndDate);
                    parameters.AddWithValue("@Description", request.Description);
                    parameters.AddWithValue("@WebsiteUrl", request.WebsiteUrl);
                    parameters.AddWithValue("@Logo", request.Logo);
                    parameters.AddWithValue("@IsOngoing", request.IsOngoing);
                    parameters.AddWithValue("@Organizer", request.Organizer);
                    parameters.AddWithValue("@CreatedBy", request.CreatedBy);
                    parameters.AddWithValue("@ModifiedBy", request.ModifiedBy);
                    parameters.AddWithValue("@Street", request.Street);
                    parameters.AddWithValue("@Suite", request.Suite);
                    parameters.AddWithValue("@City", request.City);
                    parameters.AddWithValue("@State", request.State);
                    parameters.AddWithValue("@Zip", request.Zip);
                    parameters.AddWithValue("@Lat", request.Lat);
                    parameters.AddWithValue("@Long", request.Long);

                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                }
                );

            return newId;
        }

        public void Update(EventUpdateRequest request)
        {
            dataProvider.ExecuteNonQuery("Event_Update",
                (parameters) =>
                {
                    parameters.AddWithValue("@Name", request.Name);
                    parameters.AddWithValue("@ShortName", request.ShortName);
                    parameters.AddWithValue("@EventTypeId", request.EventTypeId);
                    parameters.AddWithValue("@StartDate", request.StartDate);
                    // parameters.AddWithValue("@AddressId", request.AddressId);
                    parameters.AddWithValue("@EndDate", request.EndDate);
                    parameters.AddWithValue("@Description", request.Description);
                    parameters.AddWithValue("@WebsiteUrl", request.WebsiteUrl);
                    parameters.AddWithValue("@Logo", request.Logo);
                    parameters.AddWithValue("@IsOngoing", request.IsOngoing);
                    parameters.AddWithValue("@Organizer", request.Organizer);
                    parameters.AddWithValue("@CreatedBy", request.CreatedBy);
                    parameters.AddWithValue("@ModifiedBy", request.ModifiedBy);
                    parameters.AddWithValue("@Street", request.Street);
                    parameters.AddWithValue("@Suite", request.Suite);
                    parameters.AddWithValue("@City", request.City);
                    parameters.AddWithValue("@State", request.State);
                    parameters.AddWithValue("@Zip", request.Zip);
                    parameters.AddWithValue("@Lat", request.Lat);
                    parameters.AddWithValue("@Long", request.Long);
                    parameters.AddWithValue("@Id", request.Id);
                });
        }

        public void Delete(int id)
        {
            dataProvider.ExecuteNonQuery("Event_Delete",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                });
        }

        public PagedItemResponse<Event> GetAllPaging(int pageIndex, int pageSize)
        {
            PagedItemResponse<Event> pagedItemResponse = new PagedItemResponse<Event>();
            List<Event> events = new List<Event>();

            dataProvider.ExecuteCmd("Event_SelectAllPaging",
                (parameters) =>
                {
                    parameters.AddWithValue("@PageIndex", pageIndex);
                    parameters.AddWithValue("@PageSize", pageSize);
                },
                (reader, resultSetIndex) =>
                {
                    Event eventItem = new Event
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        ShortName = (string)reader["ShortName"],
                        EventTypeId = (int)reader["EventTypeId"],
                        // AddressId = (int)reader["AddressId"],
                        IsOngoing = (bool)reader["IsOngoing"],
                        CreatedBy = (int)reader["CreatedBy"],
                        ModifiedBy = (int)reader["ModifiedBy"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        Street = (string)reader["Street"],
                        Suite = (string)reader["Suite"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = (string)reader["Zip"]
                    };

                    object startDateObj = reader["StartDate"];
                    if (startDateObj != DBNull.Value)
                    {
                        eventItem.StartDate = (DateTime)startDateObj;
                    }

                    object endDateObj = reader["EndDate"];
                    if (endDateObj != DBNull.Value)
                    {
                        eventItem.EndDate = (DateTime)endDateObj;
                    }

                    object descObj = reader["Description"];
                    if (descObj != DBNull.Value)
                    {
                        eventItem.Description = (string)descObj;
                    }

                    object webUrl = reader["WebsiteUrl"];
                    if (webUrl != DBNull.Value)
                    {
                        eventItem.WebsiteUrl = (string)webUrl;
                    }

                    object logoObj = reader["Logo"];
                    if (logoObj != DBNull.Value)
                    {
                        eventItem.Logo = (string)logoObj;
                    }

                    object orgObj = reader["Organizer"];
                    if (orgObj != DBNull.Value)
                    {
                        eventItem.Organizer = (string)orgObj;
                    }

                    object dateModObj = reader["DateModified"];
                    if (dateModObj != DBNull.Value)
                    {
                        eventItem.DateModified = (DateTime)dateModObj;
                    }

                    object latObj = reader["Lat"];
                    if (latObj != DBNull.Value)
                    {
                        eventItem.Lat = (double)latObj;
                    }

                    object longObj = reader["Long"];
                    if (longObj != DBNull.Value)
                    {
                        eventItem.Long = (double)longObj;
                    }

                    pagedItemResponse.TotalCount = (int)reader["TotalCount"];
                    pagedItemResponse.PageIndex = (int)reader["PageIndex"];
                    pagedItemResponse.PageSize = (int)reader["PageSize"];

                    events.Add(eventItem);
                });

            pagedItemResponse.PagedItems = events;

            pagedItemResponse.TotalPages = (int)Math.Ceiling(pagedItemResponse.TotalCount / (decimal)pagedItemResponse.PageSize);

            pagedItemResponse.HasPrevPage = true;
            pagedItemResponse.HasNextPage = true;

            if (pagedItemResponse.PageIndex == 0)
            {
                pagedItemResponse.HasPrevPage = false;
                pagedItemResponse.HasNextPage = true;
            }

            if (pagedItemResponse.PageIndex == pagedItemResponse.TotalPages - 1)
            {
                pagedItemResponse.HasPrevPage = true;
                pagedItemResponse.HasNextPage = false;
            }

            if (pagedItemResponse.PageIndex == 0 && pagedItemResponse.TotalPages == 1)
            {
                pagedItemResponse.HasPrevPage = false;
                pagedItemResponse.HasNextPage = false;
            }
            
            return pagedItemResponse;
        }

        public List<Event> GetAll()
        {
            List<Event> events = new List<Event>();

            dataProvider.ExecuteCmd("Event_SelectAll",
                (parameters) =>
                {
                    
                },
                (reader, resultSetIndex) =>
                {
                    Event eventItem = new Event
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        ShortName = (string)reader["ShortName"],
                        EventTypeId = (int)reader["EventTypeId"],
                        // AddressId = (int)reader["AddressId"],
                        IsOngoing = (bool)reader["IsOngoing"],
                        CreatedBy = (int)reader["CreatedBy"],
                        ModifiedBy = (int)reader["ModifiedBy"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        Street = (string)reader["Street"],
                        Suite = (string)reader["Suite"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = (string)reader["Zip"]
                    };

                    object startDateObj = reader["StartDate"];
                    if (startDateObj != DBNull.Value)
                    {
                        eventItem.StartDate = (DateTime)startDateObj;
                    }

                    object endDateObj = reader["EndDate"];
                    if (endDateObj != DBNull.Value)
                    {
                        eventItem.EndDate = (DateTime)endDateObj;
                    }

                    object descObj = reader["Description"];
                    if (descObj != DBNull.Value)
                    {
                        eventItem.Description = (string)descObj;
                    }

                    object webUrl = reader["WebsiteUrl"];
                    if (webUrl != DBNull.Value)
                    {
                        eventItem.WebsiteUrl = (string)webUrl;
                    }

                    object logoObj = reader["Logo"];
                    if (logoObj != DBNull.Value)
                    {
                        eventItem.Logo = (string)logoObj;
                    }

                    object orgObj = reader["Organizer"];
                    if (orgObj != DBNull.Value)
                    {
                        eventItem.Organizer = (string)orgObj;
                    }

                    object dateModObj = reader["DateModified"];
                    if (dateModObj != DBNull.Value)
                    {
                        eventItem.DateModified = (DateTime)dateModObj;
                    }

                    object latObj = reader["Lat"];
                    if (latObj != DBNull.Value)
                    {
                        eventItem.Lat = (double)latObj;
                    }

                    object longObj = reader["Long"];
                    if (longObj != DBNull.Value)
                    {
                        eventItem.Long = (double)longObj;
                    }

                    events.Add(eventItem);
                });

            return events;
        }

        public Event GetById(int id)
        {
            Event eventEvt = new Event();

            dataProvider.ExecuteCmd("Event_SelectById",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                },
                (reader, resultSetIndex) =>
                {
                    Event eventItem = new Event
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        ShortName = (string)reader["ShortName"],
                        EventTypeId = (int)reader["EventTypeId"],
                        // AddressId = (int)reader["AddressId"],
                        IsOngoing = (bool)reader["IsOngoing"],
                        CreatedBy = (int)reader["CreatedBy"],
                        ModifiedBy = (int)reader["ModifiedBy"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        Street = (string)reader["Street"],
                        Suite = (string)reader["Suite"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = (string)reader["Zip"]
                    };

                    object startDateObj = reader["StartDate"];
                    if (startDateObj != DBNull.Value)
                    {
                        eventItem.StartDate = (DateTime)startDateObj;
                    }

                    object endDateObj = reader["EndDate"];
                    if (endDateObj != DBNull.Value)
                    {
                        eventItem.EndDate = (DateTime)endDateObj;
                    }

                    object descObj = reader["Description"];
                    if (descObj != DBNull.Value)
                    {
                        eventItem.Description = (string)descObj;
                    }

                    object webUrl = reader["WebsiteUrl"];
                    if (webUrl != DBNull.Value)
                    {
                        eventItem.WebsiteUrl = (string)webUrl;
                    }

                    object logoObj = reader["Logo"];
                    if (logoObj != DBNull.Value)
                    {
                        eventItem.Logo = (string)logoObj;
                    }

                    object orgObj = reader["Organizer"];
                    if (orgObj != DBNull.Value)
                    {
                        eventItem.Organizer = (string)orgObj;
                    }

                    object dateModObj = reader["DateModified"];
                    if (dateModObj != DBNull.Value)
                    {
                        eventItem.DateModified = (DateTime)dateModObj;
                    }

                    object latObj = reader["Lat"];
                    if (latObj != DBNull.Value)
                    {
                        eventItem.Lat = (double)latObj;
                    }

                    object longObj = reader["Long"];
                    if (longObj != DBNull.Value)
                    {
                        eventItem.Long = (double)longObj;
                    }

                    eventEvt = eventItem;
                });

            return eventEvt;
        }

        public PagedItemResponse<Event> SearchAllPaging(int pageIndex, int pageSize, string searchTerms)
        {
            PagedItemResponse<Event> pagedItemResponse = new PagedItemResponse<Event>();
            List<Event> events = new List<Event>();

            dataProvider.ExecuteCmd("Event_SearchAllPaging",
                (parameters) =>
                {
                    parameters.AddWithValue("@PageIndex", pageIndex);
                    parameters.AddWithValue("@PageSize", pageSize);
                    parameters.AddWithValue("@SearchTerms", searchTerms);
                },
                (reader, resultSetIndex) =>
                {
                    Event eventItem = new Event
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        ShortName = (string)reader["ShortName"],
                        EventTypeId = (int)reader["EventTypeId"],
                        // AddressId = (int)reader["AddressId"],
                        IsOngoing = (bool)reader["IsOngoing"],
                        CreatedBy = (int)reader["CreatedBy"],
                        ModifiedBy = (int)reader["ModifiedBy"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        Street = (string)reader["Street"],
                        Suite = (string)reader["Suite"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = (string)reader["Zip"]
                    };

                    object startDateObj = reader["StartDate"];
                    if (startDateObj != DBNull.Value)
                    {
                        eventItem.StartDate = (DateTime)startDateObj;
                    }

                    object endDateObj = reader["EndDate"];
                    if (endDateObj != DBNull.Value)
                    {
                        eventItem.EndDate = (DateTime)endDateObj;
                    }

                    object descObj = reader["Description"];
                    if (descObj != DBNull.Value)
                    {
                        eventItem.Description = (string)descObj;
                    }

                    object webUrl = reader["WebsiteUrl"];
                    if (webUrl != DBNull.Value)
                    {
                        eventItem.WebsiteUrl = (string)webUrl;
                    }

                    object logoObj = reader["Logo"];
                    if (logoObj != DBNull.Value)
                    {
                        eventItem.Logo = (string)logoObj;
                    }

                    object orgObj = reader["Organizer"];
                    if (orgObj != DBNull.Value)
                    {
                        eventItem.Organizer = (string)orgObj;
                    }

                    object dateModObj = reader["DateModified"];
                    if (dateModObj != DBNull.Value)
                    {
                        eventItem.DateModified = (DateTime)dateModObj;
                    }

                    object latObj = reader["Lat"];
                    if (latObj != DBNull.Value)
                    {
                        eventItem.Lat = (double)latObj;
                    }

                    object longObj = reader["Long"];
                    if (longObj != DBNull.Value)
                    {
                        eventItem.Long = (double)longObj;
                    }

                    pagedItemResponse.TotalCount = (int)reader["TotalCount"];
                    pagedItemResponse.PageIndex = (int)reader["PageIndex"];
                    pagedItemResponse.PageSize = (int)reader["PageSize"];

                    events.Add(eventItem);
                });

            pagedItemResponse.PagedItems = events;

            pagedItemResponse.TotalPages = (int)Math.Ceiling(pagedItemResponse.TotalCount / (decimal)pagedItemResponse.PageSize);

            pagedItemResponse.HasPrevPage = true;
            pagedItemResponse.HasNextPage = true;

            if (pagedItemResponse.PageIndex == 0)
            {
                pagedItemResponse.HasPrevPage = false;
                pagedItemResponse.HasNextPage = true;
            }

            if (pagedItemResponse.PageIndex == pagedItemResponse.TotalPages - 1)
            {
                pagedItemResponse.HasPrevPage = true;
                pagedItemResponse.HasNextPage = false;
            }

            if (pagedItemResponse.PageIndex == 0 && pagedItemResponse.TotalPages == 1)
            {
                pagedItemResponse.HasPrevPage = false;
                pagedItemResponse.HasNextPage = false;
            }

            return pagedItemResponse;
        }

        public List<Event> SearchAll(string searchTerms)
        {
            List<Event> events = new List<Event>();

            dataProvider.ExecuteCmd("Event_SearchAll",
                (parameters) =>
                {
                    parameters.AddWithValue("@SearchTerms", searchTerms);
                },
                (reader, resultSetIndex) =>
                {
                    Event eventItem = new Event
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        ShortName = (string)reader["ShortName"],
                        EventTypeId = (int)reader["EventTypeId"],
                        // AddressId = (int)reader["AddressId"],
                        IsOngoing = (bool)reader["IsOngoing"],
                        CreatedBy = (int)reader["CreatedBy"],
                        ModifiedBy = (int)reader["ModifiedBy"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        Street = (string)reader["Street"],
                        Suite = (string)reader["Suite"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = (string)reader["Zip"]
                    };

                    object startDateObj = reader["StartDate"];
                    if (startDateObj != DBNull.Value)
                    {
                        eventItem.StartDate = (DateTime)startDateObj;
                    }

                    object endDateObj = reader["EndDate"];
                    if (endDateObj != DBNull.Value)
                    {
                        eventItem.EndDate = (DateTime)endDateObj;
                    }

                    object descObj = reader["Description"];
                    if (descObj != DBNull.Value)
                    {
                        eventItem.Description = (string)descObj;
                    }

                    object webUrl = reader["WebsiteUrl"];
                    if (webUrl != DBNull.Value)
                    {
                        eventItem.WebsiteUrl = (string)webUrl;
                    }

                    object logoObj = reader["Logo"];
                    if (logoObj != DBNull.Value)
                    {
                        eventItem.Logo = (string)logoObj;
                    }

                    object orgObj = reader["Organizer"];
                    if (orgObj != DBNull.Value)
                    {
                        eventItem.Organizer = (string)orgObj;
                    }

                    object dateModObj = reader["DateModified"];
                    if (dateModObj != DBNull.Value)
                    {
                        eventItem.DateModified = (DateTime)dateModObj;
                    }

                    object latObj = reader["Lat"];
                    if (latObj != DBNull.Value)
                    {
                        eventItem.Lat = (double)latObj;
                    }

                    object longObj = reader["Long"];
                    if (longObj != DBNull.Value)
                    {
                        eventItem.Long = (double)longObj;
                    }

                    events.Add(eventItem);
                });

            return events;
        }

        public List<Event> GetByUserId (int userId)
        {
            List<Event> userEvents = new List<Event>();

            dataProvider.ExecuteCmd("Event_SelectByUserId",
                (parameters) =>
                {
                    parameters.AddWithValue("@UserId", userId);
                },
                (reader, resultSetIndex) =>
                {
                    Event eventItem = new Event
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        ShortName = (string)reader["ShortName"],
                        EventTypeId = (int)reader["EventTypeId"],
                        // AddressId = (int)reader["AddressId"],
                        IsOngoing = (bool)reader["IsOngoing"],
                        CreatedBy = (int)reader["CreatedBy"],
                        ModifiedBy = (int)reader["ModifiedBy"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        Street = (string)reader["Street"],
                        Suite = (string)reader["Suite"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = (string)reader["Zip"]
                    };

                    object startDateObj = reader["StartDate"];
                    if (startDateObj != DBNull.Value)
                    {
                        eventItem.StartDate = (DateTime)startDateObj;
                    }

                    object endDateObj = reader["EndDate"];
                    if (endDateObj != DBNull.Value)
                    {
                        eventItem.EndDate = (DateTime)endDateObj;
                    }

                    object descObj = reader["Description"];
                    if (descObj != DBNull.Value)
                    {
                        eventItem.Description = (string)descObj;
                    }

                    object webUrl = reader["WebsiteUrl"];
                    if (webUrl != DBNull.Value)
                    {
                        eventItem.WebsiteUrl = (string)webUrl;
                    }

                    object logoObj = reader["Logo"];
                    if (logoObj != DBNull.Value)
                    {
                        eventItem.Logo = (string)logoObj;
                    }

                    object orgObj = reader["Organizer"];
                    if (orgObj != DBNull.Value)
                    {
                        eventItem.Organizer = (string)orgObj;
                    }

                    object dateModObj = reader["DateModified"];
                    if (dateModObj != DBNull.Value)
                    {
                        eventItem.DateModified = (DateTime)dateModObj;
                    }

                    object latObj = reader["Lat"];
                    if (latObj != DBNull.Value)
                    {
                        eventItem.Lat = (double)latObj;
                    }

                    object longObj = reader["Long"];
                    if (longObj != DBNull.Value)
                    {
                        eventItem.Long = (double)longObj;
                    }

                    userEvents.Add(eventItem);
                });

            return userEvents;
        }

        public EventUser GetByIdWithUser(int id)
        {
            EventUser eventEvt = new EventUser();

            dataProvider.ExecuteCmd("Event_SelectByIdWithUser",
                (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                },
                (reader, resultSetIndex) =>
                {
                    EventUser eventItem = new EventUser
                    {
                        Id = (int)reader["Id"],
                        Name = (string)reader["Name"],
                        ShortName = (string)reader["ShortName"],
                        EventTypeId = (int)reader["EventTypeId"],
                        // AddressId = (int)reader["AddressId"],
                        IsOngoing = (bool)reader["IsOngoing"],
                        CreatedBy = (int)reader["CreatedBy"],
                        ModifiedBy = (int)reader["ModifiedBy"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        Street = (string)reader["Street"],
                        Suite = (string)reader["Suite"],
                        City = (string)reader["City"],
                        State = (string)reader["State"],
                        Zip = (string)reader["Zip"],
                        FirstName = (string)reader["FirstName"],
                        LastName = (string)reader["LastName"],
                        AvatarUrl = (string)reader["AvatarUrl"]
                    };

                    object startDateObj = reader["StartDate"];
                    if (startDateObj != DBNull.Value)
                    {
                        eventItem.StartDate = (DateTime)startDateObj;
                    }

                    object endDateObj = reader["EndDate"];
                    if (endDateObj != DBNull.Value)
                    {
                        eventItem.EndDate = (DateTime)endDateObj;
                    }

                    object descObj = reader["Description"];
                    if (descObj != DBNull.Value)
                    {
                        eventItem.Description = (string)descObj;
                    }

                    object webUrl = reader["WebsiteUrl"];
                    if (webUrl != DBNull.Value)
                    {
                        eventItem.WebsiteUrl = (string)webUrl;
                    }

                    object logoObj = reader["Logo"];
                    if (logoObj != DBNull.Value)
                    {
                        eventItem.Logo = (string)logoObj;
                    }

                    object orgObj = reader["Organizer"];
                    if (orgObj != DBNull.Value)
                    {
                        eventItem.Organizer = (string)orgObj;
                    }

                    object dateModObj = reader["DateModified"];
                    if (dateModObj != DBNull.Value)
                    {
                        eventItem.DateModified = (DateTime)dateModObj;
                    }

                    object latObj = reader["Lat"];
                    if (latObj != DBNull.Value)
                    {
                        eventItem.Lat = (double)latObj;
                    }

                    object longObj = reader["Long"];
                    if (longObj != DBNull.Value)
                    {
                        eventItem.Long = (double)longObj;
                    }

                    object middleNameObj = reader["MiddleName"];
                    if (middleNameObj != DBNull.Value)
                    {
                        eventItem.MiddleName = (string)middleNameObj;
                    }

                    eventEvt = eventItem;
                });

            return eventEvt;
        }
    }
}
