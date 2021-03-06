using System.Collections.Generic;
using System.Net.Mime;

namespace backend.Services.Security
{
    public class ImageSecurityHandler : FileSecurityHandler
    {
        public ImageSecurityHandler()
        {
            // 5KB. Minimal size for most printers
            MinSize = 5 * 1024;
            //5MB 
            MaxSize = 5 * 1024 * 1024;
            AllowedFormats = new List<string>(){MediaTypeNames.Image.Jpeg};
        }
    }
    
}