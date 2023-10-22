import { effect } from './effect'
describe('effect', () => {
	it('Should be NaN "The rate must be a number greater than 0"', () => {
		expect(effect(0, 12)).toBe(NaN)
	})
	it('Should be NaN "The number of periods must be a number greater or equal than 1"', () => {
		expect(effect(0.1, 0)).toBe(NaN)
	})
	it('Should be close to 0.104713067441297 (excel)', () => {
		expect(effect(0.1, 12)).toBeCloseTo(0.104713067441297)
	})
	it('Should be close to 0.0535426673707584 (excel)', () => {
		expect(effect(0.0525, 4)).toBeCloseTo(0.0535426673707584)
	})
})
