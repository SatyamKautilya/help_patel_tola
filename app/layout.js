import './globals.css';
import GlobalLoader from './homepage/GlobalLoader';

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
			<body className='app-gradient border-3 h-full min-h-screen flex flex-col'>
				<ReduxProvider>
					<GlobalLoader />
					<Providers>{children}</Providers>
				</ReduxProvider>
			</body>
		</html>
	);
}
