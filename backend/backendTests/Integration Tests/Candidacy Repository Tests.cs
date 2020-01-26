using System;
using System.Linq;
using backend.Models.Data;
using backend.Repositories;
using NUnit.Framework;

namespace backendTests.Integration_Tests
{
    [TestFixture]
    public class Candidacy_Repository_Tests
    {
        [Test]
        public void Add_Normal_Conditionals()
        {
            var repo = new CandidacyRepository();
            var user = new UserDetailsRepository().GetAll().FirstOrDefault();
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
            Assert.True(repo.GetAll().Last().Owner != null);
        }

        [Test]
        public void Add_User_Null()
        {
            var repo = new CandidacyRepository();
            UserDetails userDetails = null;
            
            
            Assert.Throws<ArgumentNullException>(() =>
            {
                var candidacy = new Candidacy("John","empty description","empty",userDetails);
                repo.Add(candidacy);
            });
        

        }

        [Test]
        public void Add_Name_Null()
        {
            var repo = new CandidacyRepository();
            var user = new UserDetails();
            Assert.Throws<ArgumentNullException>(() =>
            {
                var candidacy = new Candidacy(null, "empty description", "empty", user);
                repo.Add(candidacy);
            });

        }

        [Test]
        public void Add_Description_Null()
        {
            var repo = new CandidacyRepository();
            var user = new UserDetails();
            Assert.Throws<ArgumentNullException>(() =>
            {
                var candidacy = new Candidacy("John",null,"empty",user);
                repo.Add(candidacy);
            });
           
        }

        [Test]
        public void Edit_Normal_Conditions()
        {
            var repo = new CandidacyRepository();
            var user = new UserDetails();
            var userRepo = new UserDetailsRepository();
            userRepo.Add(user);
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
            var temp = repo.GetAll().FirstOrDefault();
            temp.PhotoPath = "foo";
            temp.Description = "bar";
            repo.Edit(temp);
        }

        [Test]
        public void Edit_PhotoPath_Null()
        {
            var repo = new CandidacyRepository();
            var user = new UserDetails();
            var userRepo = new UserDetailsRepository();
            userRepo.Add(user);
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
            var temp = repo.GetAll().FirstOrDefault();

            Assert.Throws<ArgumentNullException>(() =>
            {
                temp.PhotoPath = null;
                temp.Description = "bar";
                repo.Edit(temp);
            });
        }

        [Test]
        public void Edit_Description_Null()
        {
            var repo = new CandidacyRepository();
            var user = new UserDetails();
            var userRepo = new UserDetailsRepository();
            userRepo.Add(user);
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
            var temp = repo.GetAll().FirstOrDefault();

            Assert.Throws<ArgumentNullException>(() =>
            {
                temp.PhotoPath = "foo";
                temp.Description = null;
                repo.Edit(temp);
            });
        }

        [Test]
        public void Delete_Normal_Conditions()
        {
            var repo = new CandidacyRepository();
            var user = new UserDetails();
            var userRepo = new UserDetailsRepository();
            userRepo.Add(user);
            var candidacy = new Candidacy("John","empty description","empty",user);
            repo.Add(candidacy);
            repo.Delete(repo.GetAll().FirstOrDefault());
            
        }

       
        
    }
}