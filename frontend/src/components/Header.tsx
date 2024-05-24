import Button from 'react-bootstrap/Button';
import DisabledProfileButton from './buttons/DisabledProfileButton';
import EditUserOffcanvas from './forms/EditUserOffcanvas';
import NotDisabledProfileButton from './buttons/NotDisabledProfileButton';
import Stack from 'react-bootstrap/Stack';

import { IAuthUser } from '../interfaces';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


type HeaderProps = {
	authorizationData: IAuthUser
	setAuthorizationData: (value: IAuthUser) => void;
}

export default function Header({ authorizationData, setAuthorizationData }: HeaderProps) {

	const navigate = useNavigate();

	const [userData, setUserData] = useState<UpdateUserDto>({
		name: authorizationData.name,
		surName: authorizationData.surName,
		login: authorizationData.login
	});
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	const handleCloseOffcanvas = () => setShowOffcanvas(false);
	const handleShowOffcanvas = () => setShowOffcanvas(true);

	function logout() {
		localStorage.removeItem('AUTHORIZATION_DATA');
		localStorage.removeItem('TASK_FILTER');
	}

	return (<>
		<Stack direction='horizontal' className='m-4'>
			<div className="m-3 ms-auto">
				{
					authorizationData.isAuth ?
						<NotDisabledProfileButton handleShowOffcanvas={handleShowOffcanvas} setUserData={setUserData} /> :
						<DisabledProfileButton />
				}
			</div>
			<div className="vr" />
			<div className="m-3">
				<Button
					className='logout-button'
					variant="outline-success"
					onClick={() => {logout(); navigate(0);}}
				>
					выход
				</Button>
			</div>
		</Stack>
		<EditUserOffcanvas
			showOffcanvas={showOffcanvas}
			handleCloseOffcanvas={handleCloseOffcanvas}
			userId={authorizationData.id}
			setAuthorizationData={setAuthorizationData}
			userData={userData}
			setUserData={setUserData}
		/>
	</>);

}
