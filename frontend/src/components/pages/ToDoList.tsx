import AddTaskForm from '../../components/forms/AddTaskForm';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Constants from '../../Constants';
import HomeContent from '../../components/authorization_content/HomeContent';
import HomeTitleSVG from '../../components/svg/HomeTitleSVG';
import Table from 'react-bootstrap/Table';
import Task from '../../components/Task';
import TaskFilterButtons from '../../components/buttons/TaskFilterButtons';

import { Filter, IAuthUser, ITask } from '../../interfaces';
import { socket } from "../../socket";
import { useEffect, useState } from 'react';


type ToDolistProps = {
	authorizationData: IAuthUser;
}

export default function ToDolist({ authorizationData }: ToDolistProps) {

	const [tasks, setTasks] = useState<ITask[]>([]);
	const [filter, setFilter] = useState<Filter>(localStorage.TASK_FILTER === undefined ? 'ALL' : localStorage.TASK_FILTER);

	const getTasksFromServer = (tasks: ITask[]) => {
		setTasks(tasks);
	}

	function subscribeToMessagesFromServer() {
		socket.on(Constants.FIND_ALL_TASKS, getTasksFromServer);
		socket.on(Constants.CREATE_TASK, () => {	
			socket.emit(Constants.FIND_ALL_TASKS, { userId: authorizationData.id, filter: localStorage.TASK_FILTER })
		});
		socket.on(Constants.UPDATE_TASK, () => {
			socket.emit(Constants.FIND_ALL_TASKS, { userId: authorizationData.id, filter: localStorage.TASK_FILTER })
		});
		socket.on(Constants.ADD_IMAGE_TO_TASK, () => {
			socket.emit(Constants.FIND_ALL_TASKS, { userId: authorizationData.id, filter: localStorage.TASK_FILTER })
		});
		socket.on(Constants.REMOVE_TASK, () => {
			socket.emit(Constants.FIND_ALL_TASKS, { userId: authorizationData.id, filter: localStorage.TASK_FILTER })
		});
	}

	useEffect(() => {
		subscribeToMessagesFromServer();
		socket.emit(Constants.FIND_ALL_TASKS, { userId: authorizationData.id, filter: localStorage.TASK_FILTER });
	}, []);

	let noAuthContent = null;
	if (!authorizationData.isAuth) {
		noAuthContent = <HomeContent />;
	}

	let noTaskList: any = <p className='no-task-message-to-do-list'>Список задач пуст</p>;
	if (tasks.length !== 0) noTaskList = null;

	return noAuthContent || (
		<Card className='home-card'>
			<Container className='p-4'>

				<p className="h1 text-center mb-3 text-primary">
					<HomeTitleSVG />
					<span>Мои задачи</span>
				</p>

				<AddTaskForm userId={authorizationData.id} />
				<hr className="my-4"></hr>

				<TaskFilterButtons
					filter={filter}
					setFilter={setFilter}
					userId={authorizationData.id}
				/>

				{
					noTaskList ||
					<Table striped bordered>

						<thead>
							<tr>
								<th>Задача</th>
								<th className='text-center'>Статус</th>
								<th className='text-center'>Дата создания</th>
								<th className='text-center'>Управление</th>
							</tr>
						</thead>

						<tbody>
							{tasks.map((elem: ITask) => {
								return <Task key={elem.id} task={elem} />
							})}
						</tbody>

					</Table>
				}
			</Container>
		</Card>
	);

}
