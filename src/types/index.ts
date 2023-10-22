import { FREQUENCIES } from '../lib'

/**
 * create enum type from object values
 * @example
 * const FREQUENCIES = {
 * 	weekly: 7,
 * 	monthly: 28
 * } as const //<- add 'as const'
 *
 * type Frequency = ValueOf<typeof FREQUENCIES> // 7 | 28
 */
export type ValueOf<T> = T[keyof T]
export type CashFlowTransaction = {
	readonly amount: number
	readonly date: Date
}
export type CashFlow = number[]
export type CashFlowXirr = CashFlowTransaction[]
export type Frequency = ValueOf<typeof FREQUENCIES>
export type LastDateOfMonth = 28 | 29 | 30 | 31
export type DynamicType<T> = {
	[P in string]: T
}
