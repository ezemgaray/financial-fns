import { fv } from './fv'

describe('FV', () => {
	it('Must be close to 2581.40337406 (excel)', () => {
		expect(fv(0.06 / 12, 10, -200, -500, true)).toBeCloseTo(2581.40337406)
	})
	it('Must be close to 12682.50301320 (excel)', () => {
		expect(fv(0.12 / 12, 12, -1000)).toBeCloseTo(12682.5030132)
	})
	it('Must be close to 12000 (excel)', () => {
		expect(fv(0, 12, -1000)).toBeCloseTo(12000)
	})
})
