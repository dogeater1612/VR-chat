import { Routes } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard';
import { ChatComponent } from './chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'teacher', pathMatch: 'full' },
  { path: 'teacher', component: TeacherDashboardComponent },
  { path: 'chat/:id', component: ChatComponent },
];
