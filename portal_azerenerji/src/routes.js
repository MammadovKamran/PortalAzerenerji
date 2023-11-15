import Login from './pages/Auth/Login';
import Home from './pages/Home';
import AdminLayout from './pages/admin/AdminLayout';
import AdminCreateWebsite from './pages/admin/AdminCreateWebsite';
// import AdminDeleteWebsite from './pages/admin/AdminDeleteWebsite';
// import AdminUpdateWebsite from './pages/admin/AdminUpdateWebsite';
// import LoginLayout from './pages/Auth/LoginLayout';
import AdminWebsiteList from './pages/admin/AdminWebsiteList';

const routes = [
	{
		path: '/',
		element: <Home />,
		index: true,
	},
	{
		path: 'admin',
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <Login />,
			},
			{
				path: 'websites',
				element: <AdminWebsiteList />,
			},
			{
				path: 'create_new_website',
				element: <AdminCreateWebsite />,
			},
			// {
			// 	path: 'update_website',
			// 	element: <AdminUpdateWebsite />,
			// },
			// {
			// 	path: 'delete_website',
			// 	element: <AdminDeleteWebsite />,
			// },
		],
	},
];

export default routes;
