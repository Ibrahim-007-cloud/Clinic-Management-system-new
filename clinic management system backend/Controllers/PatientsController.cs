using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly IPatientRepository _repository;

    public PatientsController(IPatientRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var patients = await _repository.GetAllAsync();
            return Ok(patients);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                error = ex.Message,
                inner = ex.InnerException?.Message,
                inner2 = ex.InnerException?.InnerException?.Message
            });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var p = await _repository.GetByIdAsync(id);
            return p == null ? NotFound() : Ok(p);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                error = ex.Message,
                inner = ex.InnerException?.Message,
                inner2 = ex.InnerException?.InnerException?.Message
            });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PatientDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var p = new Patient
            {
                PatientName = dto.PatientName,
                Age = dto.Age,
                Gender = dto.Gender,
                Contact = dto.Contact,
                Problem = dto.Problem,
                DoctorName = dto.DoctorName,
                VisitDate = dto.VisitDate == default ? DateTime.UtcNow : dto.VisitDate
            };

            await _repository.AddAsync(p);
            return CreatedAtAction(nameof(GetById), new { id = p.Id }, p);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                error = ex.Message,
                inner = ex.InnerException?.Message,
                inner2 = ex.InnerException?.InnerException?.Message
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] PatientDto dto)
    {
        try
        {
            var p = await _repository.GetByIdAsync(id);
            if (p == null) return NotFound();

            p.PatientName = dto.PatientName;
            p.Age = dto.Age;
            p.Gender = dto.Gender;
            p.Contact = dto.Contact;
            p.Problem = dto.Problem;
            p.DoctorName = dto.DoctorName;
            p.VisitDate = dto.VisitDate == default ? DateTime.UtcNow : dto.VisitDate;

            await _repository.UpdateAsync(p);
            return Ok(p);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                error = ex.Message,
                inner = ex.InnerException?.Message,
                inner2 = ex.InnerException?.InnerException?.Message
            });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var p = await _repository.GetByIdAsync(id);
            if (p == null) return NotFound();

            await _repository.DeleteAsync(id);
            return Ok(new { message = "Deleted successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                error = ex.Message,
                inner = ex.InnerException?.Message,
                inner2 = ex.InnerException?.InnerException?.Message
            });
        }
    }
}