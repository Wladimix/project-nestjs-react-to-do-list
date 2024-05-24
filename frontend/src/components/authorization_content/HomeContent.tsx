import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';


export default function HomeContent() {

	return (
		<Card className='mt-5'>
			<Card.Body>
				<Card.Title>Авторизуйтесь</Card.Title>
				<Card.Text>
					Прежде, чем перейти к управлению задачами, авторизуйтесь или зарегистрируйтесь.
				</Card.Text>
				<Link to='/login'>
					Авторизоваться
				</Link>
				<Link className='ms-4' to='/registration'>
					Зарегистрироваться
				</Link>
			</Card.Body>
		</Card>
	);

}
