import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskDto } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-detail-task',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.css'
})
export class DetailTaskComponent implements OnInit {

  task: TaskDto | null = null;
  loading = true;
  loadError = false;
  id!: number;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getTaskWithId(this.id).subscribe({
      next: (data) => {
        this.task = data;
        this.loading = false;
      },
      error: () => {
        this.loadError = true;
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'PENDING':     return 'badge badge-pending';
      case 'IN_PROGRESS': return 'badge badge-progress';
      case 'COMPLETED':   return 'badge badge-completed';
      case 'CANCELLED':   return 'badge badge-cancelled';
      default:            return 'badge';
    }
  }
}