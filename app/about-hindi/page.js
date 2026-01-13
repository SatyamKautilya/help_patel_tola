'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { motion } from 'framer-motion';

// Animation Helper
const fadeInUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TamoharHindiMissionPage() {
	return (
		<div className='min-h-screen bg-[#F8FAFC] px-4 py-10 font-sans selection:bg-indigo-100'>
			<div className='max-w-3xl mx-auto space-y-12'>
				{/* --- Title Section --- */}
				<motion.section
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center space-y-4'>
					<h1 className='text-5xl font-black text-indigo-900 tracking-tight'>
						तमोहर (Tamohar)
					</h1>
					<p className='text-xl text-indigo-700 font-semibold'>
						गाँव के समग्र और सतत परिवर्तन का सामुदायिक मॉडल
					</p>
					<div className='h-1.5 w-20 bg-indigo-600 mx-auto rounded-full' />
				</motion.section>

				{/* --- Abstract --- */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card className='border-none shadow-xl shadow-indigo-100/50 rounded-[2.5rem] overflow-hidden'>
						<div className='h-2 bg-indigo-500 w-full' />
						<CardBody className='p-8 md:p-10 space-y-6'>
							<Chip
								color='primary'
								variant='flat'
								className='px-4 py-4 text-base font-bold'>
								सारांश (Abstract)
							</Chip>

							<p className='text-lg leading-relaxed text-slate-800'>
								आधुनिक चिकित्सा ज्ञान, सरकारी योजनाओं और तकनीकी संसाधनों की
								उपलब्धता के बावजूद, ग्रामीण समाज आज भी रोकथाम योग्य बीमारियों,
								आर्थिक असुरक्षा, शैक्षणिक अज्ञानता और सामाजिक पतन से जूझ रहा है।
							</p>

							<p className='text-lg leading-relaxed text-slate-800'>
								तमोहर एक दीर्घकालिक, समुदाय-प्रेरित परिवर्तन मॉडल है, जो नियमित
								ग्राम बैठकों, नैतिक एवं सामाजिक पुनर्निर्माण, और एक तकनीकी मंच
								(Tamohar App) के माध्यम से स्वास्थ्य, कृषि, शिक्षा, व्यवसाय,
								सरकारी योजनाओं और नैतिक मूल्यों से जुड़ी प्रणालीगत समस्याओं का
								समाधान करता है।
							</p>

							<p className='text-lg leading-relaxed text-slate-800'>
								यह दस्तावेज़ तमोहर मिशन के समस्या कथन (Problem Statements), मूल
								कारणों, और समाधान रणनीतियों को प्रस्तुत करता है।
							</p>
						</CardBody>
					</Card>
				</motion.div>

				{/* --- 1. HEALTH --- */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card
						shadow='sm'
						className='rounded-[2.5rem] bg-red-50/50 border border-red-100'>
						<CardBody className='p-8 md:p-10 space-y-6 text-gray-800 text-base leading-relaxed'>
							<h2 className='text-2xl font-black text-red-900'>
								1. स्वास्थ्य (Health)
							</h2>

							<p className='font-bold text-red-700 uppercase tracking-wider text-sm'>
								समस्या कथन
							</p>

							<p>
								गाँव में बड़ी संख्या में लोग ऐसी बीमारियों से मर रहे हैं, जिनका
								इलाज संभव है। इसके मुख्य कारण हैं:
							</p>

							<ol className='list-decimal pl-5 space-y-5'>
								<li>
									<strong className='text-slate-900'>
										बीमारियों के प्रति जागरूकता का अभाव
									</strong>
									<p className='mt-1 text-slate-700'>
										लोगों को बीमारी की गंभीरता, प्रारंभिक लक्षण और समय पर इलाज
										के महत्व की जानकारी नहीं होती।
									</p>
								</li>

								<li>
									<strong className='text-slate-900'>आर्थिक असमर्थता</strong>
									<p className='mt-1 text-slate-700'>
										कई लोग इलाज के पात्र होते हुए भी सही दस्तावेज़ न होने के
										कारण उपचार से वंचित रह जाते हैं।
									</p>
								</li>

								<li>
									<strong className='text-slate-900'>
										अस्पताल और इलाज प्रक्रिया की जानकारी का अभाव
									</strong>
									<p className='mt-1 text-slate-700'>
										किस बीमारी में कौन-सा अस्पताल, कौन-सा डॉक्टर और कौन-सी
										प्रक्रिया अपनानी है—यह स्पष्ट नहीं होता।
									</p>
								</li>

								<li>
									<strong className='text-slate-900'>
										अवैज्ञानिक देसी टोटकों पर निर्भरता
									</strong>
									<p className='mt-1 text-slate-700'>
										अस्थायी राहत को इलाज समझ लिया जाता है, जिससे बीमारी और गंभीर
										हो जाती है।
									</p>
								</li>

								<li>
									<strong className='text-slate-900'>
										नई पीढ़ी की नैतिक उदासीनता
									</strong>
									<p className='mt-1 text-slate-700'>
										माता-पिता के कष्ट और पीड़ा नई पीढ़ी को मानसिक रूप से
										प्रभावित नहीं करते।
									</p>
								</li>
							</ol>

							<Divider className='my-6' />

							<p className='font-bold text-red-700 uppercase tracking-wider text-sm'>
								समाधान रणनीति
							</p>

							<div className='space-y-6'>
								<div>
									<p className='font-bold text-slate-900'>
										1. सामुदायिक स्वास्थ्य जागरूकता
									</p>
									<ul className='list-disc pl-5 space-y-2 mt-2'>
										<li>गाँव वालों द्वारा गाँव वालों के लिए जागरूकता अभियान</li>
										<li>
											हर त्योहार, धार्मिक सभा या सामाजिक आयोजन में कम से कम एक
											बिमारी पर चर्चा:
											<ul className='list-circle pl-5 mt-2 space-y-1 text-slate-700'>
												<li>लक्षण | बचाव | इलाज</li>
												<li>क्या करें / क्या न करें</li>
												<li>गाँव के वास्तविक केस स्टडी</li>
											</ul>
										</li>
										<li>
											बार-बार चर्चा से जानकारी केवल सुनी नहीं जाती, बल्कि मन में
											बैठ जाती है।
										</li>
									</ul>
								</div>

								<div>
									<p className='font-bold text-slate-900'>
										2. आर्थिक पात्रता सुनिश्चित करना
									</p>
									<ul className='list-disc pl-5 space-y-2 mt-2'>
										<li>
											निम्न दस्तावेज़ों का सुधार और सत्यापन: (आधार कार्ड, समग्र
											आईडी, आयुष्मान भारत कार्ड)
										</li>
										<li>
											यह सुनिश्चित करना कि कोई भी पात्र व्यक्ति इलाज से वंचित न
											रहे।
										</li>
									</ul>
								</div>

								<div>
									<p className='font-bold text-slate-900'>
										3. इलाज मार्गदर्शन प्रणाली
									</p>
									<ul className='list-disc pl-5 space-y-2 mt-2'>
										<li>नज़दीकी शहरों के अस्पतालों की सत्यापित सूची</li>
										<li>सही इलाज पाने की चरण-दर-चरण मार्गदर्शिका</li>
										<li>आपातकालीन सहायता निर्देश</li>
									</ul>
								</div>

								<div>
									<p className='font-bold text-slate-900'>
										4. देसी टोटकों का वैज्ञानिक विश्लेषण
									</p>
									<ul className='list-disc pl-5 mt-2'>
										<li>
											उद्देश्य विश्वास तोड़ना नहीं, बल्कि भ्रम को धीरे-धीरे
											हटाना है।
										</li>
									</ul>
								</div>

								<div>
									<p className='font-bold text-slate-900'>
										5. नैतिक जिम्मेदारी का पुनर्निर्माण
									</p>
									<ul className='list-disc pl-5 mt-2'>
										<li>
											दीर्घकालिक नैतिक शिक्षा कार्यक्रम: संवेदनशीलता, पारिवारिक
											जिम्मेदारी, पीड़ा के प्रति सहानुभूति।
										</li>
									</ul>
								</div>
							</div>

							<Divider className='my-6' />

							<p className='font-bold text-slate-900'>
								तमोहर ऐप की भूमिका – स्वास्थ्य अनुभाग
							</p>

							<ul className='list-disc pl-5 space-y-2'>
								<li>शहर-आधारित फ़िल्टर के साथ अस्पतालों की सूची</li>
								<li>
									किसी भी भाषा में बीमारी या इलाज से संबंधित खोज (AI आधारित)
								</li>
								<li>
									आदर्श उपचार प्रक्रिया (Ideal Treatment Procedure): लक्षण
									पहचान, विशेषज्ञ चयन, तत्काल कार्य।
								</li>
								<li>गाँव में हुए सफल इलाज की केस स्टडी</li>
								<li>अवैज्ञानिक प्रक्रियाओं के उन्मूलन हेतु विशेष अनुभाग</li>
							</ul>
						</CardBody>
					</Card>
				</motion.div>

				{/* --- 2. AGRICULTURE --- */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card
						shadow='sm'
						className='rounded-[2.5rem] bg-green-50/50 border border-green-100'>
						<CardBody className='p-8 md:p-10 space-y-6 text-gray-800 text-base leading-relaxed'>
							<h2 className='text-2xl font-black text-green-800'>
								2. कृषि (Agriculture)
							</h2>
							<p className='font-bold text-green-700 uppercase tracking-wider text-sm'>
								समस्या कथन
							</p>
							<p>कृषि ज्ञान असंगठित और अप्रलेखित है, जिसके कारण:</p>
							<ol className='list-decimal pl-5 space-y-2'>
								<li>किसान फसल रोग पहचान नहीं पाते</li>
								<li>आधुनिक कृषि तकनीकों की जानकारी नहीं होती</li>
								<li>स्प्रे, फर्टिगेशन और बीज चयन का ज्ञान नहीं</li>
								<li>उत्पाद बेचने के सही बाज़ार की जानकारी नहीं</li>
							</ol>
							<Divider />
							<p className='font-bold text-green-700 uppercase tracking-wider text-sm'>
								समाधान – तमोहर के माध्यम से
							</p>
							<ul className='list-disc pl-5 space-y-3'>
								<li>
									हर फसल की संपूर्ण जानकारी (बीज, बोना, रोग, स्प्रे शेड्यूल)
								</li>
								<li>सरल भाषा और दृश्यात्मक UI</li>
								<li>
									किसी भी भाषा में कृषि संबंधी प्रश्न पूछने की सुविधा (AI
									आधारित)
								</li>
								<li>बाज़ार मार्गदर्शन: कहाँ, कब और कैसे बेचें</li>
							</ul>
						</CardBody>
					</Card>
				</motion.div>

				{/* --- 3. EDUCATION --- */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card
						shadow='sm'
						className='rounded-[2.5rem] bg-blue-50/50 border border-blue-100'>
						<CardBody className='p-8 md:p-10 space-y-6 text-gray-800 text-base leading-relaxed'>
							<h2 className='text-2xl font-black text-blue-800'>
								3. शिक्षा (Education)
							</h2>
							<p className='font-bold text-blue-700 uppercase tracking-wider text-sm'>
								समस्या कथन
							</p>
							<p>छात्रों में करियर और वास्तविक शिक्षा को लेकर भारी भ्रम है:</p>
							<ol className='list-decimal pl-5 space-y-2 text-slate-700'>
								<li>विभिन्न शैक्षणिक क्षेत्रों की जानकारी नहीं</li>
								<li>पढ़ाई केवल पाठ्यपुस्तकों तक सीमित</li>
								<li>कोचिंग और सही सामग्री गरीब छात्रों की पहुँच से बाहर</li>
								<li>करियर काउंसलिंग का अभाव</li>
							</ol>
							<Divider />
							<p className='font-bold text-blue-700 uppercase tracking-wider text-sm'>
								समाधान रणनीति (शिक्षा संरचना)
							</p>
							<ul className='list-disc pl-5 space-y-4'>
								<li>
									<strong>करियर जागरूकता:</strong> इंजीनियरिंग, मेडिकल, सिविल
									सेवा, उद्यमिता
								</li>
								<li>
									<strong>पाठ्यपुस्तक से आगे:</strong> कौशल और वैचारिक विकास
								</li>
								<li>
									<strong>सुलभ सामग्री:</strong> ई-बुक्स और लेक्चर, ग्रामीण
									छात्रों के लिए
								</li>
								<li>
									<strong>वास्तविक मार्गदर्शन:</strong> इंजीनियर, डॉक्टर और
									पेशेवरों द्वारा
								</li>
							</ul>
						</CardBody>
					</Card>
				</motion.div>

				{/* --- 4. BUSINESS --- */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card
						shadow='sm'
						className='rounded-[2.5rem] bg-amber-50/50 border border-amber-100'>
						<CardBody className='p-8 md:p-10 space-y-6 text-gray-800 text-base leading-relaxed'>
							<h2 className='text-2xl font-black text-amber-800'>
								4. व्यवसाय एवं उद्यमिता (Business)
							</h2>
							<p className='font-bold text-amber-700 uppercase tracking-wider text-sm'>
								समस्या कथन
							</p>
							<p>गाँव में व्यवसायिक असफलता और उद्यमिता की कमी के कारण:</p>
							<ol className='list-decimal pl-5 space-y-2'>
								<li>संभावित व्यवसायों की जानकारी नहीं</li>
								<li>सप्लाई चेन और मांग का ज्ञान नहीं</li>
								<li>सरकारी सहायता और ऋण प्रक्रियाओं की जानकारी नहीं</li>
							</ol>
							<Divider />
							<p className='font-bold text-amber-700 uppercase tracking-wider text-sm'>
								तमोहर की भूमिका
							</p>
							<ul className='list-disc pl-5 space-y-3'>
								<li>गाँव में संभव व्यवसायों की सूची और वैश्विक व्यापार मॉडल</li>
								<li>बाज़ार अध्ययन: मांग, प्रचार और वितरण</li>
								<li>सरकारी योजनाएँ, फंडिंग और ऋण प्रक्रिया</li>
							</ul>
						</CardBody>
					</Card>
				</motion.div>

				{/* --- 5. GOVT SCHEMES --- */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card
						shadow='sm'
						className='rounded-[2.5rem] bg-teal-50/50 border border-teal-100'>
						<CardBody className='p-8 md:p-10 space-y-4'>
							<h2 className='text-2xl font-black text-teal-800'>
								5. सरकारी योजनाएँ (Government Schemes)
							</h2>
							<p className='font-bold text-teal-700 uppercase tracking-wider text-sm'>
								समस्या कथन
							</p>
							<p className='text-slate-800'>
								ग्रामीणों को सरकारी योजनाओं की जानकारी नहीं होती।
							</p>
							<Divider />
							<p className='font-bold text-teal-700 uppercase tracking-wider text-sm'>
								समाधान
							</p>
							<ul className='list-disc pl-5 space-y-2 text-slate-800'>
								<li>
									योजनाओं की पात्रता, लाभ और आवेदन प्रक्रिया की विस्तृत जानकारी।
								</li>
							</ul>
						</CardBody>
					</Card>
				</motion.div>

				{/* --- 6. MORAL VALUES --- */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card
						shadow='sm'
						className='rounded-[2.5rem] bg-violet-50/50 border border-violet-100'>
						<CardBody className='p-8 md:p-10 space-y-6 text-gray-800 text-base leading-relaxed'>
							<h2 className='text-2xl font-black text-violet-800'>
								6. नैतिक मूल्य एवं सामाजिक विकास (Moral Values)
							</h2>
							<p className='font-bold text-violet-700 uppercase tracking-wider text-sm'>
								समस्या कथन
							</p>
							<p>
								बच्चे आज मोबाइल, सोशल मीडिया, नशे और त्वरित मनोरंजन के प्रभाव
								में पल रहे हैं।
							</p>
							<Divider />
							<p className='font-bold text-violet-700 uppercase tracking-wider text-sm'>
								समाधान रणनीति
							</p>
							<p>तमोहर माता-पिता के लिए मार्गदर्शन प्रदान करता है:</p>
							<ul className='list-disc pl-5 space-y-3 text-slate-800'>
								<li>आयु-समूह आधारित पालन-पोषण और संवाद के तरीके</li>
								<li>दैनिक जीवन की सरल दिनचर्या</li>
								<li>
									लक्ष्य: माता-पिता की पीड़ा समझें, गाँव-देश के लिए सोचें, तमस
									(अज्ञान) से तमोहर (प्रकाश) की ओर बढ़ें।
								</li>
							</ul>
						</CardBody>
					</Card>
				</motion.div>

				{/* --- Philosophy Section --- */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card className='bg-slate-900 text-white rounded-[3rem] shadow-2xl overflow-hidden'>
						<CardBody className='p-10 md:p-14 space-y-8'>
							<h2 className='text-4xl font-black text-center'>
								तमोहर का दर्शन
							</h2>
							<p className='text-xl text-slate-300 text-center italic'>
								तमोहर कोई ऐप नहीं है। कोई भी ऐप तमोहर नहीं हो सकता।
							</p>
							<div className='grid gap-4 max-w-sm mx-auto'>
								{[
									'निरंतर विकास के लिए बैठक तमोहर है!',
									'सबकी ज़िम्मेदारी तमोहर है!',
									'जो लोग इस प्रयास से जुड़ते हैं, वही तमोहर हैं',
								].map((item, i) => (
									<div
										key={i}
										className='bg-white/10 p-4 rounded-2xl border border-white/10 text-center'>
										{item}
									</div>
								))}
							</div>
							<p className='text-indigo-300 text-center'>
								अंततः, जो लोग निरंतर कार्य करते हैं, सीखते हैं और गाँव को आगे
								बढ़ाते हैं—वही सच्चे तमोहर हैं।
							</p>
						</CardBody>
					</Card>
				</motion.div>

				{/* --- Footer --- */}
				<footer className='py-12 text-center text-slate-500 border-t border-slate-200'>
					<p className='italic mb-2'>
						यह दस्तावेज़ एक जीवित प्रारूप (Living Draft) है, जो निरंतर विचार,
						अनुभव और सामुदायिक सहभागिता के साथ विकसित हो रहा है।
					</p>
					<p className='font-black text-slate-900 text-lg tracking-wide'>
						— सत्यम कौटिल्य
					</p>
				</footer>
			</div>
		</div>
	);
}
