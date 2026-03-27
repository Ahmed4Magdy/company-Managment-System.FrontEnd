import { Component, OnInit, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DepartmentService } from '../../../core/services/department.service';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css',
})
export class EditDepartmentComponent implements OnInit {
  id = input.required<string>();
  loading = false;
  loadError = false;
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

  ngOnInit(): void {
    const id = Number(this.id());
    this.departmentService.getDepartmentWithId(id).subscribe({
      next: (d) => {
        this.form.patchValue({
          name: d.name,
          description: d.description ?? '',
        });
      },
      error: () => (this.loadError = true),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const dto = this.form.getRawValue();
    this.departmentService
      .updateDepartment(Number(this.id()), { name: dto.name, description: dto.description || undefined })
      .subscribe({
        next: () => this.router.navigate(['/dashboard/departments']),
        error: (err) => {
          this.loading = false;
          this.errorMessage = err?.error?.message ?? 'Failed to update department.';
        },
        complete: () => (this.loading = false),
      });
  }
}
