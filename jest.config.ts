import type { Config } from '@jest/types'
require('dotenv').config()

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['dotenv/config'],
}

export default config
