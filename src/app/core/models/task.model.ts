export interface TaskDto {

    id?:number;
    employeeId:number|null;
    employeeName?:string|null;
    employeeEmail?:string|null;
    projectId:number|null;
    projectName?:string;
    title:string;
    description:string;
    deadline:string;
    status?:String


}
