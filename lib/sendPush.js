import { Expo } from 'expo-server-sdk';

const expo = new Expo();

export async function sendPushNotifications(tokens, payload) {
	const messages = [];

	for (const token of tokens) {
		if (!Expo.isExpoPushToken(token)) continue;

		messages.push({
			to: token,
			sound: 'default',
			title: payload.title,
			body: payload.body,

			// 🔴 REQUIRED FOR ANDROID
			priority: 'high',
			channelId: 'tamohar-morning',

			// optional but good
			data: payload.data || {},
		});
	}

	const chunks = expo.chunkPushNotifications(messages);

	for (const chunk of chunks) {
		await expo.sendPushNotificationsAsync(chunk);
	}
}
