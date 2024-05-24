import Button from 'react-bootstrap/Button';
import DataHelper from '../../helpers/DataHelper';

import { UpdateUserDto } from '../../dto/user/update-user.dto';


type NotDisabledProfileButtonProps = {
	handleShowOffcanvas: () => void;
	setUserData: (value: UpdateUserDto) => void;
}

export default function NotDisabledProfileButton({ handleShowOffcanvas, setUserData }: NotDisabledProfileButtonProps) {

	return (
		<Button
			variant="outline-info"
			onClick={
				() => {
					handleShowOffcanvas();
					setUserData({
						name: DataHelper.getInformationFromLocalStorage().name,
						surName: DataHelper.getInformationFromLocalStorage().surName,
						login: DataHelper.getInformationFromLocalStorage().login
					})
				}
			}
		>
			профиль
		</Button>
	);

}
