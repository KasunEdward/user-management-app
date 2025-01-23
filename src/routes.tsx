import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/users';
import Dashboard from './pages/dashboard';

const AppRoutes: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/users" element={<Users />} />
		</Routes>
	</BrowserRouter>
);

export default AppRoutes;