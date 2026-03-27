import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeDto } from '../../../core/models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  id!: number;
  employee: EmployeeDto | null = null;
  loading = true;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // أخذ الـ ID من رابط الصفحة
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getEmployeeWithId(this.id).subscribe({
      next: (emp) => (this.employee = emp),
      error: () => (this.employee = null),
      complete: () => (this.loading = false),
    });
  }

  getDepartmentName(emp: EmployeeDto): string {
    if (typeof emp.departmentName === 'string') return emp.departmentName;
    return emp.departmentName?? '—';
  }
}

// import { Component, OnInit, input } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { EmployeeService } from '../../../core/services/employee.service';
// import { EmployeeDto } from '../../../core/models/employee.model';

// @Component({
//   selector: 'app-employee-detail',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './employee-detail.component.html',
//   styleUrl: './employee-detail.component.css',
// })
// export class EmployeeDetailComponent implements OnInit {
//   id = input.required<string>();
//   employee: EmployeeDto | null = null;
//   loading = true;

//   constructor(private employeeService: EmployeeService) {}

//   ngOnInit(): void {
//     const id = Number(this.id());
//     this.employeeService.getEmployeeWithId(id).subscribe({
//       next: (emp) => (this.employee = emp),
//       error: () => (this.employee = null),
//       complete: () => (this.loading = false),
//     });
//   }

//   getDepartmentName(emp: EmployeeDto): string {
//     if (typeof emp.departmentName === 'string') return emp.departmentName;
//     return emp.departmentName?.name ?? '—';
//   }
// }
