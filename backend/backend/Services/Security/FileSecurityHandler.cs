using System.Collections.Generic;
using System.IO;

namespace backend.Services.Security
{
    public class FileSecurityHandler
    {
        public long MaxSize { get; set; }
        public long MinSize { get; set; }
        public List<string> AllowedFormats { get; set; }

        public bool CheckFile(FileStream file)
        {
            if (file.Length >= MinSize && file.Length <=MaxSize )
            {
                return true;
            }

            return false;
        }
        public bool CheckFileSize(long size)
        {
            if (size >= MinSize && size <=MaxSize )
            {
                return true;
            }

            return false;
        }

        public bool CheckFileFormat(string format)
        {
            if (AllowedFormats.Contains(format))
            {
                return true;
            }

            return false;
        }
        
        
    }
}