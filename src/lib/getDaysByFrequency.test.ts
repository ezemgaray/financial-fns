import { getDaysFrequency } from './getDaysByFrequency'

describe('getDaysInFrequency', () => {
	it('Should be NaN - "Incorrect frequency."', () => {
		const frequency = 9
		expect(getDaysFrequency(<any>frequency)).toBe(NaN)
	})
	it('Should be 7 days - weekly', () => {
		const frequency = 7
		expect(getDaysFrequency(frequency)).toEqual(7)
	})
	it('Should be 15 days - biWeekly', () => {
		const frequency = 14
		expect(getDaysFrequency(frequency)).toEqual(15)
	})
	it('Should be 30 days - monthly', () => {
		const frequency = 1
		expect(getDaysFrequency(frequency)).toEqual(30)
	})
	it('Should be 60 days - every two months', () => {
		const frequency = 2
		expect(getDaysFrequency(frequency)).toEqual(60)
	})
	it('Should be 90 days - every three months', () => {
		const frequency = 3
		expect(getDaysFrequency(frequency)).toEqual(90)
	})
	it('Should be 120 days - every four months', () => {
		const frequency = 4
		expect(getDaysFrequency(frequency)).toEqual(120)
	})
	it('Should be 180 days - every four months', () => {
		const frequency = 6
		expect(getDaysFrequency(frequency)).toEqual(180)
	})
	it('Should be 360 days - yearly', () => {
		const frequency = 12
		expect(getDaysFrequency(frequency)).toEqual(360)
	})
})
