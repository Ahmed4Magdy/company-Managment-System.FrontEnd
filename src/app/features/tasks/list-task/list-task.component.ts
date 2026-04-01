import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskDto } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent {

  tasks: TaskDto[] = [];
  errorMessage = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    // this.loading = true;
    this.errorMessage = '';

    this.taskService.getAllTasks().subscribe({
      next: (list) =>
        (this.tasks = list),

      error: () => {
        this.tasks = [];
        this.errorMessage = 'Failed to load tasks';
      },
      // complete: () => (this.loading = false),
    });
  }

  // getEmployeetName(t: TaskDto): string {
  //   return t.employeeName ?? '—';
  // }

  // getEmployeeEmail(t: TaskDto): string {
  //   return t.employeeEmail ?? '—';
  // }

  // getProjectName(t: TaskDto): string {
  //   return t.projectName ?? '—';
  // }

  trackById(index: number, t: TaskDto): number {
    return t.id ?? index;
  }


  deleteTask(id: number): void {
    // الحذف بالـ id فقط
    this.taskService.deleteTask(id).subscribe({
      next: () => this.tasks = this.tasks.filter(t => t.id !== id),
      error: () => alert('Failed to delete.'),
    });
  }

}
