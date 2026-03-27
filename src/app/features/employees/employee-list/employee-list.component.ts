import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeDto } from '../../../core/models/employee.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

type Filter = 'all' | 'active' | 'inactive';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  
  employees: EmployeeDto[] = [];
  // loading = false;
  filter: Filter = 'all';


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.load();
  }

  // ngOnInit(): void {

  //   this.employeeService.getAllEmployees().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.employees = data;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.loading = false;
  //     }

  //   });

  // }


  load(): void {
    // this.loading = true;
    const req: Observable<EmployeeDto[]> =
      this.filter === 'active'
        ? this.employeeService.getAllActiveTrueEmployees()
        : this.filter === 'inactive'
          ? this.employeeService.getAllActiveFalseEmployees()
          : this.employeeService.getAllEmployees();



    req.subscribe({
      next: (list: EmployeeDto[]) => {
        // console.log('employees:', list);   // 👈 ضيف دي
        // نخزن الـ DTO مباشرة بدون أي تحويل
        this.employees = list;

      },

      error: () => {
        this.employees = [];
      },
  
    });
  }

  trackById(index: number, emp: EmployeeDto): number {
    return emp.id ?? index;
  }

  setFilter(f: Filter): void {
    this.filter = f;
    this.load();
  }

  // نستخدم departmentName مباشرة من DTO
  getDepartmentName(emp: EmployeeDto): string {
    return emp.departmentName ?? '—';
  }


  deleteEmployee(id: number): void {
    // الحذف بالـ id فقط
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.employees = this.employees.filter(emp => emp.id !== id),
      error: () => alert('Failed to delete.'),
    });
  }
}
