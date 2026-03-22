export const careers = {
	engineer: {
		id: 'engineer',
		title: 'इंजीनियर',
		titleEn: 'Engineer',
		emoji: '⚙️',
		gradient: 'from-blue-600 to-cyan-400',
		cardBg: 'from-blue-900/40 to-cyan-900/30',
		description: 'IIT, NIT और अन्य टॉप कॉलेजों से इंजीनियरिंग करें',
		milestones: [
			{
				id: 'eng-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'MP Board/CBSE से 10वीं अच्छे अंकों से पास करें। गणित और विज्ञान पर विशेष ध्यान दें।',
				details:
					'10वीं कक्षा इंजीनियरिंग करियर की नींव है। इस समय गणित और विज्ञान में मजबूत बेसिक्स बनाना बहुत जरूरी है। NCERT की किताबें अच्छे से पढ़ें और कॉन्सेप्ट क्लियर करें।\n\nMP Board में 70%+ अंक लाने का लक्ष्य रखें। अच्छे अंक आपको अच्छे स्कूल में 11वीं में Science stream दिलाने में मदद करेंगे।',
				tips: [
					'गणित के बेसिक्स (बीजगणित, ज्यामिति, त्रिकोणमिति) मजबूत करें',
					'NCERT Science की किताब पूरी तरह से समझें',
					'रोज 2-3 घंटे नियमित पढ़ाई करें',
					'ऑनलाइन फ्री रिसोर्सेज (Khan Academy, NCERT solutions) का उपयोग करें',
				],
				importantInfo:
					'MP Board परीक्षा: फरवरी-मार्च | परिणाम: अप्रैल-मई',
				aiContext:
					'Student is in class 10th in Madhya Pradesh wanting to become an engineer. Guide about: target marks, building math/science foundation, choosing the right school for 11th, MP Board vs CBSE comparison. Answer in Hindi with English technical terms. Be specific to MP context.',
				suggestedQuestions: [
					'इंजीनियरिंग के लिए 10वीं में कितने marks चाहिए?',
					'10वीं के बाद कौन सा स्कूल चुनूं?',
					'गणित कैसे मजबूत करूं?',
				],
			},
			{
				id: 'eng-11th-pcm',
				step: 2,
				title: '11वीं में PCM चुनें',
				period: 'कक्षा 11वीं',
				emoji: '📐',
				summary:
					'Physics, Chemistry, Mathematics (PCM) विषय चुनें। यही इंजीनियरिंग का आधार है।',
				details:
					'इंजीनियरिंग के लिए 11वीं में PCM (भौतिकी, रसायन विज्ञान, गणित) लेना अनिवार्य है। 11वीं से ही JEE level की तैयारी शुरू करें।\n\nNCERT के साथ-साथ HC Verma (Physics), RD Sharma (Maths), और OP Tandon (Chemistry) जैसी reference books भी पढ़ें। अगर संभव हो तो किसी अच्छी coaching join करें।',
				tips: [
					'NCERT को बेस बनाएं - हर chapter अच्छे से पढ़ें',
					'HC Verma, RD Sharma जैसी books से practice करें',
					'कोचिंग ज्वाइन करें (ऑफलाइन या ऑनलाइन)',
					'रोज minimum 4-5 घंटे self-study करें',
					'JEE के previous year papers देखना शुरू करें',
				],
				importantInfo:
					'11वीं के syllabus से JEE में ~45% सवाल आते हैं',
				aiContext:
					'Student just entered class 11th with PCM in Madhya Pradesh, wants to become an engineer. Guide about: study plan for PCM, balancing board and JEE prep, best coaching options in MP (Allen, FIITJEE, Unacademy), reference books, daily routine. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'11वीं में JEE की तैयारी कैसे शुरू करूं?',
					'कौन सी coaching best है MP में?',
					'Board और JEE दोनों की तैयारी कैसे balance करूं?',
				],
			},
			{
				id: 'eng-jee-prep',
				step: 3,
				title: 'JEE की तैयारी',
				period: 'कक्षा 11वीं - 12वीं',
				emoji: '🎯',
				summary:
					'JEE Main और Advanced की गंभीर तैयारी करें। Mock tests और revision पर ध्यान दें।',
				details:
					'JEE Main देश की सबसे बड़ी इंजीनियरिंग प्रवेश परीक्षा है। इसमें Physics, Chemistry और Mathematics से 90 सवाल पूछे जाते हैं (75 attempt करने होते हैं)। IIT में admission के लिए JEE Advanced भी पास करना होता है।\n\nJEE Main से NIT, IIIT और GFTI में admission मिलता है। JEE Advanced से IIT में admission होता है।\n\nMP के छात्रों के लिए MP-DTE की काउंसलिंग से भी राज्य के अच्छे कॉलेजों में admission मिल सकता है।',
				tips: [
					'रोज 6-8 घंटे focused study करें',
					'Mock tests नियमित रूप से दें (NTA Abhyas App, Allen Test Series)',
					'कमजोर topics की list बनाएं और उन पर extra मेहनत करें',
					'Previous year JEE papers जरूर solve करें',
					'Time management practice करें - प्रत्येक section को तय समय में पूरा करें',
				],
				importantInfo:
					'JEE Main: जनवरी और अप्रैल (2 attempts) | JEE Advanced: मई-जून',
				aiContext:
					'Student in class 11th-12th in MP preparing for JEE Main and Advanced. Guide about: detailed preparation strategy, important topics, time management, mock test strategy, dealing with stress, MP-specific resources and coaching. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'JEE Main में कितने marks लाने होंगे NIT के लिए?',
					'JEE की तैयारी का daily schedule क्या होना चाहिए?',
					'कौन से topics सबसे important हैं JEE में?',
				],
			},
			{
				id: 'eng-12th-board',
				step: 4,
				title: '12वीं बोर्ड परीक्षा',
				period: 'कक्षा 12वीं (फरवरी-मार्च)',
				emoji: '📝',
				summary:
					'12वीं बोर्ड में 75%+ अंक लाएं। JEE के लिए 75% marks अनिवार्य हैं।',
				details:
					'12वीं बोर्ड परीक्षा JEE admission के लिए बहुत महत्वपूर्ण है। NIT/IIT में admission के लिए 12वीं में minimum 75% marks (SC/ST के लिए 65%) जरूरी हैं।\n\nMP Board और CBSE दोनों के marks मान्य हैं। Board exam की तैयारी JEE prep के parallel चलती रहनी चाहिए।',
				tips: [
					'Board exam में 75%+ marks जरूरी हैं NIT/IIT admission के लिए',
					'NCERT thoroughly पढ़ें - Board exam NCERT based होती है',
					'Previous year board papers solve करें',
					'JEE और Board दोनों के लिए common topics एक साथ cover करें',
				],
				importantInfo:
					'MP Board: फरवरी-मार्च | 75% cutoff NIT/IIT admission के लिए',
				aiContext:
					'Student about to give class 12th board exam in MP, also preparing for JEE. Guide about: balancing board and JEE prep, minimum marks needed, MP Board exam tips, scoring strategy. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Board और JEE दोनों कैसे manage करूं?',
					'12वीं में कम marks आए तो क्या होगा?',
					'MP Board में marks बढ़ाने के tips बताएं',
				],
			},
			{
				id: 'eng-jee-exam',
				step: 5,
				title: 'JEE Main परीक्षा',
				period: 'जनवरी / अप्रैल',
				emoji: '🏆',
				summary:
					'JEE Main परीक्षा दें। 2 attempts मिलते हैं - best score count होता है।',
				details:
					'JEE Main Computer Based Test (CBT) है। इसमें 90 सवाल होते हैं - Physics (30), Chemistry (30), Mathematics (30)। 75 सवाल attempt करने होते हैं। कुल 300 marks की परीक्षा है।\n\nJanuary और April में 2 attempts मिलते हैं। दोनों में से best NTA score consider होता है। Top 2.5 lakh students JEE Advanced के लिए qualify करते हैं।',
				tips: [
					'Exam से पहले 1 महीने revision और mock tests पर focus करें',
					'Exam day पर पहले easy questions solve करें',
					'Negative marking है - unsure होने पर guess न करें',
					'दोनों attempts जरूर दें, January attempt को practice समझें',
					'Exam center पर 1 घंटा पहले पहुंचें',
				],
				importantInfo:
					'JEE Main Session 1: जनवरी | Session 2: अप्रैल | NTA Score based ranking',
				aiContext:
					'Student about to appear for JEE Main exam. Guide about: exam day tips, attempt strategy, time management during exam, what to carry, dealing with exam anxiety, understanding NTA score vs raw marks. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'JEE Main exam day strategy क्या होनी चाहिए?',
					'NIT Bhopal के लिए कितना rank चाहिए?',
					'JEE Main में negative marking कैसे काम करती है?',
				],
			},
			{
				id: 'eng-counseling',
				step: 6,
				title: 'काउंसलिंग प्रक्रिया',
				period: 'जून - जुलाई',
				emoji: '🎪',
				summary:
					'JoSAA (IIT/NIT) या MP DTE काउंसलिंग में participate करें। Choice filling सावधानी से करें।',
				details:
					'JEE Main/Advanced rank के आधार पर काउंसलिंग होती है:\n\n• JoSAA: IIT, NIT, IIIT, GFTI के लिए (All India)\n• CSAB: Special rounds for NITs\n• MP DTE: मध्य प्रदेश के engineering colleges के लिए\n\nChoice filling बहुत important है। अपनी rank के अनुसार realistic choices भरें। Previous year cutoffs जरूर देखें।',
				tips: [
					'Previous year cutoffs research करें (JoSAA website पर available)',
					'Choice filling में realistic और aspirational दोनों colleges भरें',
					'MP domicile certificate बनवा लें (state quota के लिए जरूरी)',
					'सभी documents पहले से ready रखें (marksheet, category certificate, etc.)',
					'Multiple rounds की counseling में participate करें',
				],
				importantInfo:
					'JoSAA: जून-जुलाई (7 rounds) | MP DTE: जुलाई-अगस्त',
				aiContext:
					'Student has JEE rank and now going through engineering counseling in MP. Guide about: JoSAA vs MP DTE counseling, choice filling strategy, understanding cutoffs, documents needed, state quota benefits for MP students, best colleges in MP. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Choice filling कैसे करूं?',
					'MP के best engineering colleges कौन से हैं?',
					'State quota और All India quota में क्या difference है?',
				],
			},
			{
				id: 'eng-college',
				step: 7,
				title: 'कॉलेज और ब्रांच चुनें',
				period: 'जुलाई - अगस्त',
				emoji: '🏛️',
				summary:
					'अपनी rank और interest के अनुसार सबसे अच्छा college और branch चुनें।',
				details:
					'College और branch selection सबसे important decision है। इसमें कई factors consider करें:\n\n• College ranking और reputation\n• Branch/Department की placement record\n• Location और facilities\n• Fee structure और scholarships\n• Alumni network\n\nMP के प्रमुख engineering colleges: MANIT Bhopal (NIT), IIIT Jabalpur, IET-DAVV Indore, SGSITS Indore, MITS Gwalior, UIT-RGPV Bhopal।',
				tips: [
					'Branch > College (अच्छी branch ज्यादा important है)',
					'CS, IT, ECE, Electrical - ये top placement branches हैं',
					'College की official placement data देखें',
					'Senior students से बात करें (LinkedIn/YouTube पर find करें)',
					'Fee structure और scholarship options check करें',
				],
				importantInfo:
					'NIT Bhopal average package: 12-15 LPA | Top MP colleges: MANIT, IIITDM, SGSITS',
				aiContext:
					'Student choosing engineering college and branch in MP. Guide about: top engineering colleges in MP, branch selection strategy (CS vs ECE vs Mechanical etc.), placement statistics, fee comparison, hostel life, what to expect. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'कौन सी branch सबसे अच्छी है placement के लिए?',
					'MANIT Bhopal कैसा college है?',
					'Engineering में fees कितनी लगती है?',
				],
			},
			{
				id: 'eng-btech',
				step: 8,
				title: 'B.Tech पूरा करें',
				period: '4 वर्ष',
				emoji: '👨‍💻',
				summary:
					'Engineering degree पूरी करें। Internships, projects और skills develop करने पर ध्यान दें।',
				details:
					'B.Tech 4 साल (8 semester) का course है। सिर्फ degree लेना काफी नहीं है - skills build करना बहुत जरूरी है।\n\nFirst year में basics पढ़ाए जाते हैं। 2nd year से specialization शुरू होती है। 3rd year में internships और projects करें। Final year में placement या higher studies की तैयारी करें।\n\nCoding skills (Python, Java, C++), communication skills, और practical projects आपकी placement chances बढ़ाते हैं।',
				tips: [
					'CGPA 7.5+ maintain करें (placements के लिए जरूरी)',
					'2nd year से coding और DSA (Data Structures & Algorithms) practice शुरू करें',
					'Summer internships जरूर करें',
					'Personal projects बनाएं और GitHub पर डालें',
					'Competitive programming (CodeChef, LeetCode) में participate करें',
				],
				importantInfo:
					'B.Tech: 4 वर्ष (8 semesters) | Internship: 3rd year summer | Placements: Final year',
				aiContext:
					'Student is doing B.Tech engineering in MP. Guide about: how to make the most of 4 years, building coding skills, internship hunting, maintaining CGPA, extracurricular activities, placement preparation, GATE vs placements. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Engineering में कौन सी skills सीखूं?',
					'Internship कैसे मिलेगी?',
					'Placement की तैयारी कब से शुरू करूं?',
				],
			},
			{
				id: 'eng-career',
				step: 9,
				title: 'GATE / Placement / नौकरी',
				period: 'Final Year और उसके बाद',
				emoji: '🚀',
				summary:
					'Campus placement, GATE, या competitive exams - अपना career path चुनें।',
				details:
					'Engineering के बाद कई options हैं:\n\n• Campus Placement: Companies college में आकर hire करती हैं (6-40+ LPA)\n• GATE: M.Tech या PSU jobs (BHEL, ONGC, IOCL) के लिए\n• Competitive Exams: SSC JE, Railway JE, State Engineering Services\n• Higher Studies: M.Tech (India) या MS (Abroad)\n• Entrepreneurship: अपना startup शुरू करें\n\nGATE qualify करने पर IIT/NIT से M.Tech कर सकते हैं (stipend मिलता है)। PSU jobs में GATE score से direct recruitment होती है।',
				tips: [
					'3rd year से placement prep शुरू करें (Aptitude + Coding + Core)',
					'GATE की तैयारी final year से 1 साल पहले शुरू करें',
					'Resume और LinkedIn profile strong बनाएं',
					'Mock interviews practice करें',
					'Multiple options open रखें - placement और GATE दोनों try करें',
				],
				importantInfo:
					'GATE: फरवरी | Campus Placements: July-March (Final Year) | PSU recruitment: GATE score based',
				aiContext:
					'Student in final year of engineering in MP, exploring career options. Guide about: placement preparation, GATE exam preparation, PSU jobs through GATE, MS abroad options, salary expectations, career growth paths in engineering. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'GATE की तैयारी कैसे करूं?',
					'Engineering के बाद salary कितनी मिलती है?',
					'क्या M.Tech करना जरूरी है?',
				],
			},
		],
	},

	doctor: {
		id: 'doctor',
		title: 'डॉक्टर',
		titleEn: 'Doctor',
		emoji: '🩺',
		gradient: 'from-emerald-600 to-teal-400',
		cardBg: 'from-emerald-900/40 to-teal-900/30',
		description: 'MBBS, MD/MS - मेडिकल क्षेत्र में करियर बनाएं',
		milestones: [
			{
				id: 'doc-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'विज्ञान में मजबूत नींव बनाएं। Biology और Chemistry पर विशेष ध्यान दें।',
				details:
					'डॉक्टर बनने के लिए 10वीं में Science subjects में अच्छी पकड़ होनी चाहिए। Biology, Chemistry और Physics तीनों में मजबूत foundation बनाएं।\n\n10वीं के marks 11वीं में Science stream मिलने के लिए जरूरी हैं। 70%+ marks का लक्ष्य रखें।',
				tips: [
					'Biology में human body systems, cell biology अच्छे से पढ़ें',
					'Chemistry में chemical reactions और periodic table याद करें',
					'NCERT textbooks पूरी तरह cover करें',
					'Science practicals में active participation रखें',
				],
				importantInfo: 'MP Board परीक्षा: फरवरी-मार्च',
				aiContext:
					'Student in class 10th in MP wants to become a doctor. Guide about preparing foundation for medical career, target marks, importance of biology. Answer in Hindi with English terms. Be MP-specific.',
				suggestedQuestions: [
					'Doctor बनने के लिए 10वीं में कितने marks चाहिए?',
					'Biology कैसे मजबूत करूं?',
					'Medical line में कितना समय लगता है?',
				],
			},
			{
				id: 'doc-11th-pcb',
				step: 2,
				title: '11वीं में PCB चुनें',
				period: 'कक्षा 11वीं',
				emoji: '🔬',
				summary:
					'Physics, Chemistry, Biology (PCB) चुनें। NEET की तैयारी शुरू करें।',
				details:
					'Medical career के लिए 11वीं में PCB (Physics, Chemistry, Biology) लेना अनिवार्य है। 11वीं से ही NEET level की तैयारी शुरू करें।\n\nNCERT Biology और Chemistry NEET का backbone है। Physics थोड़ा challenging होता है medical students के लिए, इसलिए extra practice करें।\n\nMP में NEET coaching के लिए Bhopal, Indore और Kota (राजस्थान) popular हैं।',
				tips: [
					'NCERT Biology line-by-line पढ़ें - NEET में directly questions आते हैं',
					'NCERT Chemistry (Organic + Inorganic) thoroughly करें',
					'Physics के लिए HC Verma और DC Pandey useful हैं',
					'NEET coaching join करें (Allen, Aakash, या online platforms)',
					'Daily 5-6 hours self-study करें',
				],
				importantInfo:
					'NEET syllabus = NCERT 11th + 12th | Biology: 360 marks, Chemistry: 180, Physics: 180',
				aiContext:
					'Student entered class 11th with PCB in MP, preparing for NEET. Guide about: study plan, NCERT importance, coaching options in MP, daily routine for NEET preparation. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'NEET की तैयारी 11वीं से कैसे शुरू करूं?',
					'NCERT कैसे पढ़ूं NEET के लिए?',
					'MP में best medical coaching कौन सी है?',
				],
			},
			{
				id: 'doc-neet-prep',
				step: 3,
				title: 'NEET की तैयारी',
				period: 'कक्षा 11वीं - 12वीं',
				emoji: '🎯',
				summary:
					'NEET UG परीक्षा के लिए गहन तैयारी करें। NCERT master करें।',
				details:
					'NEET UG भारत की एकमात्र medical entrance exam है। कुल 720 marks (180 questions × 4 marks):\n• Biology: 90 questions (360 marks)\n• Chemistry: 45 questions (180 marks)\n• Physics: 45 questions (180 marks)\n\nNCERT textbook NEET preparation का सबसे important resource है। 90%+ questions NCERT based होते हैं।\n\n2024 में NEET cutoff (General): ~720 में 137+ marks (50th percentile)। Government MBBS seat के लिए 550+ marks चाहिए।',
				tips: [
					'NCERT Biology हर line को 3-4 बार पढ़ें',
					'Previous 10 years NEET papers solve करें',
					'Weekly mock tests दें',
					'Revision schedule बनाएं - हर 15 दिन में पूरा syllabus revise करें',
					'Biology diagrams regularly practice करें',
				],
				importantInfo:
					'NEET: मई (साल में 1 बार) | Government MBBS cutoff: ~550+/720',
				aiContext:
					'Student preparing for NEET UG in MP. Guide about: detailed preparation strategy, NCERT mastery tips, mock test strategy, handling pressure, MP state quota cutoffs for medical colleges. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'NEET में government college के लिए कितने marks चाहिए?',
					'NEET preparation का best strategy क्या है?',
					'MP में medical colleges की cutoff कितनी है?',
				],
			},
			{
				id: 'doc-neet-exam',
				step: 4,
				title: 'NEET UG परीक्षा',
				period: 'मई',
				emoji: '🏆',
				summary:
					'NEET UG exam दें। 720 में से maximum marks लाने का लक्ष्य रखें।',
				details:
					'NEET UG pen-and-paper based exam है (OMR sheet)। 3 घंटे 20 मिनट का समय मिलता है 200 questions के लिए (180 attempt करने हैं)।\n\nMarking: +4 for correct, -1 for wrong। इसलिए accuracy बहुत important है।\n\nExam day tips: OMR sheet carefully fill करें, time management करें, Biology पहले attempt करें (highest weightage)।',
				tips: [
					'Exam से 1 महीना पहले सिर्फ revision और mock tests करें',
					'OMR sheet practice करें (bubble filling speed बढ़ाएं)',
					'Biology → Chemistry → Physics क्रम में attempt करें',
					'Exam hall में panic न करें, deep breathing करें',
					'पानी और permitted items ही ले जाएं',
				],
				importantInfo:
					'NEET UG: मई (Offline/OMR) | 3 hrs 20 min | 720 marks',
				aiContext:
					'Student about to appear for NEET UG exam. Guide about: exam day strategy, time management, OMR sheet tips, what to carry, dealing with anxiety, attempt strategy. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'NEET exam day strategy क्या होनी चाहिए?',
					'NEET में time management कैसे करूं?',
					'Exam के पहले दिन क्या करूं?',
				],
			},
			{
				id: 'doc-counseling',
				step: 5,
				title: 'MP State काउंसलिंग',
				period: 'जून - अगस्त',
				emoji: '🏥',
				summary:
					'DME MP काउंसलिंग में participate करें। State quota से MP के medical colleges में admission लें।',
				details:
					'NEET score के basis पर counseling होती है:\n\n• All India Quota (AIQ): 15% seats - MCC (Medical Counselling Committee) द्वारा\n• State Quota: 85% seats - DME MP (Directorate of Medical Education) द्वारा\n\nMP के Government Medical Colleges: Gandhi Medical College Bhopal, MGM Medical College Indore, GR Medical College Gwalior, SS Medical College Rewa, Bundelkhand MC Sagar आदि।\n\nPrivate medical colleges में भी NEET score से admission होता है।',
				tips: [
					'MP domicile certificate जरूर बनवाएं (state quota के लिए)',
					'Previous year cutoffs research करें (DME MP website)',
					'Choice filling में Government colleges को priority दें',
					'सभी rounds में participate करें - seats बाद में भी मिल सकती हैं',
					'Documents: 10th, 12th marksheet, NEET scorecard, domicile, caste certificate',
				],
				importantInfo:
					'AIQ Counseling: MCC | State Quota: DME MP | MP Govt. MBBS seats: ~2000+',
				aiContext:
					'Student has NEET score and going through medical counseling in MP. Guide about: AIQ vs state quota, DME MP counseling process, choice filling strategy, best medical colleges in MP, documents needed, fee structure. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'MP में best government medical college कौन सा है?',
					'Medical counseling में choice filling कैसे करूं?',
					'MBBS की fees कितनी है government college में?',
				],
			},
			{
				id: 'doc-mbbs',
				step: 6,
				title: 'MBBS (5.5 वर्ष)',
				period: '5.5 वर्ष (4.5 + 1 Internship)',
				emoji: '👨‍⚕️',
				summary:
					'MBBS degree पूरी करें। Clinical skills और patient care सीखें।',
				details:
					'MBBS 5.5 साल का course है:\n• Pre-clinical (1.5 years): Anatomy, Physiology, Biochemistry\n• Para-clinical (1 year): Pharmacology, Pathology, Microbiology, Forensic Medicine\n• Clinical (1.5 years): Medicine, Surgery, OBG, Pediatrics, ENT, Ophthalmology\n• Internship (1 year): Rotatory internship in all departments\n\nMBBS के बाद आप Dr. title use कर सकते हैं और practice शुरू कर सकते हैं।',
				tips: [
					'Anatomy में dissection और diagrams पर focus करें',
					'Clinical postings में actively participate करें',
					'NEET PG की तैयारी MBBS के साथ ही शुरू करें',
					'Research papers और case studies पढ़ें',
					'Communication skills develop करें - patient interaction बहुत important है',
				],
				importantInfo:
					'MBBS: 5.5 years | Govt. college fees: ~₹20,000-50,000/year | Private: ₹10-25 lakh/year',
				aiContext:
					'Student doing MBBS in MP. Guide about: how to excel in MBBS, important subjects, clinical posting tips, preparing for NEET PG alongside, career options after MBBS. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'MBBS में सबसे difficult subject कौन सा है?',
					'NEET PG की तैयारी कब शुरू करूं?',
					'MBBS के बाद कितनी salary मिलती है?',
				],
			},
			{
				id: 'doc-pg',
				step: 7,
				title: 'NEET PG / विशेषज्ञता',
				period: 'MBBS के बाद',
				emoji: '🔬',
				summary:
					'NEET PG पास करके MD/MS (Specialization) करें। Specialist doctor बनें।',
				details:
					'MBBS के बाद specialization के लिए NEET PG exam देना होता है। MD/MS 3 साल का course है।\n\nPopular specializations:\n• MD Medicine, MD Pediatrics, MD Dermatology, MD Radiology\n• MS Surgery, MS Orthopedics, MS ENT, MS Ophthalmology\n\nSpecialist doctors की demand और salary MBBS से काफी ज्यादा होती है। Government hospital में specialist की salary ₹1-2 lakh/month और private practice से और ज्यादा कमाई हो सकती है।',
				tips: [
					'MBBS 3rd year से NEET PG prep शुरू करें',
					'Marrow, PrepLadder जैसे platforms use करें',
					'Clinical knowledge strong रखें - ये PG exam में help करता है',
					'Branch selection carefully करें - interest और scope दोनों देखें',
					'MD Dermatology, Radiology - ये high-earning specializations हैं',
				],
				importantInfo:
					'NEET PG: मार्च | MD/MS: 3 years | Super-specialization (DM/MCh): 3 years after MD/MS',
				aiContext:
					'Student has completed MBBS and exploring PG options. Guide about: NEET PG preparation, best specializations by scope and salary, government vs private PG seats, super-specialization options. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'कौन सी specialization सबसे अच्छी है?',
					'NEET PG की तैयारी कैसे करूं?',
					'Doctor बनने में total कितना समय लगता है?',
				],
			},
		],
	},

	ias: {
		id: 'ias',
		title: 'IAS/IPS अधिकारी',
		titleEn: 'IAS/IPS Officer',
		emoji: '🏛️',
		gradient: 'from-amber-600 to-yellow-400',
		cardBg: 'from-amber-900/40 to-yellow-900/30',
		description: 'UPSC Civil Services - देश की सबसे प्रतिष्ठित परीक्षा',
		milestones: [
			{
				id: 'ias-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'मजबूत academic foundation बनाएं। सामान्य ज्ञान और current affairs में रुचि विकसित करें।',
				details:
					'IAS/IPS बनने के लिए 10वीं से ही अपनी सोच और general awareness विकसित करें। अखबार पढ़ने की आदत बनाएं, सामान्य ज्ञान की किताबें पढ़ें।\n\nकिसी भी stream (Science/Commerce/Arts) से IAS बन सकते हैं। लेकिन जो भी stream चुनें, उसमें अच्छे marks लाएं।',
				tips: [
					'रोज अखबार पढ़ने की आदत बनाएं (Dainik Bhaskar, The Hindu)',
					'सामान्य ज्ञान की किताबें पढ़ें',
					'Hindi और English दोनों भाषाओं में मजबूत बनें',
					'Current affairs quiz solve करें',
				],
				importantInfo: 'UPSC के लिए कोई भी stream choose कर सकते हैं',
				aiContext:
					'Student in class 10th in MP wants to become an IAS/IPS officer. Guide about: foundation building, importance of general awareness, which stream to choose, inspiration from MP IAS officers. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'IAS बनने के लिए कौन सा subject लूं?',
					'IAS की तैयारी कब से शुरू करूं?',
					'IAS बनने में कितना समय लगता है?',
				],
			},
			{
				id: 'ias-12th',
				step: 2,
				title: '11वीं-12वीं पूरी करें',
				period: 'कक्षा 11वीं - 12वीं',
				emoji: '📖',
				summary:
					'कोई भी stream चुनें। Humanities/Arts UPSC के लिए directly helpful है।',
				details:
					'UPSC के लिए कोई specific stream जरूरी नहीं है। लेकिन:\n\n• Arts/Humanities: History, Political Science, Geography - ये UPSC GS papers से directly match करते हैं\n• Science: Analytical thinking develop होती है\n• Commerce: Economics paper में help करता है\n\n11वीं-12वीं में अच्छे marks लाएं और graduation के लिए तैयारी करें।',
				tips: [
					'जो subject में interest है वो stream चुनें',
					'NCERT 11th-12th History, Geography, Polity की books बाद में UPSC prep में काम आएंगी',
					'Essay writing practice करें',
					'Debate और public speaking में participate करें',
				],
				importantInfo:
					'UPSC के लिए minimum qualification: किसी भी विषय में Graduation',
				aiContext:
					'Student in class 11th-12th in MP aiming for UPSC. Guide about: which stream is best for UPSC, how to utilize school time for UPSC foundation, NCERT importance, activity suggestions. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'UPSC के लिए Arts लूं या Science?',
					'11वीं-12वीं में UPSC के लिए क्या पढ़ूं?',
					'कौन सी books पढ़ूं IAS prep के लिए?',
				],
			},
			{
				id: 'ias-graduation',
				step: 3,
				title: 'स्नातक (Graduation)',
				period: '3-4 वर्ष',
				emoji: '🎓',
				summary:
					'किसी भी विषय में graduation करें। UPSC optional subject को ध्यान में रखें।',
				details:
					'UPSC के लिए किसी भी recognized university से graduation जरूरी है। MP में अच्छी universities:\n\n• Devi Ahilya University, Indore\n• Barkatullah University, Bhopal\n• Rani Durgavati University, Jabalpur\n• Jiwaji University, Gwalior\n\nGraduation में ऐसा subject लें जो UPSC optional के रूप में भी use कर सकें (History, Geography, Political Science, Sociology, Public Administration)।\n\nGraduation के final year से UPSC preparation seriously शुरू करें।',
				tips: [
					'UPSC optional subject के हिसाब से graduation subject चुनें',
					'Graduation में 60%+ marks maintain करें',
					'NCERT 6th-12th सभी History, Geography, Polity books पढ़ लें',
					'Final year से coaching join करें (Delhi या online)',
					'English और Hindi दोनों में writing practice करें',
				],
				importantInfo:
					'UPSC age limit: 21-32 years (General) | 6 attempts | OBC: 35 years, 9 attempts | SC/ST: 37 years, unlimited',
				aiContext:
					'Student doing graduation in MP, planning for UPSC. Guide about: best graduation subjects for UPSC, how to start preparation during graduation, NCERT reading plan, coaching options. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Graduation में कौन सा subject लूं UPSC के लिए?',
					'UPSC की तैयारी graduation के साथ कैसे करूं?',
					'UPSC optional subject कौन सा best है?',
				],
			},
			{
				id: 'ias-prep',
				step: 4,
				title: 'UPSC की तैयारी',
				period: '1-2 वर्ष (Dedicated)',
				emoji: '🎯',
				summary:
					'Dedicated UPSC preparation करें। Prelims, Mains और Interview तीनों stages के लिए तैयारी करें।',
				details:
					'UPSC Civil Services Exam 3 stages में होती है:\n1. Prelims (Objective): GS Paper I + CSAT\n2. Mains (Written): 9 papers (Essay, GS I-IV, Optional I-II, Hindi, English)\n3. Interview/Personality Test: 275 marks\n\nPreparation plan:\n• Months 1-6: NCERT foundation + basic books\n• Months 7-12: Advanced study + answer writing\n• Months 13-18: Revision + mock tests + current affairs',
				tips: [
					'Daily routine: 8-10 hours study, newspaper reading, answer writing practice',
					'The Hindu / Indian Express newspaper रोज पढ़ें',
					'Answer writing daily practice करें (UPSC Mains का key skill)',
					'Monthly magazine: Yojana, Kurukshetra, Down to Earth',
					'Test series join करें (Vision IAS, Forum IAS)',
				],
				importantInfo:
					'UPSC Prelims: जून | Mains: सितंबर | Interview: जनवरी-मार्च',
				aiContext:
					'Student preparing for UPSC Civil Services in MP. Guide about: detailed preparation strategy, booklist, daily routine, answer writing tips, optional subject selection, dealing with multiple attempts. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'UPSC की complete booklist बताएं',
					'Daily routine क्या होना चाहिए UPSC prep के लिए?',
					'Answer writing कैसे improve करूं?',
				],
			},
			{
				id: 'ias-prelims',
				step: 5,
				title: 'UPSC Prelims',
				period: 'जून',
				emoji: '📋',
				summary:
					'Prelims qualify करें - GS Paper I और CSAT दोनों papers clear करें।',
				details:
					'UPSC Prelims screening test है - इसके marks final merit में नहीं जुड़ते, लेकिन Mains के लिए qualify करना जरूरी है।\n\n• GS Paper I: 100 questions, 200 marks (History, Geography, Polity, Economy, Science, Current Affairs)\n• CSAT: 80 questions, 200 marks (Comprehension, Logic, Math, Decision Making) - Qualifying (33%)\n\nCutoff usually 90-100/200 (GS Paper I) के आसपास रहती है।',
				tips: [
					'Current affairs last 1 year का thoroughly cover करें',
					'NCERT based questions ज्यादा आते हैं',
					'Elimination technique use करें (wrong options हटाएं)',
					'Time management: 2 hours में 100 questions',
					'CSAT को ignore न करें - qualifying marks जरूरी हैं',
				],
				importantInfo:
					'Prelims: जून | 2 Papers | GS I + CSAT | Qualifying nature',
				aiContext:
					'Student about to appear for UPSC Prelims. Guide about: last-minute preparation tips, important topics, exam strategy, time management, previous year trends. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Prelims में cutoff कितनी जाती है?',
					'CSAT prepare कैसे करूं?',
					'Prelims के last 1 month में क्या करूं?',
				],
			},
			{
				id: 'ias-mains',
				step: 6,
				title: 'UPSC Mains',
				period: 'सितंबर',
				emoji: '✍️',
				summary:
					'Mains परीक्षा लिखें - 9 papers, 1750 marks। Answer writing quality सबसे important है।',
				details:
					'UPSC Mains descriptive exam है - 5 दिनों में 9 papers:\n\n• Essay: 250 marks (2 essays)\n• GS I: Indian Heritage, History, Geography (250 marks)\n• GS II: Governance, Constitution, Polity (250 marks)\n• GS III: Economy, Science, Environment (250 marks)\n• GS IV: Ethics, Integrity, Aptitude (250 marks)\n• Optional Paper I & II: 250+250 marks\n• Hindi & English: Qualifying\n\nAnswer writing quality, structure और presentation बहुत matter करते हैं।',
				tips: [
					'Answer writing practice - daily 3-4 answers लिखें',
					'Introduction और conclusion strong रखें',
					'Diagrams, flowcharts, maps use करें answers में',
					'Word limit follow करें strictly',
					'Ethics paper को underestimate न करें - scoring paper है',
				],
				importantInfo:
					'Mains: सितंबर (5 days) | 1750 marks | 9 Papers | Descriptive',
				aiContext:
					'Student appearing for UPSC Mains exam. Guide about: answer writing strategy, paper-wise preparation, time management in exam, presentation tips, optional paper strategy. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Mains answer writing कैसे improve करूं?',
					'कौन सा optional subject scoring है?',
					'Ethics paper की preparation कैसे करूं?',
				],
			},
			{
				id: 'ias-interview',
				step: 7,
				title: 'Interview / Personality Test',
				period: 'जनवरी - अप्रैल',
				emoji: '🎤',
				summary:
					'275 marks का personality test clear करें। Confidence और knowledge दोनों जरूरी हैं।',
				details:
					'UPSC Interview 275 marks का है। Board members आपके personality, awareness, leadership qualities, और communication skills test करते हैं।\n\nQuestions आपके DAF (Detailed Application Form), hobbies, home state (MP), current affairs, और ethical dilemmas पर पूछे जाते हैं।\n\nMP से related questions: MP की geography, history, culture, current issues, government schemes।',
				tips: [
					'DAF thoroughly prepare करें - हर point पर सवाल आ सकता है',
					'MP के बारे में detailed knowledge रखें',
					'Mock interviews दें (Coaching centers या online)',
					'Current affairs और government policies जानें',
					'Honest और confident रहें - नहीं जानते तो बोलें',
				],
				importantInfo:
					'Interview: 275 marks | Duration: 25-30 minutes | UPSC Board: Chairman + 4 members',
				aiContext:
					'Student selected for UPSC interview from MP. Guide about: interview preparation, common questions, DAF preparation, MP-specific knowledge needed, mock interview importance, body language tips. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'UPSC interview में क्या पूछा जाता है?',
					'Mock interview कहाँ से दूं?',
					'MP के बारे में क्या-क्या जानना चाहिए interview के लिए?',
				],
			},
			{
				id: 'ias-training',
				step: 8,
				title: 'LBSNAA प्रशिक्षण',
				period: 'चयन के बाद',
				emoji: '🏅',
				summary:
					'Lal Bahadur Shastri National Academy of Administration, Mussoorie में training करें।',
				details:
					'Final selection के बाद IAS officers को LBSNAA Mussoorie में training दी जाती है। Training approximately 2 years की होती है:\n\n• Foundation Course: 4 months (सभी services के officers साथ)\n• Phase I: District training (1 year)\n• Phase II: Professional training at LBSNAA\n\nTraining में administration, law, economics, management, horse riding, trekking आदि सिखाया जाता है।\n\nTraining के बाद आपको district level पर posting मिलती है। IAS की starting salary ~₹56,100/month + allowances।',
				tips: [
					'Training को seriously लें - यहां real administration सीखेंगे',
					'District training में ground reality समझें',
					'Seniors से सीखें और networking करें',
					'Physical fitness maintain करें',
					'Public service mindset develop करें',
				],
				importantInfo:
					'LBSNAA Training: ~2 years | Starting salary: ₹56,100 + allowances | First posting: SDM/ADM',
				aiContext:
					'Student selected for IAS and going to LBSNAA training. Guide about: what to expect in training, IAS career trajectory, salary and perks, posting patterns, life as an IAS officer. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'IAS officer की salary कितनी होती है?',
					'IAS training में क्या सिखाया जाता है?',
					'IAS officer का career कैसे grow करता है?',
				],
			},
		],
	},

	teacher: {
		id: 'teacher',
		title: 'शिक्षक',
		titleEn: 'Teacher',
		emoji: '👨‍🏫',
		gradient: 'from-violet-600 to-purple-400',
		cardBg: 'from-violet-900/40 to-purple-900/30',
		description: 'सरकारी शिक्षक बनें - MP संविदा शाला शिक्षक',
		milestones: [
			{
				id: 'teach-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'अच्छे अंकों से 10वीं पास करें। जिस विषय में शिक्षक बनना है उसमें रुचि विकसित करें।',
				details:
					'शिक्षक बनने के लिए सबसे पहले अच्छी शिक्षा लें। 10वीं में 60%+ marks लाएं।\n\nPrimary teacher (कक्षा 1-5) के लिए 12th + D.El.Ed काफी है। Middle school (कक्षा 6-8) के लिए Graduation + B.Ed चाहिए। High school (कक्षा 9-12) के लिए Post-Graduation + B.Ed जरूरी है।',
				tips: [
					'जिस subject में interest है उसे मजबूत करें',
					'Communication skills develop करें',
					'Explanation ability (समझाने की क्षमता) बढ़ाएं',
					'Hindi और English दोनों में अच्छे बनें',
				],
				importantInfo:
					'Primary: 12th + D.El.Ed | Middle: Grad + B.Ed | High School: PG + B.Ed',
				aiContext:
					'Student in class 10th in MP wants to become a teacher. Guide about: different levels of teaching career, educational requirements, government teacher recruitment process in MP. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'सरकारी शिक्षक बनने के लिए क्या करना होगा?',
					'Teacher बनने में कितना समय लगता है?',
					'Primary और High School teacher में क्या difference है?',
				],
			},
			{
				id: 'teach-12th',
				step: 2,
				title: '12वीं पास करें',
				period: 'कक्षा 11वीं - 12वीं',
				emoji: '📖',
				summary:
					'अपने interest के अनुसार stream चुनें। जिस विषय का शिक्षक बनना है वो stream लें।',
				details:
					'अगर Science teacher बनना है तो Science stream लें, Commerce teacher के लिए Commerce, और Arts teacher के लिए Arts stream।\n\n12वीं में 50%+ marks जरूरी हैं B.Ed admission के लिए। अच्छे marks लाएं ताकि अच्छे college में graduation हो सके।',
				tips: [
					'12वीं में 50%+ marks minimum जरूरी हैं',
					'अपने chosen subject में deep knowledge बनाएं',
					'Computer knowledge basic level पर सीखें',
					'Group study और peer teaching practice करें',
				],
				importantInfo:
					'B.Ed admission के लिए minimum 50% marks in 12th/Graduation',
				aiContext:
					'Student in 11th-12th wanting to become a teacher in MP. Guide about: which stream to choose, target marks, preparing for graduation and B.Ed. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'शिक्षक बनने के लिए कौन सी stream लूं?',
					'12वीं के बाद D.El.Ed या Graduation - क्या बेहतर है?',
					'Primary teacher बनने का process क्या है?',
				],
			},
			{
				id: 'teach-graduation',
				step: 3,
				title: 'स्नातक (Graduation)',
				period: '3 वर्ष',
				emoji: '🎓',
				summary:
					'BA/BSc/BCom या relevant graduation complete करें। 50%+ marks जरूरी हैं।',
				details:
					'Graduation शिक्षक बनने के लिए जरूरी step है। MP की universities से graduation करें:\n\n• Barkatullah University, Bhopal\n• DAVV, Indore\n• RDVV, Jabalpur\n• Jiwaji University, Gwalior\n\nGraduation में जो subject main रखेंगे, उसी subject के शिक्षक बन सकते हैं। B.Ed admission के लिए minimum 50% marks जरूरी हैं (SC/ST: 45%)।',
				tips: [
					'Teaching subject में deep knowledge develop करें',
					'Graduation में 50%+ marks maintain करें',
					'B.Ed entrance exam की preparation करें',
					'Computer proficiency certificate (CCC/DCA) करें',
					'Teaching related extra activities में participate करें',
				],
				importantInfo:
					'Graduation minimum 50% marks | B.Ed admission: MP B.Ed entrance exam',
				aiContext:
					'Student doing graduation in MP to become a teacher. Guide about: subject selection, marks requirement, B.Ed entrance preparation, best universities in MP. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'B.Ed में admission कैसे होता है?',
					'Graduation में कौन सा subject रखूं?',
					'Government teacher की salary कितनी है?',
				],
			},
			{
				id: 'teach-bed',
				step: 4,
				title: 'B.Ed (2 वर्ष)',
				period: '2 वर्ष',
				emoji: '🏫',
				summary:
					'Bachelor of Education (B.Ed) degree पूरी करें। Teaching methodology और pedagogy सीखें।',
				details:
					'B.Ed 2 साल का professional degree course है जो teaching के लिए जरूरी है। MP में B.Ed admission MP B.Ed entrance exam के through होता है।\n\nB.Ed में सीखेंगे:\n• Teaching methodology और techniques\n• Child psychology\n• Classroom management\n• Subject-specific pedagogy\n• Practicum / Teaching practice (स्कूल में पढ़ाना)\n\nB.Ed Government college fees: ~₹5,000-15,000/year\nPrivate college: ~₹30,000-80,000/year',
				tips: [
					'Teaching practice को seriously लें - real experience मिलता है',
					'Child psychology अच्छे से समझें',
					'Innovative teaching methods सीखें',
					'TET/CTET syllabus side by side prepare करें',
					'Digital teaching tools सीखें (Smart board, PPT, etc.)',
				],
				importantInfo:
					'B.Ed: 2 years | MP B.Ed Entrance Exam | Govt college fees: ~₹15,000/year',
				aiContext:
					'Student doing B.Ed in MP. Guide about: what to learn in B.Ed, how to prepare for TET/CTET alongside, teaching practice tips, government vs private B.Ed colleges. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'B.Ed के साथ TET की तैयारी कैसे करूं?',
					'B.Ed में क्या सिखाया जाता है?',
					'MP में best B.Ed colleges कौन से हैं?',
				],
			},
			{
				id: 'teach-tet',
				step: 5,
				title: 'TET / CTET परीक्षा',
				period: 'B.Ed के बाद',
				emoji: '📋',
				summary:
					'Teacher Eligibility Test (TET/CTET) pass करें। यह सरकारी शिक्षक बनने के लिए अनिवार्य है।',
				details:
					'TET/CTET शिक्षक बनने के लिए eligibility test है:\n\n• CTET (Central): CBSE conducts, central government schools के लिए\n• MP TET: MP government schools के लिए\n\nPaper I: Class 1-5 teaching के लिए\nPaper II: Class 6-8 teaching के लिए\n\nCTET में 60% marks pass करने के लिए जरूरी हैं (SC/ST: 55%)। CTET certificate lifetime valid है।',
				tips: [
					'Child Development & Pedagogy thoroughly पढ़ें',
					'Previous year papers solve करें',
					'NCERT 1-8 की textbooks दोबारा पढ़ें',
					'Mock tests regular दें',
					'Both Paper I and Paper II attempt करें (ज्यादा options)',
				],
				importantInfo:
					'CTET: साल में 2 बार | MP TET: Notified by MP govt | CTET lifetime validity',
				aiContext:
					'Student preparing for TET/CTET exam in MP. Guide about: exam pattern, preparation strategy, important topics, paper I vs paper II, books and resources. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'CTET की तैयारी कैसे करूं?',
					'TET और CTET में क्या difference है?',
					'CTET में passing marks कितने हैं?',
				],
			},
			{
				id: 'teach-samvida',
				step: 6,
				title: 'MP संविदा शाला शिक्षक परीक्षा',
				period: 'TET के बाद',
				emoji: '📝',
				summary:
					'MP संविदा शिक्षक भर्ती परीक्षा (Varg 1/2/3) pass करें।',
				details:
					'MP में सरकारी शिक्षक बनने के लिए संविदा शाला शिक्षक परीक्षा देनी होती है:\n\n• Varg 3: Primary teacher (कक्षा 1-5) - 12th + D.El.Ed/B.Ed\n• Varg 2: Middle school teacher (कक्षा 6-8) - Graduation + B.Ed\n• Varg 1: High school teacher (कक्षा 9-12) - Post-Graduation + B.Ed\n\nPariksha में General Knowledge, Reasoning, Hindi, English, और Teaching subject से questions आते हैं।\n\nMP Professional Examination Board (MPPEB/Vyapam) conduct करता है।',
				tips: [
					'Vyapam previous year papers solve करें',
					'MP GK (MP का सामान्य ज्ञान) अच्छे से पढ़ें',
					'Teaching subject की NCERT books दोबारा पढ़ें',
					'Hindi grammar और English grammar practice करें',
					'Current affairs (especially MP related) follow करें',
				],
				importantInfo:
					'Vyapam conducts | Varg 1: PG+B.Ed | Varg 2: Grad+B.Ed | Varg 3: 12th+D.El.Ed',
				aiContext:
					'Student preparing for MP Samvida Shala Shikshak exam. Guide about: Varg 1/2/3 differences, exam pattern, syllabus, preparation strategy, selection process, posting. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'संविदा शिक्षक Varg 1, 2, 3 में क्या difference है?',
					'संविदा शिक्षक की salary कितनी है?',
					'Vyapam exam की तैयारी कैसे करूं?',
				],
			},
			{
				id: 'teach-career',
				step: 7,
				title: 'शिक्षक नियुक्ति और करियर',
				period: 'Selection के बाद',
				emoji: '🎖️',
				summary:
					'सरकारी शिक्षक के रूप में नियुक्ति पाएं। Career में promotion और growth के अवसर हैं।',
				details:
					'Selection के बाद MP government school में posting मिलती है। शिक्षक career progression:\n\n• Assistant Teacher → Senior Teacher → Vice Principal → Principal\n• Promotion exams और seniority basis पर promotion होता है\n\nSalary (7th Pay Commission):\n• Varg 3 (Primary): ~₹25,000-35,000/month starting\n• Varg 2 (Middle): ~₹35,000-45,000/month starting\n• Varg 1 (High School): ~₹45,000-60,000/month starting\n\n+ DA, HRA, और other allowances extra',
				tips: [
					'Teaching को passion बनाएं, न कि सिर्फ job',
					'Students के साथ अच्छे relations बनाएं',
					'Innovative teaching methods adopt करें',
					'Promotion exams की तैयारी करें',
					'Higher education (M.Ed, Ph.D) continue करें career growth के लिए',
				],
				importantInfo:
					'Starting salary: ₹25,000-60,000/month (Varg wise) | Job security: Permanent after probation',
				aiContext:
					'Student selected as government teacher in MP. Guide about: career growth, salary details, promotion process, teaching tips, life as a government teacher in MP. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'सरकारी शिक्षक की salary कितनी है MP में?',
					'शिक्षक से Principal कैसे बनें?',
					'Teaching career में growth कैसे करें?',
				],
			},
		],
	},

	police: {
		id: 'police',
		title: 'पुलिस',
		titleEn: 'Police',
		emoji: '👮',
		gradient: 'from-red-600 to-orange-400',
		cardBg: 'from-red-900/40 to-orange-900/30',
		description: 'MP Police - Constable, SI, DSP बनें',
		milestones: [
			{
				id: 'pol-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'10वीं पास करें और शारीरिक fitness पर ध्यान देना शुरू करें।',
				details:
					'Police में career के लिए शारीरिक fitness सबसे important है। 10वीं से ही running, exercise और sports में active रहें।\n\nConstable के लिए 10th pass काफी है लेकिन Sub-Inspector और ऊपर के posts के लिए graduation जरूरी है।\n\nMP Police physical standards: Height - 167.5 cm (Male), 152.4 cm (Female), Chest - 81 cm (Male)।',
				tips: [
					'Daily running practice करें (5 km minimum)',
					'Physical fitness - push-ups, pull-ups, squats करें',
					'Height और weight standards check करें',
					'Studies में भी अच्छे marks लाएं',
				],
				importantInfo:
					'Constable: 10th pass | SI: Graduation | Height: 167.5cm (M), 152.4cm (F)',
				aiContext:
					'Student in 10th in MP wants to join police. Guide about: physical requirements, educational qualifications for different ranks, how to start preparation. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Police में भर्ती के लिए height कितनी चाहिए?',
					'Constable और SI में क्या difference है?',
					'Physical fitness कैसे बढ़ाऊं?',
				],
			},
			{
				id: 'pol-12th',
				step: 2,
				title: '12वीं पास करें',
				period: 'कक्षा 11वीं - 12वीं',
				emoji: '📖',
				summary:
					'12वीं पास करें। Constable भर्ती के लिए apply कर सकते हैं। SI के लिए graduation जरूरी है।',
				details:
					'12वीं pass करने के बाद MP Police Constable भर्ती के लिए apply कर सकते हैं। लेकिन career growth के लिए graduation करना recommended है।\n\nSub-Inspector (SI) और ऊपर के posts (DSP through MPPSC) के लिए graduation degree जरूरी है।\n\n12वीं के साथ physical training continue रखें।',
				tips: [
					'Physical training daily continue रखें',
					'General Knowledge और Reasoning की books पढ़ें',
					'Computer basic knowledge सीखें',
					'Graduation करें - ज्यादा opportunities मिलेंगी',
					'Running time improve करें (800m और 1600m)',
				],
				importantInfo:
					'Constable: 18-28 years | SI: 21-28 years | MPPSC (DSP): 21-40 years',
				aiContext:
					'Student in 11th-12th wanting to join MP Police. Guide about: constable vs SI path, importance of graduation, physical training plan, age limits. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'12वीं के बाद directly police join कर सकते हैं?',
					'Police की तैयारी कैसे शुरू करूं?',
					'Running कैसे improve करूं?',
				],
			},
			{
				id: 'pol-graduation',
				step: 3,
				title: 'स्नातक करें (SI के लिए)',
				period: '3 वर्ष',
				emoji: '🎓',
				summary:
					'Graduation complete करें। Sub-Inspector और DSP posts के लिए जरूरी है।',
				details:
					'SI (Sub-Inspector) बनने के लिए किसी भी विषय में graduation जरूरी है। Graduation के साथ-साथ:\n\n• Physical training जारी रखें\n• GK, Reasoning, Math, Hindi, English पढ़ें\n• MP GK (MP का इतिहास, भूगोल, संस्कृति) अच्छे से पढ़ें\n• Previous year papers solve करें\n\nDSP (Deputy SP) बनने के लिए MPPSC State Services exam दे सकते हैं।',
				tips: [
					'Graduation + physical fitness दोनों maintain करें',
					'Lucent GK, Arihant Reasoning books पढ़ें',
					'Hindi grammar और English grammar practice करें',
					'MP के सामान्य ज्ञान पर special focus',
					'Previous year Vyapam papers solve करें',
				],
				importantInfo:
					'SI: Graduation required | DSP: MPPSC exam | Both need physical fitness',
				aiContext:
					'Student doing graduation in MP to join police as SI. Guide about: preparation plan, physical fitness alongside studies, exam pattern, important topics. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'SI exam का pattern क्या है?',
					'DSP कैसे बनें?',
					'Physical और written दोनों कैसे prepare करूं?',
				],
			},
			{
				id: 'pol-exam',
				step: 4,
				title: 'MP Police भर्ती परीक्षा',
				period: 'Notification अनुसार',
				emoji: '📝',
				summary:
					'MP Police Constable/SI भर्ती परीक्षा दें। Written + Physical + Medical test होता है।',
				details:
					'MP Police भर्ती MPPEB (Vyapam) conduct करता है। Selection process:\n\n1. Written Exam (100 marks): GK, Reasoning, Math, Hindi, Science, MP GK\n2. Physical Efficiency Test (PET): Running, Long Jump, Shot Put\n3. Physical Standards Test (PST): Height, Chest measurement\n4. Medical Examination\n5. Document Verification\n\nConstable written exam relatively easier है, SI exam tough होता है (GS, Math, Reasoning, Hindi, Law)।',
				tips: [
					'Written exam: GK और Math पर ज्यादा focus करें',
					'Running: 800m (2 min 40 sec for males), 1600m practice',
					'Long jump: minimum 13 feet (males)',
					'Previous year cutoffs check करें category wise',
					'All documents ready रखें (marksheets, certificates, ID)',
				],
				importantInfo:
					'Vyapam conducts | Written → Physical → Medical → Document Verification',
				aiContext:
					'Student appearing for MP Police recruitment exam. Guide about: exam pattern in detail, physical test standards, preparation tips, cutoff trends, selection process. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Police exam में कितने marks लाने होंगे?',
					'Physical test में क्या-क्या होता है?',
					'MP Police cutoff कितनी जाती है?',
				],
			},
			{
				id: 'pol-training',
				step: 5,
				title: 'पुलिस प्रशिक्षण',
				period: 'Selection के बाद (6-12 months)',
				emoji: '🎖️',
				summary:
					'MP Police Training Academy में training लें। Physical training, law, और field duties सीखें।',
				details:
					'Selection के बाद training होती है:\n\n• Constable training: 6-9 months (MP Police Training Centre)\n• SI training: 12-18 months (MP Police Academy, Bhopal)\n\nTraining में सीखेंगे:\n• Physical fitness और drill\n• Weapon handling और firing\n• Law और legal procedures (IPC, CrPC, Evidence Act)\n• Investigation techniques\n• First aid और rescue operations\n• Traffic management\n\nTraining के दौरान stipend मिलता है।\n\nCareer growth: Constable → Head Constable → ASI → SI → Inspector → DSP → SP',
				tips: [
					'Training में discipline maintain करें',
					'Physical fitness top level पर रखें',
					'Law sections अच्छे से याद करें',
					'Senior officers से सीखें',
					'Department exams की तैयारी करें promotion के लिए',
				],
				importantInfo:
					'Constable salary: ~₹22,000-30,000/month | SI salary: ~₹35,000-45,000/month | + allowances',
				aiContext:
					'Student selected for MP Police and going for training. Guide about: training details, what to expect, career growth path, salary structure, life as a police officer. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Police training में क्या होता है?',
					'Constable की salary कितनी है MP में?',
					'Constable से SI कैसे बनें?',
				],
			},
		],
	},

	bank: {
		id: 'bank',
		title: 'बैंक अधिकारी',
		titleEn: 'Bank Officer',
		emoji: '🏦',
		gradient: 'from-indigo-600 to-blue-400',
		cardBg: 'from-indigo-900/40 to-blue-900/30',
		description: 'IBPS/SBI PO/Clerk - बैंकिंग क्षेत्र में करियर',
		milestones: [
			{
				id: 'bank-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'गणित और अंग्रेजी में मजबूत नींव बनाएं। Banking exams में ये key subjects हैं।',
				details:
					'Banking exams में Mathematics (Quantitative Aptitude) और English बहुत important हैं। 10वीं से ही इन subjects पर focus करें।\n\nBank PO/Clerk बनने के लिए graduation जरूरी है। अभी से financial awareness और general knowledge develop करें।',
				tips: [
					'Mathematics (Arithmetic) अच्छे से सीखें',
					'English reading habit बनाएं',
					'अखबार पढ़ने की आदत बनाएं (financial news)',
					'Computer basics सीखें',
				],
				importantInfo:
					'Bank PO: Graduation required | Bank Clerk: Graduation required',
				aiContext:
					'Student in 10th in MP wants to become a bank officer. Guide about: foundation preparation, importance of math and English, banking career overview. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Bank PO बनने के लिए क्या करना होगा?',
					'Banking exams में कौन से subjects आते हैं?',
					'Bank officer की salary कितनी है?',
				],
			},
			{
				id: 'bank-graduation',
				step: 2,
				title: 'Graduation पूरा करें',
				period: 'कक्षा 11वीं - Graduation (5-6 वर्ष)',
				emoji: '🎓',
				summary:
					'किसी भी stream से 12वीं और Graduation करें। Final year से banking prep शुरू करें।',
				details:
					'Bank exams के लिए किसी भी विषय में graduation चाहिए। Commerce/Maths background helpful है लेकिन जरूरी नहीं।\n\nGraduation के last year से banking exam preparation शुरू करें:\n• Quantitative Aptitude (Math)\n• Reasoning Ability\n• English Language\n• General/Financial Awareness\n• Computer Knowledge',
				tips: [
					'Graduation final year से banking prep शुरू करें',
					'RS Aggarwal Quantitative Aptitude book करें',
					'English newspaper रोज पढ़ें',
					'Banking awareness develop करें (RBI, fiscal policy, etc.)',
					'Online mock tests देना शुरू करें',
				],
				importantInfo:
					'IBPS PO age: 20-30 years | SBI PO: 21-30 years | Any graduation accepted',
				aiContext:
					'Student completing graduation in MP, preparing for bank exams. Guide about: which graduation is best, when to start prep, coaching options, exam calendar. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Banking exam की तैयारी कब से शुरू करूं?',
					'कौन सी graduation degree best है bank exam के लिए?',
					'Bank exam के लिए कौन सी books पढ़ूं?',
				],
			},
			{
				id: 'bank-prep',
				step: 3,
				title: 'Banking Exam की तैयारी',
				period: '6-12 महीने (Dedicated)',
				emoji: '🎯',
				summary:
					'IBPS PO/SBI PO या Clerk exam की focused तैयारी करें।',
				details:
					'Banking exams के प्रकार:\n\n• IBPS PO: Public Sector Bank Officer\n• SBI PO: State Bank of India Officer\n• IBPS Clerk: Bank Clerk\n• SBI Clerk: SBI Clerk\n• RBI Grade B: Reserve Bank of India Officer\n\nExam pattern (PO):\n1. Prelims: Reasoning + Quant + English (100 marks, 1 hour)\n2. Mains: Reasoning + Quant + English + GA + Computer (200 marks, 3 hours)\n3. Interview: For PO posts only',
				tips: [
					'Daily 30 DI (Data Interpretation) questions solve करें',
					'Speed math tricks सीखें (Vedic math)',
					'English: RC, Cloze Test, Error Spotting daily practice',
					'Current Affairs: monthly capsules पढ़ें',
					'Sectional mock tests + full mock tests daily',
				],
				importantInfo:
					'IBPS PO: October | SBI PO: June | IBPS Clerk: December | RBI Grade B: March',
				aiContext:
					'Student preparing for banking exams in MP. Guide about: detailed preparation strategy, section-wise tips, time management, mock test strategy, exam calendar, multiple attempts strategy. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Banking exam preparation का daily routine क्या हो?',
					'IBPS PO और SBI PO में क्या difference है?',
					'Quantitative Aptitude कैसे improve करूं?',
				],
			},
			{
				id: 'bank-exam',
				step: 4,
				title: 'Prelims और Mains परीक्षा',
				period: 'Exam Calendar अनुसार',
				emoji: '📝',
				summary:
					'Prelims qualify करें, फिर Mains clear करें। Sectional cutoff और overall cutoff दोनों matter करते हैं।',
				details:
					'Banking exams में sectional cutoff भी होता है - हर section में minimum marks लाने जरूरी हैं।\n\nPrelims: Qualifying nature - Mains के लिए select होने के लिए\nMains: Merit based - final selection के लिए (PO में interview marks भी जुड़ते हैं)\n\nPO interview: 100 marks (Banking awareness, personality, communication skills)\n\nTip: Multiple bank exams appear करें (IBPS + SBI + RBI) - chances बढ़ते हैं।',
				tips: [
					'Prelims में speed सबसे important है',
					'Mains में accuracy ज्यादा matter करती है',
					'Sectional time management practice करें',
					'Interview: Banking current affairs और basic banking knowledge',
					'Multiple attempts दें - हर exam practice का मौका है',
				],
				importantInfo:
					'Sectional cutoff applicable | PO: Prelims → Mains → Interview | Clerk: Prelims → Mains',
				aiContext:
					'Student appearing for banking exam (Prelims/Mains). Guide about: exam day strategy, time allocation, attempt strategy, sectional cutoffs, interview preparation for PO. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Banking exam में time management कैसे करूं?',
					'PO interview में क्या पूछा जाता है?',
					'IBPS PO cutoff कितनी जाती है?',
				],
			},
			{
				id: 'bank-career',
				step: 5,
				title: 'बैंक में नियुक्ति और करियर',
				period: 'Selection के बाद',
				emoji: '🏦',
				summary:
					'Bank officer/clerk के रूप में join करें। Promotions और career growth के अच्छे अवसर हैं।',
				details:
					'Bank में joining के बाद career path:\n\n• Clerk → Officer → Senior Officer → Chief Manager → AGM → DGM → GM\n• PO → Manager → Senior Manager → Chief Manager → AGM → DGM → GM → CGM → ED → MD\n\nSalary (approximate):\n• Clerk: ₹20,000-25,000/month starting\n• PO: ₹35,000-45,000/month starting\n• After promotions: ₹60,000-1,50,000+/month\n\n+ Allowances (HRA, DA, Medical, etc.)\n+ Pension facility\n+ Loan facilities at reduced rates',
				tips: [
					'Posting accept करें cheerfully - rural posting भी learning opportunity है',
					'Customer service skills develop करें',
					'Internal exams clear करें promotions के लिए',
					'Banking technology और digital banking सीखते रहें',
					'JAIIB/CAIIB certifications करें (career growth में help)',
				],
				importantInfo:
					'PO starting salary: ~₹40,000/month + allowances | Pension: Yes | Job security: High',
				aiContext:
					'Student selected for bank job. Guide about: career growth in banking, salary progression, life as a bank officer, promotions, benefits, challenges. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Bank PO की salary कितनी है with allowances?',
					'Bank में promotion कैसे होता है?',
					'Banking career के क्या फायदे हैं?',
				],
			},
		],
	},

	lawyer: {
		id: 'lawyer',
		title: 'वकील',
		titleEn: 'Lawyer',
		emoji: '⚖️',
		gradient: 'from-slate-600 to-zinc-400',
		cardBg: 'from-slate-900/40 to-zinc-900/30',
		description: 'वकालत, न्यायिक सेवा, या कॉर्पोरेट लॉ में करियर',
		milestones: [
			{
				id: 'law-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'Hindi, English और Social Science पर विशेष ध्यान दें। Reading habit बनाएं।',
				details:
					'Law career के लिए strong language skills और analytical thinking जरूरी है। 10वीं में Hindi, English और Social Science अच्छे से पढ़ें।\n\n12वीं के बाद 5-year integrated LLB (BA LLB/BBA LLB) या Graduation के बाद 3-year LLB कर सकते हैं। 5-year program ज्यादा popular है।',
				tips: [
					'Hindi और English दोनों में reading-writing strong करें',
					'Social Science (History, Civics) अच्छे से पढ़ें',
					'Debate और essay competitions में participate करें',
					'अखबार पढ़ने की आदत बनाएं',
				],
				importantInfo:
					'5-year LLB: 12th के बाद | 3-year LLB: Graduation के बाद',
				aiContext:
					'Student in 10th in MP wants to become a lawyer. Guide about: law career overview, 5-year vs 3-year LLB, CLAT exam, important skills for law. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Lawyer बनने के लिए कौन सा subject लूं?',
					'CLAT exam क्या है?',
					'Law career में कितनी salary मिलती है?',
				],
			},
			{
				id: 'law-12th',
				step: 2,
				title: '12वीं पास करें',
				period: 'कक्षा 11वीं - 12वीं',
				emoji: '📖',
				summary:
					'कोई भी stream चुनें (Arts preferred)। CLAT entrance exam की तैयारी शुरू करें।',
				details:
					'Law के लिए कोई भी stream से 12वीं कर सकते हैं। Arts/Humanities सबसे relevant है (History, Political Science, Economics)।\n\nTop law universities (NLUs) में admission CLAT exam से होता है। CLAT की तैयारी 11वीं से शुरू करें।\n\nCLAT sections: English, GK/Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques।',
				tips: [
					'CLAT prep 11वीं से शुरू करें',
					'Legal awareness develop करें - Constitutional rights, laws जानें',
					'English comprehension और vocabulary strong करें',
					'Current affairs daily follow करें',
					'Mock CLAT tests देना शुरू करें',
				],
				importantInfo:
					'CLAT: दिसंबर (for NLUs) | 12th में 45%+ marks जरूरी (CLAT eligibility)',
				aiContext:
					'Student in 11th-12th preparing for CLAT in MP. Guide about: CLAT preparation strategy, best stream for law, NLU vs other law colleges, coaching options. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'CLAT की तैयारी कैसे करूं?',
					'NLU colleges कैसे हैं?',
					'CLAT में कितने marks चाहिए NLU के लिए?',
				],
			},
			{
				id: 'law-clat',
				step: 3,
				title: 'CLAT / Law Entrance',
				period: 'दिसंबर',
				emoji: '📝',
				summary:
					'CLAT या अन्य law entrance exam clear करें। NLU या अच्छे law college में admission लें।',
				details:
					'Law entrance exams:\n• CLAT: 22 National Law Universities (NLUs) के लिए\n• AILET: National Law University Delhi के लिए\n• LSAT India: कुछ private law colleges\n• MH CET Law: Maharashtra law colleges\n• MP CET Law: MP law colleges\n\nCLAT: 150 questions, 120 minutes, passage-based exam\n\nMP की NLU: NLIU Bhopal (National Law Institute University) - India की top NLUs में से एक।',
				tips: [
					'CLAT passage-based है - reading speed बढ़ाएं',
					'Legal reasoning section को special attention दें',
					'GK/Current Affairs: last 1 year thoroughly cover करें',
					'Time management: 120 minutes में 150 questions',
					'NLIU Bhopal MP के students के लिए excellent option है',
				],
				importantInfo:
					'CLAT: December | NLIU Bhopal: Top NLU in MP | 5-year BA LLB/BBA LLB program',
				aiContext:
					'Student appearing for CLAT exam from MP. Guide about: exam strategy, NLIU Bhopal, other good law colleges in MP, choice filling, expected cutoffs. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'CLAT exam strategy क्या होनी चाहिए?',
					'NLIU Bhopal कैसा college है?',
					'MP में अच्छे law colleges कौन से हैं?',
				],
			},
			{
				id: 'law-llb',
				step: 4,
				title: 'LLB (5 या 3 वर्ष)',
				period: '5 वर्ष (integrated) / 3 वर्ष (after graduation)',
				emoji: '⚖️',
				summary:
					'Law degree complete करें। Internships, moot courts और legal research में active रहें।',
				details:
					'LLB program में Constitutional Law, Criminal Law, Civil Law, Corporate Law, International Law, Human Rights Law आदि subjects पढ़ाए जाते हैं।\n\nLaw school में ये activities बहुत important हैं:\n• Moot Court Competitions (simulated court cases)\n• Internships with lawyers, judges, law firms\n• Legal Aid Clinics\n• Research papers और publications\n• Debate and discussion forums',
				tips: [
					'Internships करें - courts, law firms, NGOs में',
					'Moot court competitions में participate करें',
					'Bare Acts (original laws) पढ़ने की habit बनाएं',
					'Legal writing skills develop करें',
					'Decide करें: Litigation, Corporate Law, या Judicial Services',
				],
				importantInfo:
					'LLB: 5-year or 3-year | Internship: every vacation | Bar Council enrollment after LLB',
				aiContext:
					'Student doing LLB in MP. Guide about: how to excel in law school, internship tips, career options after LLB, moot court importance, building legal career. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Law school में internship कहाँ करूं?',
					'Moot court क्या है और कैसे participate करूं?',
					'LLB के बाद कौन सा career option best है?',
				],
			},
			{
				id: 'law-career',
				step: 5,
				title: 'Bar Council और करियर',
				period: 'LLB के बाद',
				emoji: '🏛️',
				summary:
					'Bar Council में enrollment करें और अपना law career शुरू करें।',
				details:
					'LLB complete करने के बाद career options:\n\n• Litigation (Court Practice): Senior advocate के under practice शुरू करें\n• Corporate Law: Law firms में job (₹5-20 LPA starting from top NLUs)\n• Judicial Services: MPCJ (MP Civil Judge) exam - Judge बनें\n• Government Law Officer: Legal Advisor, Public Prosecutor\n• Legal Process Outsourcing (LPO): International legal work\n\nBar Council of MP में enrollment करके AIBE (All India Bar Exam) pass करना जरूरी है practice के लिए।\n\nMP Judicial Services (MPCJ) exam से Civil Judge/Judicial Magistrate बन सकते हैं।',
				tips: [
					'Senior advocate के under 2-3 साल practice करें',
					'Specialization चुनें: Criminal, Civil, Corporate, Tax Law',
					'Courtroom skills और client management सीखें',
					'Networking बहुत important है legal field में',
					'MPCJ exam attempt करें - Judge बनने का मौका',
				],
				importantInfo:
					'AIBE: Bar Council | MPCJ: Judge | Corporate salary: ₹5-20 LPA from top NLUs | Senior lawyers: ₹50 LPA+',
				aiContext:
					'Student completed LLB from MP, starting legal career. Guide about: how to start practice, corporate vs litigation, judicial services exam, salary expectations, career growth in law. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Lawyer बनने के बाद practice कैसे शुरू करूं?',
					'MP Judge बनने के लिए क्या करना होगा?',
					'Law में कितनी कमाई होती है?',
				],
			},
		],
	},

	ca: {
		id: 'ca',
		title: 'चार्टर्ड अकाउंटेंट',
		titleEn: 'Chartered Accountant',
		emoji: '📊',
		gradient: 'from-teal-600 to-green-400',
		cardBg: 'from-teal-900/40 to-green-900/30',
		description: 'CA बनें - Finance और Accounting का सबसे प्रतिष्ठित career',
		milestones: [
			{
				id: 'ca-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'गणित में अच्छी पकड़ बनाएं। Commerce stream लेने की तैयारी करें।',
				details:
					'CA बनने के लिए Mathematics और logical thinking बहुत important है। 10वीं में Maths अच्छे से पढ़ें।\n\n11वीं में Commerce with Maths लेना सबसे ideal है। CA registration 12वीं के बाद शुरू होता है।\n\nCA course ICAI (Institute of Chartered Accountants of India) conduct करता है।',
				tips: [
					'Mathematics strong करें - ये CA का foundation है',
					'Account keeping basics समझें',
					'Logical thinking और analytical skills develop करें',
					'Computer proficiency बढ़ाएं (Excel, Tally basics)',
				],
				importantInfo:
					'CA Foundation: 12th के बाद register | ICAI: Institute of Chartered Accountants of India',
				aiContext:
					'Student in 10th in MP wants to become a CA. Guide about: CA career overview, importance of commerce, how long it takes, scope and salary. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'CA बनने में कितना समय लगता है?',
					'CA बनने के लिए कौन सा subject लूं?',
					'CA की salary कितनी होती है?',
				],
			},
			{
				id: 'ca-12th-commerce',
				step: 2,
				title: '11वीं-12वीं Commerce',
				period: 'कक्षा 11वीं - 12वीं',
				emoji: '💰',
				summary:
					'Commerce with Mathematics चुनें। Accounts, Business Studies, Economics पढ़ें।',
				details:
					'CA के लिए 11वीं में Commerce stream with Mathematics लें। Key subjects:\n• Accountancy - CA का most important subject\n• Business Studies - Business concepts\n• Economics - Macro & Micro economics\n• Mathematics - Statistical analysis\n\n12वीं के बाद ICAI में CA Foundation के लिए register करें। Registration 12वीं pass करने के बाद ही हो सकता है।',
				tips: [
					'Accountancy thoroughly master करें',
					'12वीं में 60%+ marks लाएं (Commerce group में)',
					'CA Foundation registration 12th pass होते ही करें',
					'T.S. Grewal Accountancy book अच्छे से करें',
					'Basic Tally software सीखें',
				],
				importantInfo:
					'CA Foundation registration: 12th pass होने के बाद | Exam: May/November',
				aiContext:
					'Student in 11th-12th Commerce in MP, aiming for CA. Guide about: how to prepare for CA Foundation alongside 12th, important subjects, registration process. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'CA Foundation registration कैसे करूं?',
					'12वीं Commerce से CA कैसे बनें?',
					'Accountancy कैसे strong करूं?',
				],
			},
			{
				id: 'ca-foundation',
				step: 3,
				title: 'CA Foundation',
				period: '12वीं के बाद (4 months study)',
				emoji: '📋',
				summary:
					'CA Foundation exam clear करें। 4 papers होते हैं। ये CA journey का first step है।',
				details:
					'CA Foundation (entry level exam) में 4 papers:\n1. Paper 1: Accounting (100 marks)\n2. Paper 2: Business Laws & Business Correspondence (100 marks)\n3. Paper 3: Business Mathematics, Statistics & Logical Reasoning (100 marks)\n4. Paper 4: Business Economics & Business & Commercial Knowledge (100 marks)\n\n12th pass + 4 months study period के बाद exam दे सकते हैं।\nPassing criteria: 40% each paper + 50% aggregate\n\nFoundation pass rate: ~25-30% (tough but manageable with proper prep)',
				tips: [
					'ICAI study material thoroughly पढ़ें',
					'Accounting practice daily करें',
					'Mock Test Papers (MTP) solve करें - ICAI website पर available',
					'Revision Test Papers (RTP) जरूर करें',
					'Coaching join करें (VSI, CA Foundation classes)',
				],
				importantInfo:
					'CA Foundation: May/Nov | 4 papers | Pass: 40% each + 50% aggregate',
				aiContext:
					'Student preparing for CA Foundation exam in MP. Guide about: preparation strategy, study material, coaching options, exam tips, pass rate improvement. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'CA Foundation की तैयारी कैसे करूं?',
					'CA Foundation pass rate कितना है?',
					'CA coaching कहाँ से करूं MP में?',
				],
			},
			{
				id: 'ca-inter',
				step: 4,
				title: 'CA Intermediate',
				period: '8 months study (Foundation pass के बाद)',
				emoji: '📈',
				summary:
					'CA Inter clear करें। 6 papers (2 groups) होते हैं। Articleship registration भी शुरू होती है।',
				details:
					'CA Intermediate में 2 Groups, 6 papers:\n\nGroup I:\n1. Accounting (100 marks)\n2. Corporate & Other Laws (100 marks)\n3. Cost & Management Accounting (100 marks)\n\nGroup II:\n4. Taxation (Income Tax + GST) (100 marks)\n5. Advanced Accounting (100 marks)\n6. Auditing & Assurance (100 marks)\n\nEk group या dono groups ek saath attempt kar sakte hain.\nArticleship (practical training) Inter ka ek group pass karne ke baad shuru hoti hai.',
				tips: [
					'Group wise preparation करें - एक group एक बार में भी clear कर सकते हैं',
					'Taxation (Tax laws, GST) current amendments follow करें',
					'Auditing Standards अच्छे से पढ़ें',
					'ICAI Practice Manual solve करें',
					'Study groups बनाएं - peer learning helpful है',
				],
				importantInfo:
					'CA Inter: May/Nov | 6 papers (2 groups) | Articleship starts after 1 group pass',
				aiContext:
					'Student preparing for CA Intermediate in MP. Guide about: group-wise strategy, articleship, balancing study and practical training, important topics. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'CA Inter में कौन सा group पहले clear करूं?',
					'Articleship क्या है और कब शुरू होती है?',
					'CA Inter pass rate कैसे improve करूं?',
				],
			},
			{
				id: 'ca-articleship',
				step: 5,
				title: 'Articleship (3 वर्ष)',
				period: '3 वर्ष practical training',
				emoji: '💼',
				summary:
					'किसी CA firm में 3 साल की practical training करें। Real-world accounting और auditing सीखें।',
				details:
					'Articleship CA course का सबसे important part है। 3 साल तक एक practicing CA के under training लेनी होती है।\n\nArticleship में सीखेंगे:\n• Auditing (company audits, tax audits)\n• Taxation (ITR filing, GST returns)\n• Accounting (financial statements, bookkeeping)\n• Corporate advisory\n• Bank audits\n\nStipend: ₹3,000-15,000/month (firm size पर depend)\n\nMP में Bhopal, Indore, Gwalior में अच्छी CA firms हैं।',
				tips: [
					'Big CA firm join करने की कोशिश करें - ज्यादा exposure मिलेगा',
					'Practical work seriously लें - ये real CA life है',
					'CA Final की preparation articleship के साथ करें',
					'Different areas (Audit, Tax, Advisory) में experience लें',
					'Professional behavior और ethics maintain करें',
				],
				importantInfo:
					'Articleship: 3 years mandatory | Stipend: ₹3,000-15,000/month | Under practicing CA',
				aiContext:
					'Student doing CA articleship in MP. Guide about: making the most of articleship, balancing study with work, choosing a good firm, practical skills to learn. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Articleship में क्या-क्या सीखूंगा?',
					'अच्छी CA firm कैसे चुनूं?',
					'Articleship और CA Final की तैयारी कैसे balance करूं?',
				],
			},
			{
				id: 'ca-final',
				step: 6,
				title: 'CA Final और Career',
				period: 'Articleship के दौरान/बाद',
				emoji: '🏆',
				summary:
					'CA Final exam pass करें और Chartered Accountant बनें। High salary और respect वाला career शुरू करें।',
				details:
					'CA Final 2 Groups, 6 papers:\n\nGroup I: Financial Reporting, Advanced Financial Management, Advanced Auditing\nGroup II: Corporate & Economic Laws, Strategic Cost Management, Elective Paper\n\nCA Final pass करने के बाद ICAI membership लें। अब आप CA हैं!\n\nCareer options:\n• Practice (खुद का firm)\n• Industry (CFO, Finance Manager)\n• Big 4 firms (Deloitte, PwC, EY, KPMG)\n• Banking & Financial Services\n\nStarting salary: ₹6-12 LPA (average) | Big 4: ₹8-15 LPA | Experience बढ़ने पर ₹20-50 LPA+',
				tips: [
					'CA Final: Advanced level है - 6-8 months dedicated preparation',
					'ICAI study material + reference books दोनों पढ़ें',
					'CA Final pass rate ~10-15% - consistent effort जरूरी',
					'Elective paper wisely चुनें (ICITSS, AICITSS complete करें)',
					'Membership लेते ही job applications start करें',
				],
				importantInfo:
					'CA Final: May/Nov | CA salary: ₹6-50+ LPA | Total CA journey: ~5 years minimum',
				aiContext:
					'Student preparing for CA Final or just became a CA. Guide about: CA Final preparation, career options, salary expectations, practice vs job, CA career growth. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'CA Final कितना difficult है?',
					'CA बनने के बाद कितनी salary मिलती है?',
					'खुद का CA firm कैसे शुरू करूं?',
				],
			},
		],
	},
	ssc: {
		id: 'ssc',
		title: 'SSC (सरकारी नौकरी)',
		titleEn: 'SSC - Govt Jobs',
		emoji: '🏢',
		gradient: 'from-rose-600 to-pink-400',
		cardBg: 'from-rose-900/40 to-pink-900/30',
		description: 'SSC CGL, CHSL, MTS - केंद्र सरकार की नौकरियां',
		milestones: [
			{
				id: 'ssc-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'अच्छे अंकों से 10वीं पास करें। SSC MTS के लिए 10th pass काफी है।',
				details:
					'SSC (Staff Selection Commission) केंद्र सरकार के विभिन्न विभागों में भर्ती करता है। SSC MTS (Multi Tasking Staff) के लिए सिर्फ 10वीं पास होना जरूरी है।\n\nलेकिन बड़े posts (CGL, CHSL) के लिए 12th और Graduation जरूरी है। अभी से GK, Math और Reasoning पर ध्यान दें।',
				tips: [
					'गणित (Arithmetic) की basic calculations fast करें',
					'Hindi और English grammar अच्छे से पढ़ें',
					'सामान्य ज्ञान की आदत बनाएं',
					'10th pass होते ही SSC MTS के लिए eligible हो जाएंगे',
				],
				importantInfo:
					'SSC MTS: 10th pass | SSC CHSL: 12th pass | SSC CGL: Graduation',
				aiContext:
					'Student in class 10th in MP wants to prepare for SSC exams. Guide about: SSC exam types (MTS, CHSL, CGL), educational requirements, career overview, salary comparison. Answer in Hindi with English terms. Be specific to MP context.',
				suggestedQuestions: [
					'SSC में कौन-कौन सी exams होती हैं?',
					'SSC MTS की salary कितनी है?',
					'SSC की तैयारी कब से शुरू करूं?',
				],
			},
			{
				id: 'ssc-12th',
				step: 2,
				title: '12वीं पास करें',
				period: 'कक्षा 11वीं - 12वीं',
				emoji: '📖',
				summary:
					'12वीं पास करें। SSC CHSL (LDC/DEO) के लिए eligible हो जाएंगे।',
				details:
					'12वीं pass करने के बाद SSC CHSL (Combined Higher Secondary Level) exam दे सकते हैं। CHSL से मिलने वाले posts:\n\n• LDC (Lower Division Clerk) - विभिन्न मंत्रालयों में\n• DEO (Data Entry Operator) - Data entry work\n• Postal Assistant - डाकघर में\n• Sorting Assistant - डाक विभाग में\n\n12वीं में अच्छे marks लाएं और typing speed बढ़ाएं (CHSL में typing test होता है)।',
				tips: [
					'Hindi और English typing practice शुरू करें (35 WPM English, 30 WPM Hindi)',
					'Math: Arithmetic, Algebra, Geometry practice करें',
					'Reasoning: Verbal और Non-verbal दोनों पढ़ें',
					'GK: Static GK + Current Affairs daily पढ़ें',
					'Graduation भी करें - CGL के लिए जरूरी है',
				],
				importantInfo:
					'SSC CHSL: 12th pass, Age 18-27 | Typing test: 35 WPM (Eng) / 30 WPM (Hindi)',
				aiContext:
					'Student in 11th-12th preparing for SSC CHSL. Guide about: CHSL exam pattern, typing test preparation, posts available, salary, how to prepare alongside studies. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'SSC CHSL exam pattern क्या है?',
					'CHSL में typing test कैसे होता है?',
					'LDC की salary कितनी है?',
				],
			},
			{
				id: 'ssc-graduation',
				step: 3,
				title: 'Graduation पूरा करें',
				period: '3 वर्ष',
				emoji: '🎓',
				summary:
					'किसी भी विषय में graduation करें। SSC CGL के लिए जरूरी है।',
				details:
					'SSC CGL (Combined Graduate Level) सबसे popular SSC exam है। Graduation pass होना जरूरी है।\n\nCGL से मिलने वाले posts:\n• Income Tax Inspector\n• Excise Inspector\n• Customs Inspector\n• Assistant in CSS (Central Secretariat Service)\n• Assistant Audit Officer\n• Sub-Inspector in CBI\n• Statistical Investigator\n\nGraduation के final year से CGL preparation seriously शुरू करें।',
				tips: [
					'Graduation किसी भी stream से करें - CGL में कोई restriction नहीं',
					'Final year से SSC CGL prep dedicated शुरू करें',
					'Previous year papers analysis करें',
					'Online test series join करें (Testbook, Adda247)',
					'Math और English daily practice जरूरी है',
				],
				importantInfo:
					'SSC CGL: Graduation, Age 18-32 (varies by post) | Top post: Assistant Audit Officer',
				aiContext:
					'Student completing graduation in MP, preparing for SSC CGL. Guide about: CGL exam details, best posts, preparation strategy, coaching options, exam calendar. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'SSC CGL में सबसे अच्छा post कौन सा है?',
					'CGL की तैयारी का plan बताएं',
					'Income Tax Inspector कैसे बनें?',
				],
			},
			{
				id: 'ssc-prep',
				step: 4,
				title: 'SSC CGL/CHSL की तैयारी',
				period: '6-12 महीने (Dedicated)',
				emoji: '🎯',
				summary:
					'Dedicated preparation करें। Math, Reasoning, English और GK - चारों sections strong करें।',
				details:
					'SSC CGL Exam Pattern:\n\nTier I (Online, 60 min):\n• Quantitative Aptitude: 25 questions\n• General Intelligence & Reasoning: 25 questions\n• English Language: 25 questions\n• General Awareness: 25 questions\n\nTier II (Online, 2 hrs 15 min):\n• Quantitative Aptitude: 30 questions\n• General Intelligence & Reasoning: 30 questions\n• English Language: 45 questions\n• General Awareness: 25 questions\n• Computer Knowledge: 20 questions\n\nTier II में Maths और English advanced level का होता है। Daily practice सबसे जरूरी है।',
				tips: [
					'Math: Rakesh Yadav / Kiran Publication से practice करें',
					'Reasoning: Previous year questions pattern wise solve करें',
					'English: SP Bakshi + daily newspaper reading',
					'GK: Lucent GK + monthly current affairs magazine',
					'Daily 2-3 mock tests दें और analysis करें',
				],
				importantInfo:
					'CGL Tier I: Qualifying | Tier II: Merit | Total time: 6-10 months prep recommended',
				aiContext:
					'Student preparing for SSC CGL/CHSL exam. Guide about: section-wise preparation, best books, daily routine, mock test strategy, time management, previous year trends. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'SSC CGL preparation का daily routine क्या हो?',
					'कौन सी books best हैं SSC के लिए?',
					'Mock test कैसे analyze करूं?',
				],
			},
			{
				id: 'ssc-exam',
				step: 5,
				title: 'SSC परीक्षा दें',
				period: 'SSC Calendar अनुसार',
				emoji: '📝',
				summary:
					'Tier I और Tier II दोनों exams clear करें। Normalize score based merit list बनती है।',
				details:
					'SSC CGL Selection Process:\n1. Tier I: Qualifying exam (Computer Based)\n2. Tier II: Main exam (Computer Based) - Final merit\n3. Document Verification\n4. Medical Examination\n\nSSC CHSL Selection Process:\n1. Tier I: Computer Based Test\n2. Tier II: Descriptive Paper (Essay/Letter) + Typing Test\n3. Document Verification\n\nSSC normalization process use करता है (multiple shift exams को equalize करने के लिए)।\n\nMultiple SSC exams attempt करें - CGL, CHSL, CPO, MTS - chances बढ़ते हैं।',
				tips: [
					'Tier I cutoff low होती है - focus on qualifying',
					'Tier II में maximum marks लाने पर focus करें',
					'Negative marking है: -0.50 for wrong (Tier I), -1.00 (Tier II)',
					'Time management: Tier I में 60 min for 100 questions',
					'Multiple SSC exams apply करें (CGL + CHSL + CPO)',
				],
				importantInfo:
					'CGL exam: Feb-March (Tier I), June-July (Tier II) | Results: 3-4 months after exam',
				aiContext:
					'Student appearing for SSC exam. Guide about: exam day strategy, cutoff trends, normalization, post preference, multiple exam attempts. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'SSC CGL cutoff कितनी जाती है?',
					'Post preference कैसे भरें?',
					'Normalization क्या है SSC में?',
				],
			},
			{
				id: 'ssc-career',
				step: 6,
				title: 'सरकारी नौकरी और करियर',
				period: 'Selection के बाद',
				emoji: '🏛️',
				summary:
					'केंद्र सरकार में नियुक्ति पाएं। Job security, pension, और career growth मिलेगी।',
				details:
					'SSC CGL Salary (7th Pay Commission):\n\n• Group B (Inspector level): Pay Level 7 - ₹44,900-1,42,400\n  Starting: ~₹52,000-58,000/month (with DA, HRA etc.)\n• Group C (Assistant level): Pay Level 4-5 - ₹25,500-81,100\n  Starting: ~₹35,000-42,000/month\n\nTop CGL Posts by salary:\n1. Assistant Audit Officer (AAO): ₹55,000+/month\n2. Income Tax Inspector: ₹52,000+/month\n3. Central Excise Inspector: ₹52,000+/month\n4. Assistant in CSS: ₹45,000+/month\n\nBenefits: Pension (NPS), Medical, LTC, House Building Advance, Job Security\n\nCareer growth: Promotions based on seniority + departmental exams।',
				tips: [
					'Post join करने के बाद departmental exams clear करें for promotion',
					'Government rules और procedures अच्छे से सीखें',
					'Professional development courses लें',
					'Higher posts के लिए UPSC exam भी attempt कर सकते हैं',
					'Financial planning करें - government job stability का फायदा उठाएं',
				],
				importantInfo:
					'CGL salary: ₹35,000-58,000/month starting | Pension: NPS | Promotion: Department exam + seniority',
				aiContext:
					'Student selected through SSC. Guide about: life as a central government employee, salary details, career growth, promotion process, benefits, work-life balance. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'SSC CGL posts की salary कितनी है?',
					'Income Tax Inspector का काम कैसा होता है?',
					'Government job में promotion कैसे होता है?',
				],
			},
		],
	},

	paramilitary: {
		id: 'paramilitary',
		title: 'CRPF / BSF / CISF',
		titleEn: 'Paramilitary Forces',
		emoji: '🪖',
		gradient: 'from-green-700 to-emerald-500',
		cardBg: 'from-green-900/40 to-emerald-900/30',
		description: 'अर्धसैनिक बल - CRPF, BSF, CISF, ITBP, SSB में भर्ती',
		milestones: [
			{
				id: 'para-10th',
				step: 1,
				title: '10वीं पास करें',
				period: 'कक्षा 10वीं',
				emoji: '📚',
				summary:
					'10वीं पास करें और शारीरिक fitness शुरू करें। Constable/GD के लिए 10th pass काफी है।',
				details:
					'अर्धसैनिक बलों (CAPF - Central Armed Police Forces) में 10वीं pass के बाद Constable/GD (General Duty) पद के लिए apply कर सकते हैं।\n\nCAPF Forces:\n• CRPF (Central Reserve Police Force) - सबसे बड़ा paramilitary force\n• BSF (Border Security Force) - सीमा सुरक्षा\n• CISF (Central Industrial Security Force) - Airport, Metro, PSU security\n• ITBP (Indo-Tibetan Border Police) - चीन सीमा\n• SSB (Sashastra Seema Bal) - Nepal/Bhutan सीमा\n\nPhysical fitness सबसे important है। 10वीं से daily running, exercise शुरू करें।',
				tips: [
					'Daily 5 km running करें - stamina build करें',
					'Pull-ups, push-ups, sit-ups daily practice करें',
					'Height check करें: Male 170 cm, Female 157 cm (varies by force)',
					'Eyesight अच्छी रखें - 6/6 या 6/9 required',
					'Swimming सीखें - कुछ forces में जरूरी है',
				],
				importantInfo:
					'Constable/GD: 10th pass | Age: 18-23 years | Height: 170 cm (M), 157 cm (F)',
				aiContext:
					'Student in class 10th in MP wants to join CRPF/BSF/CISF. Guide about: different paramilitary forces, constable recruitment, physical requirements, age limits, how to prepare from now. Answer in Hindi with English terms. Be MP-specific.',
				suggestedQuestions: [
					'CRPF, BSF, CISF में क्या difference है?',
					'Paramilitary में भर्ती के लिए height कितनी चाहिए?',
					'Physical fitness कैसे बढ़ाऊं?',
				],
			},
			{
				id: 'para-12th',
				step: 2,
				title: '12वीं पास करें',
				period: 'कक्षा 11वीं - 12वीं',
				emoji: '📖',
				summary:
					'12वीं पास करें। Head Constable और कुछ technical posts के लिए 12th जरूरी है।',
				details:
					'12वीं pass करने के बाद और अधिक पदों के लिए eligible होते हैं:\n\n• Constable/GD (10th pass - SSC GD through)\n• Head Constable (Ministerial): 12th pass\n• ASI (Stenographer): 12th + Steno skills\n• Technical posts: 12th with Science\n\nSSC GD Constable exam SSC (Staff Selection Commission) conduct करता है। Written test + Physical + Medical + Document Verification\n\n12वीं के साथ physical training continue रखें। Written exam में GK, Math, Reasoning, Hindi/English आता है।',
				tips: [
					'SSC GD exam form भरें - 12th pass candidates को preference',
					'Physical training intense करें - running time improve करें',
					'1600m running: 5 min 30 sec (Male), 800m: 3 min 30 sec (Female)',
					'Written exam: GK, Math, Reasoning की basic books पढ़ें',
					'Medical fitness ensure करें - eyesight, flat feet check',
				],
				importantInfo:
					'SSC GD: 10th/12th pass | Head Constable: 12th pass | ASI: 12th + Steno',
				aiContext:
					'Student in 11th-12th wanting to join paramilitary forces. Guide about: SSC GD exam, different posts with 12th qualification, physical standards, written exam preparation. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'SSC GD Constable exam कैसे होता है?',
					'Physical test में क्या-क्या होता है?',
					'12वीं के बाद कौन सा post best है?',
				],
			},
			{
				id: 'para-graduation',
				step: 3,
				title: 'Graduation (SI/Officer के लिए)',
				period: '3 वर्ष',
				emoji: '🎓',
				summary:
					'Sub-Inspector और officer level posts के लिए graduation करें। SSC CPO या UPSC CAPF exam दें।',
				details:
					'Officer level posts के लिए graduation जरूरी है:\n\n• SSC CPO (SI in CAPF): SSC conduct करता है - Sub-Inspector पद\n• UPSC CAPF (AC): UPSC conduct करता है - Assistant Commandant पद (Group A Officer)\n\nSSC CPO से SI बनते हैं CRPF/BSF/CISF/ITBP/SSB में।\nUPSC CAPF AC से directly officer (Assistant Commandant) बनते हैं।\n\nGraduation के साथ physical fitness और written exam दोनों prepare करें।',
				tips: [
					'Graduation किसी भी subject से करें',
					'SSC CPO (SI) exam prep: Math, Reasoning, English, GK',
					'UPSC CAPF (AC) exam prep: GS, Essay, Comprehension',
					'Physical training parallel जारी रखें',
					'Both exams attempt करें - SI और AC दोनों try करें',
				],
				importantInfo:
					'SSC CPO (SI): Graduation, Age 20-25 | UPSC CAPF (AC): Graduation, Age 20-25',
				aiContext:
					'Student doing graduation wanting to become SI or officer in paramilitary. Guide about: SSC CPO vs UPSC CAPF, exam patterns, preparation strategy, career comparison. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'SSC CPO और UPSC CAPF में क्या difference है?',
					'CRPF SI की salary कितनी है?',
					'Assistant Commandant कैसे बनें?',
				],
			},
			{
				id: 'para-ssc-gd',
				step: 4,
				title: 'SSC GD / CPO परीक्षा',
				period: 'SSC Calendar अनुसार',
				emoji: '📝',
				summary:
					'SSC GD (Constable) या SSC CPO (SI) exam clear करें। Written + Physical + Medical test होता है।',
				details:
					'SSC GD Constable Exam:\n1. CBT (Computer Based Test): 80 questions, 60 min\n   - GK/GS: 20, Math: 20, Reasoning: 20, Hindi/English: 20\n2. PET (Physical Efficiency Test):\n   - Male: 1600m run in 5 min 30 sec\n   - Female: 800m run in 3 min 30 sec\n3. PST (Physical Standard Test): Height, Chest\n4. Medical Examination\n5. Document Verification\n\nSSC CPO (SI) Exam:\n1. Paper I: 200 questions, 120 min (GK, Math, Reasoning, English)\n2. Physical Test: 1600m in 6:30 (M), 800m in 4:00 (F) + Long Jump + Shot Put\n3. Paper II: English Language & Comprehension\n4. Medical\n\nMP के candidates को CRPF/BSF में अक्सर posting मिलती है।',
				tips: [
					'Written exam: Previous year papers pattern wise solve करें',
					'SSC GD cutoff: General 70-80/160, OBC 65-75, SC/ST 55-65 (approx)',
					'Physical test पर ज्यादा focus करें - written clear करके physical में fail होना common है',
					'Running daily practice करें - exam से 3 months पहले peak training',
					'Medical: Color blindness, flat feet, varicose veins check होता है',
				],
				importantInfo:
					'SSC GD: 80 questions/60 min | SSC CPO: 200 questions/120 min | Physical test mandatory',
				aiContext:
					'Student appearing for SSC GD or SSC CPO exam. Guide about: detailed exam pattern, physical test preparation, cutoff trends, medical standards, what to expect on exam day. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'SSC GD cutoff कितनी जाती है?',
					'Physical test कैसे prepare करूं?',
					'Medical में किन कारणों से reject होते हैं?',
				],
			},
			{
				id: 'para-training',
				step: 5,
				title: 'बेसिक ट्रेनिंग',
				period: '6-12 महीने',
				emoji: '⚔️',
				summary:
					'Training center में rigorous training लें। Weapons, drill, field craft और law सीखें।',
				details:
					'Selection के बाद respective force के training center में training होती है:\n\n• CRPF: RTC (Recruit Training Centre) - multiple locations\n• BSF: STC (Subsidiary Training Centre) - Tekanpur (MP), others\n• CISF: RTC Barwaha (MP), Hyderabad, others\n• ITBP: BTC Bhanu (Haryana)\n• SSB: Training Centre Gorakhpur, Bhopal\n\nTraining duration:\n• Constable/GD: 36-44 weeks (9-11 months)\n• SI: 12-18 months\n• AC (Assistant Commandant): 2 years\n\nTraining में सीखेंगे:\n• Weapon handling और firing (SLR, AK-47, etc.)\n• Physical training और drill\n• Field craft और tactics\n• Law (CrPC, IPC)\n• Map reading, first aid',
				tips: [
					'Training tough होती है - mentally और physically prepared रहें',
					'Discipline सबसे important है - instructions follow करें',
					'Physical fitness peak पर रखें training join करने से पहले',
					'Training में top perform करें - posting preference मिल सकती है',
					'CISF training centre Barwaha MP में है - MP candidates के लिए familiar environment',
				],
				importantInfo:
					'Constable training: 9-11 months | SI: 12-18 months | Training centre: BSF Tekanpur (MP), CISF Barwaha (MP)',
				aiContext:
					'Student selected in paramilitary and going for training. Guide about: training details, what to expect, daily routine in training, what to carry, tips to survive tough training. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'Paramilitary training कैसी होती है?',
					'Training centre में daily routine क्या है?',
					'Training में क्या-क्या सिखाया जाता है?',
				],
			},
			{
				id: 'para-career',
				step: 6,
				title: 'करियर और Posting',
				period: 'Training के बाद',
				emoji: '🎖️',
				summary:
					'देश भर में posting मिलेगी। Promotions, allowances और सम्मान के साथ सेवा करें।',
				details:
					'Salary (7th Pay Commission + Allowances):\n\nConstable/GD:\n• Basic Pay: ₹21,700-69,100 (Pay Level 3)\n• In-hand: ₹30,000-38,000/month (posting area पर depend)\n• Naxal/Border area posting: extra allowances (₹10,000-15,000)\n\nSub-Inspector:\n• Basic Pay: ₹35,400-1,12,400 (Pay Level 6)\n• In-hand: ₹48,000-60,000/month\n\nAssistant Commandant:\n• Basic Pay: ₹56,100-1,77,500 (Pay Level 10)\n• In-hand: ₹75,000-90,000/month\n\nCareer Progression:\n• Constable → Head Constable → ASI → SI → Inspector → Subedar Major\n• SI → Inspector → DSP/2IC → Commandant → DIG → IG → ADG → DG\n• AC → DC → Commandant → DIG → IG → ADG → DG\n\nBenefits: Free accommodation, medical, ration, canteen, pension (NPS), children education allowance, LTC।\n\nCISF postings: Airports, Metro, ISRO, BARC, Nuclear plants (safe postings)\nBSF: India-Pakistan, India-Bangladesh border\nCRPF: Anti-Naxal operations, J&K, internal security\nITBP: India-China border (high altitude)',
				tips: [
					'CISF postings comparatively comfortable हैं (airports, metros)',
					'BSF/CRPF में field postings tough लेकिन allowances ज्यादा',
					'Departmental exam clear करें - promotion fast होता है',
					'LDCE (Limited Department Competitive Exam) से officer बन सकते हैं',
					'AC/DC level तक पहुंचने पर lifestyle बहुत अच्छी होती है',
				],
				importantInfo:
					'Constable: ₹30,000-38,000/month | SI: ₹48,000-60,000/month | Pension + Medical + Housing free',
				aiContext:
					'Student joined paramilitary force. Guide about: life in CRPF/BSF/CISF, posting types, salary details with allowances, promotion process, family welfare, comparison between forces. Answer in Hindi with English terms.',
				suggestedQuestions: [
					'CRPF/BSF/CISF में salary कितनी मिलती है?',
					'कौन सी force सबसे अच्छी है posting के लिए?',
					'Constable से officer कैसे बनें?',
				],
			},
		],
	},
};

export const careerOrder = [
	'engineer',
	'doctor',
	'ias',
	'teacher',
	'police',
	'bank',
	'lawyer',
	'ca',
	'ssc',
	'paramilitary',
];
