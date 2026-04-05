import {
	Code,
	Stethoscope,
	Landmark,
	Palette,
	Briefcase,
	FlaskConical,
	Sprout,
	MonitorSmartphone,
	HeartPulse,
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
				name: 'Govt Polytechnic College Balaghat',
				city: 'बालाघाट',
				established: '1962',
				type: 'govt',
				description: 'बालाघाट जिले का सबसे पुराना और प्रमुख तकनीकी संस्थान। यह सिविल, मैकेनिकल, इलेक्ट्रिकल और कंप्यूटर साइंस में डिप्लोमा पाठ्यक्रम प्रदान करता है।',
				contact: { 
					address: 'गोंदिया रोड, भटेरा चौकी, बालाघाट, मध्य प्रदेश 481001',
					phone: '07632-248386',
					email: 'prinpoly.bgt@mp.gov.in',
					website: 'https://gpcbalaghat.ac.in/'
				},
			},
			{
				id: 'balaghat-tech',
				name: 'Sardar Patel University / Institute',
				city: 'बालाघाट',
				established: '2011',
				type: 'private',
				description: 'बालाघाट क्षेत्र में इंजीनियरिंग और प्रौद्योगिकी शिक्षा का एक उभरता हुआ केंद्र। यहां बी.टेक, एम.टेक और प्रबंधन पाठ्यक्रम की सुविधा है।',
				contact: { 
					address: 'सरदार पटेल नॉलेज सिटी, डोंगरीपाली, बालाघाट',
					phone: '07632-234255',
					email: 'info@spu.edu.in',
					website: 'https://www.spubgh.ac.in'
				},
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
			{
				id: 'nscb-jabalpur',
				name: 'Netaji Subhash Chandra Bose Medical College',
				city: 'जबलपुर',
				established: '1955',
				type: 'govt',
				description: 'महाकौशल क्षेत्र का सबसे बड़ा और प्रमुख चिकित्सा महाविद्यालय एवं अस्पताल।',
				contact: {
					phone: '0761-2371334',
					address: 'Tilhari, जबलपुर',
					website: 'http://www.nscbmc.ac.in/'
				},
			},
			{
				id: 'ssmc-rewa',
				name: 'Shyam Shah Medical College',
				city: 'रीवा',
				established: '1963',
				type: 'govt',
				description: 'विंध्य क्षेत्र का प्रतिष्ठित सरकारी मेडिकल कॉलेज, संजय गांधी मेमोरियल अस्पताल से सम्बद्ध।',
				contact: {
					phone: '07662-251006',
					address: 'Sanjay Nagar, रीवा',
					website: 'http://ssmcrewa.com/'
				},
			},
			{
				id: 'gmc-ratlam',
				name: 'Government Medical College Ratlam',
				city: 'रतलाम',
				established: '2018',
				type: 'govt',
				description: 'पश्चिम मध्य प्रदेश में स्थापित आधुनिक चिकित्सा शिक्षा और स्वास्थ्य सेवा संस्थान।',
				contact: {
					phone: '07412-280222',
					address: 'Banjali, रतलाम',
					website: 'http://www.gmcratlam.org/'
				},
			},
			{
				id: 'gmc-khandwa',
				name: 'Nandkumar Singh Chouhan Govt. Medical College',
				city: 'खंडवा',
				established: '2018',
				type: 'govt',
				description: 'निमाड़ अंचल का प्रमुख चिकित्सा महाविद्यालय।',
				contact: {
					phone: '0733-2940222',
					address: 'Khandwa Hoshangabad State Highway, खंडवा',
					website: 'http://www.gmckhandwa.org/'
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
			{
				id: 'jst-balaghat',
				name: 'Govt. Jata Shankar Trivedi PG College',
				city: 'बालाघाट',
				established: '1958',
				type: 'govt',
				description: 'बालाघाट जिले का मुख्य और सबसे बड़ा स्नातकोत्तर (PG) शासकीय महाविद्यालय। कला, विज्ञान और वाणिज्य संकाय में उत्कृष्ट शिक्षा।',
				contact: {
					address: 'जबलपुर रोड, बालाघाट, मध्य प्रदेश 481001',
					phone: '07632-240156',
					email: 'hegacbal@mp.gov.in',
					website: 'http://www.govtpgcollegebalaghat.com/'
				},
			},
			{
				id: 'kamla-nehru-balaghat',
				name: 'Kamla Nehru Mahila Mahavidyalaya',
				city: 'बालाघाट',
				established: '1971',
				type: 'private',
				description: 'बालाघाट में महिला शिक्षा को प्रोत्साहन देने वाला प्रमुख निजी महाविद्यालय। कला तथा गृह विज्ञान में विशेष पाठ्यक्रम।',
				contact: {
					address: 'मेन रोड, बालाघाट',
					phone: '07632-243220'
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
			{
				id: 'ims-davv-indore',
				name: 'Institute of Management Studies (DAVV)',
				city: 'इंदौर',
				established: '1969',
				type: 'govt',
				description: 'देवी अहिल्या विश्वविद्यालय का प्रतिष्टित प्रबंधन संस्थान।',
				contact: {
					address: 'Takshashila Campus, Indore',
					website: 'http://www.ims.dauniv.ac.in/'
				},
			},
			{
				id: 'fms-bhopal',
				name: 'Faculty of Management (Barkatullah University)',
				city: 'भोपाल',
				established: '1970',
				type: 'govt',
				description: 'बरकतुल्लाह विश्वविद्यालय का प्रबंधन संकाय।',
				contact: {
					address: 'Hoshangabad Road, Bhopal',
				},
			},
			{
				id: 'nmims-indore',
				name: 'SVKM’s NMIMS',
				city: 'इंदौर',
				established: '2017',
				type: 'private',
				description: 'मुंबई स्थित प्रसिद्ध NMIMS का इंदौर कैंपस, BBA व MBA कोर्सेज के लिए मशहूर।',
				contact: {
					address: 'Bada Bangadda, Super Corridor, Indore',
					website: 'https://indore.nmims.edu/'
				},
			},
			{
				id: 'symbiosis-indore',
				name: 'Symbiosis University of Applied Sciences',
				city: 'इंदौर',
				established: '2016',
				type: 'private',
				description: 'प्रबंधन व तकनीक में कौशल आधारित शिक्षा प्रदान करने वाला पहला विश्वविद्यालय।',
				contact: {
					address: 'Bada Bangadda, Super Corridor, Indore',
					website: 'https://www.suas.ac.in/'
				},
			},
			{
				id: 'jlu-bhopal',
				name: 'Jagran Lakecity University (JLU)',
				city: 'भोपाल',
				established: '2013',
				type: 'private',
				description: 'प्रबंधन और संचार मीडिया में अग्रणी निजी विश्वविद्यालय।',
				contact: {
					address: 'Mugaliyachhap, Bhopal',
					website: 'https://jlu.edu.in/'
				},
			},
			{
				id: 'bsss-bhopal',
				name: 'BSSS (Bhopal School of Social Sciences)',
				city: 'भोपाल',
				established: '1972',
				type: 'private',
				description: 'मध्य भारत में मैनेजमेंट और सोशल साइंसेज का एक बेहद प्रतिष्ठित कॉलेज।',
				contact: {
					address: 'Habibganj, Bhopal',
					website: 'https://bsssbhopal.edu.in/'
				},
			},
			{
				id: 'iper-bhopal',
				name: 'IPER (Institute of Professional Education and Research)',
				city: 'भोपाल',
				established: '1996',
				type: 'private',
				description: 'मध्य प्रदेश का एक प्रमुख और विश्वसनीय मैनेजमेंट (MBA) कॉलेज।',
				contact: {
					address: 'Bhaironpur, Bhopal',
					website: 'https://iper.ac.in/'
				},
			},
			{
				id: 'medicaps-mba-indore',
				name: 'Faculty of Management (Medi-Caps University)',
				city: 'इंदौर',
				established: '2000',
				type: 'private',
				description: 'विभिन्न प्रबंधन (MBA/BBA) कोर्सेज के लिए जाना-माना संस्थान।',
				contact: {
					address: 'A.B. Road, Rau, Indore',
				},
			},
			{
				id: 'sage-indore',
				name: 'SAGE University',
				city: 'इंदौर / भोपाल',
				established: '2017',
				type: 'private',
				description: 'तेजी से उभरता हुआ निजी विश्वविद्यालय (SAGE ग्रुप)।',
				contact: {
					address: 'Rau Bypass, Indore',
					website: 'https://sageuniversity.in/'
				},
			},
			{
				id: 'prestige-gwalior',
				name: 'Prestige Institute of Management',
				city: 'ग्वालियर',
				established: '1997',
				type: 'private',
				description: 'ग्वालियर में BBA / MBA / BCA के लिए प्रमुख विकल्प।',
				contact: {
					address: 'Airport Road, Gwalior',
				},
			},
			{
				id: 'itm-mba-gwalior',
				name: 'ITM School of Business',
				city: 'ग्वालियर',
				established: '1997',
				type: 'private',
				description: 'ITM विश्वविद्यालय के अंतर्गत प्रतिष्ठित बिज़नेस स्कूल।',
				contact: {
					address: 'Sithouli, Gwalior',
				},
			},
			{
				id: 'gyan-ganga-jbp',
				name: 'Gyan Ganga Institute of Tech & Science (MBA)',
				city: 'जबलपुर',
				established: '2003',
				type: 'private',
				description: 'जबलपुर क्षेत्र में तकनीक और प्रबंधन शिक्षा के लिए प्रतिष्ठित।',
				contact: {
					address: 'Tilhari, Jabalpur',
				},
			},
			{
				id: 'global-mba-jbp',
				name: 'Global Nature Care (MBA)',
				city: 'जबलपुर',
				established: '2008',
				type: 'private',
				description: 'जबलपुर का एक और आधुनिक मैनेजमेंट कॉलेज।',
				contact: {
					address: 'Jabalpur',
				},
			},
			{
				id: 'ch-institute-indore',
				name: 'CH Institute of Management and Commerce',
				city: 'इंदौर',
				established: '2006',
				type: 'private',
				description: 'MBA और प्रबंधन शिक्षा का जाना-माना संस्थान।',
				contact: {
					address: 'Indore, MP',
				},
			},
			{
				id: 'vaisnav-indore',
				name: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya',
				city: 'इंदौर',
				established: '2015',
				type: 'private',
				description: 'प्रमुख मल्टी-डिसिप्लिनरी विश्वविद्यालय जिसमें बड़ा प्रबंधन संकाय है।',
				contact: {
					address: 'Sanwer Road, Indore',
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
	{
		id: 'agriculture',
		name: 'कृषि (Agriculture)',
		icon: Sprout,
		count: '15+',
		gradient: 'from-green-500 to-emerald-600',
		shadow: 'shadow-green-500/25',
		colleges: [
			{
				id: 'jnkvv-jabalpur',
				name: 'Jawaharlal Nehru Krishi Vishwa Vidyalaya (JNKVV)',
				city: 'जबलपुर',
				established: '1964',
				type: 'govt',
				description: 'मध्य प्रदेश का प्रमुख और सबसे बड़ा कृषि विश्वविद्यालय।',
				contact: {
					phone: '0761-2681773',
					address: 'Krishi Nagar, Adhartal, जबलपुर',
					website: 'http://jnkvv.org/'
				},
			},
			{
				id: 'rvskvv-gwalior',
				name: 'Rajmata Vijayaraje Scindia Krishi Vishwa Vidyalaya',
				city: 'ग्वालियर',
				established: '2008',
				type: 'govt',
				description: 'उत्तरी मध्य प्रदेश के लिए उच्च कृषि शिक्षा और अनुसंधान का महत्वपूर्ण केंद्र।',
				contact: {
					phone: '0751-2467673',
					address: 'Race Course Road, ग्वालियर',
					website: 'http://www.rvskvv.net/'
				},
			},
			{
				id: 'agri-college-indore',
				name: 'College of Agriculture',
				city: 'इंदौर',
				established: '1959',
				type: 'govt',
				description: 'मालवा क्षेत्र का प्रमुख कृषि महाविद्यालय, RVSKVV के अंतर्गत।',
				contact: {
					phone: '0731-2701505',
					address: 'Indore, मध्य प्रदेश',
				},
			},
			{
				id: 'agri-college-balaghat',
				name: 'College of Agriculture, Balaghat',
				city: 'बालाघाट',
				established: '2012',
				type: 'govt',
				description: 'JNKVV के अंतर्गत स्थापित एक महत्वपूर्ण कृषि महाविद्यालय, जो इस धान उत्पादक क्षेत्र के लिए विशेष उपयोगी है।',
				contact: {
					address: 'Murjhad Farm, Waraseoni Road, बालाघाट',
					website: 'http://jnkvv.org/'
				},
			},
			{
				id: 'itm-agri-gwalior',
				name: 'School of Agriculture (ITM University)',
				city: 'ग्वालियर',
				established: '2013',
				type: 'private',
				description: 'ITM विश्वविद्यालय के अंतर्गत कार्यरत प्रतिष्ठित कृषि विज्ञान संस्थान।',
				contact: {
					phone: '0751-2440057',
					address: 'Turari, NH-44 Bypass, ग्वालियर',
					website: 'https://itmuniversity.ac.in/'
				},
			},
			{
				id: 'rkdf-agri-bhopal',
				name: 'Faculty of Agriculture (RKDF University)',
				city: 'भोपाल',
				established: '2011',
				type: 'private',
				description: 'निजी क्षेत्र में कृषि शिक्षा (B.Sc Ag.) प्रदान करने वाला प्रमुख विश्वविद्यालय संकाय।',
				contact: {
					phone: '0755-2740304',
					address: 'Airport Bypass Road, Gandhi Nagar, भोपाल',
					website: 'https://rkdf.ac.in/'
				},
			},
			{
				id: 'aks-agri-satna',
				name: 'Faculty of Agriculture (AKS University)',
				city: 'सतना',
				established: '2011',
				type: 'private',
				description: 'विंध्य क्षेत्र में निजी कृषि शिक्षा (B.Sc / M.Sc Agriculture) का प्रमुख केंद्र।',
				contact: {
					phone: '09893540003',
					address: 'Sherganj, सतना',
					website: 'https://aksuniversity.ac.in/'
				},
			},
			{
				id: 'agri-college-sagar',
				name: 'College of Agriculture, Sagar',
				city: 'सागर',
				established: '2018',
				type: 'govt',
				description: 'बुंदेलखंड क्षेत्र में कृषि शिक्षा और अनुसंधान को बढ़ावा देने हेतु स्थापित (JNKVV के अंतर्गत) महत्वपूर्ण महाविद्यालय।',
				contact: {
					address: 'Khurai Road, सागर',
					website: 'http://jnkvv.org/'
				},
			},
		],
	},
	{
		id: 'mca_bca',
		name: 'कंप्यूटर एप्लीकेशन (MCA/BCA)',
		icon: MonitorSmartphone,
		count: '25+',
		gradient: 'from-blue-500 to-indigo-600',
		shadow: 'shadow-blue-500/25',
		colleges: [
			{
				id: 'manit-mca-bhopal',
				name: 'MANIT Bhopal',
				city: 'भोपाल',
				established: '1960',
				type: 'govt',
				description: 'NIT में चलने वाला राष्ट्रीय स्तर का MCA प्रोग्राम।',
				contact: {
					address: 'भोपाल',
					website: 'http://www.manit.ac.in/'
				},
			},
			{
				id: 'sgsits-mca-indore',
				name: 'SGSITS (MCA Dept)',
				city: 'इंदौर',
				established: '1956',
				type: 'govt',
				description: 'प्रदेश के सबसे प्रमुख सरकारी इंजीनियरिंग कॉलेज का कम्प्यूटर एप्लीकेशन विभाग।',
				contact: {
					address: 'इंदौर',
					website: 'http://www.sgsits.ac.in/'
				},
			},
			{
				id: 'scsit-davv-indore',
				name: 'SCSIT & IIPS (DAVV)',
				city: 'इंदौर',
				established: '1986',
				type: 'govt',
				description: 'देवी अहिल्या विश्वविद्यालय का स्कूल ऑफ कंप्यूटर साइंस एंड आईटी — MCA और BCA के लिए प्रतिष्ठित।',
				contact: {
					address: 'Khandwa Road Campus, इंदौर',
					website: 'http://www.scs.dauniv.ac.in/'
				},
			},
			{
				id: 'mits-mca-gwalior',
				name: 'MITS Gwalior (MCA)',
				city: 'ग्वालियर',
				established: '1957',
				type: 'govt',
				description: 'माधव इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड साइंस का प्रतिष्ठित MCA विभाग।',
				contact: {
					address: 'Gola Ka Mandir, ग्वालियर',
					website: 'http://mitsgwalior.in/'
				},
			},
			{
				id: 'lnct-mca-bhopal',
				name: 'LNCT Group (MCA)',
				city: 'भोपाल',
				established: '1994',
				type: 'private',
				description: 'भोपाल के सबसे बड़े निजी तकनीकी कॉलेज का MCA संकाय।',
				contact: {
					address: 'Kalchuri Nagar, भोपाल',
					website: 'https://lnct.ac.in/'
				},
			},
			{
				id: 'prestige-bca-indore',
				name: 'Prestige Institute of Management & Research (UG Campus)',
				city: 'इंदौर',
				established: '1994',
				type: 'private',
				description: 'इंदौर में BBA और BCA के लिए अत्यधिक लोकप्रिय निजी संस्थान।',
				contact: {
					address: 'Vijay Nagar, इंदौर',
					website: 'https://www.pimrindore.ac.in/'
				},
			},
			{
				id: 'bsss-bca-bhopal',
				name: 'BSSS College (BCA)',
				city: 'भोपाल',
				established: '1972',
				type: 'private',
				description: 'भोपाल में कंप्यूटर एप्लीकेशन और आर्ट्स/कॉमर्स का प्रसिद्ध निजी कॉलेज।',
				contact: {
					address: 'Habibganj, भोपाल',
					website: 'https://bsssbhopal.edu.in/'
				},
			},
			{
				id: 'acropolis-mca-indore',
				name: 'Acropolis Institute (MCA/BCA)',
				city: 'इंदौर',
				established: '2005',
				type: 'private',
				description: 'कंप्यूटर साइंस और आईटी में आधुनिक शिक्षा प्रदान करने वाला निजी संस्थान।',
				contact: {
					address: 'Bypass Road, Manglia, इंदौर',
					website: 'https://acropolis.in/'
				},
			},
			{
				id: 'st-aloysius-jbp',
				name: 'St. Aloysius College (BCA)',
				city: 'जबलपुर',
				established: '1951',
				type: 'private',
				description: 'जबलपुर का अत्यंत प्रतिष्ठित और पुराना कॉलेज जो BCA व अन्य कोर्सेज लिए प्रसिद्ध है।',
				contact: {
					address: 'Cantonment, जबलपुर',
					website: 'http://www.staloysiuscollege.ac.in/'
				},
			},
			{
				id: 'mata-gujri-jbp',
				name: 'Mata Gujri Mahila Mahavidyalaya (BCA)',
				city: 'जबलपुर',
				established: '1994',
				type: 'private',
				description: 'महिलाओं हेतु जबलपुर में कंप्यूटर एप्लीकेशन (BCA) का श्रेष्ठ निजी महाविद्यालय।',
				contact: {
					address: 'Marhatal, जबलपुर',
					website: 'http://matagujricollege.edu.in/'
				},
			},
			{
				id: 'srit-mca-jbp',
				name: 'Shri Ram Institute of Technology (MCA)',
				city: 'जबलपुर',
				established: '2001',
				type: 'private',
				description: 'जबलपुर में इंजीनियरिंग के साथ MCA का प्रतिष्ठित तकनीकी संस्थान समूह।',
				contact: {
					address: 'Madhotāl, जबलपुर',
					website: 'http://sritgroup.net/'
				},
			},
		],
	},
	{
		id: 'nursing',
		name: 'नर्सिंग कॉलेज (Nursing)',
		icon: HeartPulse,
		count: '15',
		gradient: 'from-pink-500 to-rose-600',
		shadow: 'shadow-pink-500/25',
		colleges: [
			{
				id: 'govt-nursing-indore',
				name: 'Government College of Nursing, Indore',
				city: 'इंदौर',
				established: '1960',
				type: 'govt',
				description: 'प्रदेश का सबसे पुराना और प्रतिष्ठित सरकारी नर्सिंग कॉलेज, MY अस्पताल से सम्बद्ध।',
				contact: {
					address: 'M.Y. Hospital Campus, Indore',
				},
			},
			{
				id: 'govt-nursing-bhopal',
				name: 'Government College of Nursing, Bhopal',
				city: 'भोपाल',
				established: '2006',
				type: 'govt',
				description: 'हमीदिया अस्पताल (गांधी मेडिकल कॉलेज) से सम्बद्ध प्रमुख नर्सिंग संस्थान।',
				contact: {
					address: 'Sultania Zanana Hospital Campus, Bhopal',
				},
			},
			{
				id: 'govt-nursing-jbp',
				name: 'Government College of Nursing, Jabalpur',
				city: 'जबलपुर',
				established: '2007',
				type: 'govt',
				description: 'NSCB मेडिकल कॉलेज के अंतर्गत संचालित सरकारी नर्सिंग कॉलेज।',
				contact: {
					address: 'Medical College Campus, Jabalpur',
				},
			},
			{
				id: 'govt-nursing-gwl',
				name: 'Government College of Nursing, Gwalior',
				city: 'ग्वालियर',
				established: '2007',
				type: 'govt',
				description: 'JAH अस्पताल और GR मेडिकल कॉलेज परिसर में स्थित नर्सिंग कॉलेज।',
				contact: {
					address: 'JAH Campus, Gwalior',
				},
			},
			{
				id: 'govt-nursing-rewa',
				name: 'Government College of Nursing, Rewa',
				city: 'रीवा',
				established: '2007',
				type: 'govt',
				description: 'संजय गांधी मेमोरियल अस्पताल और SSMC रीवा से सम्बद्ध।',
				contact: {
					address: 'Sanjay Gandhi Hospital Campus, Rewa',
				},
			},
			{
				id: 'aurobindo-nursing-indore',
				name: 'Sri Aurobindo Institute of Nursing',
				city: 'इंदौर',
				established: '2003',
				type: 'private',
				description: 'SAIMS अस्पताल से सम्बद्ध इंदौर का अत्यंत उच्च स्तरीय निजी नर्सिंग कॉलेज।',
				contact: {
					address: 'Sanwer Road, Indore',
				},
			},
			{
				id: 'choithram-nursing-indore',
				name: 'Choithram College of Nursing',
				city: 'इंदौर',
				established: '1996',
				type: 'private',
				description: 'अपनी बेहतरीन सुविधाओं और क्लिनिकल प्रैक्टिस के लिए चर्चित निजी संस्थान।',
				contact: {
					address: 'Manik Bagh Road, Indore',
					website: 'https://www.choithramnursing.com/'
				},
			},
			{
				id: 'rd-memorial-bhopal',
				name: 'R.D. Memorial College of Nursing',
				city: 'भोपाल',
				established: '2001',
				type: 'private',
				description: 'भोपाल में स्थापित सबसे पुराने और सम्मानित निजी नर्सिंग कॉलेजों में से एक।',
				contact: {
					address: 'Barkhedi Kalan, Bhopal',
				},
			},
			{
				id: 'chirayu-nursing-bhopal',
				name: 'Chirayu College of Nursing',
				city: 'भोपाल',
				established: '2012',
				type: 'private',
				description: 'चिरायु मेडिकल कॉलेज एवं अस्पताल से सम्बद्ध आधुनिक नर्सिंग संस्थान।',
				contact: {
					address: 'Bhaisakhedi, Bhopal-Indore Highway',
				},
			},
			{
				id: 'ln-nursing-bhopal',
				name: 'L.N. Nursing College',
				city: 'भोपाल',
				established: '2015',
				type: 'private',
				description: 'एलएनसीटी विश्वविद्यालय समूह के अंतर्गत प्रमुख नर्सिंग संस्थान।',
				contact: {
					address: 'Kolar Road / LNCT Campus, Bhopal',
				},
			},
			{
				id: 'bimr-nursing-gwl',
				name: 'B.I.M.R. Nursing College',
				city: 'ग्वालियर',
				established: '2004',
				type: 'private',
				description: 'बिरला इंस्टिट्यूट ऑफ़ मेडिकल रिसर्च (BIMR) अस्पताल से सम्बद्ध गुणवत्तापूर्ण शिक्षा।',
				contact: {
					address: 'Surya Mandir Road, Gwalior',
				},
			},
			{
				id: 'pragyan-nursing-bhopal',
				name: 'Pragyan College of Nursing',
				city: 'भोपाल',
				established: '2002',
				type: 'private',
				description: 'नर्सिंग के क्षेत्र में विभिन्न (B.Sc, M.Sc, GNM) कोर्स प्रदान करने वाला प्रसिद्ध कॉलेज।',
				contact: {
					address: 'Khajuri Kalan, Bhopal',
				},
			},
			{
				id: 'index-nursing-indore',
				name: 'Index Nursing College',
				city: 'इंदौर',
				established: '2007',
				type: 'private',
				description: 'इंडेक्स मेडिकल कॉलेज और अस्पताल (मालवांचल विश्वविद्यालय) से सम्बद्ध बड़ा परिसर।',
				contact: {
					address: 'Nemawar Road, Indore',
				},
			},
			{
				id: 'bombay-hospital-nursing',
				name: 'Bombay Hospital College of Nursing',
				city: 'इंदौर',
				established: '2009',
				type: 'private',
				description: 'प्रतिष्ठित बॉम्बे हॉस्पिटल द्वारा संचालित उच्च गुणवत्ता वाला नर्सिंग कॉलेज।',
				contact: {
					address: 'Ring Road, Indore',
				},
			},
			{
				id: 'jabalpur-institute-nursing',
				name: 'Jabalpur Institute of Nursing Sciences',
				city: 'जबलपुर',
				established: '2001',
				type: 'private',
				description: 'जबलपुर में स्वास्थ्य शिक्षा के लिए एक प्रमुख निजी संस्थान।',
				contact: {
					address: 'Wright Town, Jabalpur',
				},
			},
		],
	},
];

export function typeLabelHi(type) {
	return type === 'govt' ? 'सरकारी' : 'निजी';
}
