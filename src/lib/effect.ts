import Decimal from 'decimal.js'

/**
 * ### Effective annual interest rate
 * Returns the effective annual interest rate, given the
 * nominal annual interest rate and the number of compounding periods per year.
 * **Excel**:
 * - =EFFECT (English)
 * - =INT.EFECTIVO (Spanish)
 *
 * ### Reference: [Microsoft Support - EFFECT Function](https://support.microsoft.com/en-us/office/effect-function-910d4e4c-79e2-4009-95e6-507e04f11bc4)
 * @param rate
 * @param nPeriods
 * @returns
 */
export const effect = (rate: number, nPeriods: number) => {
	if (isNaN(rate) || rate <= 0) {
		throw new Error('The rate must be a number greater than 0')
	}
	if (isNaN(nPeriods) || nPeriods < 1) {
		throw new Error(
			'The number of periods must be a number greater or equal than 1'
		)
	}

	return new Decimal(new Decimal(rate).div(nPeriods).add(1))
		.pow(nPeriods)
		.minus(1)
		.toNumber()
}
