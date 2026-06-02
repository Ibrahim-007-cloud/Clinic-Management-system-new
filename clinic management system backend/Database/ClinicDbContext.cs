using Microsoft.EntityFrameworkCore;

public class ClinicDbContext : DbContext
{
    public ClinicDbContext(DbContextOptions<ClinicDbContext> options) : base(options) { }
    
    public DbSet<Patient> Patients => Set<Patient>();
}