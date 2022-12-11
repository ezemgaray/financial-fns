import { xirr } from './xirr'

describe('XIRR', () => {
	it('Should throw error "There must be at least two values (1 negative and 1 positive number)."', () => {
		expect(() => xirr([-112], <any>[])).toThrow(
			'There must be at least two values (1 negative and 1 positive number).'
		)
	})
	it('Should throw error "The first value must be a negative number."', () => {
		expect(() => xirr([112, 44.05, 41.81, 39.57], <any>[])).toThrow(
			'The first value must be a negative number.'
		)
	})
	it('Should throw error "At least one transaction must be a positive number."', () => {
		expect(() => xirr([-112, -44.05, -41.81, -39.57], <any>[])).toThrow(
			'At least one transaction must be a positive number.'
		)
	})
	it('Should throw error "The total dates must coincide with the cash flow."', () => {
		expect(() => xirr([-112, 44.05, 41.81, 39.57], <any>[])).toThrow(
			'The total dates must coincide with the cash flow.'
		)
	})
	it('Must be NaN', () => {
		expect(
			xirr(
				[-112, 44.05, 41.81, -39000.57],
				[
					new Date('2008-01-01'),
					new Date('2008-03-01'),
					new Date('2008-10-30'),
					new Date('2009-02-15'),
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
					new Date('2009-04-01'),
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
					new Date('2023-01-25'),
				]
			)
		).toBeCloseTo(3.1242)
	})
})
