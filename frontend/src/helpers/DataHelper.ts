import { IAuthUser } from '../interfaces';


class DataHelper {
	getInformationFromLocalStorage(): IAuthUser {
		if (localStorage.AUTHORIZATION_DATA !== undefined) {
			return JSON.parse(localStorage.AUTHORIZATION_DATA);
		}
		return {
			isAuth: false,
			id: 0,
			name: '',
			surName: '',
			login: ''
		};
	}
}

export default new DataHelper();
