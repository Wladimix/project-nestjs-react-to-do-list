import Constants from '../Constants';
import DateHelper from '../helpers/DateHelper';
import DeleteTaskButtonSVG from './svg/DeleteTaskButtonSVG';
import DeleteTaskModal from './modals/DeleteTaskModal';
import EditTaskButtonSVG from './svg/EditTaskButtonSVG';
import EditTaskModal from './modals/EditTaskModal';
import ViewTaskBunnotSVG from './svg/ViewTaskButtonSVG';
import ViewTaskModal from './modals/ViewTaskModal';

import { ITask } from '../interfaces';
import { ReactNode, useEffect, useState } from 'react';
import { socket } from '../socket';


type TaskProps = {
	task: ITask;
}

export default function Task({ task }: TaskProps) {

	const [viewTaskModal, setViewTaskModal] = useState(false);
	const [editTaskModal, setEditTaskModal] = useState(false);
	const [deleteTaskModal, setDeleteTaskModal] = useState(false);
	const [imageSrc, setImageSrc] = useState(task.imageName);
	
	function subscribeToImageSrcFromServer() {
		socket.on(Constants.ADD_IMAGE_TO_TASK, (imageData) => {
			if (imageData.changeTaskId === task.id) {
				setImageSrc(imageData.imageName);
			}
		})
	}

	useEffect(() => {
		subscribeToImageSrcFromServer();
	}, [])

	return (<>
		<tr className={
				task.status === Constants.TO_DO ? 'table-danger fs-5' :
					task.status === Constants.AT_WORK ? 'table-warning fs-5' :
						task.status === Constants.COMPLETED ? 'table-success fs-5' : ''
			}
		>
			<td className='task-title'>{task.title}</td>
			<td className='text-center'>
				{
					task.status === Constants.TO_DO ? 'к выполнению' :
						task.status === Constants.AT_WORK ? 'в работе' :
							task.status === Constants.COMPLETED ? 'завершена' : ''
				}
			</td>
			<td className='text-center'>{DateHelper.convertDate<ReactNode>(task.createdAt)}</td>
			<td className='text-center'>
					<button className='action-task-buttons' onClick={() => setViewTaskModal(true)}>
						<ViewTaskBunnotSVG />
					</button>
					<button className='action-task-buttons' onClick={() => setEditTaskModal(true)}>
						<EditTaskButtonSVG />
					</button>
					<button className='action-task-buttons' onClick={() => setDeleteTaskModal(true)}>
						<DeleteTaskButtonSVG />
					</button>
			</td>
		</tr>
		<ViewTaskModal viewTaskModal={viewTaskModal} setViewTaskModal={setViewTaskModal} task={task} imageSrc={imageSrc} />
		<EditTaskModal editTaskModal={editTaskModal} setEditTaskModal={setEditTaskModal} task={task} imageSrc={imageSrc} />
		<DeleteTaskModal deleteTaskModal={deleteTaskModal} setDeleteTaskModal={setDeleteTaskModal} task={task} />
	</>);

}
