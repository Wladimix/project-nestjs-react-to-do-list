import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Constants from '../../Constants';
import FileService from '../../services/FileService';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import { ITask, Status } from '../../interfaces';
import { socket } from '../../socket';
import { useState } from 'react';


type EditTaskModalProps = {
	editTaskModal: boolean;
	setEditTaskModal: (value: boolean) => void;
	task: ITask;
	imageSrc: string;
}

export default function EditTaskModal({ editTaskModal, setEditTaskModal, task, imageSrc }: EditTaskModalProps) {

	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [status, setStatus] = useState<Status>(task.status);
	const [image, setImage] = useState<File | undefined>(undefined);
	const [error, setError] = useState('');

	let imageUrl = imageSrc ? `${process.env.REACT_APP_SERVER_LINK}/static/` + imageSrc : '';

	type SelectValue = React.ChangeEvent<HTMLSelectElement> & { target: { value: Status } };

	function sendImage() {
		const result = FileService.sendTaskImageToServer(task.id, image);
		if (typeof result === 'string') setError(result)
			else setError('');
		setImage(undefined);
	}

	return (
		<Modal
			size="lg"
			show={editTaskModal}
			onHide={() => setEditTaskModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-sm">
					Редактирование задачи
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Название</Form.Label>
					<Form.Control value={title} onChange={e => setTitle(e.target.value)} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Описание</Form.Label>
					<Form.Control as="textarea" rows={5} value={description} onChange={e => setDescription(e.target.value)} />
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Статус</Form.Label>
					<Form.Select defaultValue={status} onChange={(e: SelectValue) => setStatus(e.target.value)}>
						<option value={Constants.TO_DO}>Не выполняется</option>
						<option value={Constants.AT_WORK}>В работе</option>
						<option value={Constants.COMPLETED}>Выполнена</option>
					</Form.Select>
				</Form.Group>
			</Modal.Body>

			<Modal.Footer>
				<Button
					variant='secondary'
					onClick={() => setEditTaskModal(false)}
				>
					назад
				</Button>
				<Button
					variant='primary'
					onClick={
						() => {
							setEditTaskModal(false);
							socket.emit(Constants.UPDATE_TASK, {
								taskId: task.id,
								title: title,
								description: description,
								status: status
							});
						}
					}
				>
					сохранить
				</Button>
			</Modal.Footer>

			<Modal.Body className='m-3'>
				<Card>
					<Card.Header>Добавить/Изменить изображение (*.JPEG/PNG)</Card.Header>

					<Card.Body>
						<Row className='mb-3'>
							<Col xs={8}>
								<Form.Control
									type="file"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setImage(e.target.files?.[0]);
									}}
								/>
							</Col>
							<Col className='text-end'>
								<Button
									variant='info'
									onClick={sendImage}
								>
									загрузить/удалить
								</Button>
							</Col>
						</Row>
						
						<Row>
							<Image src={imageUrl} />
						</Row>
						{error ? <p className='text-danger'>{error}</p> : ''}
					</Card.Body>
				</Card>
			</Modal.Body>
		</Modal>
	);

}
