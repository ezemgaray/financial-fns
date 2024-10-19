<div align="center">

# financial-fns

Library with financial functions, useful calculations and constants

[![NPM version](https://badgen.net/npm/v/financial-fns)](https://npmjs.com/package/financial-fns)
[![NPM downloads](https://badgen.net/npm/dw/financial-fns)](https://npmjs.com/package/financial-fns)
[![Open issues](https://badgen.net/github/open-issues/ezemgaray/financial-fns)](https://github.com/ezemgaray/financial-fns/issues)
[![Open prs](https://badgen.net/github/open-prs/ezemgaray/financial-fns)](https://github.com/ezemgaray/financial-fns/pulls)

</div>

<div align="center">

<a href="https://www.buymeacoffee.com/ezemgaray">
<img src="https://cdn.buymeacoffee.com/buttons/default-black.png" width="170" />
</a>
</div>

---

## Install

```sh
npm install financial-fns
```

## Usage

Use se import or require

**ES6 Modules**

```typescript
import { xirr } from 'financial-fns'

const result = xirr(
	[-10000, 2750, 4250, 3250, 2750],
	[
		new Date('2008-01-01'),
		new Date('2008-03-01'),
		new Date('2008-10-30'),
		new Date('2009-02-15'),
		new Date('2009-04-01')
	]
)

console.log('RESULT', result) // RESULT 0.3733625335188315
```

**CommonJS**

```typescript
const { xirr } require('financial-fns')

const result = xirr(
	[-10000, 2750, 4250, 3250, 2750],
	[
		new Date('2008-01-01'),
		new Date('2008-03-01'),
		new Date('2008-10-30'),
		new Date('2009-02-15'),
		new Date('2009-04-01')
	]
)

console.log('RESULT', result) // RESULT 0.3733625335188315
```

## Functions

### XIRR

Calculates the internal rate of return (IRR) for a schedule of cash flows that is not necessarily periodic.
**Excel**

- =XIRR (English)
- =TIR.NO.PER (Spanish)

```ts
xirr(cashFlow, dates, guess)
```

**Example**

```ts
const result = xirr(
	[-10000, 2750, 4250, 3250, 2750],
	[
		new Date('2008-01-01'),
		new Date('2008-03-01'),
		new Date('2008-10-30'),
		new Date('2009-02-15'),
		new Date('2009-04-01')
	]
)
console.log(result) // 0.3733625335188315
```

## IRR

Calculates the internal rate of return (IRR) for a series of cash flows represented by the numbers in values.
**Excel**:

- =IRR (English)
- =TIR (Spanish)

```ts
// guess default 0,1
irr(cashFlow, guess)
```

**Example**

```ts
const result = irr([-10000, 2750, 4250, 3250, 2750])
console.log(result) // 0.1154127831005586
```

## NPV

Calculates the net present value of an investment based on a discount rate and a series of cash flows.

**Excel**:

- =NPV (English)
- =VNA (Spanish)

```ts
// rate default 0
npv(cashFlow, rate)
```

**Example**

```ts
const result = npv(
	[
		-1333.11,
		178.46,
		178.46,
		178.46,
		178.46,
		178.46,
		178.46,
		178.46,
		178.46,
		178.46,
		178.46,
		178.46,
		178.46
	],
	0.05
)
console.log(result) // 248.62588704065456
```

## XNPV

Calculates the net present value of an investment based on a discount rate and a series of cash flows.

**Excel**:

- =XNPV (English)
- =VNA.NO.PER (Spanish)

```ts
// rate default 0
xnpv(cashFlow, dates, rate)
```

**Example**

```ts
const result = xnpv(
	[-10000, 2750, 4250, 3250, 2750],
	[
		new Date('2008-01-01'),
		new Date('2008-03-01'),
		new Date('2008-10-30'),
		new Date('2009-02-15'),
		new Date('2009-04-01')
	],
	0.1
)
console.log(result) // 1994.5100406532633
```

## Rate

Monthly rate

**Excel**:

- =RATE (English)
- =TASA (Spanish)

```ts
rate(
	nPeriods,
	payment,
	presentValue,
	(futureValue = 0),
	(dueDateType = 0),
	(guess = 0.1)
)
```

**Example**

```ts
const monthlyRate = rate(4 * 12, -200, 8000)
console.log(monthlyRate) // 0.0077014724882104105
const annualRate = rate(4 * 12, -200, 8000) * 12
console.log(annualRate) // 0.09241766985852493
```

## NPER

Calculate number of periods

**Excel**:

- =NPER (English)
- =NPER (Spanish)

```ts
nper(rate, payment, presentValue, (futureValue = 0), (dueDateType = 0))
```

**Example**

```ts
const result = nper(0, 500, -25000)
console.log(result) // 50
```

## FV

Calculate the future value of an investment based on a constant interest rate. You can use FV with either periodic, constant payments, or a single lump sum payment.
**Excel**:

- =FV (English)
- =VF (Spanish)

```ts
fv(rate, totalPeriods, payment, (presentValue = 0), (dueDateType = 0))
```

**Example**

```ts
const result = fv(0.12 / 12, 12, -1000)
console.log(result) // 12682.503013196972
```

## FV Schedule

Future value (applying a series of compound interest rates)
**Excel**:

- =FVSCHEDULE (English)
- =VF.PLAN (Spanish)

```ts
fvSchedule(principal, schedule)
```

**Example**

```ts
const result = fvSchedule(336, [0.02, 0.05, 0.03])
console.log(result) // 370.65168
```

## Effect

Returns the effective annual interest rate, given the nominal annual interest rate and the number of compounding periods per year.
**Excel**:

- =EFFECT (English)
- =INT.EFECTIVO (Spanish)

```ts
effect(rate, nPeriods)
```

**Example**

```ts
const result = effect(0.1, 12)
console.log(result) // 0.10471306744129724
```

## Day count by date

Count days between two dates without time

```ts
dayCountByDate(dateFrom, dateTo, (abs = false))
```

**Example**

```ts
const dayCount = dayCountByDate(new Date('2022-06-10'), new Date('2022-02-18'))
console.log(dayCount) // -112

const dayCountAbs = dayCountByDate(
	new Date('2022-06-10'),
	new Date('2022-02-18'),
	true
)
console.log(dayCountAbs) // 112
```

## Day count by dateTime

Count days between two dates without time

```ts
dayCountByDateTime(dateFrom, dateTo, (abs = false))
```

**Example**

```ts
const dayCount = dayCountByDateTime(
	new Date('2022-03-04 22:00:00'),
	new Date('2022-02-27 22:00:00')
)
console.log(dayCount) // -5

const dayCountAbs = dayCountByDateTime(
	new Date('2022-03-04 22:00:00'),
	new Date('2022-02-27 22:00:00'),
	true
)
console.log(dayCountAbs) // 5
const dayCountAbs2 = dayCountByDateTime(
	new Date('2022-03-04 23:00:00'),
	new Date('2022-02-27 22:00:00'),
	true
)
console.log(dayCountAbs2) // 5.04
```

## Get days by frequency

Get total days in a frequency

```ts
getDaysByFrequency(frequency)
```

**Example**

```ts
/**
 * weekly: 7,
 * biWeekly: 14,
 * monthly: 1,
 * everyTwoMonths: 2,
 * everyThreeMonths: 3,
 * everyFourMonths: 4,
 * everySixMonths: 6,
 * yearly: 12,
 */
const monthlyDays = getDaysByFrequency(1)
console.log(monthlyDays) // 30
const biWeekly = getDaysByFrequency(14)
console.log(biWeekly) // 15
```

## Last date of month

Get last date of month.

```ts
getLastDateOfMonth(month, year)
```

**Example**

```ts
/**
 * JS Months from 0 to 11
 */
const lastDate1 = getLastDateOfMonth(1, 2022)
console.log(lastDate) // 28
const lastDate2 = getLastDateOfMonth(1, 2024)
console.log(lastDate) // 29
```

## Round

Round a number to a specified number of decimal places.

```ts
round(num, places)
```

**Example**

```ts
const result = round(135.15000004)
console.log(result) // 135.15
const result2 = round(135.15366007, 4)
console.log(result2) // 135.1537
```
