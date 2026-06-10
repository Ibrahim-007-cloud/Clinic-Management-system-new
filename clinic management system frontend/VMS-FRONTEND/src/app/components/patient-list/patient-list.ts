import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common'; // Added ViewportScroller
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PatientService, Patient } from '../../services/patient';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './patient-list.html',
  styleUrls: ['./patient-list.css']
})
export class PatientList implements OnInit {
  patients: Patient[] = [];
  searchTerm = '';

  // Inject ViewportScroller into your constructor
  constructor(
    private patientService: PatientService,
    private scroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAll().subscribe((data: Patient[]) => {
      this.patients = data;
    });
  }

  get filteredPatients(): Patient[] {
    if (!this.searchTerm.trim()) {
      return this.patients;
    }
    const search = this.searchTerm.toLowerCase();
    return this.patients.filter(p => 
      p.patientName?.toLowerCase().includes(search) || 
      p.problem?.toLowerCase().includes(search) ||
      p.doctorName?.toLowerCase().includes(search) ||
      p.id?.toString().includes(search)
    );
  }

  deletePatient(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this record?')) {
      this.patientService.delete(id).subscribe(() => {
        this.loadPatients();
      });
    }
  }

  // Robust, programmatic single-page smooth scroll method
  navigateToSection(elementId: string): void {
    if (elementId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.scroller.scrollToAnchor(elementId);
    }
  }
}