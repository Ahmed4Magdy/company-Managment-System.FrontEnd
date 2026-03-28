import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectDto } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  id!: number;
  project:ProjectDto | null = null;
  loading = true;
constructor(
    private projectservice: ProjectService,
    private route: ActivatedRoute
  ) {}

    ngOnInit(): void {
    // أخذ الـ ID من رابط الصفحة
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.projectservice.getProjectWithId(this.id).subscribe({
      next: (p) => (this.project = p),
      error: () => (this.project = null),
      complete: () => (this.loading = false),
    });
  }
}
