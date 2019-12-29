using backend.Models;

namespace backend.DTOs.CandidacyDTOs
{
    public class CandidacySummary
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }

        public CandidacySummary(int id, string name, string description, string photo)
        {
            Id = id;
            Name = name;
            Description = description;
            Photo = photo;
        }

        public CandidacySummary(Candidacy candidacy)
        {
            Id = candidacy.Id;
            Name = candidacy.Name;
            Description = candidacy.Description;
            Photo = candidacy.PhotoPath;
        }
    }
}