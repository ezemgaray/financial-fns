export const FINANCIAL_YEAR_IN_MONTHS = 12
export const FINANCIAL_YEAR_IN_WEEKS = 52
export const FINANCIAL_YEAR_IN_DAYS = 360
export const FINANCIAL_MONTH_IN_DAYS = 30
export const NATURAL_YEAR_IN_DAYS = 365
/**
 * The frequencies can help you calculate how many transactions
 * there are in a month, year and also define due dates and start of loan installments.
 */
export const FREQUENCIES = {
	weekly: 7,
	biWeekly: 14,
	monthly: 1,
	everyTwoMonths: 2,
	everyThreeMonths: 3,
	everyFourMonths: 4,
	everySixMonths: 6,
	yearly: 12
} as const
