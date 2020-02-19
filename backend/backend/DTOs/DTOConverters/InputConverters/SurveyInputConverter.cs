using System;
using System.Collections.Generic;
using System.Linq;
using backend.DTOs.SurveyDTOs;
using backend.Models.Data;
using backend.Repositories;

namespace backend.DTOs.DTOConverters.InputConverters
{
    public class SurveyInputConverter 
    {
        public static Survey Convert(SurveyInput input, int AuthorId)
        {
            var authorRepo = new UserDetailsRepository();
            var Author = authorRepo.GetById(AuthorId);
            return new Survey(input.Name,input.StartDate,input.EndDate,input.Description
                ,input.Options.Select(x => OptionInputConverter.Convert(x))
                ,Author,input.PhotoPath,input.Color );
        }
    }
}