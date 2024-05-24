import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Constants from '../../Constants';
import Stack from 'react-bootstrap/Stack';

import { Filter } from '../../interfaces';
import { socket } from '../../socket';


type TaskFilterButtonsProps = {
	filter: Filter
	setFilter: (value: Filter) => void,
	userId: number
}

export default function TaskFilterButtons({ filter, setFilter, userId }: TaskFilterButtonsProps) {

	return (
		<Stack className='mb-5' direction='horizontal'>
			<Button variant="primary" size="sm" className='me-4' onClick={
				() => {
					localStorage.setItem('TASK_FILTER', Constants.ALL);
					setFilter(Constants.ALL);
					socket.emit(Constants.FIND_ALL_TASKS, { userId, filter: localStorage.TASK_FILTER });
				}
			}
			>
				показать все задачи
			</Button>
			<ButtonGroup aria-label="Basic example" size="sm">
				<Button variant='success' onClick={
					() => {
						localStorage.setItem('TASK_FILTER', Constants.COMPLETED);
						setFilter(Constants.COMPLETED);
						socket.emit(Constants.FIND_ALL_TASKS, { userId, filter: localStorage.TASK_FILTER });
					}
				}
				>
					завершённые
				</Button>
				<Button variant='warning' onClick={
					() => {
						localStorage.setItem('TASK_FILTER', Constants.AT_WORK);
						setFilter(Constants.AT_WORK);
						socket.emit(Constants.FIND_ALL_TASKS, { userId, filter: localStorage.TASK_FILTER });
					}
				}
				>
					в работе
				</Button>
				<Button variant='danger' onClick={
					() => {
						localStorage.setItem('TASK_FILTER', Constants.TO_DO);
						setFilter(Constants.TO_DO);
						socket.emit(Constants.FIND_ALL_TASKS, { userId, filter: localStorage.TASK_FILTER });
					}
				}
				>
					к выполнению
				</Button>
			</ButtonGroup>
			<div className="h4 m-0 text-dark ms-auto text-decoration-underline">
				{
					filter === Constants.TO_DO ? 'ожидают выполнения' :
						filter === Constants.AT_WORK ? 'в работе' :
							filter === Constants.COMPLETED ? 'завершённые' :
								filter === Constants.ALL ? 'все задачи' : ''
				}
			</div>
		</Stack>
	);

}
