﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ContosoUniversity.Models;

namespace ContosoUniversity.Controllers
{
    public class EnrollmentWebController : ApiController
    {
        private ContosoContext db = new ContosoContext();

        // GET: api/EnrollmentWeb
        public IQueryable<Enrollment> GetEnrollments()
        {
            return db.Enrollments;
        }

        // GET: api/EnrollmentWeb/5
        [ResponseType(typeof(Enrollment))]
        public IHttpActionResult GetEnrollment(int id)
        {
            Enrollment enrollment = db.Enrollments.Find(id);
            if (enrollment == null)
            {
                return NotFound();
            }

            return Ok(enrollment);
        }

        // PUT: api/EnrollmentWeb/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEnrollment(int id, Enrollment enrollment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != enrollment.EnrollmentID)
            {
                return BadRequest();
            }

            db.Entry(enrollment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnrollmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/EnrollmentWeb
        [ResponseType(typeof(Enrollment))]
        public IHttpActionResult PostEnrollment(Enrollment enrollment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Enrollments.Add(enrollment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = enrollment.EnrollmentID }, enrollment);
        }

        // DELETE: api/EnrollmentWeb/5
        [ResponseType(typeof(Enrollment))]
        public IHttpActionResult DeleteEnrollment(int id)
        {
            Enrollment enrollment = db.Enrollments.Find(id);
            if (enrollment == null)
            {
                return NotFound();
            }

            db.Enrollments.Remove(enrollment);
            db.SaveChanges();

            return Ok(enrollment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EnrollmentExists(int id)
        {
            return db.Enrollments.Count(e => e.EnrollmentID == id) > 0;
        }
    }
}