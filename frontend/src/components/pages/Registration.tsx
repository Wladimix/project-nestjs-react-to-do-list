import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import LoginContent from '../../components/authorization_content/LoginContent';
import RegistrationSVG from '../../components/svg/RegistrationSVG';
import UserService from '../../services/UserService';

import { IAuthUser } from '../../interfaces';
import { Link } from 'react-router-dom';
import { useState } from 'react';


type RegistrationProps = {
	isAuth: boolean;
	setAuthorizationData: (value: IAuthUser) => void;
}

export default function Registration({ isAuth, setAuthorizationData }: RegistrationProps) {

	const [name, setName] = useState('');
	const [surName, setSurName] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	function changeName(event: React.ChangeEvent<HTMLInputElement>) {
		setName(event.target.value);
	}

	function changeSurName(event: React.ChangeEvent<HTMLInputElement>) {
		setSurName(event.target.value);
	}

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
		<Card className='w-75 mt-2 m-auto mb-5'>
			<Card.Header className='text-center'>
				<RegistrationSVG />
			</Card.Header>
			<Card.Body className='p-5'>
				<Card.Title className='authorization-card-title fs-1'>Регистрация</Card.Title>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label className='fs-3'>Имя</Form.Label>
					<Form.Control
						className='fs-3'
						type="text"
						placeholder="Введите имя"
						value={name}
						onChange={changeName}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
					<Form.Label className='fs-3'>Фамилия</Form.Label>
					<Form.Control
						className='fs-3'
						type="text"
						placeholder="Введите фамилию"
						value={surName}
						onChange={changeSurName}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
					<Form.Label className='fs-3'>Логин</Form.Label>
					<Form.Control
						className='fs-3'
						type="text"
						placeholder="Введите логин"
						value={login}
						onChange={changeLogin}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
					<Form.Label className='fs-3'>Пароль</Form.Label>
					<Form.Control
						className='fs-3'
						type="text"
						placeholder="Введите пароль"
						value={password}
						onChange={changePassword}
					/>
				</Form.Group>
				<Link to='/login'>
					Авторизация
				</Link>
			</Card.Body>
			<Card.Footer>
				<Button
					className='authorization-card-button'
					size='lg'
					onClick={
						() => {
							UserService.registration(
								{ name, surName, login, password },
								setAuthorizationData,
								setErrorMessage
							);
						}
					}
				>
					ЗАРЕГИСТРИРОВАТЬСЯ
				</Button>
				<span className='authorization-card-error-message ms-5'>
					<span className='ms-1'>{errorMessage}</span>
				</span>
			</Card.Footer>
		</Card>
	);

}
