namespace backend.DTOs.CandidacyDTOs
{
    public class CandidacyInput
    {
        public string Name { get; set; }
        public string Description { get; set; }
        

        public CandidacyInput()
        {
            
        }

        public CandidacyInput(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}