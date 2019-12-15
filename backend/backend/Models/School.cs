using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class School
    {
        public int Id { get; set; }
        public List<User> Admins { get; set; }
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
            Admins = new List<User>();
        }

        public School(string name)
        {
            Name = name;
            Admins = new List<User>();
        }
    }
}