using System;
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
            var school = new School("North High School");
            repo.Add(school);
            repo.Delete(school);
        }

        [Test]
        public void Edit_Normal_Conditions()
        {
            var repo = new SchoolRepository();
            var school = new School("North High School");
            repo.Add(school);
            school.Name = "South High School";
            repo.Edit(school);
        }

        [Test]
        public void Edit_Name_Null()
        {
            Assert.Throws<ArgumentNullException>(() => {
                            var repo = new SchoolRepository();
                            var school = new School("North High School");
                            repo.Add(school);
                            school.Name = null;
                            repo.Edit(school);
            });
        }
    }
}