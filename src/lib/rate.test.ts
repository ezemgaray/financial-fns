import { rate } from './rate'

describe('rate', () => {
	it('Should throw error "Periods must be a number greater or equal than 1"', () => {
		expect(() => rate(0 * 12, -200, 8000)).toThrow(
			'Periods must be a number greater or equal than 1'
		)
	})
	it('Should throw error "For payment and present value, at least one of these must be negative and the other positive."', () => {
		expect(() => rate(4 * 12, 200, 8000)).toThrow(
			'For payment and present value, at least one of these must be negative and the other positive.'
		)
	})
	it('Should throw error "For payment and present value, at least one of these must be negative and the other positive."', () => {
		expect(() => rate(4 * 12, -200, -8000)).toThrow(
			'For payment and present value, at least one of these must be negative and the other positive.'
		)
	})
	it('Should be NaN for Max iterations exceeded. Rate not found.', () => {
		expect(rate(4 * 12, -200, 8000, 0, 0, 200)).toBeNaN()
	})
	it('Should be close to 0.00770147248820137 (Excel) - Monthly rate', () => {
		expect(rate(4 * 12, -200, 8000)).toBeCloseTo(0.00770147248820137)
	})
	it('Should be close to 0.00770147248819591 (Excel) - Monthly rate with guess 0', () => {
		expect(rate(4 * 12, -200, 8000, 0, 0, 0)).toBeCloseTo(0.00770147248819591)
	})
	it('Should be close to 0.0924176698584164 (Excel) - Annual rate', () => {
		expect(rate(4 * 12, -200, 8000) * 12).toBeCloseTo(0.0924176698584164)
	})
	it('Should be close to 0.0924176698583509 (Excel) - Monthly rate with guess 0', () => {
		expect(rate(4 * 12, -200, 8000, 0, 0, 0) * 12).toBeCloseTo(
			0.0924176698583509
		)
	})
	it('Should be close to 0.0015215494055775700 (Excel) - Monthly rate with guess 0', () => {
		expect(rate(276, -1991, 446386, 3135, 1, 0.05)).toBeCloseTo(
			0.00152154940557757
		)
	})
})
