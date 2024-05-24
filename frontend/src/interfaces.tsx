export interface IAuthUser {
	isAuth: boolean;
	id: number;
	name: string;
	surName: string;
	login: string;
}

export interface ITask {
	id: number;
	createdAt: string;
	title: string;
	description: string;
	status: Status;
	imageName: string;
}

export type Status = 'TO_DO' | 'AT_WORK' | 'COMPLETED';
export type Filter = 'TO_DO' | 'AT_WORK' | 'COMPLETED' | 'ALL';
