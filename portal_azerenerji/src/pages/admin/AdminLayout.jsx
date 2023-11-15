import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';

const AdminLayout = () => {
	const location = useLocation();
	return (
		<div>
			{location.pathname.includes('admin/websites') || location.pathname.includes('admin/create_new_website') ? <NavBar /> : null}
			<Outlet />
		</div>
	);
};

export default AdminLayout;
