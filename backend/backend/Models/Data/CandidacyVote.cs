using System;

namespace backend.Models.Data
{
    public class CandidacyVote
    {
        public int Id { get; set; }
        public int CandidacyId { get; set; }
        public DateTime Date { get; set; }

        public CandidacyVote()
        {
        }

        public CandidacyVote(int candidacyId, string date)
        {
            CandidacyId = candidacyId;
            Date = DateTime.Now;
        }

        public CandidacyVote(int candidacyId)
        {
            CandidacyId = candidacyId;
            Date = DateTime.Now;
        }
    }
}