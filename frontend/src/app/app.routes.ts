import { Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard';

export const routes: Routes = [
  { path: '', component: TeacherDashboardComponent },
  { path: 'chat/:id', component: ChatComponent },
];
