import './globals.css';

export const metadata = {
	title: 'Life Categories App',
	description: 'Mobile app for exploring life categories',
	viewport:
		'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};
import { Providers } from './providers';
import ReduxProvider from './store/ReduxProvider';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='app-gradient pt-10 h-full min-h-screen flex flex-col'>
				<ReduxProvider>
					<Providers>{children}</Providers>
				</ReduxProvider>
			</body>
		</html>
	);
}
