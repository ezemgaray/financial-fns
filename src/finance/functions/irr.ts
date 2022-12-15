import Decimal from 'decimal.js'
import { CashFlow } from '../constants'
import { npv } from './npv'

/**
 * ### Internal Rate of Return (IRR)
 *
 * **Excel**:
 * - =IRR (English)
 * - =TIR (Spanish)
 *
 * Returns the internal rate of return for a series of cash flows represented by the numbers in values.
 * These cash flows do not have to be even, as they would be for an annuity.
 * However, the cash flows must occur at regular intervals, such as monthly or annually.
 * The internal rate of return is the interest rate received for an investment consisting of
 * payments (negative values) and income (positive values) that occur at regular periods.
 * - Reference: [Microsoft Support - IRR Function](https://support.microsoft.com/en-us/office/irr-function-64925eaa-9988-495b-b290-3ad0c163c1bc)
 *
 * @param cashFlow
 * @param guess
 * @returns
 * @example
 * ```ts
 * const cashflow = [ -112, 44.05, 41.81, 39.57 ]
 * const IRR_FinancialFns = irr(cashflow) //  0.05995620665655559
 * const IRR_Excel = 0.05995620665637970 // =IRR(range)
 *
 * // Check with NPV with IRR as rate the result must be 0 (zero)
 * const NPVWithIRR_FinancialFns = npv(cashflow, irr(cashflow)) // 5.47e-16 (0.0000000000000005)
 * const NPVWithIRR_Excel = 0.00000000003377
 *
 * ```
 */
export function irr(cashFlow: CashFlow, guess: number = 0.1): number {
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
	const firstIrrDerivation = (cashFlow: CashFlow, rate: number): number => {
		let result = new Decimal(0)
		const rateDecimal = new Decimal(rate).add(1)
		for (let i = 1; i < cashFlow.length; i++) {
			const value = new Decimal(cashFlow[i])

			result = result.minus(value.mul(i).div(rateDecimal.pow(i + 1)))
		}
		return result.toNumber()
	}

	do {
		NPV = new Decimal(npv(cashFlow, rate.toNumber()))

		const resultDeriv = new Decimal(
			firstIrrDerivation(cashFlow, rate.toNumber())
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
