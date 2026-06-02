import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientService, Patient } from '../../services/patient';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.css']
})
export class PatientList implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAll().subscribe((data: Patient[]) => {
      this.patients = data;
    });
  }

  deletePatient(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this record?')) {
      this.patientService.delete(id).subscribe(() => {
        this.loadPatients();
      });
    }
  }
}