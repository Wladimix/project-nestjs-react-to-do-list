import Jimp from 'jimp';
import * as path from 'path';
import * as fs from 'fs'

import { AddImageToTaskDto } from '@tasks/dto/add-image-task.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskService } from '@tasks/task.service';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class FilesService {

	constructor (private readonly taskService: TaskService) {}

	public async addImageToTask(fileData: AddImageToTaskDto) {
		try {
			const fileName = uuidv4();
			const filePath = path.join(__dirname, '..', 'static');
			const image = await Jimp.read(fileData.file);
			const extention = image.getExtension();

			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.join(filePath, `${fileName}.${extention}`), fileData.file);

			await this.taskService.addImage(fileData.taskId, `${fileName}.${extention}`);
			return {fileName, extention};
		} catch (e) {
			console.log(e);
			throw new HttpException('Ошибка загрузки файла', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
