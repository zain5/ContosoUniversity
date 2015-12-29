namespace ContosoUniversity.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Instructor")]
    public partial class Instructor
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Instructor()
        {
            Courses = new HashSet<Course>();
        }

        public int InstructorID { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }

        public DateTime? HireDate { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Course> Courses { get; set; }
    }
}
