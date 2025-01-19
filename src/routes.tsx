import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/users';

const AppRoutes: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Users />} />
			<Route path="/users" element={<Users />} />
		</Routes>
	</BrowserRouter>
);

export default AppRoutes;