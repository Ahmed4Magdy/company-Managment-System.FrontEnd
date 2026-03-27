import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { DepartmentService } from '../../../core/services/department.service';
import { DepartmentDto } from '../../../core/models/department.model';
import { EmployeeDto } from '../../../core/models/employee.model';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css',
})
export class CreateEmployeeComponent implements OnInit {


  departments: DepartmentDto[] = [];
  loading = false;
  errorMessage = '';

  roles: string[] = [];

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    position: ['', Validators.required],
    departmentName: [],
    departmentId: [null, [Validators.required, Validators.min(1)]],
    employee_role: [null, Validators.required],
    hireDate: [],
    active: [true],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe({
      next: (list) => (this.departments = list),
      error: () => (
        this.departments = []
      ),
    });

    this.employeeService.getAllRoles().subscribe({
      next: (data) => this.roles = data,
      error: () => (
        this.roles = []
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
    const dto: EmployeeDto = {
      departmentId: v.departmentId,
      departmentName: v.departmentName,
      fullName: v.fullName,
      email: v.email,
      password: v.password,
      position: v.position,
      active: v.active,
      hireDate: v.hireDate,
      employee_role: v.employee_role,
    };
    this.employeeService.addEmployee(dto).subscribe({
      next: () => this.router.navigate(['/dashboard/employees']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to create employee.';
      },
      // complete: () => (this.loading = false),
    });
  }
}
