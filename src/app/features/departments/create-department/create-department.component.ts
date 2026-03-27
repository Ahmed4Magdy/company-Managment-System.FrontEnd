import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DepartmentService } from '../../../core/services/department.service';
import { DepartmentDto } from '../../../core/models/department.model';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.css',
})
export class CreateDepartmentComponent {
  departments: DepartmentDto[] = [];
  
  loading = false;
  errorMessage = '';

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const v = this.form.getRawValue();
    const dto: DepartmentDto = {
          name: v.name,
          description: v.description,
        
        };

    this.departmentService.createDepartment(dto).subscribe({
      
      next: () => this.router.navigate(['/dashboard/departments']),
      
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message ?? 'Failed to create department.';
      },
      // complete: () => (this.loading = false),
    });
  }
}
