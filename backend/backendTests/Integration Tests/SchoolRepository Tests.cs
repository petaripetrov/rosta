using System;
using System.Linq;
using backend.Models;
using backend.Repositories;
using NUnit.Framework;

namespace backendTests.Integration_Tests
{
    [TestFixture]
    public class SchoolRepository_Tests
    {
        [Test]
        public void Add_Normal_Conditions()
        {
            var repo = new SchoolRepository();
            var school = new School("North High School");
            repo.Add(school);
            
        }
        

        [Test]
        public void Add_Name_Null()
        {
            Assert.Throws<ArgumentNullException>(() => {
                var repo = new SchoolRepository();
                var school = new School(null);
                repo.Add(school);});
        }

        [Test]
        public void Delete_Normal_Conditions()
        {
            var repo = new SchoolRepository();
            var school = new School("East High School");
            var count = repo.GetAll().Count();
            repo.Add(school);
            repo.Delete(school);
            Assert.True(count == repo.GetAll().Count());
        }

        [Test]
        public void Edit_Normal_Conditions()
        {
            var repo = new SchoolRepository();
            var school = new School("Scotland High School");
            repo.Add(school);
            school.Name = "South High School";
            repo.Edit(school);
            Assert.True(repo.GetAll().Last().Name == "South High School");
        }

        [Test]
        public void Edit_Name_Null()
        {
            Assert.Throws<ArgumentNullException>(() => {
                            var repo = new SchoolRepository();
                            var school = new School("West High School");
                            repo.Add(school);
                            school.Name = null;
                            repo.Edit(school);
            });
        }

        [Test]
        public void GetAllUsersInSchool()
        {
            var repo = new SchoolRepository();
            var users = repo.GetAll().Last().Users;
            Assert.True(users.Count > 0);
        }
    }
}