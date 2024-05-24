import { Status } from '@prisma/client';


export class GetTaskDto {
	userId: number;
	filter: Status | 'ALL';
}
