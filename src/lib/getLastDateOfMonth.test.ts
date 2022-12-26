import { getLastDateOfMonth } from './getLastDateOfMonth'

describe('getLastDateOfMont', () => {
	it('Should return 28', () => {
		expect(getLastDateOfMonth(1, 2022)).toEqual(28)
	})
	it('Should return 29', () => {
		expect(getLastDateOfMonth(1, 2024)).toEqual(29)
	})
	it('Should return 29', () => {
		expect(getLastDateOfMonth(0, 1725)).toEqual(31)
	})
})
