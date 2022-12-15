import { fvSchedule } from './fvSchedule'

describe('FVSCHEDULE', () => {
	it('Should throw error "Schedule must be an array of numbers"', () => {
		expect(() => fvSchedule(336, <any>1)).toThrow(
			'Schedule must be an array of numbers'
		)
	})
	it('Should  throw error "Rate must be a number"', () => {
		expect(() => fvSchedule(336, <any>[0.1, '0.05'])).toThrow(
			'Rate must be a number'
		)
	})
	it('Should be 370.65168 (excel)', () => {
		expect(fvSchedule(336, [0.02, 0.05, 0.03])).toBe(370.65168)
	})
	it('Should be 1.33089 (excel)', () => {
		expect(fvSchedule(1, [0.09, 0.11, 0.1])).toBe(1.33089)
	})
})
