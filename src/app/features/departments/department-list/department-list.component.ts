import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepartmentService } from '../../../core/services/department.service';
import { DepartmentDto } from '../../../core/models/department.model';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css',
})
export class DepartmentListComponent implements OnInit {
  departments: DepartmentDto[] = [];
  loading = false;
  errorMessage = '';

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = '';

    this.departmentService.getAllDepartments().subscribe({
      next: (list) => (this.departments = list),
      error: () => {
        this.departments = [];
        this.errorMessage = 'Failed to load departments';
      },
      complete: () => (this.loading = false),
    });
  }

  // ✅ النسخة البسيطة
  deleteDepartment(id: number ): void {
    // if (!id) return;
    this.departmentService.deleteDepartment(id).subscribe({

      next: () => {
        // حذف العنصر مباشرة من القائمة بدل إعادة تحميل كل الأقسام
        this.departments = this.departments.filter(d => d.id !== id)
      },
      error: (err) => {
        // show backend message
        alert(err?.error?.message || 'Cannot delete department');
      },
    });
  }
}
// "d.id != null && 
// | undefined   is the solution if no write in button d.id!=null