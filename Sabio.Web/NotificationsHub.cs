using Microsoft.AspNet.SignalR;
using Sabio.Services.Security;
using System;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Threading;
using System.Threading.Tasks;

namespace Sabio.Web
{
    public class NotificationsHub : Hub
    {
        static ConnectionMapping<int> connections = new ConnectionMapping<int>();

        // This method will be called once every time the Node.js code has
        // created a new database item that should appear as a notification
        // for the user.
        static void HandleNotificationFromNodeJs(int userId)
        {
            NotifyUser(userId);
        }

        public static void NotifyUser(int userId)
        {
            // loop through the connections for this user
            foreach (var connectionId in connections.GetConnections(userId))
            {
                GlobalHost.ConnectionManager.GetHubContext<NotificationsHub>().Clients.Client(connectionId).checkNotifications();
            }
        }

        int GetUserId()
        {
            return Context.User.Identity.GetId().Value;
        }

        public override Task OnConnected()
        {
            connections.Add(GetUserId(), Context.ConnectionId);
            return base.OnConnected();
        }

        //Do the OnDisconnected()
        public override Task OnDisconnected(bool stopCalled)
        {
            connections.Remove(GetUserId(), Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        #region Named Pipe listener (for receiving from Node.js)
        static NotificationsHub()
        {
            Task.Run(StartNamedPipeListener);
        }

        static readonly ManualResetEvent listening = new ManualResetEvent(false);
        const string PIPE_NAME = "Sabio-iisnode-signalNotificationForUser";

        static async Task StartNamedPipeListener()
        {
            try
            {
                string message;

                using (var npss = new NamedPipeServerStream(PIPE_NAME, PipeDirection.In, NamedPipeServerStream.MaxAllowedServerInstances))
                {
                    Trace.WriteLine("node named pipe listening");
                    listening.Set();

                    await npss.WaitForConnectionAsync();

                    listening.Reset();

                    _ = Task.Run(StartNamedPipeListener);
                    Trace.WriteLine("connection from node named pipe");

                    // Read message
                    using (var reader = new StreamReader(npss))
                    {
                        message = reader.ReadToEnd();
                        Trace.WriteLine("message from node pipe: " + message);
                    }

                    // Make sure there's always at least one NamedPipeServerStream attached to the pipe
                    // (so that clients don't ever get "not found" errors)
                    listening.WaitOne();
                }

                HandleNotificationFromNodeJs(int.Parse(message));
            }
            catch (Exception ex)
            {
                Trace.WriteLine("ERROR: " + ex.ToString());
            }
        }
        #endregion
    }
}
