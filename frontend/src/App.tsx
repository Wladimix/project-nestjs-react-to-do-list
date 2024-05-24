import Authorization from './components/pages/Authorization';
import Container from 'react-bootstrap/Container';
import DataHelper from './helpers/DataHelper';
import Header from './components/Header';
import Registration from './components/pages/Registration';
import ToDolist from './components/pages/ToDoList';

import { IAuthUser } from './interfaces';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';


export default function App() {

	const [authorizationData, setAuthorizationData] = useState<IAuthUser>(DataHelper.getInformationFromLocalStorage());

	return (
		<Container>
			<Header
				authorizationData={authorizationData}
				setAuthorizationData={setAuthorizationData}
			/>
			<Routes>
				<Route path='/' element={
					<ToDolist
						authorizationData={authorizationData}
					/>
				} />
				<Route path='/registration' element={
					<Registration
						isAuth={authorizationData.isAuth}
						setAuthorizationData={setAuthorizationData}
					/>
				} />
				<Route path='/login' element={
					<Authorization
						isAuth={authorizationData.isAuth}
						setAuthorizationData={setAuthorizationData}
					/>
				} />
			</Routes>
		</Container>
	);

}
