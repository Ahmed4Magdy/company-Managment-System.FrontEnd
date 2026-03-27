import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  template: `
    <div class="page">
      <h1>Tasks</h1>
      <p>Tasks page content.</p>
    </div>
  `,
  styles: [
    `
      .page {
        background: #fff;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      }
      h1 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        color: #1e293b;
      }
    `,
  ],
})
export class TaskListComponent {}
