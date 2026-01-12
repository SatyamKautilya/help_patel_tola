import AnalyticsTracker from '@/components/AnalyticsTracker';
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
			<head>
				<script
					async
					src='https://www.googletagmanager.com/gtag/js?id=G-D91NZNMNBB'></script>
				<script>
					{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config',  'G-D91NZNMNBB', {
                  page_path: window.location.pathname,
                });
              `}
				</script>
			</head>
			<body className='app-gradient border-3 h-full min-h-screen flex flex-col'>
				<ReduxProvider>
					<GlobalLoader />
					<AnalyticsTracker />
					<Providers>{children}</Providers>
				</ReduxProvider>
			</body>
		</html>
	);
}
