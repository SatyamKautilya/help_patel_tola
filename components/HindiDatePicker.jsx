'use client';

import { useMemo } from 'react';

const HINDI_MONTHS = [
	'जनवरी',
	'फ़रवरी',
	'मार्च',
	'अप्रैल',
	'मई',
	'जून',
	'जुलाई',
	'अगस्त',
	'सितंबर',
	'अक्टूबर',
	'नवंबर',
	'दिसंबर',
];

function daysInMonth(year, month) {
	return new Date(year, month, 0).getDate();
}

function parseDateValue(value) {
	const [yearPart, monthPart, dayPart] = String(value || '').split('-');
	const year = Number(yearPart);
	const month = Number(monthPart);
	const day = Number(dayPart);

	if (
		!Number.isInteger(year) ||
		!Number.isInteger(month) ||
		!Number.isInteger(day) ||
		month < 1 ||
		month > 12
	) {
		const now = new Date();
		return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
	}

	const maxDay = daysInMonth(year, month);
	return { year, month, day: Math.min(Math.max(day, 1), maxDay) };
}

function buildDateValue(year, month, day) {
	return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function HindiDatePicker({
	value,
	onChange,
	id = 'hindi-date',
	label = 'तारीख चुनें',
	minYear,
	maxYear,
	disabled = false,
	className = '',
}) {
	const nowYear = new Date().getFullYear();
	const startYear = Number.isInteger(minYear) ? minYear : nowYear - 10;
	const endYear = Number.isInteger(maxYear) ? maxYear : nowYear + 2;
	const years = useMemo(() => {
		const list = [];
		for (let year = endYear; year >= startYear; year -= 1) list.push(year);
		return list;
	}, [startYear, endYear]);

	const selected = parseDateValue(value);
	const maxDay = daysInMonth(selected.year, selected.month);
	const days = Array.from({ length: maxDay }, (_, i) => i + 1);

	const updateValue = (year, month, day) => {
		const normalizedDay = Math.min(day, daysInMonth(year, month));
		onChange?.(buildDateValue(year, month, normalizedDay));
	};

	return (
		<div className={className}>
			<label htmlFor={`${id}-day`} className='sr-only'>
				{label}
			</label>
			<div className='grid grid-cols-3 gap-2'>
				<select
					id={`${id}-day`}
					value={String(selected.day)}
					disabled={disabled}
					onChange={(e) => updateValue(selected.year, selected.month, Number(e.target.value))}
					className='w-full rounded-xl border border-slate-300 bg-white px-2 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 disabled:opacity-60'>
					{days.map((day) => (
						<option key={day} value={day}>
							{day}
						</option>
					))}
				</select>
				<select
					id={`${id}-month`}
					value={String(selected.month)}
					disabled={disabled}
					onChange={(e) => updateValue(selected.year, Number(e.target.value), selected.day)}
					className='w-full rounded-xl border border-slate-300 bg-white px-2 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 disabled:opacity-60'>
					{HINDI_MONTHS.map((monthName, idx) => (
						<option key={monthName} value={idx + 1}>
							{monthName}
						</option>
					))}
				</select>
				<select
					id={`${id}-year`}
					value={String(selected.year)}
					disabled={disabled}
					onChange={(e) => updateValue(Number(e.target.value), selected.month, selected.day)}
					className='w-full rounded-xl border border-slate-300 bg-white px-2 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 disabled:opacity-60'>
					{years.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
