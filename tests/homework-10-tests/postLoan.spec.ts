import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

import { LoanDto } from '../DTO/LoanDto'

test('Income greater than 0, debt not negative, age greater than 16, returns risk score and level and status code "OK"', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({}),
    },
  )

  const responseBody = await response.json()

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBeDefined()
})

test('Income equals 0, debt not negative, age greater than 16, returns status code "BAD_REQUEST"', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ income: '0' }),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Income greater than 0, debt negative, age greater than 16, returns status code "BAD_REQUEST"', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ debt: '-1' }),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Income greater than 0, debt not negative, age less than 16, returns status code "BAD_REQUEST" (400)', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ age: '13' }),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Risk decision "Negative", persons risk level is "Very High Risk", status code "OK" (200)', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ loanAmount: '10000' }),
    },
  )

  const responseBody = await response.json()

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('negative')
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
})

test('Risk decision "Positive", persons risk level is "High Risk", status code "OK" (200)', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ loanAmount: '5000' }),
    },
  )

  const responseBody = await response.json()

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('High Risk')
})

test('Risk decision "Positive", persons risk level is "Medium Risk", status code "OK" (200)', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ loanAmount: '1000' }),
    },
  )

  const responseBody = await response.json()

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
})

test('Risk decision "Positive", persons risk level is "Low Risk", status code "OK" (200)', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ income: '10000', loanPeriod: '12' }),
    },
  )

  const responseBody = await response.json()

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
})

test('If persons risk level is "High Risk", risk periods are 3 and 6', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ loanAmount: '5000' }),
    },
  )

  const responseBody = await response.json()

  expect.soft(responseBody.riskPeriods).toStrictEqual([3, 6])
  expect.soft(responseBody.riskLevel).toBe('High Risk')
})

test('If persons risk level is "Medium Risk", risk periods are 6, 9 and 12', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ loanAmount: '1000' }),
    },
  )

  const responseBody = await response.json()

  expect.soft(responseBody.riskPeriods).toStrictEqual([6, 9, 12])
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
})

test('If persons risk level is "Low Risk", risk periods are 12, 18, 24, 30, 36', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ income: '10000', loanPeriod: '12' }),
    },
  )

  const responseBody = await response.json()

  expect.soft(responseBody.riskPeriods).toStrictEqual([12, 18, 24, 30, 36])
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
})

test('All fields are filled, "income" field is empty, returns status code "BAD_REQUEST"', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ income: '' }),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('All fields are filled, "debt" field is empty, returns status code "BAD_REQUEST"', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ debt: '' }),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('All fields are filled, "age" field is empty, returns status code "BAD_REQUEST"', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ age: '' }),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('All fields are filled, "employed" field is empty, returns status code "BAD_REQUEST"', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ employed: '' }),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('All fields are filled, "loanAmount" field is empty, returns status code "BAD_REQUEST"', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ loanAmount: '' }),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('All fields are filled, "loanPeriod" field is empty, returns status code "BAD_REQUEST" (400)', async ({
  request,
}) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLoanPayload({ loanPeriod: '' }),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
