import axios from 'axios';

import { IAuthUser } from '../interfaces';
import { LoginUserDto } from '../dto/user/login-user.dto';
import { RegistrationUserDto } from '../dto/user/registration-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';


class UserService {

	async registration(
		registrationDataUser: RegistrationUserDto,
		setAuthorizationData: (value: IAuthUser) => void,
		setErrorMessage: (value: string) => void
	) {
		try {
			const responce = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/users/registration`, registrationDataUser);
			localStorage.setItem(
				'AUTHORIZATION_DATA', JSON.stringify({
					isAuth: true,
					id: responce.data.id,
					name: responce.data.name,
					surName: responce.data.surName,
					login: responce.data.login
				})
			);
			setAuthorizationData({
				isAuth: true,
				id: responce.data.id,
				name: responce.data.name,
				surName: responce.data.surName,
				login: responce.data.login
			});
		} catch (e: any) {
			setAuthorizationData({
				isAuth: false,
				id: 0,
				name: '',
				surName: '',
				login: ''
			});
			localStorage.removeItem('AUTHORIZATION_DATA');
			setErrorMessage(e.response?.data.message);
		};
	}

	async login(
		loginDataUser: LoginUserDto,
		setAuthorizationData: (value: IAuthUser) => void,
		setErrorMessage: (value: string) => void
	) {
		try {
			const responce = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/users/login`, loginDataUser);
			localStorage.setItem(
				'AUTHORIZATION_DATA', JSON.stringify({
					isAuth: true,
					id: responce.data.id,
					name: responce.data.name,
					surName: responce.data.surName,
					login: responce.data.login
				})
			);
			setAuthorizationData({
				isAuth: true,
				id: responce.data.id,
				name: responce.data.name,
				surName: responce.data.surName,
				login: responce.data.login
			});
		} catch (e: any) {
			setAuthorizationData({
				isAuth: false,
				id: 0,
				name: '',
				surName: '',
				login: ''
			});
			localStorage.removeItem('AUTHORIZATION_DATA');
			setErrorMessage(e.response?.data.message);
		};
	}

	async update(
		userId: number,
		userData: UpdateUserDto,
		setAuthorizationData: (value: IAuthUser) => void,
		setErrorMessage: (value: string) => void
	) {
		try {
			const responce = await axios.patch(`${process.env.REACT_APP_SERVER_LINK}/users/${userId}`, userData);
			const user: IAuthUser = responce.data;
			console.log(responce);
			localStorage.setItem(
				'AUTHORIZATION_DATA', JSON.stringify({
					isAuth: true,
					id: user.id,
					name: user.name,
					surName: user.surName,
					login: user.login
				})
			);
			setAuthorizationData({
				isAuth: true,
				id: user.id,
				name: user.name,
				surName: user.surName,
				login: user.login
			});
		} catch (e: any) {
			setErrorMessage(e.response?.data.message);
		};
	}

}

export default new UserService();
