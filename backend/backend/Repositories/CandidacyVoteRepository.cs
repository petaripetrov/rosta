using System.Collections.Generic;
using System.Linq;
using backend.Infrastructure;
using backend.Models.Data;

namespace backend.Repositories
{
    public class CandidacyVoteRepository : IRepository<CandidacyVote>
    {
        public void Add(CandidacyVote value)
        {
            using (var context = new DataContext())
            {
                context.CandidacyVotes.Add(value);
                context.SaveChanges();
            }
        }

        public void Delete(CandidacyVote value)
        {
            using (var context = new DataContext())
            {
                context.CandidacyVotes.Remove(value);
                context.SaveChanges();
            }
        }

        public CandidacyVote GetById(int id)
        {
            var context = new DataContext();
            return context.CandidacyVotes.First(x => x.Id == id);
        }

        public void Edit(CandidacyVote value)
        {
            using (var context = new DataContext())
            {
                context.CandidacyVotes.Update(value);
                context.SaveChanges();
            }
        }

        public IEnumerable<CandidacyVote> GetAll()
        {
            var context = new DataContext();
            return context.CandidacyVotes.ToList();

        }
    }
}