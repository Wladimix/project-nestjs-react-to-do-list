import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Constants from '../../Constants';
import Modal from 'react-bootstrap/Modal';

import { ITask } from '../../interfaces';


type ViewTaskModalProps = {
	viewTaskModal: boolean;
	setViewTaskModal: (value: boolean) => void;
	task: ITask;
	imageSrc: string;
}

export default function ViewTaskModal({ viewTaskModal, setViewTaskModal, task, imageSrc }: ViewTaskModalProps) {

	let imageUrl = imageSrc ? `${process.env.REACT_APP_SERVER_LINK}/static/` + imageSrc : '';

	return (
		<Modal
			size="lg"
			show={viewTaskModal}
			onHide={() => setViewTaskModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-sm">
					Просмотр задачи
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Card>
					<Card.Img src={imageUrl} />
					<Card.Body>
						<Card.Title>{task.title}</Card.Title>
						<Card.Subtitle className={
								task.status === Constants.TO_DO ? 'mb-2 text-danger' :
									task.status === Constants.AT_WORK ? 'mb-2 text-warning' :
										task.status === Constants.COMPLETED ? 'mb-2 text-success' : ''
							}
						>
							{
								task.status === Constants.TO_DO ? 'к выполнению' :
									task.status === Constants.AT_WORK ? 'в работе' :
										task.status === Constants.COMPLETED ? 'завершена' : ''
							}
						</Card.Subtitle>
						<Card.Text>
							{task.description ? task.description : 'Описание отсутствует'}
						</Card.Text>
					</Card.Body>
				</Card>
			</Modal.Body>

			<Modal.Footer>
				<Button
					variant='secondary'
					onClick={() => setViewTaskModal(false)}
				>
					назад
				</Button>
			</Modal.Footer>
		</Modal>
	);

}
