import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from '../DTO/LoginDto'

test.describe('Login tests', async () => {
  test('Verify if username and login are valid, response returns status code "OK" and correct jwt', async ({
    request,
  }) => {
    const response = await request.post(`https://backend.tallinn-learning.ee/login/student`, {
      data: LoginDto.createLoginWithCorrectData(),
    })

    expect(response.status()).toBe(StatusCodes.OK)
    expect(
      /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(await response.text()),
    ).toBe(true)
  })
  test('Verify if http method is not valid, response returns status code "METHOD_NOT_ALLOWED"', async ({
    request,
  }) => {
    const response = await request.get(`https://backend.tallinn-learning.ee/login/student`, {
      data: LoginDto.createLoginWithCorrectData(),
    })

    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })
})
