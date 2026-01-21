import Script from 'next/script';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import './globals.css';
import GlobalLoader from './homepage/GlobalLoader';
import { Providers } from './providers';
import ReduxProvider from './store/ReduxProvider';

const GA_ID = 'G-D91NZNMNBB';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
					strategy='afterInteractive'
				/>
				<Script id='ga-init' strategy='afterInteractive'>
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              send_page_view: false
            });
          `}
				</Script>
			</head>

			<body className='app-gradient border-3 h-full min-h-screen flex flex-col'>
				{/* <GlobalLoader /> */}
				{/* <AnalyticsTracker /> */}
				<Providers>
					{' '}
					<ReduxProvider>{children}</ReduxProvider>
				</Providers>
			</body>
		</html>
	);
}
