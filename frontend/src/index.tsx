import App from './App';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
