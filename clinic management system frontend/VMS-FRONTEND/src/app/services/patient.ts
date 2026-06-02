import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Patient {
  id?: number;
  patientName: string;
  age: number;
  gender: string;
  contact: string;
  problem: string;
  doctorName: string;
  visitDate?: string; // Add this line to handle the backend date tracking
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:5273/api/Patients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  create(patient: Patient): Observable<Patient> {
    // Before sending, ensure the date parameter is initialized cleanly 
    const payload = {
      ...patient,
      contact: String(patient.contact), // Convert numeric contact values to string
      visitDate: new Date().toISOString()
    };
    return this.http.post<Patient>(this.apiUrl, payload);
  }

  update(id: number, patient: Patient): Observable<any> {
    const payload = {
      ...patient,
      contact: String(patient.contact),
      visitDate: patient.visitDate || new Date().toISOString()
    };
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}