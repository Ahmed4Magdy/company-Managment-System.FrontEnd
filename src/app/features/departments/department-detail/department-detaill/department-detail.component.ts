import { Component } from '@angular/core';
import { DepartmentDto } from '../../../../core/models/department.model';
import { DepartmentService } from '../../../../core/services/department.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './department-detail.component.html',
  styleUrl: './department-detail.component.css'
})
export class DepartmentDetailComponent {
  id!: number;
  department: DepartmentDto | null = null;
  loading = true;

  constructor(
    private departmentservice: DepartmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // أخذ الـ ID من رابط الصفحة
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.departmentservice.getDepartmentWithId(this.id).subscribe({
      next: (dep) => (this.department = dep),
      error: () => (this.department = null),
      complete: () => (this.loading = false),
    });
  }

 
}

