import { nper } from './nper'

describe('nper', () => {
	it('Should throw error "Payment cannot be 0"', () => {
		expect(() => nper(0, 0, -25000)).toThrow('Payment cannot be 0')
	})
	it('Should throw error "Cannot Calculate NPER"', () => {
		expect(() => nper(0.1, 0.1, -1500)).toThrow('Cannot Calculate NPER')
	})
	it('Should return 50 periods with rate as 0 (Excel)', () => {
		expect(nper(0, 500, -25000)).toEqual(50)
	})
	it('Should return 59.6738657 periods (Excel) - At the beginning of the period', () => {
		expect(nper(0.12 / 12, -100, -1000, 10000, 1)).toBeCloseTo(59.6738657)
	})
	it('Should return 60.0821229 periods (Excel) - At the end of the period', () => {
		expect(nper(0.12 / 12, -100, -1000, 10000)).toBeCloseTo(60.0821229)
	})
	it('Should return -9.57859404 periods (Excel) - without future value', () => {
		expect(nper(0.12 / 12, -100, -1000)).toBeCloseTo(-9.57859404)
	})
	it('Should return 18.51139027 periods (Excel) - without future value', () => {
		expect(nper(0.018, -230, 0, 5000)).toBeCloseTo(18.51139027)
	})
	it('Should return 252.8068518 periods (Excel) - without future value', () => {
		expect(nper(0.065 / 12, -2000, 275000)).toBeCloseTo(252.8068518)
	})
})
