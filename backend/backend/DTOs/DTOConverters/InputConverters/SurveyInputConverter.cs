using System;
using System.Collections.Generic;
using backend.DTOs.SurveyDTOs;
using backend.Models.Data;

namespace backend.DTOs.DTOConverters.InputConverters
{
    public class SurveyInputConverter 
    {
        public static Survey Convert(SurveyInput input)
        {
            return new Survey(input.Name,input.StartDate,input.EndDate,input.Description,new List<Option>(),input.Author,input.Photo,input.Color );
        }
    }
}