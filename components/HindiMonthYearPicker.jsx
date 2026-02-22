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

function parseMonthValue(value) {
	const [yearPart, monthPart] = String(value || '').split('-');
	const year = Number(yearPart);
	const month = Number(monthPart);
	if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
		const now = new Date();
		return { year: now.getFullYear(), month: now.getMonth() + 1 };
	}
	return { year, month };
}

function buildMonthValue(year, month) {
	return `${year}-${String(month).padStart(2, '0')}`;
}

export default function HindiMonthYearPicker({
	value,
	onChange,
	label = 'माह और वर्ष चुनें',
	id = 'month-year',
	minYear,
	maxYear,
	disabled = false,
	className = '',
}) {
	const currentYear = new Date().getFullYear();
	const startYear = Number.isInteger(minYear) ? minYear : currentYear - 10;
	const endYear = Number.isInteger(maxYear) ? maxYear : currentYear + 2;
	const years = useMemo(() => {
		const list = [];
		for (let year = endYear; year >= startYear; year -= 1) list.push(year);
		return list;
	}, [startYear, endYear]);

	const selected = parseMonthValue(value);

	const updateMonth = (month) => {
		onChange?.(buildMonthValue(selected.year, Number(month)));
	};

	const updateYear = (year) => {
		onChange?.(buildMonthValue(Number(year), selected.month));
	};

	return (
		<div className={className}>
			<label htmlFor={`${id}-month`} className='sr-only'>
				{label}
			</label>
			<div className='grid grid-cols-2 gap-2'>
				<select
					id={`${id}-month`}
					value={String(selected.month)}
					disabled={disabled}
					onChange={(e) => updateMonth(e.target.value)}
					className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 disabled:opacity-60'>
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
					onChange={(e) => updateYear(e.target.value)}
					className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 disabled:opacity-60'>
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
