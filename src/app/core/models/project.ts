
// export enum ProjectStatus {
//   NOT_STARTED = 'NOT_STARTED',
//   IN_PROGRESS = 'IN_PROGRESS',
//   COMPLETED = 'COMPLETED'
// }

export interface ProjectDto {

    id?: number;
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
    status?: String |null ;

}
