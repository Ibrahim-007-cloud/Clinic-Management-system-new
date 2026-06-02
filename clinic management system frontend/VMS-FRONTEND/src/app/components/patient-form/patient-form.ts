import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient } from '../../services/patient';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-form.html',
  styleUrls: ['./patient-form.css']
})
export class PatientForm implements OnInit {
  patient: Patient = { 
    patientName: '', 
    age: 0, 
    gender: 'Male', 
    contact: '', 
    problem: '', 
    doctorName: '', 
    visitDate: new Date().toISOString() 
  };
  isEditMode = false;

  constructor(
    private patientService: PatientService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.patientService.getById(+id).subscribe((data: Patient) => this.patient = data);
    }
  }

  savePatient(): void {
    if (this.isEditMode && this.patient.id) {
      this.patientService.update(this.patient.id, this.patient).subscribe(() => this.router.navigate(['/']));
    } else {
      this.patientService.create(this.patient).subscribe(() => this.router.navigate(['/']));
    }
  }
}