import { xirr } from './xirr'

describe('XIRR', () => {
	it('Should be NaN "There must be at least two values (1 negative and 1 positive number)."', () => {
		expect(xirr([-112], <any>[])).toBe(NaN)
	})
	it('Should be NaN "The first value must be a negative number."', () => {
		expect(xirr([112, 44.05, 41.81, 39.57], <any>[])).toBe(NaN)
	})
	it('Should be NaN "At least one transaction must be a positive number."', () => {
		expect(xirr([-112, -44.05, -41.81, -39.57], <any>[])).toBe(NaN)
	})
	it('Should be NaN "The total dates must coincide with the cash flow."', () => {
		expect(xirr([-112, 44.05, 41.81, 39.57], <any>[])).toBe(NaN)
	})
	it('Must be NaN', () => {
		expect(
			xirr(
				[-112, 44.05, 41.81, -39000.57],
				[
					new Date('2008-01-01'),
					new Date('2008-03-01'),
					new Date('2008-10-30'),
					new Date('2009-02-15')
				]
			)
		).toEqual(NaN)
	})
	it('Should be 0.373364 (excel)', () => {
		expect(
			xirr(
				[-10000, 2750, 4250, 3250, 2750],
				[
					new Date('2008-01-01'),
					new Date('2008-03-01'),
					new Date('2008-10-30'),
					new Date('2009-02-15'),
					new Date('2009-04-01')
				]
			)
		).toBeCloseTo(0.373354)
	})
	it('Should be 3.1242 (excel)', () => {
		expect(
			xirr(
				[-112, 44.05, 41.81, 39.57],
				[
					new Date('2022-12-11'),
					new Date('2022-12-26'),
					new Date('2023-01-10'),
					new Date('2023-01-25')
				]
			)
		).toBeCloseTo(3.1242)
	})
})
