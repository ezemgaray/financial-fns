import Decimal from 'decimal.js'

/**
 * ## Future Value.
 * Calculates the future value of an investment based on a constant interest rate. You can use FV with either periodic, constant payments, or a single lump sum payment.
 *
 * **Excel**:
 * - =FV (English)
 * - =VF (Spanish)
 *
 * ### Reference: [Microsoft Support - FV Function](https://support.microsoft.com/en-us/office/fv-function-2eef9f44-a084-4c61-bdd8-4fe4bb1b71b3)
 *
 * @param rate Annual Interest rate period / 12
 * @param totalPeriods The total number of payment periods
 * @param payment Payment for each period. It cannot change between periods.
 * @param presentValue default 0 - The present value, or the lump-sum amount that a series of future payments is worth right now
 * @param dueDateType false (default) = At the end of the period | true = At the beginning of the period.
 */
export const fv = (
	rate: number,
	totalPeriods: number,
	payment: number,
	presentValue: number = 0,
	dueDateType: boolean = false
) => {
	if (rate === 0) return -(presentValue + payment * totalPeriods)
	const rateDecimal = new Decimal(rate)
	const term = rateDecimal.add(1).pow(totalPeriods)
	const presentValueDecimal = new Decimal(presentValue)
	if (dueDateType) {
		return -new Decimal(presentValueDecimal.mul(term))
			.add(
				new Decimal(payment)
					.mul(rateDecimal.add(1))
					.mul(term.minus(1))
					.div(rateDecimal)
			)
			.toNumber()
	}
	return -new Decimal(presentValue)
		.mul(term)
		.add(new Decimal(payment).mul(term.minus(1)))
		.div(rate)
		.toNumber()
}
