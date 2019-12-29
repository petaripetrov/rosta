using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace backend.Models
{
    
    public class Candidacy 
    {
        public int Id { get; private set; }
        public  string Name { get; private set; }
        private string description;
        public string Description
        {
            get { return description;}
            set
            {
                if (value == null)
                {
                    throw new ArgumentNullException("Description cannot be null. ");
                }
                description = value;
            }
        }
        private string photoPath;
        public string PhotoPath
        {
            get { return photoPath;}
            set
            {
                if (value == null)
                {
                    throw new ArgumentNullException("PhotoPath cannot be null. ");
                }

                photoPath = value;
            } 
        }
        public int? OwnerId { get; set; }
        public  User Owner { get; set; }

        //changed
        public Candidacy(string name,string description, string photoPath, User owner)
        {
            if (owner == null)
            {
                throw new ArgumentNullException("Owner cannot be null. ");
            }

            if (name == null)
            {
                throw new ArgumentNullException("Name cannot be null. ");
            }
            
            Description = description;
            PhotoPath = photoPath;
            Name = name;
            OwnerId = owner.Id;
           

            
        }

        public Candidacy()
        {
            
        }
    }
}