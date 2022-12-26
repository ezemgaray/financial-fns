import { dayCountByDate } from './dayCountByDate'

describe('DateHelpers: dayCountByDate', () => {
	it('Should be 1', () => {
		expect(
			dayCountByDate(new Date('2021-10-10'), new Date('2021-10-09'), true)
		).toBe(1)
	})
	it('Should be 1', () => {
		expect(dayCountByDate(new Date('2021-10-09'), new Date('2021-10-10'))).toBe(
			1
		)
	})
	it('Should be -1', () => {
		expect(dayCountByDate(new Date('2021-10-10'), new Date('2021-10-09'))).toBe(
			-1
		)
	})
	it('Should be -7', () => {
		expect(dayCountByDate(new Date('2021-10-16'), new Date('2021-10-09'))).toBe(
			-7
		)
	})
	it('Should be -112', () => {
		expect(dayCountByDate(new Date('2022-06-10'), new Date('2022-02-18'))).toBe(
			-112
		)
	})
	it('Should be 112', () => {
		expect(
			dayCountByDate(new Date('2022-02-18'), new Date('2022-06-10'), true)
		).toBe(112)
	})
	it('Should be 35', () => {
		expect(
			dayCountByDate(new Date('2021-09-10'), new Date('2021-10-15'), true)
		).toBe(35)
	})
})
