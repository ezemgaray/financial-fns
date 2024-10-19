import { Frequency } from '../types'

/**
 * Get total days in a frequency
 * @param frequency
 * @returns
 * @example
 * weekly: 7,
 * biWeekly: 14,
 * monthly: 1,
 * everyTwoMonths: 2,
 * everyThreeMonths: 3,
 * everyFourMonths: 4,
 * everySixMonths: 6,
 * yearly: 12,
 */
export const getDaysByFrequency = (frequency: Frequency): number => {
	switch (frequency) {
		case 7:
			return frequency
		case 14:
			return 15
		case 1:
		case 2:
		case 3:
		case 4:
		case 6:
		case 12:
			return frequency * 30
		default:
			// Incorrect frequency
			return NaN
	}
}
