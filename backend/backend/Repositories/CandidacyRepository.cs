using System;
using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CandidacyRepository : IRepository<Candidacy>
    {
        public void Add(Candidacy value)
        {
            try
            {
                using (var context = new DataContext())
                {
                    context.Candidacies.Add(value);
                    context.SaveChanges();
                }
            }
            catch (ArgumentNullException e)
            {
                throw new ArgumentNullException(e.Message);
            }
           
        }

        public void Delete(Candidacy value)
        {
            using (var context = new DataContext())
            {
                context.Candidacies.Attach(value);
                context.Candidacies.Remove(value);
                context.SaveChanges();
            }
        }

        public Candidacy GetById(int id)
        {
            Candidacy result = null;
            using (var context = new DataContext())
            {
                result = context.Candidacies.Include(x => x.Owner).FirstOrDefault(x => x.Id == id);
            }

            return result;
        }

        public void Edit(Candidacy value)
        {
            try
            {
                using (var context = new DataContext())
                {
                    context.Candidacies.Update(value);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new ArgumentNullException(e.Message);
            }
            
        }

        public IEnumerable<Candidacy> GetAll()
        {
            var context = new DataContext();
            return context.Candidacies.Include(x => x.Owner).ToList();
        }
    }
}