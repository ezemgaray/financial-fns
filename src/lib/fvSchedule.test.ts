import { fvSchedule } from './fvSchedule'

describe('FVSCHEDULE', () => {
	it('Should be NaN - "Schedule must be an array of numbers"', () => {
		expect(fvSchedule(336, <any>1)).toBe(NaN)
	})
	it('Should  be NaN - "Rate must be a number"', () => {
		expect(fvSchedule(336, <any>[0.1, '0,05'])).toBe(NaN)
	})
	it('Should be 370.65168 (excel)', () => {
		expect(fvSchedule(336, [0.02, 0.05, 0.03])).toBe(370.65168)
	})
	it('Should be 1.33089 (excel)', () => {
		expect(fvSchedule(1, [0.09, 0.11, 0.1])).toBe(1.33089)
	})
})
