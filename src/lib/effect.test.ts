import { effect } from './effect'
describe('effect', () => {
	it('Should throw error "The rate must be a number greater than 0"', () => {
		expect(() => effect(0, 12)).toThrow(
			'The rate must be a number greater than 0'
		)
	})
	it('Should throw error "The number of periods must be a number greater or equal than 1"', () => {
		expect(() => effect(0.1, 0)).toThrow(
			'The number of periods must be a number greater or equal than 1'
		)
	})
	it('Should be close to 0.104713067441297 (excel)', () => {
		expect(effect(0.1, 12)).toBeCloseTo(0.104713067441297)
	})
	it('Should be close to 0.0535426673707584 (excel)', () => {
		expect(effect(0.0525, 4)).toBeCloseTo(0.0535426673707584)
	})
})
