import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'alertifyjs/build/css/alertify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</BrowserRouter>,
);
