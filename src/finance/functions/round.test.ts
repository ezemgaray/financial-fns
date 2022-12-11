import { round } from './round'

describe('round', () => {
	it('Should be 3.16', () => {
		const result = round(3.157)

		expect(result).toEqual(3.16)
	})
	it('Should be 13.11', () => {
		const result = round(13.113)
		expect(result).toEqual(13.11)
	})
	it('Should be 135.14', () => {
		const result = round(135.1444444444)
		expect(result).toEqual(135.14)
	})
	it('Should be 135.16', () => {
		const result = round(135.155555)
		expect(result).toEqual(135.16)
	})
	it('Should be 135.15', () => {
		const result = round(135.15000004)
		expect(result).toEqual(135.15)
	})
	it('Should be 135.1537', () => {
		const result = round(135.15366007, 4)
		expect(result).toEqual(135.1537)
	})
	it('Should be 135.15366', () => {
		const result = round(135.15366007, 6)
		expect(result).toEqual(135.15366)
	})
	it('Should be 135.1536601', () => {
		const result = round(135.15366007, 7)
		expect(result).toEqual(135.1536601)
	})
})
