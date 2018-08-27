using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    static class EmbeddedResource
    {
        public static string Get(string name)
        {
            using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("Sabio.Services." + name))
            using (var reader = new StreamReader(stream))
            {
                return reader.ReadToEnd();
            }
        }
    }
}
