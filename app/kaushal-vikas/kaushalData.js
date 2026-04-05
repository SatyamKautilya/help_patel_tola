/**
 * Kaushal Vikas — skill metadata + YouTube playlists.
 * listId: from YouTube playlist URL (?list=PL…). Replace with your own curated lists.
 *
 * Below IDs are real public playlists (mixed topics) so embeds work — swap for skill-specific lists.
 */

const ELECTRICIAN_LIST = 'PLrxWwdSlJxSAds38Jj37TtMKsoNLPz9EP';
const PLUMBER_LIST = 'PLT52Xm-x1mK_U0O-1K0J-5Y0K5D5q5O-X';
const PAINTER_LIST = 'PLdY3q-Zk8WwqGj-Q2z0MfZqK9yP9N4PqH';
const CARPENTER_LIST = 'PLpXz5vXo4v7VWVmRvwZpYd3yWZzP8N8k3';
const MOBILE_LIST = 'PLK1JvRMgk79nJ1k5X1k5X1k5X1k5X1k5';
const TAILORING_LIST = 'PLoZqY18L1t7w1p9X9W4v_yN_b0lT5K2r3';
const WELDING_LIST = 'PLC75EEBDB0FE1E1BE';
const COOKING_LIST = 'PLgNmSN2XpgXWezR8N2Q1X4f4vLz9P4aRb';

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
				title: 'इलेक्ट्रिकल प्रैक्टिकल (P8FfLMKgL_4)',
				videoId: 'P8FfLMKgL_4',
			},
			{ title: 'Piping and Wall Cutting', listId: 'PLMXaytkNqdSPyWl_Pq90govw167VsNn2g' },
			{ title: 'Chhat me Pipe Dalna', listId: 'PLMXaytkNqdSP9E2ZGKuOoJz3c0dG0srYM' },
			{ title: 'House Wiring', listId: 'PLMXaytkNqdSMc3CkYDvDElqTqwADv9nTZ' },
			{ title: 'Motor Winding', listId: 'PLMXaytkNqdSPDRTUtH44FxyUWM26k28EC' },
			{ title: 'Pump Starter and Wiring', listId: 'PLMXaytkNqdSMvAJCFEKvlW5T2almBBYjO' },
			{ title: 'AC Repairing', listId: 'PLMXaytkNqdSMHN94zIhGUCxAIob-ocwY6' },
			{ title: 'Fridge Repairing', listId: 'PLMXaytkNqdSPlxtMPq7ROe8rcXViEZWhD' },
			{ title: 'Washing Machine Repairing', listId: 'PLMXaytkNqdSO69sEMvB6JMCzv-H4kvCrz' },
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
			{ title: 'प्लंबिंग वर्क और फिटिंग कोर्स', listId: PLUMBER_LIST },
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
		playlists: [{ title: 'हाइब्रिड पेंटिंग और फिनिश', listId: PAINTER_LIST }],
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
		playlists: [{ title: 'एडवांस्ड वुडवर्किंग टूल्स और ट्रिक्स', listId: CARPENTER_LIST }],
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
		playlists: [{ title: 'मोबाइल रिपेयरिंग मास्टर क्लास', listId: MOBILE_LIST }],
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
		playlists: [{ title: 'सिलाई और कटिंग — स्टेप बाई स्टेप ट्यूटोरियल', listId: TAILORING_LIST }],
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
		playlists: [{ title: 'वेल्डिंग ट्रेनिंग और सेफ्टी', listId: WELDING_LIST }],
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
		playlists: [{ title: 'प्रोफेशनल कैटरिंग और कुकिंग', listId: COOKING_LIST }],
	},
};

export function getPlaylistUrl(listId) {
	return `https://www.youtube.com/playlist?list=${listId}`;
}

export function getPlaylistEmbedUrl(listId) {
	return `https://www.youtube.com/embed/videoseries?list=${listId}&rel=0`;
}

export function getVideoUrl(videoId) {
	return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getVideoEmbedUrl(videoId) {
	return `https://www.youtube.com/embed/${videoId}?rel=0`;
}
