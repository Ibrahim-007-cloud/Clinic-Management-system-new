using System;
using System.ComponentModel.DataAnnotations;

public class PatientDto
{
    [Required] public string PatientName { get; set; } = string.Empty;
    [Range(0, 120)] public int Age { get; set; }
    [Required] public string Gender { get; set; } = string.Empty;
    [Required] public string Contact { get; set; } = string.Empty;
    [Required] public string Problem { get; set; } = string.Empty;
    [Required] public string DoctorName { get; set; } = string.Empty;
    public DateTime VisitDate { get; set; }
}