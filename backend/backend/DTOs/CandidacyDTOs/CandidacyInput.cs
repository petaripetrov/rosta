namespace backend.DTOs.CandidacyDTOs
{
    public class CandidacyInput
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string PhotoPath { get; set; }
        public int OwnerId { get; set; }

        public CandidacyInput()
        {
            
        }

        public CandidacyInput(string name, string description, string photoPath, int ownerId)
        {
            Name = name;
            Description = description;
            PhotoPath = photoPath;
            OwnerId = ownerId;
        }
    }
}