import { xirr } from './xirr'
import { xnpv } from './xnpv'

describe('xnpv', () => {
	it('Must be close to 5.53790067583623 (excel)', () => {
		expect(
			xnpv(
				[-112, 44.05, 41.81, 39.57],
				[
					new Date('2008-01-01'),
					new Date('2008-03-01'),
					new Date('2008-10-30'),
					new Date('2009-02-15'),
				],
				0.1
			)
		).toBeCloseTo(5.53790067583623)
	})
	it('Must be close to 3000 (excel)', () => {
		expect(
			xnpv(
				[-10000, 2750, 4250, 3250, 2750],
				[
					new Date('2008-01-01'),
					new Date('2008-03-01'),
					new Date('2008-10-30'),
					new Date('2009-02-15'),
					new Date('2009-04-01'),
				]
			)
		).toBeCloseTo(3000)
	})
	it('Must be close to 1994.5100406 (excel)', () => {
		expect(
			xnpv(
				[-10000, 2750, 4250, 3250, 2750],
				[
					new Date('2008-01-01'),
					new Date('2008-03-01'),
					new Date('2008-10-30'),
					new Date('2009-02-15'),
					new Date('2009-04-01'),
				],
				0.1
			)
		).toBeCloseTo(1994.5100406)
	})
	it('Must be 0 if the rate is equal to the IRR', () => {
		expect(
			xnpv(
				[-10000, 2750, 4250, 3250, 2750],

				[
					new Date('2008-01-01'),
					new Date('2008-03-01'),
					new Date('2008-10-30'),
					new Date('2009-02-15'),
					new Date('2009-04-01'),
				],
				xirr(
					[-10000, 2750, 4250, 3250, 2750],
					[
						new Date('2008-01-01'),
						new Date('2008-03-01'),
						new Date('2008-10-30'),
						new Date('2009-02-15'),
						new Date('2009-04-01'),
					]
				)
			)
		).toBeCloseTo(0)
	})
})
