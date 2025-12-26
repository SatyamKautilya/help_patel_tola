import './globals.css';

export const metadata = {
	title: 'Life Categories App',
	description: 'Mobile app for exploring life categories',
	viewport:
		'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};
import { Providers } from './providers';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='app-gradient h-full min-h-screen	'>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
