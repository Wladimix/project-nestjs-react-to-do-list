export class CreateTaskDto {
	userId: number;
	title: string;
	description: string;
	status: 'TO_DO' | 'AT_WORK' | 'COMPLETED';
}
