export interface EmployeeDto {
  id?:number,
  departmentId: number | null;
  departmentName?:string;
  fullName: string;
  email: string;
  password: string;
  position: string;
  active: boolean;
  hireDate?: string;
  employee_role:String | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
}
