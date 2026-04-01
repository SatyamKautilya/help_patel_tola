/**
 * Prefer loan issue date from txn meta (LOAN_DISBURSEMENT); else ledger `date`.
 * Server APIs also normalize `date` on responses; this matches client-side when reading raw docs.
 */
export function displayTransactionDate(tx) {
	if (tx?.type === 'LOAN_DISBURSEMENT' && tx?.meta?.issuedDate != null) {
		const d = new Date(tx.meta.issuedDate);
		if (!Number.isNaN(d.getTime())) return d;
	}
	return new Date(tx?.date);
}
