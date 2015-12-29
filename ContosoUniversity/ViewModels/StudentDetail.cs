using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ContosoUniversity.Models;

namespace ContosoUniversity.ViewModels
{
    public class StudentDetail
    {
        public Student Student { get; set; }
        public List<int> SelectedCourseIDs { get; set; }
        public List<Course> Courses { get; set; }
    }
}