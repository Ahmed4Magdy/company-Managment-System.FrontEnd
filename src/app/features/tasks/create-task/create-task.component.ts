import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeDto } from '../../../core/models/employee.model';
import { ProjectDto } from '../../../core/models/project';
import { TaskDto } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {

  employees: EmployeeDto[] = [];
  projects: ProjectDto[] = [];
  // role:String[]=[];
  loading = false;
  errormessage = '';

  employeeQuery = '';
  projectQuery = '';

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    projectId: [null as number | null, Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    deadline: ['', Validators.required],
  });

  get filteredEmployees(): EmployeeDto[] {
  const q = this.employeeQuery.toLowerCase();
  return this.employees.filter(e =>
    e.employee_role !== 'ROLE_ADMIN' &&
    (e.fullName.toLowerCase().includes(q) ||
     e.email.toLowerCase().includes(q))
  );
}


  get filteredProjects(): ProjectDto[] {
    const q = this.projectQuery.toLowerCase();
    return this.projects.filter(p =>
      p.name.toLowerCase().includes(q)
    );
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (list) => this.employees = list,
      error: () => this.employees = []
    });

    this.projectService.getAllProjects().subscribe({
      next: (list) => this.projects = list,
      error: () => this.projects = []
    });
  }

  showEmployeeList = false;

  selectEmployee(emp: EmployeeDto): void {
    this.form.patchValue({ employeeId: +emp.id! });
    this.employeeQuery = emp.fullName;
    this.showEmployeeList = false;
  }

  showProjectList = false;

  selectProject(proj: ProjectDto): void {
    this.form.patchValue({ projectId: +proj.id! });
    this.projectQuery = proj.name;
    this.showProjectList = false;
  }


  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errormessage = '';

    const v = this.form.getRawValue();
    const dto: TaskDto = {
      employeeId: v.employeeId ? +v.employeeId : null,
      projectId: v.projectId ? +v.projectId : null,
      title: v.title,
      description: v.description,
      deadline: v.deadline,
    };
    console.log('Sending DTO:', JSON.stringify(dto));

    this.taskService.addTask(dto).subscribe({
      next: () => this.router.navigate(['/dashboard/tasks']),
      error: (err) => {
        this.loading = false;
        this.errormessage = err?.error?.message || 'Failed to create task.';
      }
    });
  }
}