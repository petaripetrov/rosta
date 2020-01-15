using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Models.Data
{
    public class Survey
    {
        //TODO Fix adding new entry issue
        public int Id { get; set; }
        public string Name { get; private set; }
        public List<Vote> Votes { get; private set; }
        public List<Option> Options { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public string Description { get; private set; }

        public int? AuthorId { get; set; }
        public UserDetails Author { get; private set; }
        
        private string photoPath = "";

        public string PhotoPath
        {
            get { return photoPath;}
            set
            {
                if (value == null)
                {
                    throw new ArgumentNullException("Photo cannot be null. ");
                }
                photoPath = value;
            }

        }
        private string color = "#000000";
        public string Color
        {
            get { return color;}
            set
            {
                if (value == null)
                {
                    throw new ArgumentNullException("Color cannot be null");
                }
                color = value;
            } 
        }
        
        

        public Survey()
        {
            Options = new List<Option>();
            Votes = new List<Vote>();
        }

        public Survey(string name, DateTime startDate, DateTime endDate, string description, IEnumerable<Option> options, UserDetails author)
        {
            if (name == null)
            {
                throw new ArgumentNullException("Name cannot be null. ");
            }
            else if (startDate.CompareTo(DateTime.Now) < 0)
            {
                throw new ArgumentException("StartDate cannot be before current time. ");
            }
            else if (endDate.CompareTo(DateTime.Now) < 0)
            {
                throw new ArgumentException("EndDate cannot be before current time. ");
            }
            else if (description == null)
            {
                throw new ArgumentNullException("Description cannot be null. ");
            }
            else if (options == null)
            {
                throw new ArgumentNullException("Options cannot be null. ");
            }
            else if (author == null)
            {
                throw new ArgumentNullException("Author cannot be null. ");
            }
            
            Name = name;
            StartDate = startDate;
            EndDate = endDate;
            Description = description;
            Options = options.ToList();
            AuthorId = author.Id;
            
            Votes = new List<Vote>();
            
        }
        public Survey(string name, DateTime startDate, DateTime endDate, string description, IEnumerable<Option> options, UserDetails author, string photoPath, string color)
            : this(name,startDate,endDate,description,options,author)
        {
            
            Color = color;
            PhotoPath = photoPath;
        }

        public void AddOption(Option option)
        {
            Options.Add(option);
        }
    }
    
}