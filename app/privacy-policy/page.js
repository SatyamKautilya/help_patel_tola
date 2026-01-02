export const metadata = {
	title: 'Privacy Policy | Tamohar',
	description: 'Privacy Policy for the Tamohar application',
};

const page = () => {
	return (
		<main style={styles.container}>
			<h1 style={styles.heading}>Privacy Policy for Tamohar</h1>

			<p style={styles.paragraph}>This application respects your privacy.</p>

			<h2 style={styles.subheading}>Information Collected</h2>
			<p style={styles.paragraph}>
				The app may ask for your name and village name. This information is
				stored locally on your device only.
			</p>

			<h2 style={styles.subheading}>Data Usage</h2>
			<p style={styles.paragraph}>
				The app does not collect, transmit, or share any personal data with
				servers or third parties.
			</p>

			<h2 style={styles.subheading}>Storage</h2>
			<p style={styles.paragraph}>
				All user information is stored locally on the device using secure
				storage.
			</p>

			<h2 style={styles.subheading}>Permissions</h2>
			<p style={styles.paragraph}>
				The app does not request unnecessary permissions.
			</p>

			<h2 style={styles.subheading}>Contact</h2>
			<p style={styles.paragraph}>
				If you have any questions, contact us at:{' '}
				<a href='mailto:your-sqautilya@tamohar.in' style={styles.link}>
					your-sqautilya@tamohar.in
				</a>
			</p>

			<p style={styles.updated}>Last updated: 02-01-2026</p>
		</main>
	);
};

const styles = {
	container: {
		maxWidth: '800px',
		margin: '0 auto',
		padding: '24px 16px',
		lineHeight: 1.6,
	},
	heading: {
		fontSize: '28px',
		fontWeight: '700',
		marginBottom: '16px',
	},
	subheading: {
		fontSize: '20px',
		fontWeight: '600',
		marginTop: '24px',
		marginBottom: '8px',
	},
	paragraph: {
		fontSize: '16px',
		marginBottom: '12px',
	},
	link: {
		color: '#2563eb',
		textDecoration: 'underline',
	},
	updated: {
		marginTop: '32px',
		fontSize: '14px',
		color: '#666',
	},
};

export default page;
