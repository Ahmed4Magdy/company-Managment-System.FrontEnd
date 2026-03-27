import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EmployeeDto } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private api: ApiService) { }

  // login(email: string, password: string): Observable<{ token: string; message: string }> {
  //   return this.api.post<{ token: string; message: string }>('/auth/employee/login', { email, password });
  // }

  getEmployeeWithId(id: number): Observable<EmployeeDto> {
    return this.api.get<EmployeeDto>(`/auth/employee/${id}`);
  }

  getAllEmployees(): Observable<EmployeeDto[]> {
    return this.api.get<EmployeeDto[]>('/auth/employee/allEmployees');
  }

  getAllRoles(): Observable<string[]> {
    return this.api.get<string[]>(`/auth/employee/roles`);
  }

  getAllActiveTrueEmployees(): Observable<EmployeeDto[]> {
    return this.api.get<EmployeeDto[]>('/auth/employee/ActiveTrue');
  }

  getAllActiveFalseEmployees(): Observable<EmployeeDto[]> {
    return this.api.get<EmployeeDto[]>('/auth/employee/ActiveFalse');
  }

  addEmployee(dto: EmployeeDto): Observable<EmployeeDto> {
    return this.api.post<EmployeeDto>('/auth/employee/addEmployee', dto);
  }

  updateEmployee(id: number, dto: Partial<EmployeeDto>): Observable<EmployeeDto> {
    return this.api.put<EmployeeDto>(`/auth/employee/${id}`, dto);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.api.delete<void>(`/auth/employee/${id}`);
  }


}
