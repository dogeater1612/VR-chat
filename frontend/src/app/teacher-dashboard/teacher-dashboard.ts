import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat.component';

@Component({
  selector: 'teacher-dashboard',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './teacher-dashboard.html',
})
export class TeacherDashboardComponent {

  conversations = ['abc123', 'def456'];
  selected = 'abc123';

}
