using System;
using System.Collections.Generic;

namespace backend.Models.Data
{
    public class School
    {
        public int Id { get; set; }
        
        public ICollection<UserDetails> Users { get; set; }
        
        
        private string name;
        public string Name
        {
            get { return name;} 
            set{
                if (value == null)
                {
                    throw new ArgumentNullException("Name cannot be null. ");
                }
                name = value;
            } 
        }

        public School()
        {
            
        }

        public School(string name)
        {
            Name = name;
        }
    }
}