import Decimal from 'decimal.js'
import { CashFlow } from '../types'
import { NATURAL_YEAR_IN_DAYS } from './constants'
import { dayCountByDate } from './dayCountByDate'
import { xnpv } from './xnpv'

/**
 * ### Internal Rate of Return (IRR) for a series of cash flows.
 *
 * **Excel**:
 * - =XIRR (English)
 * - =TIR.NO.PER (Spanish)
 *
 * Returns the internal rate of return for a schedule of cash flows that
 * is not necessarily periodic. To calculate the internal rate of return
 * for a series of periodic cash flows, use the IRR function.
 * - Reference: [Microsoft Support - XIRR Function](https://support.microsoft.com/en-us/office/xirr-function-de1242ec-6477-445b-b11b-a303ad9adc9d)
 * @param cashFlow
 * @param dates
 * @param guess
 * @returns
 */
export const xirr = (
	cashFlow: CashFlow,
	dates: Date[],
	guess: number = 0.1
) => {
	// check at least 2 values
	if (cashFlow.length < 2) {
		// There must be at least two values (1 negative and 1 positive number).
		return NaN
	}
	// check for investment
	if (cashFlow[0] >= 0) {
		// The first value must be a negative number.
		return NaN
	}

	if (!cashFlow.find(transaction => transaction > 0)) {
		// At least one transaction must be a positive number.
		return NaN
	}
	if (cashFlow.length != dates.length) {
		// The total dates must coincide with the cash flow.
		return NaN
	}

	const precision: number = 1e-10

	let rate = new Decimal(guess)

	/** Net Present Value */
	let NPV: Decimal
	/**
	 * Max iteration to get irr result
	 */
	let maxIteration = 100
	let attempts = 0
	let espRate: Decimal
	const firstIrrDerivation = (
		cashFlow: CashFlow,
		dates: Date[],
		rate: number
	): number => {
		let result = new Decimal(0)
		const rateDecimal = new Decimal(rate).add(1)
		for (let i = 1; i < cashFlow.length; i++) {
			const period = dayCountByDate(dates[0], dates[i]) / NATURAL_YEAR_IN_DAYS
			const value = new Decimal(cashFlow[i])
			result = result.minus(value.mul(period).div(rateDecimal.pow(period + 1)))
		}
		return result.toNumber()
	}
	do {
		NPV = new Decimal(xnpv(cashFlow, dates, rate.toNumber()))

		const resultDeriv = new Decimal(
			firstIrrDerivation(cashFlow, dates, rate.toNumber())
		)

		if (
			resultDeriv.isZero() ||
			resultDeriv.isNaN() ||
			!resultDeriv.isFinite()
		) {
			return Number.NaN
		}
		const newRate = rate.minus(NPV.div(resultDeriv))
		espRate = new Decimal(newRate.minus(rate)).abs()
		rate = newRate

		++attempts
	} while (
		NPV.abs().toNumber() > precision &&
		espRate.toNumber() > precision &&
		attempts < maxIteration
	)

	return rate.toNumber()
}
