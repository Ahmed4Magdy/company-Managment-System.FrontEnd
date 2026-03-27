import { Component, OnInit, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { DepartmentService } from '../../../core/services/department.service';
import { DepartmentDto } from '../../../core/models/department.model';
import { EmployeeDto } from '../../../core/models/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
})
export class EditEmployeeComponent implements OnInit {
  id!: number;
  departments: DepartmentDto[] = [];
  roles: string[] = [];
  loading = false;
  loadError = false;
  errorMessage = '';

  // todo : get employees roles from backend endpoint



  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['',Validators.required, Validators.minLength(6)],
    position: ['', Validators.required],
    departmentId: [null as number | null, Validators.required],
    employee_role: [null as String | null, Validators.required],
    hireDate: [''],
    active: [true],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.departmentService.getDepartments().subscribe({
      next: (list) => (this.departments = list),
      error: () => (this.departments = []),
    });
    this.employeeService.getEmployeeWithId(this.id).subscribe({
      next: (emp: EmployeeDto) => {
        this.form.patchValue({
          fullName: emp.fullName,
          email: emp.email,
          position: emp.position,
          password: emp.password,
          departmentId: emp.departmentId,
          employee_role: emp.employee_role,
          hireDate: emp.hireDate,
          active: emp.active,
        });
      },
      error: () => (this.loadError = true),
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
    const dto: Partial<EmployeeDto> & { password?: string } = {
      departmentId: v.departmentId,
      fullName: v.fullName,
      email: v.email,
      position: v.position,
      active: v.active,
      hireDate: v.hireDate,
      employee_role: v.employee_role,
    };
    if (v.password?.trim()) {
      dto.password = v.password;
    }
    this.employeeService.updateEmployee(this.id, dto).subscribe({
      next: () => this.router.navigate(['/dashboard/employees']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to update employee.';
      },
      complete: () => (this.loading = false),
    });
  }
}
