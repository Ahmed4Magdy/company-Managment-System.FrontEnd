import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectDto } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {
  status: string[] = [];
  id!: number;
  loading = false;
  loadError = false;
  errorMessage = '';



  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    startDate: ['', [Validators.required]],
    endDate: ['', Validators.required],
    status: [null as String | null]

  });

  constructor(
    private fb: NonNullableFormBuilder,
    private projectservice: ProjectService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));


    this.projectservice.getProjectWithId(this.id).subscribe({
      next: (p: ProjectDto) => {
        this.form.patchValue({
          name: p.name,
          description: p.description,
          startDate: p.startDate,
          endDate: p.endDate,
          status: p.status,
        });
      },
      error: () => (this.loadError = true),
    });

    this.projectservice.getAllStatus().subscribe({
      next: (data) => this.status = data,
      error: () => (
        this.status = []
      ),
    });
  }

      onSubmit(): void {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
        }
        this.loading = true;
        this.errorMessage = '';
        const v = this.form.getRawValue();
        const dto: Partial<ProjectDto>  = {
          name: v.name,
          description: v.description,
          startDate: v.startDate,
          endDate: v.endDate,
          status: v.status,
         
        };
      
        this.projectservice.updateProject(this.id, dto).subscribe({
          next: () => this.router.navigate(['/dashboard/projects']),
          error: (err) => {
            this.loading = false;
            this.errorMessage = err?.error?.message || 'Failed to update project.';
          },
          complete: () => (this.loading = false),
        });
      }
    

  }
