import { Expo } from 'expo-server-sdk';

const expo = new Expo();

export async function sendPushNotifications(tokens, payload) {
	const messages = [];

	for (const token of tokens) {
		if (!Expo.isExpoPushToken(token)) {
			console.warn('Invalid Expo token:', token);
			continue;
		}

		messages.push({
			to: token,
			sound: 'default',
			title: payload.title,
			body: payload.body,
			data: payload.data || {},
		});
	}

	const chunks = expo.chunkPushNotifications(messages);

	for (const chunk of chunks) {
		try {
			await expo.sendPushNotificationsAsync(chunk);
		} catch (error) {
			console.error('Push error', error);
		}
	}
}
