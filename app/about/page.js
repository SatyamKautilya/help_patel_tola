'use client';

import { hideBackButton } from '@/hooks/utils';
import { Button, Card, CardBody, Chip } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function TamoharMissionPage() {
	const router = useRouter();
	return (
		<div>
			<div
				className={`${
					hideBackButton() ? 'hidden' : ''
				} fixed w-full pt-12 top-0 z-50 flex flex-row pb-4 border-b-2 bg-slate-100 items-center`}>
				<Button
					color='primary'
					size='lg'
					className='ml-4 text-xl font-bold'
					onPress={() => router.back()}>
					← Back
				</Button>
			</div>
			<div className='min-h-screen mt-16 bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 px-4 py-6'>
				{/* Header */}
				<section className='mb-10 text-center'>
					<h1 className='text-4xl font-extrabold text-indigo-900 tracking-tight'>
						Tamohar
					</h1>
					<p className='mt-3 text-base text-indigo-700 font-medium'>
						A Community-Driven Model for Sustainable Village Transformation
					</p>
				</section>

				{/* Abstract */}
				<Card className='mb-8 border-l-4 border-indigo-500'>
					<CardBody className='space-y-4'>
						<Chip color='primary' variant='flat' className='text-base'>
							Abstract
						</Chip>
						<p className='text-base leading-relaxed text-slate-800'>
							Despite the availability of modern medical knowledge, government
							welfare programs, and technological tools, preventable diseases,
							economic instability, educational unawareness, and social decline
							continue to affect rural communities. Tamohar is a long-term,
							community-led intervention model that combines regular village
							assemblies, moral and social reform, and a technology platform to
							address systemic gaps across health, agriculture, education,
							livelihoods, governance awareness, and moral values.
						</p>
					</CardBody>
				</Card>

				{/* Health */}
				<Section
					title='1. Health Domain'
					color='emerald'
					description='Villagers continue to die from treatable diseases due to lack of awareness,
				access, guidance, and moral responsibility.'
					points={[
						'Lack of disease awareness',
						'Economic barriers to healthcare',
						'Healthcare navigation failure',
						'Dependence on unscientific traditional practices',
						'Inter-generational neglect',
					]}
				/>

				<Highlight
					title='Health Intervention Strategy'
					color='emerald'
					items={[
						'Community-led disease awareness at every gathering',
						'Correction of Aadhaar, Samagra ID, Ayushman Card',
						'Verified hospital lists and treatment manuals',
						'Scientific fact-checking of desi totka',
						'Long-term moral responsibility programs',
					]}
				/>

				<AppRole
					title='Tamohar App – Health Section'
					color='emerald'
					items={[
						'Hospital directory with city filters',
						'AI-powered disease & hospital search (any language)',
						'Ideal Treatment Procedure guides',
						'Village-based treatment case studies',
						'Section to eradicate unscientific practices',
					]}
				/>

				{/* Agriculture */}
				<Section
					title='2. Agriculture Domain'
					color='amber'
					description='Agriculture knowledge remains undocumented and fragmented, causing losses
				in productivity, income, and confidence.'
					points={[
						'Inability to identify crop diseases',
						'Lack of modern farming knowledge',
						'No spray / fertigation schedules',
						'Poor market access awareness',
					]}
				/>

				<AppRole
					title='Tamohar for Agriculture'
					color='amber'
					items={[
						'Complete crop-wise documentation',
						'Seed selection & sowing guidance',
						'Spray and fertigation schedules',
						'AI farming assistant in any language',
						'Market linkage guidance',
					]}
				/>

				{/* Education */}
				<Section
					title='3. Education Domain'
					color='violet'
					description='Students lack clarity about careers, learning paths, and real opportunities.'
					points={[
						'Limited awareness of education fields',
						'Learning restricted to textbooks',
						'Inaccessible coaching and material',
						'No structured career counseling',
					]}
				/>

				<AppRole
					title='Tamohar Education Framework'
					color='violet'
					items={[
						'Career landscape awareness',
						'Learning beyond textbooks',
						'Affordable exam preparation content',
						'Class-wise career direction',
						'Mentorship by real professionals',
					]}
				/>

				{/* Business */}
				<Section
					title='4. Business & Entrepreneurship'
					color='rose'
					description='Economic stagnation persists due to lack of business awareness and guidance.'
					points={[
						'Lack of viable business information',
						'No global or scalable vision',
						'No supply-chain knowledge',
						'Unawareness of funding and schemes',
					]}
				/>

				<AppRole
					title='Tamohar for Business'
					color='rose'
					items={[
						'Village business research',
						'Global logistics-ready models',
						'Supplier & pricing databases',
						'Market demand and promotion studies',
						'Government funding & loan guidance',
					]}
				/>

				{/* Government Schemes */}
				<Section
					title='5. Government Schemes Awareness'
					color='cyan'
					description='Most villagers are unaware of welfare schemes they are eligible for.'
					points={[
						'Eligibility clarity',
						'Benefit explanation',
						'Step-by-step application guidance',
					]}
				/>

				{/* Moral Values */}
				<Section
					title='6. Moral Values & Social Development'
					color='indigo'
					description='Children are increasingly shaped by mobile addiction, social media,
				and weakening family bonds.'
					points={[
						'Parenting guidance by age',
						'Bonding with modern children',
						'Daily routines shaping character',
						'Empathy and social responsibility',
					]}
				/>

				{/* Philosophy */}
				<Card className='mt-10 bg-gradient-to-br from-indigo-900 to-slate-900 text-white'>
					<CardBody className='space-y-4'>
						<h2 className='text-2xl font-bold'>Philosophy of Tamohar</h2>
						<p className='text-lg'>
							Tamohar is not an app. No app can be Tamohar.
						</p>
						<ul className='list-disc pl-6 text-base space-y-1 text-indigo-100'>
							<li>The process is Tamohar</li>
							<li>The meetings are Tamohar</li>
							<li>The people are Tamohar</li>
							<li>The change is Tamohar</li>
						</ul>
						<p className='text-base text-indigo-200'>
							The app is only a medium — the real Tamohar is continuous
							collective action.
						</p>
					</CardBody>
				</Card>

				{/* Footer */}
				<footer className='mt-12 mb-10 text-center text-sm text-slate-600'>
					Living Document · Continuously Evolving
					<br />
					<span className='font-medium'>— Satyam Kautilya</span>
				</footer>
			</div>
		</div>
	);
}

