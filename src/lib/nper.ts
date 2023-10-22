import Decimal from 'decimal.js'

/**
 * NPER - Number of periods
 * **Excel**:
 * - =NPER (English)
 * - =NPER (Spanish)
 *
 * Returns the number of periods for an investment based on periodic, constant payments and a constant interest rate.
 * - Reference: [Microsoft Support - NPER Function](https://support.microsoft.com/en-us/office/nper-function-240535b5-6653-4d2d-bfcf-b6a38151d815)
 *
 * @param rate - Annual interest rate / 12
 * @param payment
 * @param presentValue
 * @param futureValue
 * @param dueDateType
 * @returns
 */
export const nper = (
	rate: number,
	payment: number,
	presentValue: number,
	futureValue: number = 0,
	dueDateType: number = 0
) => {
	if (payment === 0) {
		// Payment cannot be 0
		return NaN
	}

	const presentValueD = new Decimal(presentValue)
	const futureValueD = new Decimal(futureValue)
	const paymentD = new Decimal(payment)
	const rateD = new Decimal(rate)

	if (rate === 0) {
		return presentValueD
			.add(futureValueD)
			.mul(-1)
			.div(paymentD)
			.toNumber()
	}

	const rateToAdd = dueDateType
		? paymentD.mul(rateD.add(1)).div(rateD)
		: paymentD.div(rateD)

	let futureValueTemp = futureValueD.mul(-1).add(rateToAdd)
	let presentValueTemp = presentValueD.add(rateToAdd)

	if (futureValueTemp.lessThan(0) && presentValueTemp.lessThan(0)) {
		futureValueTemp = futureValueTemp.mul(-1)
		presentValueTemp = presentValueTemp.mul(-1)
	}
	if (
		futureValueTemp.lessThanOrEqualTo(0) ||
		presentValueTemp.lessThanOrEqualTo(0)
	) {
		//Cannot Calculate NPER
		return NaN
	}

	return futureValueTemp
		.naturalLogarithm()
		.minus(presentValueTemp.naturalLogarithm())
		.div(rateD.add(1).naturalLogarithm())
		.toNumber()
}
