import Decimal from 'decimal.js'

/**
 * ### Future value (applying a series of compound interest rates)
 *
 * **Excel**:
 * - =FVSCHEDULE (English)
 * - =VF.PLAN (Spanish)
 *
 * Returns the future value of an initial principal after applying a series
 * of compound interest rates. Use FVSCHEDULE to calculate the future value of an
 * investment with a variable or adjustable rate.
 *- Reference: [Microsoft Support - FVSCHEDULE Function](https://support.microsoft.com/en-us/office/fvschedule-function-bec29522-bd87-4082-bab9-a241f3fb251d)
 *
 * @param principal The present value
 * @param schedule Array of interest rates to apply.
 * @returns
 * @example
 * ```ts
 * const principal = 1 //investment
 * const schedule = [0.02, 0.05, 0,03]
 * const IRR_FinancialFns = fvSchedule(principal, schedule) // 370.65168
 * const IRR_Excel = 370.65168
 * ```
 */
export const fvSchedule = (principal: number, schedule: number[]) => {
	if (!Array.isArray(schedule) || !schedule.length) {
		// Schedule must be an array of numbers
		return NaN
	}

	let futureValue = new Decimal(principal)
	for (let i = 0; i < schedule.length; i++) {
		if (isNaN(schedule[i])) {
			return NaN
		}
		futureValue = futureValue.mul(1 + schedule[i])
	}
	return futureValue.toNumber()
}
