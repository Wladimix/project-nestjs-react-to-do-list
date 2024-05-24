import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UserService from '../../services/UserService';

import { IAuthUser } from '../../interfaces';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { useState } from 'react';


type EditUserOffcanvasProps = {
	showOffcanvas: boolean;
	handleCloseOffcanvas: () => void;
	userId: number;
	setAuthorizationData: (value: IAuthUser) => void;
	userData: UpdateUserDto;
	setUserData: (value: UpdateUserDto) => void;
}

export default function EditUserOffcanvas({ showOffcanvas, handleCloseOffcanvas, userId, setAuthorizationData, userData, setUserData }: EditUserOffcanvasProps) {

	const [errorMessage, setErrorMessage] = useState('');

	function changeName(event: React.ChangeEvent<HTMLInputElement>) {
		setUserData({ ...userData, name: event.target.value });
	}

	function changeSurName(event: React.ChangeEvent<HTMLInputElement>) {
		setUserData({ ...userData, surName: event.target.value });
	}

	function changeLogin(event: React.ChangeEvent<HTMLInputElement>) {
		setUserData({ ...userData, login: event.target.value });
	}

	return (
		<Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Настройка профиля</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Form.Label>Имя</Form.Label>
				<Form.Control
					className='mb-4'
					value={userData.name}
					onChange={changeName}
				/>
				<Form.Label>Фамилия</Form.Label>
				<Form.Control
					className='mb-4'
					value={userData.surName}
					onChange={changeSurName}
				/>
				<Form.Label>Логин</Form.Label>
				<Form.Control
					className='mb-4'
					value={userData.login}
					onChange={changeLogin}
				/>
				<Button onClick={
					() => {
						UserService.update(
							userId,
							userData,
							setAuthorizationData,
							setErrorMessage
						);
						handleCloseOffcanvas()
					}
				}
				>
					Сохранить
				</Button>
			</Offcanvas.Body>
		</Offcanvas>
	);

}
