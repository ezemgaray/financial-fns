import Decimal from 'decimal.js'

/**
 * ### RATE - Annual Rate
 *
 * **Excel**:
 * - =RATE (English)
 * - =TASA (Spanish)
 *
 * Returns the interest rate per period of an annuity.
 * - Reference: [Microsoft Support - RATE Function](https://support.microsoft.com/en-us/office/rate-function-9f665657-4a7e-4bb7-a030-83fc59e748ce)
 *
*
* @param nPeriods
* @param payment
* @param presentValue
* @param futureValue
* @param dueDateType
* @param guess
* @returns

 * @remarks
 * Make sure that you are consistent about the units you use for specifying guess and nPeriods.
 * If you make monthly payments on a four-year loan at 12 percent annual interest, use 12%/12
 * for guess and 4*12 for nPeriods. If you make annual payments on the same loan, use 12% for guess and 4 for nPeriods.
 */
export const rate = (
	nPeriods: number,
	payment: number,
	presentValue: number,
	futureValue: number = 0,
	dueDateType: number = 0,
	guess: number = 0.1
): number => {
	if (nPeriods < 1) {
		// Periods must be a number greater or equal than 1.
		return NaN
	}
	if (payment > 0 === presentValue > 0) {
		// For payment and present value, at least one of these must be negative and the other positive.
		return NaN
	}
	// Set maximum epsilon for end of iteration
	const epsMax = 1e-7
	// Set maximum number of iterations
	const iterMax = 150
	const step = 0.0000001

	const evalRate = (
		rate: Decimal,
		nPeriods: number,
		payment: Decimal,
		presentValue: Decimal,
		futureValue: Decimal,
		dueDateType: number
	) => {
		if (rate.eq(0)) {
			return presentValue.add(payment.mul(nPeriods)).add(futureValue)
		} else {
			const tempVar3 = rate.add(1)

			const tempVar = new Decimal(Math.pow(tempVar3.toNumber(), nPeriods))
			const tempVar2 = dueDateType ? rate.add(1) : new Decimal(1)

			return presentValue
				.mul(tempVar)
				.add(
					payment
						.mul(tempVar2)
						.mul(tempVar.minus(1))
						.div(rate)
				)
				.add(futureValue)
		}
	}

	const paymentD = new Decimal(payment)
	const presentValueD = new Decimal(presentValue)
	const futureValueD = new Decimal(futureValue)
	let rateD = new Decimal(guess)
	let y0 = evalRate(
		rateD,
		nPeriods,
		paymentD,
		presentValueD,
		futureValueD,
		dueDateType
	)
	let rate1D = y0.greaterThan(0) ? rateD.div(2) : rateD.mul(2)
	let y1 = evalRate(
		rate1D,
		nPeriods,
		paymentD,
		presentValueD,
		futureValueD,
		dueDateType
	)

	let i = 0
	while (i < iterMax) {
		if (y1.eq(y0)) {
			rateD = rateD.minus(step * -1)
			y0 = evalRate(
				rateD,
				nPeriods,
				paymentD,
				presentValueD,
				futureValueD,
				dueDateType
			)
		}
		rateD = rate1D.minus(
			new Decimal(rate1D.minus(rateD).mul(y1)).div(y1.minus(y0))
		)
		y0 = evalRate(
			rateD,
			nPeriods,
			paymentD,
			presentValueD,
			futureValueD,
			dueDateType
		)

		if (y0.abs().lessThan(epsMax)) {
			return rateD.toNumber()
		} else {
			//y1 = y0 and y0 = y1
			y1 = [y0, (y0 = y1.toDecimalPlaces(18))][0].toDecimalPlaces(18)
			//rate1D = rateD and rateD = rate1D
			rate1D = [rateD, (rateD = rate1D.toDecimalPlaces(18))][0].toDecimalPlaces(
				18
			)
		}
		i++
	}
	return NaN // Max iterations exceeded
}
