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
			<body className='app-gradient h-full min-h-screen flex flex-col'>
				<Providers>{children}</Providers>
				<div className='mt-auto border-t-1 border-gray-300 text-center px-8 py-3 text-gray-400'>
					© Created and Managed by Satyam Kautilya
				</div>
			</body>
		</html>
	);
}
