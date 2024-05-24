import { FilesService } from 'src/files/files.service';
import { Module } from '@nestjs/common';
import { TaskGateway } from '@tasks/task.gateway';
import { TaskService } from '@tasks/task.service';


@Module({
	exports: [TaskService],
	providers: [TaskGateway, TaskService, FilesService],
})
export class TaskModule {}
