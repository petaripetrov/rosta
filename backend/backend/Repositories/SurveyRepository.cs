using System;
using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models;

namespace backend.Repositories
{
    public class SurveyRepository : IRepository<Survey>
    {
        public void Add(Survey value)
        {
            try
            {
                try
                {
                    using (var context = new Context())
                    {
                        context.Surveys.Add(value);
                        context.SaveChanges();
                    }
                }
                catch (ArgumentException e)
                {
                    throw new ArgumentException(e.Message);
                }
                
            }
            catch (ArgumentNullException e)
            {

                throw new ArgumentNullException(e.Message);
            }
           
        }

        public void Delete(Survey value)
        {
            using (var context = new Context())
            {
                value.Options.Clear();
                value.Votes.Clear();
                context.Remove(value);
                context.SaveChanges();
            }
        }

        public Survey GetById(int id)
        {
            Survey result;
            using (var context = new Context())
            {
                result = context.Surveys.FirstOrDefault(x => x.Id == id);
            }

            return result;
        }

        public void Edit(Survey value)
        {
            try
            {
                using (var context = new Context())
                {
                    context.Update(value);
                    context.SaveChanges();
                }
            }
            catch (ArgumentNullException e)
            {
                throw new ArgumentNullException(e.Message);
            }
           
        }

        public IEnumerable<Survey> GetAll()
        {
            var context = new Context();
            return context.Surveys.ToList();
        }
    }
}