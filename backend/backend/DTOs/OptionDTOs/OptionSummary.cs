using backend.Models;

namespace backend.DTOs.OptionDTOs
{
    public class OptionSummary
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public OptionSummary(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public OptionSummary(Option option)
        {
            Id = option.Id;
            Name = option.Name;
        }
    }
}