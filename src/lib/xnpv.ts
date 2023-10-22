import Decimal from 'decimal.js'
import { CashFlow } from '../types'
import { NATURAL_YEAR_IN_DAYS } from './constants'
import { dayCountByDate } from './dayCountByDate'

/**
 * ### Net Present Value (NPV) Schedule for a schedule of cash flows
 *
 * **Excel**:
 * - =XNPV (English)
 * - =VNA.NO.PER (Spanish)
 *
 * Returns the net present value for a schedule of cash flows that is not necessarily periodic.
 * To calculate the net present value for a series of cash flows that is periodic, use the NPV function.
 * - Reference: [Microsoft Support - NPV Function](https://support.microsoft.com/en-us/office/npv-function-8672cb67-2576-4d07-b67b-ac28acf2a568)
 *
 *
 * @param cashFlow
 * @param rate
 * @returns
 *
 * @example
 * ```ts
 *
 * const cashflow = [ -112, 44.05, 41.81, 39.57 ]
 * const dates = [ new Date('2008-01-01'), new Date('2008-03-01'), new Date('2008-10-30'), new Date('2009-02-15') ]
 * const NPV_FinancialFns = xnpv(cashFlow, dates) // 5.537900675836245
 * const NPV_Excel = 5.53790067583623 // =NPV(0,1;cashFlow;dates)
 * ```
 */
export const xnpv = (cashFlow: CashFlow, dates: Date[], rate: number = 0) => {
	let result = new Decimal(cashFlow[0])

	const rateDecimal = new Decimal(rate).add(1)
	for (let i = 1; i < cashFlow.length; i++) {
		const period = dayCountByDate(dates[0], dates[i]) / NATURAL_YEAR_IN_DAYS
		const value = new Decimal(cashFlow[i])
		const resultToAdd = value.div(rateDecimal.pow(period))
		result = result.add(resultToAdd)
	}
	return result.toNumber()
}
