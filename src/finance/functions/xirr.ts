import Decimal from 'decimal.js'
import { CashFlow, NATURAL_YEAR_IN_DAYS } from '../constants'
import { dayCountByDate } from './dayCountByDate'
import { xnpv } from './xnpv'

/**
 * Calculate XIRR (Spanish: TIR.NO.PER )
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
		throw Error(
			'There must be at least two values (1 negative and 1 positive number).'
		)
	}
	// check for investment
	if (cashFlow[0] >= 0) {
		throw Error('The first value must be a negative number.')
	}

	if (!cashFlow.find(transaction => transaction > 0)) {
		throw Error('At least one transaction must be a positive number.')
	}
	if (cashFlow.length != dates.length) {
		throw Error('The total dates must coincide with the cash flow.')
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

// console.log(
// 	xirr(
// 		[-10000, 2750, 4250, 3250, 2750],
// 		[
// 			new Date('2008-01-01'),
// 			new Date('2008-03-01'),
// 			new Date('2008-10-30'),
// 			new Date('2009-02-15'),
// 			new Date('2009-04-01'),
// 		]
// 	)
// )
// console.log(
// 	xirr(
// 		[-112, 44.05, 41.81, 39.57],
// 		[
// 			new Date('2022-12-11'),
// 			new Date('2022-12-26'),
// 			new Date('2023-01-10'),
// 			new Date('2023-01-25'),
// 		]
// 	)
// )
