using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class PatientRepository : IPatientRepository
{
    private readonly ClinicDbContext _context;
    
    public PatientRepository(ClinicDbContext context) 
    { 
        _context = context; 
    }

    public async Task<IEnumerable<Patient>> GetAllAsync() => await _context.Patients.ToListAsync();
    
    public async Task<Patient?> GetByIdAsync(int id) => await _context.Patients.FindAsync(id);
    
    public async Task<Patient> AddAsync(Patient patient) 
    { 
        await _context.Patients.AddAsync(patient); 
        await _context.SaveChangesAsync(); 
        return patient; 
    }
    
    public async Task UpdateAsync(Patient patient) 
    { 
        _context.Patients.Update(patient); 
        await _context.SaveChangesAsync(); 
    }
    
    public async Task DeleteAsync(int id) 
    { 
        var p = await _context.Patients.FindAsync(id); 
        if (p != null) 
        { 
            _context.Patients.Remove(p); 
            await _context.SaveChangesAsync(); 
        } 
    }
}