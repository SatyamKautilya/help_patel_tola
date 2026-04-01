import {
	Code,
	Stethoscope,
	Landmark,
	Palette,
	Briefcase,
	FlaskConical,
} from 'lucide-react';

/** @typedef {'govt' | 'private'} CollegeOwnership */

/**
 * @typedef {Object} CollegeContact
 * @property {string} [phone]
 * @property {string} [email]
 * @property {string} [website]
 * @property {string} [address]
 */

/**
 * @typedef {Object} CollegeEntry
 * @property {string} id
 * @property {string} name
 * @property {string} city
 * @property {string} established
 * @property {CollegeOwnership} type
 * @property {string} description
 * @property {CollegeContact} contact
 */

/**
 * @typedef {Object} CollegeCategory
 * @property {string} id
 * @property {string} name
 * @property {import('lucide-react').LucideIcon} icon
 * @property {string} count
 * @property {string} gradient
 * @property {string} shadow
 * @property {CollegeEntry[]} colleges
 */

/** @type {CollegeCategory[]} */
export const collegeCategories = [
	{
		id: 'engineering',
		name: 'इंजीनियरिंग कॉलेज',
		icon: Code,
		count: '150+',
		gradient: 'from-cyan-500 to-blue-600',
		shadow: 'shadow-cyan-500/25',
		colleges: [
			// 🔵 INDORE DIVISION
			{
				id: 'iit-indore',
				name: 'IIT Indore',
				city: 'इंदौर',
				established: '2009',
				type: 'govt',
				description: 'राष्ट्रीय महत्व का संस्थान — B.Tech, M.Tech, रिसर्च',
				contact: { address: 'Simrol, इंदौर' },
			},
			{
				id: 'sgsits-indore',
				name: 'SGSITS',
				city: 'इंदौर',
				established: '1956',
				type: 'govt',
				description: 'प्रमुख सरकारी इंजीनियरिंग कॉलेज',
				contact: { address: 'इंदौर' },
			},
			{
				id: 'ips-indore',
				name: 'IPS Academy',
				city: 'इंदौर',
				established: '1995',
				type: 'private',
				description: 'निजी संस्थान',
				contact: { address: 'इंदौर' },
			},
			{
				id: 'acropolis-indore',
				name: 'Acropolis Institute',
				city: 'इंदौर',
				established: '2005',
				type: 'private',
				description: 'इंजीनियरिंग व प्रोफेशनल कोर्स',
				contact: { address: 'इंदौर' },
			},
			{
				id: 'medicaps-indore',
				name: 'Medicaps University',
				city: 'इंदौर',
				established: '2000',
				type: 'private',
				description: 'निजी विश्वविद्यालय',
				contact: { address: 'इंदौर' },
			},
			{
				id: 'sanghvi-indore',
				name: 'Sanghvi Institute',
				city: 'इंदौर',
				established: '2006',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'इंदौर' },
			},

			// 🟢 BHOPAL DIVISION
			{
				id: 'manit-bhopal',
				name: 'MANIT Bhopal',
				city: 'भोपाल',
				established: '1960',
				type: 'govt',
				description: 'NIT',
				contact: { address: 'भोपाल' },
			},
			{
				id: 'lnct-bhopal',
				name: 'LNCT Bhopal',
				city: 'भोपाल',
				established: '1994',
				type: 'private',
				description: 'बड़ा निजी समूह',
				contact: { address: 'भोपाल' },
			},
			{
				id: 'tit-bhopal',
				name: 'TIT Bhopal',
				city: 'भोपाल',
				established: '2001',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'भोपाल' },
			},
			{
				id: 'oriental-bhopal',
				name: 'OIST Bhopal',
				city: 'भोपाल',
				established: '1995',
				type: 'private',
				description: 'Oriental Group',
				contact: { address: 'भोपाल' },
			},
			{
				id: 'sagar-bhopal',
				name: 'Sagar Institute of Science & Tech',
				city: 'भोपाल',
				established: '2007',
				type: 'private',
				description: 'SISTec',
				contact: { address: 'भोपाल' },
			},
			{
				id: 'rkdf-bhopal',
				name: 'RKDF University',
				city: 'भोपाल',
				established: '1995',
				type: 'private',
				description: 'निजी विश्वविद्यालय',
				contact: { address: 'भोपाल' },
			},
			{
				id: 'bansal-bhopal',
				name: 'Bansal Institute',
				city: 'भोपाल',
				established: '2000',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'भोपाल' },
			},

			// 🟣 GWALIOR DIVISION
			{
				id: 'mits-gwalior',
				name: 'MITS',
				city: 'ग्वालियर',
				established: '1957',
				type: 'govt',
				description: 'प्रमुख कॉलेज',
				contact: { address: 'ग्वालियर' },
			},
			{
				id: 'itm-gwalior',
				name: 'ITM University',
				city: 'ग्वालियर',
				established: '1997',
				type: 'private',
				description: 'निजी विश्वविद्यालय',
				contact: { address: 'ग्वालियर' },
			},
			{
				id: 'amity-gwalior',
				name: 'Amity University',
				city: 'ग्वालियर',
				established: '2010',
				type: 'private',
				description: 'प्राइवेट यूनिवर्सिटी',
				contact: { address: 'ग्वालियर' },
			},

			// 🔴 JABALPUR DIVISION
			{
				id: 'gec-jabalpur',
				name: 'Govt Engineering College',
				city: 'जबलपुर',
				established: '1947',
				type: 'govt',
				description: 'पुराना कॉलेज',
				contact: { address: 'जबलपुर' },
			},
			{
				id: 'ggits-jabalpur',
				name: 'GGITS',
				city: 'जबलपुर',
				established: '2003',
				type: 'private',
				description: 'निजी कॉलेज',
				contact: { address: 'जबलपुर' },
			},
			{
				id: 'hitkarini-jabalpur',
				name: 'Hitkarini Engineering College',
				city: 'जबलपुर',
				established: '1997',
				type: 'private',
				description: 'स्थानीय कॉलेज',
				contact: { address: 'जबलपुर' },
			},
			{
				id: 'lnct-jabalpur',
				name: 'LNCT Jabalpur',
				city: 'जबलपुर',
				established: '2008',
				type: 'private',
				description: 'LNCT Group',
				contact: { address: 'जबलपुर' },
			},
			{
				id: 'global-jabalpur',
				name: 'Global Engineering College',
				city: 'जबलपुर',
				established: '2008',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'जबलपुर' },
			},

			// 🟠 SAGAR DIVISION
			{
				id: 'gec-sagar',
				name: 'Govt Engineering College',
				city: 'सागर',
				established: '1986',
				type: 'govt',
				description: 'बुंदेलखंड क्षेत्र',
				contact: { address: 'सागर' },
			},
			{
				id: 'sagar-university-tech',
				name: 'Engineering Dept Sagar University',
				city: 'सागर',
				established: '1946',
				type: 'govt',
				description: 'विश्वविद्यालय इंजीनियरिंग',
				contact: { address: 'सागर' },
			},

			// 🟡 REWA DIVISION
			{
				id: 'gec-rewa',
				name: 'Govt Engineering College',
				city: 'रीवा',
				established: '1964',
				type: 'govt',
				description: 'विंध्य क्षेत्र',
				contact: { address: 'रीवा' },
			},
			{
				id: 'aks-satna',
				name: 'AKS University',
				city: 'सतना',
				established: '2011',
				type: 'private',
				description: 'निजी विश्वविद्यालय',
				contact: { address: 'सतना' },
			},
			{
				id: 'rewa-private-engg',
				name: 'Vindhya Institute of Tech',
				city: 'रीवा',
				established: '2009',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'रीवा' },
			},

			// 🟤 UJJAIN DIVISION
			{
				id: 'gec-ujjain',
				name: 'Govt Engineering College',
				city: 'उज्जैन',
				established: '2011',
				type: 'govt',
				description: 'सरकारी कॉलेज',
				contact: { address: 'उज्जैन' },
			},
			{
				id: 'mits-dewas',
				name: 'MIT Dewas',
				city: 'देवास',
				established: '2007',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'देवास' },
			},
			{
				id: 'ratlam-tech',
				name: 'Ratlam Institute of Tech',
				city: 'रतलाम',
				established: '2008',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'रतलाम' },
			},

			// ⚫ NARMADAPURAM DIVISION
			{
				id: 'betul-tech',
				name: 'Technocrats Institute',
				city: 'बेतूल',
				established: '2010',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'बेतूल' },
			},
			{
				id: 'hoshangabad-poly',
				name: 'Govt Polytechnic',
				city: 'होशंगाबाद',
				established: '1986',
				type: 'govt',
				description: 'डिप्लोमा कॉलेज',
				contact: { address: 'होशंगाबाद' },
			},

			// 🟢 SHAHDOL DIVISION
			{
				id: 'shahdol-engg',
				name: 'Govt Engineering College',
				city: 'शहडोल',
				established: '2018',
				type: 'govt',
				description: 'नई संस्थान',
				contact: { address: 'शहडोल' },
			},

			// ⭐ BALAGHAT (MANDATORY)
			{
				id: 'balaghat-poly',
				name: 'Govt Polytechnic Balaghat',
				city: 'बालाघाट',
				established: '1962',
				type: 'govt',
				description: 'डिप्लोमा इंजीनियरिंग',
				contact: { address: 'बालाघाट' },
			},
			{
				id: 'balaghat-tech',
				name: 'Balaghat Institute of Tech',
				city: 'बालाघाट',
				established: '2009',
				type: 'private',
				description: 'स्थानीय इंजीनियरिंग कॉलेज',
				contact: { address: 'बालाघाट' },
			},

			// ➕ EXTRA DISTRICT COVERAGE
			{
				id: 'khargone-tech',
				name: 'Khargone Engineering College',
				city: 'खरगोन',
				established: '2008',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'खरगोन' },
			},
			{
				id: 'khandwa-tech',
				name: 'Khandwa Institute of Tech',
				city: 'खंडवा',
				established: '2009',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'खंडवा' },
			},
			{
				id: 'chhindwara-tech',
				name: 'Chhindwara Engineering College',
				city: 'छिंदवाड़ा',
				established: '2007',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'छिंदवाड़ा' },
			},
			{
				id: 'seoni-poly',
				name: 'Govt Polytechnic Seoni',
				city: 'सिवनी',
				established: '1985',
				type: 'govt',
				description: 'डिप्लोमा',
				contact: { address: 'सिवनी' },
			},
			{
				id: 'mandla-poly',
				name: 'Govt Polytechnic Mandla',
				city: 'मंडला',
				established: '1990',
				type: 'govt',
				description: 'डिप्लोमा',
				contact: { address: 'मंडला' },
			},
			{
				id: 'sidhi-poly',
				name: 'Govt Polytechnic Sidhi',
				city: 'सीधी',
				established: '1995',
				type: 'govt',
				description: 'डिप्लोमा',
				contact: { address: 'सीधी' },
			},
			{
				id: 'singrauli-tech',
				name: 'Singrauli Institute of Tech',
				city: 'सिंगरौली',
				established: '2012',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'सिंगरौली' },
			},
			{
				id: 'damoh-poly',
				name: 'Govt Polytechnic Damoh',
				city: 'दमोह',
				established: '1988',
				type: 'govt',
				description: 'डिप्लोमा',
				contact: { address: 'दमोह' },
			},
			{
				id: 'panna-poly',
				name: 'Govt Polytechnic Panna',
				city: 'पन्ना',
				established: '1992',
				type: 'govt',
				description: 'डिप्लोमा',
				contact: { address: 'पन्ना' },
			},
			{
				id: 'chhatarpur-tech',
				name: 'Chhatarpur Engineering College',
				city: 'छतरपुर',
				established: '2008',
				type: 'private',
				description: 'इंजीनियरिंग कॉलेज',
				contact: { address: 'छतरपुर' },
			},
		],
	},
	{
		id: 'medical',
		name: 'मेडिकल कॉलेज',
		icon: Stethoscope,
		count: '35+',
		gradient: 'from-rose-500 to-pink-600',
		shadow: 'shadow-rose-500/25',
		colleges: [
			{
				id: 'aiims-bhopal',
				name: 'AIIMS Bhopal',
				city: 'भोपाल',
				established: '2012',
				type: 'govt',
				description:
					'अखिल भारतीय आयुर्विज्ञान संस्थान — MBBS व स्नातकोत्तर चिकित्सा पाठ्यक्रम।',
				contact: {
					phone: '0755-2661600',
					email: 'admin@aiimsbhopal.edu.in',
					website: 'https://aiimsbhopal.edu.in',
					address: 'Saket Nagar, भोपाल',
				},
			},
			{
				id: 'gmc-bhopal',
				name: 'Gandhi Medical College',
				city: 'भोपाल',
				established: '1955',
				type: 'govt',
				description: 'प्रदेश का पुराना मेडिकल कॉलेज — MBBS व अस्पताल सुविधा।',
				contact: {
					phone: '0755-2742100',
					address: 'Royal Market, फ़ैज़ाबाद, भोपाल',
				},
			},
			{
				id: 'grmc-gwalior',
				name: 'GR Medical College',
				city: 'ग्वालियर',
				established: '2001',
				type: 'private',
				description: 'निजी मेडिकल कॉलेज — MBBS व संबद्ध अस्पताल।',
				contact: {
					phone: '0751-2459300',
					address: 'मुरार, ग्वालियर',
				},
			},
			{
				id: 'mgm-indore',
				name: 'MGM Medical College',
				city: 'इंदौर',
				established: '1948',
				type: 'govt',
				description:
					'देवी अहिल्या विश्वविद्यालय से सम्बद्ध प्रमुख सरकारी मेडिकल कॉलेज।',
				contact: {
					phone: '0731-2703333',
					address: 'A B Road, इंदौर',
				},
			},
			{
				id: 'bundelkhand-sagar',
				name: 'Bundelkhand Medical College',
				city: 'सागर',
				established: '2003',
				type: 'govt',
				description: 'जिला मुख्यालय स्थित सरकारी मेडिकल कॉलेज।',
				contact: {
					phone: '07582-296001',
					address: 'सागर',
				},
			},
			{
				id: 'pcms-bhopal',
				name: "People's College of Medical Sciences",
				city: 'भोपाल',
				established: '1999',
				type: 'private',
				description: 'निजी चिकित्सा महाविद्यालय — MBBS व सुविधाएँ।',
				contact: {
					phone: '0755-2500901',
					address: 'Bhanpur, भोपाल',
				},
			},
		],
	},
	{
		id: 'law',
		name: 'लॉ कॉलेज',
		icon: Landmark,
		count: '25+',
		gradient: 'from-amber-500 to-orange-600',
		shadow: 'shadow-amber-500/25',
		colleges: [
			{
				id: 'nliu-bhopal',
				name: 'NLIU Bhopal',
				city: 'भोपाल',
				established: '1997',
				type: 'govt',
				description:
					'राष्ट्रीय विधि विश्वविद्यालय — पाँच वर्षीय एकीकृत BA LLB व स्नातकोत्तर।',
				contact: {
					phone: '0755-2694200',
					email: 'registrar@nliu.ac.in',
					website: 'https://www.nliu.ac.in',
					address: 'Kerwa Dam Road, भोपाल',
				},
			},
			{
				id: 'barkatullah-law',
				name: 'Barkatullah University Law Dept.',
				city: 'भोपाल',
				established: '1970',
				type: 'govt',
				description: 'विश्वविद्यालय संकाय द्वारा LLB व संबद्ध पाठ्यक्रम।',
				contact: {
					phone: '0755-2517100',
					website: 'https://www.bubhopal.ac.in',
					address: 'Hoshangabad Road, भोपाल',
				},
			},
			{
				id: 'vikram-law',
				name: 'Vikram University Law College',
				city: 'उज्जैन',
				established: '1957',
				type: 'govt',
				description: 'विक्रम विश्वविद्यालय से सम्बद्ध विधि संकाय।',
				contact: {
					website: 'https://www.vikramuniv.ac.in',
					address: 'उज्जैन',
				},
			},
			{
				id: 'holkar-law',
				name: 'Holkar Law College',
				city: 'इंदौर',
				established: '1891',
				type: 'govt',
				description: 'प्रदेश के पुराने विधि संस्थानों में से एक।',
				contact: {
					address: 'राजवाड़ा क्षेत्र, इंदौर',
				},
			},
			{
				id: 'jiwaji-law',
				name: 'Jiwaji University Law College',
				city: 'ग्वालियर',
				established: '1964',
				type: 'govt',
				description: 'जीवाजी विश्वविद्यालय से सम्बद्ध विधि पाठ्यक्रम।',
				contact: {
					website: 'https://www.jiwaji.edu',
					address: 'ग्वालियर',
				},
			},
		],
	},
	{
		id: 'arts',
		name: 'आर्ट्स व कॉमर्स',
		icon: Palette,
		count: '100+',
		gradient: 'from-violet-500 to-purple-600',
		shadow: 'shadow-violet-500/25',
		colleges: [
			{
				id: 'davv',
				name: 'Devi Ahilya Vishwavidyalaya',
				city: 'इंदौर',
				established: '1964',
				type: 'govt',
				description:
					'केंद्रीय विश्वविद्यालय — कला, वाणिज्य, विज्ञान व अन्य संकाय।',
				contact: {
					phone: '0731-2470027',
					website: 'https://www.dauniv.ac.in',
					address: 'नालंदा परिसर, इंदौर',
				},
			},
			{
				id: 'barkatullah',
				name: 'Barkatullah Vishwavidyalaya',
				city: 'भोपाल',
				established: '1970',
				type: 'govt',
				description:
					'राज्य विश्वविद्यालय — स्नातक व स्नातकोत्तर कला व वाणिज्य।',
				contact: {
					website: 'https://www.bubhopal.ac.in',
					address: 'Hoshangabad Road, भोपाल',
				},
			},
			{
				id: 'vikram-u',
				name: 'Vikram University',
				city: 'उज्जैन',
				established: '1957',
				type: 'govt',
				description: 'ऐतिहासिक नगरी में स्थित विश्वविद्यालय — बहुसंकायीय।',
				contact: {
					website: 'https://www.vikramuniv.ac.in',
					address: 'उज्जैन',
				},
			},
			{
				id: 'jiwaji-u',
				name: 'Jiwaji University',
				city: 'ग्वालियर',
				established: '1964',
				type: 'govt',
				description: 'ग्वालियर क्षेत्र का प्रमुख विश्वविद्यालय।',
				contact: {
					website: 'https://www.jiwaji.edu',
					address: 'ग्वालियर',
				},
			},
			{
				id: 'rdvv',
				name: 'Rani Durgavati Vishwavidyalaya',
				city: 'जबलपुर',
				established: '1956',
				type: 'govt',
				description: 'महाकौशल क्षेत्र हेतु केंद्रीय विश्वविद्यालय।',
				contact: {
					website: 'https://www.rdunijbpin.org',
					address: 'जबलपुर',
				},
			},
			{
				id: 'mlb-bhopal',
				name: 'Govt. MLB College',
				city: 'भोपाल',
				established: '1907',
				type: 'govt',
				description: 'प्रमुख सरकारी महाविद्यालय — कला व वाणिज्य।',
				contact: {
					address: 'कोह-ए-फिज़ा, भोपाल',
				},
			},
		],
	},
	{
		id: 'mba',
		name: 'MBA / BBA',
		icon: Briefcase,
		count: '40+',
		gradient: 'from-emerald-500 to-teal-600',
		shadow: 'shadow-emerald-500/25',
		colleges: [
			{
				id: 'iim-indore',
				name: 'IIM Indore',
				city: 'इंदौर',
				established: '1996',
				type: 'govt',
				description:
					'भारत के प्रमुख प्रबंधन संस्थानों में से एक — PGP, FPM व कार्यकारी कार्यक्रम।',
				contact: {
					phone: '0731-2439666',
					email: 'admissions@iimidr.ac.in',
					website: 'https://www.iimidr.ac.in',
					address: 'Rau-Pithampur Road, प्रबंधन संस्थान परिसर, इंदौर',
				},
			},
			{
				id: 'iifm',
				name: 'IIFM Bhopal',
				city: 'भोपाल',
				established: '1982',
				type: 'govt',
				description:
					'वन व पर्यावरण प्रबंधन में विशेषज्ञता — स्नातकोत्तर कार्यक्रम।',
				contact: {
					phone: '0755-2678316',
					website: 'https://iifm.ac.in',
					address: 'नेहरू नगर, भोपाल',
				},
			},
			{
				id: 'lnct-mba',
				name: 'LNCT MBA',
				city: 'भोपाल',
				established: '2007',
				type: 'private',
				description: 'निजी MBA संस्थान — प्रबंधन व संबद्ध पाठ्यक्रम।',
				contact: {
					phone: '0755-6185400',
					address: 'Kalchuri Nagar, भोपाल',
				},
			},
			{
				id: 'prestige-indore',
				name: 'Prestige Institute of Management',
				city: 'इंदौर',
				established: '1994',
				type: 'private',
				description: 'प्रबंधन शिक्षा हेतु प्रतिष्ठित निजी संस्थान।',
				contact: {
					phone: '0731-4262300',
					website: 'https://www.prestige-gwl.com',
					address: 'इंदौर',
				},
			},
			{
				id: 'ips-indore',
				name: 'IPS Academy',
				city: 'इंदौर',
				established: '1995',
				type: 'private',
				description: 'MBA व अन्य व्यावसायिक पाठ्यक्रम।',
				contact: {
					address: 'राजेंद्र नगर, इंदौर',
				},
			},
			{
				id: 'sirt-bhopal',
				name: 'SIRT Bhopal',
				city: 'भोपाल',
				established: '2008',
				type: 'private',
				description: 'तकनीकी व प्रबंधन संस्थान समूह का हिस्सा।',
				contact: {
					address: 'आयुर्वेदिक ग्राम, भोपाल',
				},
			},
		],
	},
	{
		id: 'science',
		name: 'विज्ञान / रिसर्च',
		icon: FlaskConical,
		count: '30+',
		gradient: 'from-sky-500 to-indigo-600',
		shadow: 'shadow-sky-500/25',
		colleges: [
			{
				id: 'iiser-bhopal',
				name: 'IISER Bhopal',
				city: 'भोपाल',
				established: '2008',
				type: 'govt',
				description:
					'भारत सरकार का विज्ञान शिक्षा व अनुसंधान संस्थान — BS-MS व PhD।',
				contact: {
					phone: '0755-2692300',
					website: 'https://www.iiserb.ac.in',
					address: 'Bhauri, भोपाल',
				},
			},
			{
				id: 'davv-science',
				name: 'DAVV Science Faculty',
				city: 'इंदौर',
				established: '1964',
				type: 'govt',
				description: 'देवी अहिल्या विश्वविद्यालय के विज्ञान संकाय — BSc, MSc।',
				contact: {
					address: 'इंदौर विश्वविद्यालय परिसर',
				},
			},
			{
				id: 'holkar-science',
				name: 'Holkar Science College',
				city: 'इंदौर',
				established: '1891',
				type: 'govt',
				description: 'स्नातक विज्ञान पाठ्यक्रम हेतु प्रसिद्ध महाविद्यालय।',
				contact: {
					address: 'इंदौर',
				},
			},
			{
				id: 'rrcat',
				name: 'RRCAT Indore',
				city: 'इंदौर',
				established: '1967',
				type: 'govt',
				description:
					'अनुसंधान केंद्र — संबद्ध शैक्षणिक व प्रशिक्षण गतिविधियाँ (सामान्य जानकारी हेतु)।',
				contact: {
					website: 'https://www.rrcat.gov.in',
					address: 'इंदौर',
				},
			},
			{
				id: 'govt-science-jbp',
				name: 'Govt. Science College',
				city: 'जबलपुर',
				established: '1956',
				type: 'govt',
				description: 'जिले का प्रमुख सरकारी विज्ञान महाविद्यालय।',
				contact: {
					address: 'जबलपुर',
				},
			},
		],
	},
];

export function typeLabelHi(type) {
	return type === 'govt' ? 'सरकारी' : 'निजी';
}
