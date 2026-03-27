import { Component } from '@angular/core';
import { ProjectDto } from '../../../core/models/project';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  projects: ProjectDto[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private projectservice: ProjectService,
    private router: Router
  ) { }


  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    startDate: ['', [Validators.required]],
    endDate: ['', Validators.required],

  });
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const v = this.form.getRawValue();
    const dto: ProjectDto = {
      name: v.name,
      description: v.description,
      startDate: v.startDate,
      endDate: v.endDate,
    };
    this.projectservice.addProject(dto).subscribe({
      next: () => this.router.navigate(['/dashboard/projects']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to create project.';
      },
      // complete: () => (this.loading = false),
    });
  }
}






