using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sabio.Web
{
    public class ConnectionMapping<T>
    {
        readonly object syncLock = new object();
        readonly Dictionary<T, HashSet<string>> _connections =
            new Dictionary<T, HashSet<string>>();

        //public int Count
        //{
        //    get
        //    {
        //        return _connections.Count;
        //    }
        //}

        public void Add(T key, string connectionId)
        {
            lock (syncLock)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    connections = new HashSet<string>();
                    _connections.Add(key, connections);
                }

                connections.Add(connectionId);
            }
        }

        readonly static string[] EMPTY_ARRAY = new string[0];

        public string[] GetConnections(T key)
        {
            lock (syncLock)
            {
                if (_connections.TryGetValue(key, out var connections))
                {
                    return connections.ToArray();
                }
            }

            return EMPTY_ARRAY;
        }

        public void Remove(T key, string connectionId)
        {
            lock (syncLock)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    return;
                }

                connections.Remove(connectionId);

                if (connections.Count == 0)
                {
                    _connections.Remove(key);
                }
            }
        }
    }
}