import Decimal from 'decimal.js'

/**
 * Round a number (default places = 2)
 * @param num
 * @param places
 * @returns
 */
export const round = (num: number, places: number = 2): number => {
	return new Decimal(num).toDecimalPlaces(places).toNumber()
}
