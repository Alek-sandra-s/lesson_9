import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('Valid username and password return API key and status code "OK"', async ({ request }) => {
  const requestParameters = {
    username: 'Aleksandra',
    password: '123456',
  }

  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters,
  })
  const responseBody = await response.json()
  expect(response.status()).toBe(StatusCodes.OK)
  expect(typeof responseBody.apiKey).toBe('string')
})

test('Invalid username(number) and valid password do not return API key, status code "BAD_REQUEST"', async ({
  request,
}) => {
  const requestParameters = {
    username: 2333,
    password: '45455',
  }

  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Valid username and invalid password(number) do not return API key, status code "BAD_REQUEST"', async ({
  request,
}) => {
  const requestParameters = {
    username: 2333,
    password: '45455',
  }

  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Empty username or password do not return API key, status code "INTERNAL_SERVER_ERROR"', async ({
  request,
}) => {
  const requestParameters = {
    username: '',
    password: '45455',
  }

  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters,
  })
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Valid username or empty password do not return API key, status code "INTERNAL_SERVER_ERROR"', async ({
  request,
}) => {
  const requestParameters = {
    username: 'Aleksandra',
    password: '',
  }

  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters,
  })
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
