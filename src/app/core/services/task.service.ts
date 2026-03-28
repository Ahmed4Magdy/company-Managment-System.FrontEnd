import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { TaskDto } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private api: ApiService) {
  }

  getTaskWithId(id: number): Observable<TaskDto> {
      return this.api.get<TaskDto>(`/task/${id}`);
    }
  
    getAllTasks(): Observable<TaskDto[]> {
      return this.api.get<TaskDto[]>('/task');
    }
  
  
  
    addTask(dto: TaskDto): Observable<TaskDto> {
      return this.api.post<TaskDto>('/task/create', dto);
    }
  
    updateTask(id: number, dto: Partial<TaskDto>): Observable<TaskDto> {
      return this.api.put<TaskDto>(`/task/${id}`, dto);
    }
  
    deleteTask(id: number): Observable<void> {
      return this.api.delete<void>(`/task/${id}`);
    }
  
    getAllStatus(): Observable<string[]> {
      return this.api.get<string[]>(`/task/AllStatus`);
    }
  
}
