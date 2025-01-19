import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('Valid order ID and API key updates an order and returns status code "OK"', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Invalid order ID with special characters and valid API key does not update an order and returns status code "BAD_REQUEST"', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/%%%', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Valid order ID and invalid API key does not update an order and returns status code ""UNAUTHORIZED"', async ({ request }) => {
  const requestHeaders = {
    api_key: 'ssdgfkfflflff',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Request with empty order id and valid API key does not update an order and returns status code "METHOD_NOT_ALLOWED"', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('Request with valid order id and empty API key does not update an order and returns status code "UNAUTHORIZED"', async ({ request }) => {
  const requestHeaders = {
    api_key: '',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Request with non-existent order id and valid API key does not update an order and returns status code "NOT_FOUND"', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/10000000000', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.NOT_FOUND)
})