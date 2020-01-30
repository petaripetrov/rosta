using System;
using System.IO;
using System.Linq;

namespace backend.Infrastructure.Infrastructure_Helpers
{
    public static class PathHelper
    {
        public static string GetCredentialsPath()
        {
            return Path.GetFullPath("./Infrastructure/Images/GCStorage/Rosta-a2299c0ab851.json");
           
        }
    }
}