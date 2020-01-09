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
        
        private Survey survey;
        public Survey Survey
        {
            get { return survey;} 
            set{
                if (value == null)
                {
                    throw new ArgumentNullException("Survey cannot be null.");
                }

                survey = value;
            } 
        }

        public Option()
        {
            
        }

        public Option(string name, Survey survey)
        {
            if (survey == null)
            {
                 throw new ArgumentNullException("Survey cannot be null.");
                                
            }
        
            this.SurveyId = survey.Id;
            this.Name = name;
        }
    }
}