import { LastDateOfMonth } from '../types'

/**
 * Get last date of month.
 * This function needs the year to correctly return the last date of February.
 * @param month 0 to 11
 * @param year 4 digits - e.g 2022
 * @returns 28 | 29 | 30 | 31
 */
export const getLastDateOfMonth = (
	month: number,
	year: number
): LastDateOfMonth => {
	const date = new Date(year, month + 1, 0)
	return <LastDateOfMonth>date.getDate()
}
