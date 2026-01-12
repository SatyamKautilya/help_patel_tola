export const GA_TRACKING_ID = 'G-D91NZNMNBB';

export const pageview = (url) => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	});
};
