'use client';

import { hideBackButton } from '@/hooks/utils';
import { Button, Card, CardBody, Chip, Divider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Animation Variants
const fadeInUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function TamoharMissionPage() {
	const router = useRouter();

	return (
		<div className='min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100'>
			{/* 1. STICKY HEADER / BACK BUTTON */}
			<header
				className={`${
					hideBackButton() ? 'hidden' : ''
				} sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center`}>
				<Button
					variant='flat'
					color='primary'
					size='sm'
					className='font-bold rounded-full'
					onPress={() => router.back()}>
					← Back
				</Button>
				<span className='ml-4 text-xs font-black uppercase tracking-widest text-slate-400'>
					Mission Document
				</span>
			</header>

			<main className='max-w-3xl mx-auto px-5 py-12 space-y-12'>
				{/* 2. HERO TITLE */}
				<motion.section
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center space-y-4'>
					<h1 className='text-5xl font-black text-indigo-950 tracking-tight'>
						Tamohar
					</h1>
					<p className='text-lg text-indigo-700 font-medium max-w-lg mx-auto leading-snug'>
						A Community-Driven Model for Sustainable Village Transformation
					</p>
					<div className='h-1.5 w-16 bg-indigo-600 mx-auto rounded-full' />
				</motion.section>

				{/* 3. ABSTRACT CARD */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card className='border-none shadow-2xl shadow-indigo-100/50 rounded-[2.5rem] overflow-hidden'>
						<div className='h-2 bg-indigo-500 w-full' />
						<CardBody className='p-8 md:p-10 space-y-6'>
							<Chip
								color='primary'
								variant='flat'
								className='font-bold uppercase tracking-wider'>
								Abstract
							</Chip>
							<p className='text-lg leading-relaxed text-slate-800 font-medium'>
								Despite the availability of modern medical knowledge and
								government welfare programs, rural communities remain trapped in
								preventable cycles of disease, economic instability, and
								educational neglect.
							</p>
							<p className='text-base leading-relaxed text-slate-600'>
								Tamohar is a long-term intervention model combining regular
								village assemblies, moral reform, and a technology platform to
								address systemic gaps across health, agriculture, education, and
								governance.
							</p>
						</CardBody>
					</Card>
				</motion.div>

				{/* 4. DOMAIN SECTIONS */}
				<div className='space-y-10'>
					{/* HEALTH */}
					<DomainSection
						title='1. Health Domain'
						color='emerald'
						icon='🏥'
						description='Villagers continue to die from treatable diseases due to lack of awareness, access, and guidance.'
						points={[
							'Lack of disease awareness & prevention',
							'Economic barriers & missing documentation',
							'Dependence on unscientific traditional practices',
							'Inter-generational neglect of parental health',
						]}
						strategy={[
							'Community-led awareness at every gathering',
							'Verification of Ayushman & Samagra documents',
							'Scientific fact-checking of traditional myths',
						]}
						appRoles={[
							'AI-powered hospital & disease search',
							'Ideal Treatment Procedure manuals',
							'Village-based recovery case studies',
						]}
					/>

					{/* AGRICULTURE */}
					<DomainSection
						title='2. Agriculture Domain'
						color='amber'
						icon='🌾'
						description='Agriculture knowledge is fragmented, causing avoidable losses in productivity and income.'
						points={[
							'Inability to identify specific crop diseases',
							'Lack of structured spray & fertigation schedules',
							'Poor awareness of market demand and pricing',
						]}
						appRoles={[
							'Complete crop-wise documentation',
							'Seed selection & sowing guidance',
							'AI Farming Assistant (Multilingual)',
						]}
					/>

					{/* EDUCATION */}
					<DomainSection
						title='3. Education Domain'
						color='violet'
						icon='🎓'
						description='Students lack clarity regarding modern careers and conceptual learning paths.'
						points={[
							'Learning restricted to rote textbook memorization',
							'Inaccessible high-quality study materials',
							'Complete absence of structured career counseling',
						]}
						appRoles={[
							'Career landscape awareness modules',
							'Mentorship by real-world professionals',
							'Affordable exam preparation resources',
						]}
					/>

					{/* BUSINESS */}
					<DomainSection
						title='4. Business & Entrepreneurship'
						color='rose'
						icon='🚀'
						description='Economic stagnation persists due to a lack of scalable business vision and supply-chain knowledge.'
						points={[
							'Lack of data on viable village-level startups',
							'Unawareness of global demand and logistics',
							'Missing links to government funding & loans',
						]}
						appRoles={[
							'Village-specific business research',
							'Supplier and pricing databases',
							'Loan and scheme application guidance',
						]}
					/>
				</div>

				{/* 5. PHILOSOPHY CARD */}
				<motion.div
					variants={fadeInUp}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<Card className='bg-slate-900 text-white rounded-[3rem] shadow-2xl overflow-hidden'>
						<CardBody className='p-10 md:p-14 space-y-8'>
							<h2 className='text-3xl font-black text-center'>
								Philosophy of Tamohar
							</h2>
							<p className='text-xl text-indigo-300 text-center italic font-light'>
								"Tamohar is not an app. No app can be Tamohar."
							</p>
							<div className='grid gap-4 max-w-sm mx-auto'>
								{[
									'Collective action is Tamohar',
									'The village assembly is Tamohar',
									'Shared responsibility is Tamohar',
								].map((text, i) => (
									<div
										key={i}
										className='bg-white/5 p-4 rounded-2xl border border-white/10 text-center font-medium'>
										{text}
									</div>
								))}
							</div>
							<p className='text-slate-400 text-sm text-center'>
								The app is a medium—the real Tamohar is continuous collective
								effort.
							</p>
						</CardBody>
					</Card>
				</motion.div>

				{/* 6. FOOTER */}
				<footer className='py-12 text-center text-slate-500 border-t border-slate-200'>
					<p className='italic text-sm mb-2'>
						Living Document · Continuously Evolving
					</p>
					<p className='font-black text-slate-900 text-lg'>— Satyam Kautilya</p>
				</footer>
			</main>
		</div>
	);
}

/* ---------- Sub-Components ---------- */

function DomainSection({
	title,
	description,
	points,
	strategy,
	appRoles,
	color,
	icon,
}) {
	const colorMap = {
		emerald: 'bg-emerald-50 border-emerald-100 text-emerald-900',
		amber: 'bg-amber-50 border-amber-100 text-amber-900',
		violet: 'bg-violet-50 border-violet-100 text-violet-900',
		rose: 'bg-rose-50 border-rose-100 text-rose-900',
	};

	return (
		<motion.div
			variants={fadeInUp}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}>
			<Card className={`rounded-[2.5rem] border ${colorMap[color]} shadow-sm`}>
				<CardBody className='p-8 space-y-6'>
					<div className='flex items-center gap-4'>
						<span className='text-4xl'>{icon}</span>
						<h2 className='text-2xl font-black tracking-tight'>{title}</h2>
					</div>

					<p className='text-base font-semibold opacity-90 leading-snug'>
						{description}
					</p>

					<div className='space-y-4'>
						<div className='bg-white/50 p-5 rounded-3xl'>
							<p className='text-xs font-black uppercase tracking-widest mb-3 opacity-60'>
								Core Problems
							</p>
							<ul className='list-disc pl-5 space-y-1 text-sm font-medium'>
								{points.map((p, i) => (
									<li key={i}>{p}</li>
								))}
							</ul>
						</div>

						{strategy && (
							<div className='bg-white/50 p-5 rounded-3xl'>
								<p className='text-xs font-black uppercase tracking-widest mb-3 opacity-60'>
									Intervention
								</p>
								<ul className='list-disc pl-5 space-y-1 text-sm font-medium'>
									{strategy.map((s, i) => (
										<li key={i}>{s}</li>
									))}
								</ul>
							</div>
						)}

						<div className='bg-indigo-600 text-white p-5 rounded-3xl shadow-lg'>
							<p className='text-xs font-black uppercase tracking-widest mb-3 opacity-80'>
								App Features
							</p>
							<ul className='space-y-2 text-sm font-bold'>
								{appRoles.map((r, i) => (
									<li key={i} className='flex gap-2'>
										<span>•</span> {r}
									</li>
								))}
							</ul>
						</div>
					</div>
				</CardBody>
			</Card>
		</motion.div>
	);
}
