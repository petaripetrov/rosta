using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using backend.Repositories;

namespace backend.Models
{
    public class School
    {
        public int Id { get; set; }
        
        // /// <summary>
        // /// Users property is get-only. Gets all Users.
        // /// </summary>
        // [NotMapped]
        // public virtual ICollection<User> Users {
        //     get
        //     {
        //         return new UserRepository().GetAll().ToList();
        //     }
        //     
        // }
        //
        // /// <summary>
        // /// Students property is get-only. Gets all Users with role Student.
        // /// </summary>
        // [NotMapped]
        // public virtual ICollection<User> Students {
        //     get
        //     {
        //         return new UserRepository().GetAll().Where(x => x.Role == "Student").ToList();
        //     }
        //     
        // }
        //
        // /// <summary>
        // /// Admins property is get-only. Gets all Users with role Admin.
        // /// </summary>
        // [NotMapped]
        // public virtual ICollection<User> Admins
        // {
        //     get
        //     {
        //         return new UserRepository().GetAll().Where(x => x.Role == "Admin").ToList();
        //     }
        // }
        //
        // /// <summary>
        // /// SchoolAdmins property is get-only. Gets all Users with role SchoolAdmin.
        // /// </summary>
        // [NotMapped]
        // public virtual ICollection<User> SchoolAdmins
        // {
        //     get
        //     {
        //         return new UserRepository().GetAll().Where(x => x.Role == "SchoolAdmin").ToList();
        //     }
        // }

        public ICollection<User> Users { get; set; }
        
        
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