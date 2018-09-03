using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace Sabio.Services
{
    public class NotificationService : INotificationsService
    {
        readonly IDataProvider dataProvider;

        public NotificationService(IDataProvider dataProvider)

        {
            this.dataProvider = dataProvider;
        }


        public List<Notifications> GetNotifications(int id)
        {
            List<Notifications> listOfNotifications = new List<Notifications>();

            dataProvider.ExecuteCmd(
                "Notification_Likes",
                (parameters) =>
                {
                    parameters.AddWithValue("@currentUserId", id);
                },
                (reader, resultSetIndex) =>
                {
                    Notifications notifications = new Notifications
                    {
                        CurrentUserId = (int)reader["CurrentUserId"],
                        PostId = (int)reader["PostId"],
                        OtherUserId = (int)reader["OtherUserId"],
                        DateCreated = (DateTime)reader["DateCreated"],
                        fullname = (string)reader["Fullname"],
                        usernotified = (bool)reader["UserNotified"],
                        AvatarUrl = (string)reader["AvatarUrl"],
                        NotificationType = (string)reader["NotificationType"],
                    };
                    listOfNotifications.Add(notifications);

                });
            return listOfNotifications;
        }
    }
}
