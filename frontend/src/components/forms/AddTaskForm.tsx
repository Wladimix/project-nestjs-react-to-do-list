import Accordion from 'react-bootstrap/Accordion';
import AddTaskButtonSVG from '../svg/AddTaskButtonSVG';
import Constants from '../../Constants';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'

import { AddTaskDto } from '../../dto/task/add-task.dto';
import { socket } from "../../socket";
import { Status } from '../../interfaces';
import { useState } from 'react';


type AddTaskFormProps = {
	userId: number;
}

export default function AddTaskForm({ userId }: AddTaskFormProps) {

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState<Status>('TO_DO');

	const createTaskData: AddTaskDto = { userId: userId, title, description, status }

	type SelectValue = React.ChangeEvent<HTMLSelectElement> & { target: { value: Status } }

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Stack className='p-2' direction='horizontal' gap={3}>
					<button
						className='add-task-button'
						onClick={() => {
							socket.emit(Constants.CREATE_TASK, createTaskData);
							setTitle(''); setDescription('');
						}}
						disabled={title ? false : true}
					>
						<AddTaskButtonSVG />
					</button>
					<Form.Control
						className='add-task-title-input'
						placeholder="Новая задача"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</Stack>
				<Accordion.Header className='text-center'>
					<p className="h6 m-0 text-dark">Дополнительно</p>
				</Accordion.Header>
				<Accordion.Body>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Описание</Form.Label>
						<Form.Control
							as='textarea'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</Form.Group>
					<div className='d-flex justify-content-between mb-4'>
						<div>
							<Form.Label>Статус</Form.Label>
							<Form.Select size="lg" onChange={(e: SelectValue) => setStatus(e.target.value)}>
								<option value={Constants.TO_DO}>Не выполняется</option>
								<option value={Constants.AT_WORK}>В работе</option>
								<option value={Constants.COMPLETED}>Выполнена</option>
							</Form.Select>
						</div>
					</div>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);

}
