import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';
import { ProjectDto } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private api: ApiService) {
  }

  getProjectWithId(id: number): Observable<ProjectDto> {
    return this.api.get<ProjectDto>(`/project/${id}`);
  }

  getAllProjects(): Observable<ProjectDto[]> {
    return this.api.get<ProjectDto[]>('/project');
  }



  addProject(dto: ProjectDto): Observable<ProjectDto> {
    return this.api.post<ProjectDto>('/project/create', dto);
  }

  updateProject(id: number, dto: Partial<ProjectDto>): Observable<ProjectDto> {
    return this.api.put<ProjectDto>(`/project/${id}`, dto);
  }

  deleteProject(id: number): Observable<void> {
    return this.api.delete<void>(`/project/${id}`);
  }

  getAllStatus(): Observable<string[]> {
    return this.api.get<string[]>(`/project/AllStatus`);
  }

}


