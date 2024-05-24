import { DatabaseService } from '@database/database.service';
import { GetTaskDto } from '@tasks/dto/get-task.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateTaskDto } from '@tasks/dto/update-task.dto';


@Injectable()
export class TaskService {

	constructor(private readonly databaseService: DatabaseService) {}

	public async create(createTaskDto: Prisma.TaskCreateInput) {
		return this.databaseService.task.create({ data: createTaskDto })
	}

	public async findAllByUserId(dataForReceivingTasks: GetTaskDto) {
		return this.databaseService.task.findMany(
			{
				orderBy: [
					{ createdAt: 'desc' },
					{ id: 'desc' }
				],
				where: {
					userId: dataForReceivingTasks.userId,
					status: (dataForReceivingTasks.filter === 'ALL' ? {} : dataForReceivingTasks.filter)
				}
			}
		);
	}

	public async update(dataForUpdatingTask: UpdateTaskDto) {
		const task = await this.findOneById(dataForUpdatingTask.taskId);
		if (!task) {
			throw new HttpException('Задачи с данным id не найдено', HttpStatus.BAD_REQUEST);
		}
		await this.databaseService.task.update({
			where: { id: dataForUpdatingTask.taskId },
			data: {
				title: dataForUpdatingTask.title,
				description: dataForUpdatingTask.description,
				status: dataForUpdatingTask.status,
			}
		})
	}

	private async findOneById(id: number) {
		return this.databaseService.task.findFirst({
			where: { id }
		});
	}

	public async addImage(id: number, imageName: string) {
		await this.databaseService.task.update({
			where: { id },
			data : {imageName}
		});
	}

	public remove(id: number) {
		return this.databaseService.task.delete({ where: { id: id } });
	}

}
