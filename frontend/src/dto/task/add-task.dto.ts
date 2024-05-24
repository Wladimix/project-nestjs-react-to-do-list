import { Status } from '../../interfaces';


export type AddTaskDto = {
	userId: number;
	title: string;
	description: string;
	status: Status;
}
