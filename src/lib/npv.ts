import Decimal from 'decimal.js'
import { CashFlow } from './constants'

/**
 * ### Net Present Value (NPV)
 *
 * **Excel**:
 * - =NPV (English)
 * - =VNA (Spanish)
 *
 * Calculates the net present value of an investment by using a discount rate
 * and a series of future payments (negative values) and income (positive values).
 * - Reference: [Microsoft Support - NPV Function](https://support.microsoft.com/en-us/office/npv-function-8672cb67-2576-4d07-b67b-ac28acf2a568)
 *
 * NPV = ∑ (cashFlow[n]/(1+rate)**n)-cashFlow[0]
 *
 * @param cashFlow
 * @param rate
 * @returns
 *
 * @example
 * ```ts
 *
 * const cashflow = [ -112, 44.05, 41.81, 39.57 ]
 * const NPV_FinancialFns = npv(cashFlow) // 13.43
 * const NPV_Excel = 13.43 // =NPV(0;range)
 * ```
 */
export const npv = (cashFlow: CashFlow, rate: number = 0) => {
	let result = new Decimal(cashFlow[0])

	const rateDecimal = new Decimal(rate).add(1)
	for (let i = 1; i < cashFlow.length; i++) {
		const value = new Decimal(cashFlow[i])
		const resultToAdd = value.div(rateDecimal.pow(i))
		result = result.add(resultToAdd)
	}
	return result.toNumber()
}
