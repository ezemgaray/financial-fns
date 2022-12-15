import Decimal from 'decimal.js'
import { round } from './round'
/**
 * Count the days between two dates (and time).
 * With the percentage you can decide to round the result to the floor or to the ceiling according to your need
 * @param from
 * @param to
 * @param abs
 * @returns
 * @example
 * Return 3.15 (days)
 */
export const dayCountByDateTime = (
	from: Date,
	to: Date,
	abs: boolean = false
): number => {
	const difference = round(
		new Decimal(to.getTime())
			.minus(from.getTime())
			.div(1000 * 60 * 60 * 24)
			.toNumber()
	)
	return abs ? Math.abs(difference) : difference
}
