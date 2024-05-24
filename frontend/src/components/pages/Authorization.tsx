import AuthorizationSVG from '../../components/svg/AuthorizationSVG';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import LoginContent from '../../components/authorization_content/LoginContent';
import UserService from '../../services/UserService';

import { IAuthUser } from '../../interfaces';
import { Link } from 'react-router-dom';
import { useState } from 'react';


type AuthorizationProps = {
	isAuth: boolean;
	setAuthorizationData: (value: IAuthUser) => void;
}

export default function Authorization({ isAuth, setAuthorizationData }: AuthorizationProps) {

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	function changeLogin(event: React.ChangeEvent<HTMLInputElement>) {
		setLogin(event.target.value);
	}

	function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value);
	}

	let authContent = null;
	if (isAuth) {
		authContent = <LoginContent />;
	}

	return authContent || (
		<Card className='w-50 mt-2 m-auto mb-5'>
			<Card.Header className='text-center'>
				<AuthorizationSVG />
			</Card.Header>
			<Card.Body className='p-5'>
				<Card.Title className='authorization-card-title fs-1'>Авторизация</Card.Title>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label className='fs-3'>Логин</Form.Label>
					<Form.Control
						className='fs-3'
						type="text"
						placeholder="Введите логин"
						value={login}
						onChange={changeLogin}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
					<Form.Label className='fs-3'>Пароль</Form.Label>
					<Form.Control
						className='fs-3'
						type="text"
						placeholder="Введите пароль"
						value={password}
						onChange={changePassword}
					/>
				</Form.Group>
				<Link to='/registration'>
					Регистрация
				</Link>
			</Card.Body>
			<Card.Footer>
				<Button
					className='authorization-card-button'
					size='lg'
					onClick={
						() => {
							UserService.login(
								{ login, password },
								setAuthorizationData,
								setErrorMessage
							);
						}
					}
				>
					ВОЙТИ
				</Button>
				<span className='authorization-card-error-message ms-5'>
					<span className='ms-1'>{errorMessage}</span>
				</span>
			</Card.Footer>
		</Card>
	);

}
