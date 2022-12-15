import { irr } from './irr'

describe('IRR', () => {
	it('Should throw error "There must be at least two values (1 negative and 1 positive number)."', () => {
		expect(() => irr([-112])).toThrow(
			'There must be at least two values (1 negative and 1 positive number).'
		)
	})
	it('Should throw error "The first value must be a negative number."', () => {
		expect(() => irr([112, 44.05, 41.81, 39.57])).toThrow(
			'The first value must be a negative number.'
		)
	})
	it('Should throw error "At least one transaction must be a positive number."', () => {
		expect(() => irr([-112, -44.05, -41.81, -39.57])).toThrow(
			'At least one transaction must be a positive number.'
		)
	})
	it('Must be NaN', () => {
		expect(irr([-1120, 44.05, 41.81, 39.57])).toEqual(NaN)
	})
	it('Must be NaN', () => {
		expect(irr([-112, 44.05, 41.81, -39000.57])).toEqual(NaN)
	})
	it('Must be close to 0.0599562 (excel)', () => {
		expect(irr([-112, 44.05, 41.81, 39.57])).toBeCloseTo(0.0599562, 5)
	})
	it('Must be close to 0.0599562 (excel) - adding guess=0.5', () => {
		expect(irr([-112, 44.05, 41.81, 39.57], 0.5)).toBeCloseTo(0.0599562, 5)
	})
	it('Must be close to 0.0817018 (excel)', () => {
		expect(
			irr([
				-1333.11, 178.46, 178.46, 178.46, 178.46, 178.46, 178.46, 178.46,
				178.46, 178.46, 178.46, 178.46, 178.46,
			])
		).toBeCloseTo(0.0817018, 5)
	})
	it('Must be close to 0.0562908 (excel)', () => {
		expect(irr([-420.94, 164.01, 156.11, 148.21])).toBeCloseTo(0.0562908, 5)
	})
	it('Must be close to -0.0854988 (excel)', () => {
		expect(irr([-375, 200, 0, 160, -37])).toBeCloseTo(-0.0854988, 5)
	})
})