/* ---------- Components ---------- */

function Section({ title, description, points, color }) {
	return (
		<Card className={`mb-8 border-l-4 border-${color}-500`}>
			<CardBody className='space-y-4'>
				<h2 className={`text-xl font-bold text-${color}-800`}>{title}</h2>
				<p className='text-base text-slate-700 leading-relaxed'>
					{description}
				</p>
				<ul className='list-disc pl-6 text-base text-slate-800 space-y-1'>
					{points.map((p, i) => (
						<li key={i}>{p}</li>
					))}
				</ul>
			</CardBody>
		</Card>
	);
}

function Highlight({ title, items, color }) {
	return (
		<Card className={`mb-8 bg-${color}-50 border border-${color}-200`}>
			<CardBody>
				<h3 className={`text-lg font-semibold text-${color}-800 mb-3`}>
					{title}
				</h3>
				<ul className='list-disc pl-6 text-base text-slate-800 space-y-1'>
					{items.map((i, idx) => (
						<li key={idx}>{i}</li>
					))}
				</ul>
			</CardBody>
		</Card>
	);
}

function AppRole({ title, items, color }) {
	return (
		<Card className={`mb-8 bg-white border border-${color}-200`}>
			<CardBody>
				<h3 className={`text-lg font-semibold text-${color}-800 mb-3`}>
					{title}
				</h3>
				<ul className='grid grid-cols-1 gap-2 text-base text-slate-800'>
					{items.map((i, idx) => (
						<li key={idx}>• {i}</li>
					))}
				</ul>
			</CardBody>
		</Card>
	);
}
