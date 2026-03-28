import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      //
      { path: '', pathMatch: 'full', redirectTo: 'employees' },//because when will call dashborad will be empty but used '' because be default is empty must be redirct for thing 
      { path: 'employees', loadComponent: () => import('./features/employees/employee-list/employee-list.component').then(m => m.EmployeeListComponent) },
      { path: 'employees/create', loadComponent: () => import('./features/employees/create-employee/create-employee.component').then(m => m.CreateEmployeeComponent) },
      { path: 'employees/:id', loadComponent: () => import('./features/employees/employee-detail/employee-detail.component').then(m => m.EmployeeDetailComponent) },
      { path: 'employees/:id/edit', loadComponent: () => import('./features/employees/edit-employee/edit-employee.component').then(m => m.EditEmployeeComponent) },

      { path: 'departments', loadComponent: () => import('./features/departments/department-list/department-list.component').then(m => m.DepartmentListComponent) },
      { path: 'departments/create', loadComponent: () => import('./features/departments/create-department/create-department.component').then(m => m.CreateDepartmentComponent) },
      { path: 'departments/:id', loadComponent: () => import('./features/departments/department-detail/department-detaill/department-detail.component').then(m => m.DepartmentDetailComponent) },
      { path: 'departments/:id/edit', loadComponent: () => import('./features/departments/edit-department/edit-department.component').then(m => m.EditDepartmentComponent) },

      { path: 'projects', loadComponent: () => import('./features/projects/list-project/list-project.component').then(m => m.ListProjectComponent) },
      { path: 'projects/create', loadComponent: () => import('./features/projects/create-project/create-project.component').then(m => m.CreateProjectComponent) },
      { path: 'projects/:id', loadComponent: () => import('./features/projects/project-detail/project-detail.component').then(m => m.ProjectDetailComponent) },
      { path: 'projects/:id/edit', loadComponent: () => import('./features/projects/edit-project/edit-project.component').then(m => m.EditProjectComponent) },

      { path: 'tasks', loadComponent: () => import('./features/tasks/list-task/list-task.component').then(m => m.ListTaskComponent) },
      { path: 'tasks/create', loadComponent: () => import('./features/tasks/create-task/create-task.component').then(m => m.CreateTaskComponent) },
      { path: 'tasks/:id', loadComponent: () => import('./features/tasks/detail-task/detail-task.component').then(m => m.DetailTaskComponent) },
      { path: 'tasks/:id/edit', loadComponent: () => import('./features/tasks/edit-task/edit-task.component').then(m => m.EditTaskComponent) },

    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
