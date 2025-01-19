import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('Valid order ID and API key deletes an order and returns status code "NO_CONTENT" ', async ({ request }) => {
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
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('Invalid order ID with special characters and valid API key does not delete an order and returns status code "BAD_REQUEST"', async ({ request }) => {
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
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/%%%', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Valid order ID and invalid API key does not delete an order and returns status code "UNAUTHORIZED" (401', async ({ request }) => {
  const requestHeaders = {
    api_key: 'fhdjsksss',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Valid order ID and empty API key does not delete an order and returns status code "UNAUTHORIZED" (401)', async ({ request }) => {
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
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Empty order ID and valid API key does not delete an order and returns status code "METHOD_NOT_ALLOWED" (405)', async ({ request }) => {
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
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})
