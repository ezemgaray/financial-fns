import { dayCountByDateTime } from './dayCountByDateTime'

describe('daysCountByDateTime', () => {
	it('Should be less than 1 (0.71)', () => {
		expect(
			dayCountByDateTime(
				new Date('2022-12-08 22:00:00'),
				new Date('2022-12-09 15:00:00')
			)
		).toBeLessThan(1)
	})
	it('Should be 10', () => {
		expect(
			dayCountByDateTime(
				new Date('2022-12-08 22:00:00'),
				new Date('2022-12-18 22:00:00')
			)
		).toBe(10)
	})
	it('Should be 10', () => {
		expect(
			dayCountByDateTime(
				new Date('2022-12-08 22:00:00'),
				new Date('2022-12-18 22:00:10')
			)
		).toBe(10)
	})
	it('Should be greater than 10', () => {
		expect(
			dayCountByDateTime(
				new Date('2022-12-08 22:00:00'),
				new Date('2022-12-18 22:30:00')
			)
		).toBeGreaterThan(10)
	})
	it('Should be -5', () => {
		expect(
			dayCountByDateTime(
				new Date('2022-03-04 22:00:00'),
				new Date('2022-02-27 22:00:00')
			)
		).toBe(-5)
	})
	it('Should be 5 (abs=true', () => {
		expect(
			dayCountByDateTime(
				new Date('2022-03-04 22:00:00'),
				new Date('2022-02-27 22:00:00'),
				true
			)
		).toBe(5)
	})
})
