import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskDto } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ProjectService } from '../../../core/services/project.service';
import { EmployeeDto } from '../../../core/models/employee.model';
import { ProjectDto } from '../../../core/models/project';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {

  id!: number;
  loading = false;
  loadError = false;
  errorMessage = '';
  statuses: string[] = [];

  employees: EmployeeDto[] = [];
  projects: ProjectDto[] = [];

  employeeQuery = '';
  projectQuery = '';
  showEmployeeList = false;
  showProjectList = false;
  selectedEmployee: EmployeeDto | null = null;
  selectedProject: ProjectDto | null = null;

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    projectId:  [null as number | null, Validators.required],
    title:       ['', Validators.required],
    description: ['', Validators.required],
    deadline:    ['', Validators.required],
    status:      [null as string | null],
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getAllEmployees().subscribe({
      next: (list) => this.employees = list,
      error: () => this.employees = []
    });

    this.projectService.getAllProjects().subscribe({
      next: (list) => this.projects = list,
      error: () => this.projects = []
    });

    this.taskService.getAllStatus().subscribe({
      next: (data) => this.statuses = data,
      error: () => this.statuses = []
    });

    this.taskService.getTaskWithId(this.id).subscribe({
      next: (task: TaskDto) => {
        this.form.patchValue({
          employeeId:  task.employeeId,
          projectId:   task.projectId,
          title:       task.title,
          description: task.description,
          deadline:    task.deadline,
          status:      task.status as string,
        });
        this.employeeQuery = task.employeeName ?? '';
        this.projectQuery  = task.projectName  ?? '';
      },
      error: () => this.loadError = true,
    });
  }

  selectEmployee(emp: EmployeeDto): void {
    this.form.patchValue({ employeeId: +emp.id! });
    this.employeeQuery = emp.fullName;
    this.selectedEmployee = emp;
    this.showEmployeeList = false;
  }

  selectProject(proj: ProjectDto): void {
    this.form.patchValue({ projectId: +proj.id! });
    this.projectQuery = proj.name;
    this.selectedProject = proj;
    this.showProjectList = false;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    const v = this.form.getRawValue();
    const dto: Partial<TaskDto> = {
      employeeId:  v.employeeId  ? +v.employeeId  : null,
      projectId:   v.projectId   ? +v.projectId   : null,
      title:       v.title,
      description: v.description,
      deadline:    v.deadline,
      status:      v.status ?? undefined,
    };

    this.taskService.updateTask(this.id, dto).subscribe({
      next: () => this.router.navigate(['/dashboard/tasks']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to update task.';
      },
      complete: () => this.loading = false,
    });
  }
}