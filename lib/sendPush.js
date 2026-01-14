import { Expo } from 'expo-server-sdk';

const expo = new Expo();

export async function sendPushNotifications(tokens, payload) {
	const messages = [];

	for (const token of tokens) {
		if (!Expo.isExpoPushToken(token)) continue;

		messages.push({
			to: token,
			title: payload.title,
			body: payload.body,
			sound: payload.sound || 'default',
			priority: payload.priority || 'high',
			channelId: payload.channelId || 'tamohar-morning',
			data: payload.data || {},
		});
	}

	const chunks = expo.chunkPushNotifications(messages);
	const tickets = [];

	for (const chunk of chunks) {
		try {
			const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
			tickets.push(...ticketChunk);
		} catch (error) {
			console.error('Expo push error:', error);
		}
	}

	// 🎯 Optional but important: handle receipts
	const receiptIds = tickets.filter((t) => t.id).map((t) => t.id);

	if (receiptIds.length) {
		const receiptChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

		for (const chunk of receiptChunks) {
			try {
				const receipts = await expo.getPushNotificationReceiptsAsync(chunk);

				for (const receipt of Object.values(receipts)) {
					if (receipt.status === 'error') {
						console.error('Push receipt error:', receipt.message);
					}
				}
			} catch (error) {
				console.error('Receipt fetch error:', error);
			}
		}
	}
}
