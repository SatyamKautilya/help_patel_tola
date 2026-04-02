/**
 * Kaushal Vikas — skill metadata + YouTube playlists.
 * listId: from YouTube playlist URL (?list=PL…). Replace with your own curated lists.
 *
 * Below IDs are real public playlists (mixed topics) so embeds work — swap for skill-specific lists.
 */

const SAMPLE_A = 'PLillGFzfwf8E64Ojjz7GYxwR7Aa6wdzt';
const SAMPLE_B = 'PLrAXtmRdnEQypNH9uZgYKqCnKH8pAaG4I';
const SAMPLE_C = 'PLWKjhJtqV_ab51AhIcj0Ah-FOBkTuNX2K';

export const kaushalSkillOrder = [
	'electrician',
	'plumber',
	'painter',
	'carpenter',
	'mobile-repair',
	'tailoring',
	'welding',
	'cooking',
];

export const kaushalSkills = {
	electrician: {
		id: 'electrician',
		title: 'इलेक्ट्रीशियन',
		titleEn: 'Electrician',
		emoji: '⚡',
		icon: 'Zap',
		gradient: 'from-amber-500 to-yellow-600',
		cardBg: 'from-amber-50/95 via-white to-yellow-50/80',
		cardBorder: 'border-amber-200/80',
		glow: 'from-amber-400/30 to-yellow-500/25',
		desc: 'घरेलू वायरिंग, MCB, स्विच बोर्ड, और इलेक्ट्रिकल सेफ्टी',
		tools: ['टेस्टर', 'प्लायर', 'ड्रिल मशीन', 'वायर स्ट्रिपर'],
		playlists: [
			{
				title: 'इलेक्ट्रिकल बेसिक्स — वीडियो सीरीज़ (1)',
				listId: SAMPLE_A,
			},
			{
				title: 'वायरिंग और सेफ्टी — प्लेलिस्ट (2)',
				listId: SAMPLE_B,
			},
		],
	},
	plumber: {
		id: 'plumber',
		title: 'प्लंबर',
		titleEn: 'Plumber',
		emoji: '🔧',
		icon: 'Droplets',
		gradient: 'from-blue-500 to-cyan-600',
		cardBg: 'from-blue-50/95 via-white to-cyan-50/80',
		cardBorder: 'border-blue-200/80',
		glow: 'from-blue-400/30 to-cyan-500/25',
		desc: 'पाइप फिटिंग, नल मरम्मत, टंकी कनेक्शन, लीकेज ठीक करना',
		tools: ['पाइप कटर', 'रिंच', 'सील टेप', 'सोल्डरिंग किट'],
		playlists: [
			{ title: 'प्लंबिंग टूल्स और जॉइंट', listId: SAMPLE_B },
			{ title: 'पाइप वर्क — अतिरिक्त प्लेलिस्ट', listId: SAMPLE_C },
		],
	},
	painter: {
		id: 'painter',
		title: 'पेंटर',
		titleEn: 'Painter',
		emoji: '🎨',
		icon: 'PaintBucket',
		gradient: 'from-rose-500 to-pink-600',
		cardBg: 'from-rose-50/95 via-white to-pink-50/80',
		cardBorder: 'border-rose-200/80',
		glow: 'from-rose-400/30 to-pink-500/25',
		desc: 'दीवार पुट्टी, प्राइमर, डिस्टेंपर, टेक्सचर पेंटिंग',
		tools: ['रोलर', 'ब्रश सेट', 'स्प्रे गन', 'पुट्टी ब्लेड'],
		playlists: [{ title: 'पेंटिंग और फिनिश — लर्निंग प्लेलिस्ट', listId: SAMPLE_A }],
	},
	carpenter: {
		id: 'carpenter',
		title: 'बढ़ई',
		titleEn: 'Carpenter',
		emoji: '🪚',
		icon: 'Hammer',
		gradient: 'from-orange-600 to-amber-700',
		cardBg: 'from-orange-50/95 via-white to-amber-50/80',
		cardBorder: 'border-orange-200/80',
		glow: 'from-orange-400/30 to-amber-500/25',
		desc: 'फर्नीचर बनाना, दरवाजे-खिड़कियां, लकड़ी पॉलिश',
		tools: ['आरी', 'बरमा', 'रंदा', 'हथौड़ा'],
		playlists: [
			{ title: 'वुडवर्क — प्लेलिस्ट 1', listId: SAMPLE_C },
			{ title: 'वुडवर्क — प्लेलिस्ट 2', listId: SAMPLE_A },
		],
	},
	'mobile-repair': {
		id: 'mobile-repair',
		title: 'मोबाइल रिपेयर',
		titleEn: 'Mobile Repair',
		emoji: '📱',
		icon: 'Cpu',
		gradient: 'from-violet-500 to-purple-600',
		cardBg: 'from-violet-50/95 via-white to-purple-50/80',
		cardBorder: 'border-violet-200/80',
		glow: 'from-violet-400/30 to-purple-500/25',
		desc: 'स्क्रीन बदलना, बैटरी चेंज, सॉफ्टवेयर रिपेयर',
		tools: ['स्क्रूड्राइवर किट', 'हीट गन', 'मल्टीमीटर', 'सक्शन कप'],
		playlists: [
			{ title: 'मोबाइल रिपेयर — सीरीज़ 1', listId: SAMPLE_B },
			{ title: 'मोबाइल रिपेयर — सीरीज़ 2', listId: SAMPLE_A },
		],
	},
	tailoring: {
		id: 'tailoring',
		title: 'सिलाई / दर्जी',
		titleEn: 'Tailoring',
		emoji: '🧵',
		icon: 'Scissors',
		gradient: 'from-pink-500 to-fuchsia-600',
		cardBg: 'from-pink-50/95 via-white to-fuchsia-50/80',
		cardBorder: 'border-pink-200/80',
		glow: 'from-pink-400/30 to-fuchsia-500/25',
		desc: 'कपड़े सिलना, कटिंग, डिज़ाइनिंग, मशीन रखरखाव',
		tools: ['सिलाई मशीन', 'कैंची', 'इंच टेप', 'बोबिन'],
		playlists: [{ title: 'सिलाई और कटिंग — प्लेलिस्ट', listId: SAMPLE_C }],
	},
	welding: {
		id: 'welding',
		title: 'वेल्डिंग',
		titleEn: 'Welding',
		emoji: '🔥',
		icon: 'Wrench',
		gradient: 'from-slate-600 to-gray-700',
		cardBg: 'from-slate-50/95 via-white to-zinc-50/80',
		cardBorder: 'border-slate-200/80',
		glow: 'from-slate-400/25 to-gray-500/20',
		desc: 'आर्क वेल्डिंग, गैस कटिंग, ग्रिल और गेट बनाना',
		tools: ['वेल्डिंग मशीन', 'हेलमेट', 'ग्राइंडर', 'इलेक्ट्रोड'],
		playlists: [
			{ title: 'वेल्डिंग टेक्निक — 1', listId: SAMPLE_A },
			{ title: 'वेल्डिंग टेक्निक — 2', listId: SAMPLE_B },
		],
	},
	cooking: {
		id: 'cooking',
		title: 'खानपान / कैटरिंग',
		titleEn: 'Cooking & Catering',
		emoji: '🍳',
		icon: 'ChefHat',
		gradient: 'from-emerald-500 to-green-600',
		cardBg: 'from-emerald-50/95 via-white to-green-50/80',
		cardBorder: 'border-emerald-200/80',
		glow: 'from-emerald-400/30 to-green-500/25',
		desc: 'बड़े स्तर पर खाना बनाना, मेन्यू प्लानिंग, हाइजीन',
		tools: ['बड़ी कढ़ाई', 'गैस बर्नर', 'चाकू सेट', 'सर्विंग ट्रे'],
		playlists: [
			{ title: 'कुकिंग / किचन — प्लेलिस्ट 1', listId: SAMPLE_C },
			{ title: 'कुकिंग / किचन — प्लेलिस्ट 2', listId: SAMPLE_A },
		],
	},
};

export function getPlaylistUrl(listId) {
	return `https://www.youtube.com/playlist?list=${listId}`;
}

export function getPlaylistEmbedUrl(listId) {
	return `https://www.youtube.com/embed/videoseries?list=${listId}&rel=0`;
}
