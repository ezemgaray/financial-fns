import Decimal from 'decimal.js'
import { round } from './round'
/**
 * Count days between two dates without time
 * @param from
 * @param to
 * @param abs
 * @returns integer
 */
export const dayCountByDate = (
	from: Date,
	to: Date,
	abs: boolean = false
): number => {
	const difference = round(
		new Decimal(to.setUTCHours(0, 0, 0, 0))
			.minus(new Decimal(from.setUTCHours(0, 0, 0, 0)))
			.div(1000 * 60 * 60 * 24)
			.toNumber(),
		0
	)
	return abs ? Math.abs(difference) : difference
}
