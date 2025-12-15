import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './teacher-dashboard.html',
})
export class TeacherDashboardComponent {

  conversations = ['abc123', 'def456'];
  selected = 'abc123';

  constructor(private router: Router) {}

  goTo(id: string) {
    this.selected = id;
    this.router.navigate(['/chat', id]);
  }
}
