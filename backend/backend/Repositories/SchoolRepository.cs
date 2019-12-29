using System;
using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class SchoolRepository : IRepository<School>
    {
        public void Add(School value)
        {
            try
            {
                using (var context = new Context())
                {
                    context.Schools.Add(value);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            { 
                throw new ArgumentNullException(e.Message);
            }
            
        }

        public void Delete(School value)
        {
            using (var context = new Context())
            {
                context.Schools.Remove(value);
                context.SaveChanges();
            }
            
        }

        public School GetById(int id)
        {
            School temp;
            using (var context = new Context())
            {
                temp = context.Schools.Include(x => x.Users).FirstOrDefault(x => x.Id == id);
            }
            
            return temp;
        }

        public void Edit(School value)
        {
            using (var context = new Context())
            {
                context.Schools.Update(value);
                context.SaveChanges();
            }
            
        }

        public IEnumerable<School> GetAll()
        {
            var context = new Context();
            return context.Schools.Include(x => x.Users).ToList();
        }
        
    }
}