import Button from 'react-bootstrap/Button';
import Constants from '../../Constants';
import Modal from 'react-bootstrap/Modal';

import { ITask } from '../../interfaces';
import { socket } from '../../socket';


type DeleteTaskModalProps = {
	deleteTaskModal: boolean;
	setDeleteTaskModal: (value: boolean) => void;
	task: ITask
}

export default function DeleteTaskModal({ deleteTaskModal, setDeleteTaskModal, task }: DeleteTaskModalProps) {

	return (
		<Modal
			size="sm"
			show={deleteTaskModal}
			onHide={() => setDeleteTaskModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-sm">
					Удаление задачи
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<b>Вы удаляете задачу:</b><br />
				<span className='title-delete-task-modal'>{task.title}</span><br /><br />
				<b>Статус:</b><br />
				<span className=
					{
						task.status === Constants.TO_DO ? 'text-danger' :
							task.status === Constants.AT_WORK ? 'text-warning' :
								task.status === Constants.COMPLETED ? 'text-success' : ''
					}
				>
					{
						task.status === Constants.TO_DO ? 'к выполнению' :
							task.status === Constants.AT_WORK ? 'в работе' :
								task.status === Constants.COMPLETED ? 'завершена' : ''
					}
				</span>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					onClick={() => setDeleteTaskModal(false)}
				>
					отмена
				</Button>
				<Button
					variant='danger'
					onClick={
						() => {
							setDeleteTaskModal(false);
							socket.emit(Constants.REMOVE_TASK, task.id)
						}
					}
				>
					удалить
				</Button>
			</Modal.Footer>
		</Modal>
	);

}
