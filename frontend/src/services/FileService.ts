import Constants from '../Constants';

import { socket } from '../socket';

export class FileService {
	sendTaskImageToServer(taskId: number, image: File | undefined): boolean | string {
		try {
			if (image) {
				/* if (
					image.type !== 'image/jpeg' &&
					image.type !== 'image/png'
				) {
					return 'ошибка загрузки файла';
				} */

				const reader = new FileReader();
				reader.onload = (event) => {
					if (!event.target) return 'ошибка загрузки файла';
					const fileContent = event.target.result as ArrayBuffer;	
					const byteArray = new Uint8Array(fileContent);
					socket.emit(Constants.ADD_IMAGE_TO_TASK, { taskId, file: byteArray });
				};
				reader.readAsArrayBuffer(image);

				return true;
			}
			socket.emit(Constants.ADD_IMAGE_TO_TASK, { taskId, file: null })
			return true;
		} catch (e) {
			console.log(e);
			return 'ошибка загрузки файла'
		}
		
	}
}

export default new FileService();
