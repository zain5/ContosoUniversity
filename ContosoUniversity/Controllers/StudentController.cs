using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ContosoUniversity.Models;
using ContosoUniversity.ViewModels;

namespace ContosoUniversity.Controllers
{
    public class StudentController : Controller
    {
        private ContosoContext db = new ContosoContext();

        // GET: Students
        public ActionResult Index()
        {
            var students = db.Students.Include(T => T.Enrollments.Select(U => U.Course)).ToList();
            return View(students);
        }

        public ActionResult IndexSPA()
        {
            //var students = db.Students.Include(T => T.Enrollments.Select(U => U.Course)).ToList();
            return View();
        }

        // GET: Students/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Students/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "StudentID,LastName,FirstName,EnrollmentDate")] Student student)
        {
            if (ModelState.IsValid)
            {
                db.Students.Add(student);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(student);
        }

        // GET: Students/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var student = db.Students.Include(T => T.Enrollments).Single(U => U.StudentID == id);
            if (student == null)
            {
                return HttpNotFound();
            }

            return View(GetStudentDetails(student));
        }

        private StudentDetail GetStudentDetails(Student student)
        {
            StudentDetail studentVM = new StudentDetail();
            studentVM.Student = student;
            studentVM.SelectedCourseIDs = studentVM.Student.Enrollments.Select(T => T.CourseID).ToList();
            studentVM.Courses = db.Courses.ToList();

            return studentVM;
        }

        // POST: Students/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "StudentID,LastName,FirstName,EnrollmentDate")] Student student, string[] selectedCourses)
        {
            if (ModelState.IsValid)
            {
                db.Entry(student).State = EntityState.Modified;
                db.SaveChanges();

                var studEnrollments = db.Enrollments.Where(T => T.StudentID == student.StudentID);
                var courses = db.Courses;

                foreach (var course in courses)
                {
                    if (selectedCourses.Contains(course.CourseID.ToString()))
                    {
                        if (studEnrollments.FirstOrDefault(T => T.CourseID == course.CourseID) == null)
                        {
                            db.Enrollments.Add(new Enrollment { Course = course, Student = student });
                        }
                    }
                    else
                    {
                        var enrollmentToDelete = studEnrollments.FirstOrDefault(T => T.CourseID == course.CourseID);

                        if (enrollmentToDelete != null)
                        {
                            db.Enrollments.Remove(enrollmentToDelete);
                        }
                    }
                }

                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(GetStudentDetails(student));
        }

        // GET: Students/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return HttpNotFound();
            }
            return View(student);
        }

        // POST: Students/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Student student = db.Students.Find(id);
            db.Students.Remove(student);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
