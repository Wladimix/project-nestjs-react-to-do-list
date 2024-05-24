import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';


export default function LoginContent() {

	return (
		<Card className='mt-5'>
			<Card.Body>
				<Card.Title>Вход успешен</Card.Title>
				<Card.Text>
					Вы зарегистрированы и успешно авторизовались. Можете перейти к списку задач.
				</Card.Text>
				<Link to='/'>
					Мои задачи
				</Link>
			</Card.Body>
		</Card>
	);

}
