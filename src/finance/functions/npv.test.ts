import { irr } from './irr'
import { npv } from './npv'

describe('npv', () => {
	it('Must be CloseTo -7.67 (excel)', () => {
		expect(npv([-112, 44.05, 41.81, 39.57], 0.1)).toBeCloseTo(-7.67)
	})
	it('Must be 0 if the rate is equal to the IRR', () => {
		expect(
			npv([-112, 44.05, 41.81, 39.57], irr([-112, 44.05, 41.81, 39.57]))
		).toBeCloseTo(0)
	})
	it('Must be CloseTo 808.41 (excel)', () => {
		expect(
			npv([
				-1333.11, 178.46, 178.46, 178.46, 178.46, 178.46, 178.46, 178.46,
				178.46, 178.46, 178.46, 178.46, 178.46,
			])
		).toBeCloseTo(808.41, 5)
	})
	it('Must be 0 if the rate is equal to the IRR', () => {
		expect(
			npv(
				[
					-1333.11, 178.46, 178.46, 178.46, 178.46, 178.46, 178.46, 178.46,
					178.46, 178.46, 178.46, 178.46, 178.46,
				],
				irr([
					-1333.11, 178.46, 178.46, 178.46, 178.46, 178.46, 178.46, 178.46,
					178.46, 178.46, 178.46, 178.46, 178.46,
				])
			)
		).toBeCloseTo(0)
	})
	it('Must be CloseTo 47.39 (excel)', () => {
		expect(npv([-420.94, 164.01, 156.11, 148.21])).toBeCloseTo(47.39, 5)
	})
	it('Must be 0 if the rate is equal to the IRR', () => {
		expect(
			npv(
				[-420.94, 164.01, 156.11, 148.21],
				irr([-420.94, 164.01, 156.11, 148.21])
			)
		).toBeCloseTo(0)
	})
	it('Must be CloseTo -98.24 (excel)', () => {
		expect(npv([-375, 200, 0, 160, -37], 0.1)).toBeCloseTo(-98.24)
	})
	it('Must be 0 if the rate is equal to the IRR', () => {
		expect(
			npv([-375, 200, 0, 160, -37], irr([-375, 200, 0, 160, -37]))
		).toBeCloseTo(0)
	})
	it('Must be CloseTo 1307.29 (excel)', () => {
		expect(npv([-10000, 3000, 4200, 6800], 0.1)).toBeCloseTo(1307.29)
	})
	it('Must be 0 if the rate is equal to the IRR', () => {
		expect(
			npv([-10000, 3000, 4200, 6800], irr([-10000, 3000, 4200, 6800]))
		).toBeCloseTo(0)
	})
	it('Must be CloseTo 1922.06 (excel)', () => {
		expect(npv([-40000, 8000, 9200, 10000, 12000, 14500], 0.08)).toBeCloseTo(
			1922.06
		)
	})
	it('Must be 0 if the rate is equal to the IRR', () => {
		expect(
			npv(
				[-40000, 8000, 9200, 10000, 12000, 14500],
				irr([-40000, 8000, 9200, 10000, 12000, 14500], 0.08)
			)
		).toBeCloseTo(0)
	})
	it('Must be CloseTo -3749.47 (excel)', () => {
		expect(
			npv([-40000, 8000, 9200, 10000, 12000, 14500, -9000], 0.08)
		).toBeCloseTo(-3749.47)
	})
	it('Must be 0 if the rate is equal to the IRR', () => {
		expect(
			npv(
				[-40000, 8000, 9200, 10000, 12000, 14500, -9000],
				irr([-40000, 8000, 9200, 10000, 12000, 14500, -9000], 0.08)
			)
		).toBeCloseTo(0)
	})
})
