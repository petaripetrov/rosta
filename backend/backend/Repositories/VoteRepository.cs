using System;
using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class VoteRepository : IRepository<Vote>
    {
        public void Add(Vote value)
        {
            try
            {
                using (var context = new DataContext())
                {
                    context.Votes.Add(value);
                    context.SaveChanges();
                }
            }
            catch (ArgumentNullException e)
            {
                throw new ArgumentNullException(e.Message);
            }
            
        }

        public void Delete(Vote value)
        {
            using (var context = new DataContext())
            {
                context.Votes.Remove(value);
                context.SaveChanges();
            }
        }

        public Vote GetById(int id)
        {
            var context = new DataContext();
            return context.Votes.FirstOrDefault(x => x.Id == id);
        }

        public void Edit(Vote value)
        {
            using (var context = new DataContext())
            {
                context.Votes.Update(value);
                context.SaveChanges();
            }
        }

        public IEnumerable<Vote> GetAll()
        {
            var context = new DataContext();
            return context.Votes.Include(x => x.Option).ToList();
        }

        
    }
}