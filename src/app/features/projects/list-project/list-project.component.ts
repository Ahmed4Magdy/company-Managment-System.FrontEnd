import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectDto } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.css'
})
export class ListProjectComponent implements OnInit {


  projects: ProjectDto[] = [];
  // loading = false;
  errorMessage = '';

  constructor(private projectservice: ProjectService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    // this.loading = true;
    this.errorMessage = '';

    this.projectservice.getAllProjects().subscribe({
      next: (list) =>
         (this.projects = list),
      
      error: () => {
        this.projects = [];
        this.errorMessage = 'Failed to load projects';
      },
      // complete: () => (this.loading = false),
    });
  }

    // next: (list) => console.log('next:', list),
    //   error: (err) => console.log('error:', err),
    //   complete: () => console.log('complete'),

  trackById(index: number, p: ProjectDto): number {
    return p.id ?? index;
  }


  deleteProject(id: number): void {
    // الحذف بالـ id فقط
    this.projectservice.deleteProject(id).subscribe({
      next: () => this.projects = this.projects.filter(p => p.id !== id),
      error: () => alert('Failed to delete.'),
    });
  }



}
