import { Routes } from '@angular/router';
import { PatientList } from './components/patient-list/patient-list';
import { PatientForm } from './components/patient-form/patient-form';

export const routes: Routes = [
  { path: '', component: PatientList },
  { path: 'add-patient', component: PatientForm },
  { path: 'edit-patient/:id', component: PatientForm },
  { path: '**', redirectTo: '' }
];