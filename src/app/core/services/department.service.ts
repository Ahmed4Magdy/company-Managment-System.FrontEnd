import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { DepartmentDto } from '../models/department.model';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  constructor(private api: ApiService) {}

  getAllDepartments(): Observable<DepartmentDto[]> {
    return this.api.get<DepartmentDto[]>('/department');
  }

  /** Alias for dropdowns etc. */
  getDepartments(): Observable<DepartmentDto[]> {
    return this.getAllDepartments();
  }

  getDepartmentWithId(id: number): Observable<DepartmentDto> {
    return this.api.get<DepartmentDto>(`/department/${id}`);
  }

  createDepartment(dto: DepartmentDto): Observable<DepartmentDto> {
    return this.api.post<DepartmentDto>('/department/create', dto);
  }

  updateDepartment(id: number, dto: DepartmentDto): Observable<DepartmentDto> {
    return this.api.put<DepartmentDto>(`/department/${id}`, dto);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.api.delete<void>(`/department/${id}`);
  }

}
