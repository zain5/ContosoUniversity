using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContosoUniversity.ViewModels
{
    public class StudentDTO
    {
        public int StudentID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime? EnrollmentDate { get; set; }
        public List<string> Courses { get; set; }
    }
}