namespace ContosoUniversity.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ContosoContext : DbContext
    {
        public ContosoContext()
            : base("ContosoContext")
        {
        }

        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Enrollment> Enrollments { get; set; }
        public virtual DbSet<Instructor> Instructors { get; set; }
        public virtual DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Enrollment>()
                .Property(e => e.Grade)
                .HasPrecision(3, 2);

            modelBuilder.Entity<Instructor>()
                .HasMany(e => e.Courses)
                .WithRequired(e => e.Instructor)
                .WillCascadeOnDelete(false);
        }
    }
}
