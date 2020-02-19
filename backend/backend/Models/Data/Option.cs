using System;

namespace backend.Models.Data
{
    public class Option
    {
        public int Id { get; set; }
        private string name;
        public  string Name
        {
            get { return name;}
            private set 
            { 
                if (value == null)
                {
                    throw new ArgumentNullException("Name cannot be null. ");
                }

                name = value;
            }
        }

        public int SurveyId { get; set; }
        
       

        public Option()
        {
            
        }

       

        public Option(string name, int surveyId)
        {
            this.name = name;
            SurveyId = surveyId;
        }

        public Option(string name)
        {
            this.name = name;
        }
    }
}