import { AddImageToTaskDto } from '@tasks/dto/add-image-task.dto';
import { CreateTaskDto } from '@tasks/dto/create-task.dto';
import { FilesService } from 'src/files/files.service';
import { GetTaskDto } from '@tasks/dto/get-task.dto';
import { TaskService } from '@tasks/task.service';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { UpdateTaskDto } from '@tasks/dto/update-task.dto';


@WebSocketGateway(8001, { cors: '*' })
export class TaskGateway {

	constructor(
		private readonly taskService: TaskService,
		private readonly filesService: FilesService
	) {}

	@WebSocketServer() server;

	@SubscribeMessage('createTask')
	async create(@MessageBody() createTaskDto: CreateTaskDto) {
		await this.taskService.create({
			title: createTaskDto.title,
			description: createTaskDto.description,
			status: createTaskDto.status,
			user: {
				connect: { id: createTaskDto.userId }
			}
		});
		this.server.emit('createTask');
	}

	@SubscribeMessage('findAllTasks')
	async findAll(@MessageBody() dataForReceivingTasks: GetTaskDto) {
		if (dataForReceivingTasks.userId) {
			this.server.emit('findAllTasks', await this.taskService.findAllByUserId(dataForReceivingTasks))
		}
	}

	@SubscribeMessage('updateTask')
	async update(@MessageBody() dataForUpdatingTask: UpdateTaskDto) {
		await this.taskService.update(dataForUpdatingTask);
		this.server.emit('updateTask');
	}

	@SubscribeMessage('removeTask')
	async remove(@MessageBody() id: number) {
		await this.taskService.remove(id);
		this.server.emit('removeTask');
	}

	@SubscribeMessage('addImageToTask')
	async addImage(@MessageBody() fileData: AddImageToTaskDto) {	
		if (!fileData.file) {
			this.taskService.addImage(fileData.taskId, null);
			this.server.emit('addImageToTask', { changeTaskId: fileData.taskId, imageName: null });
			return;
		}
		const result = await this.filesService.addImageToTask(fileData);
		if (result) {
			this.server.emit('addImageToTask', { changeTaskId: fileData.taskId, imageName: `${result.fileName}.${result.extention}` });
		}
	}

}
