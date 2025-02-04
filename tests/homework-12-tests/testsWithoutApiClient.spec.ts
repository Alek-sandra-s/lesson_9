import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from '../DTO/LoginDto'
import { OrderDTO } from '../DTO/Order.Dto'

test.describe('Test without API client', async () => {
  test('Test successful authorization and order creation', async ({ request }) => {
    const responseLogin = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDto.createLoginWithCorrectData(),
    })
    expect(responseLogin.status()).toBe(StatusCodes.OK)

    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDTO.generateRandomOrderDto(),
      headers: {
        Authorization: `Bearer ${await responseLogin.text()}`,
      },
    })
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
  })

  test('Test successful authorization, order creation and order search', async ({ request }) => {
    const responseLogin = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDto.createLoginWithCorrectData(),
    })
    expect(responseLogin.status()).toBe(StatusCodes.OK)

    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDTO.generateRandomOrderDto(),
      headers: {
        Authorization: `Bearer ${await responseLogin.text()}`,
      },
    })
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)

    const createdOrder = OrderDTO.serializeResponse(await responseCreateOrder.json())
    expect(createdOrder.id).toBeDefined()
    expect(createdOrder.id).toBeGreaterThan(0)

    const responseOrderStatus = await request.get(
      `https://backend.tallinn-learning.ee/orders/${createdOrder.id}`,
      {
        headers: {
          Authorization: `Bearer ${await responseLogin.text()}`,
        },
      },
    )
    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)

    const requestedOrder = OrderDTO.serializeResponse(await responseOrderStatus.json())
    expect(requestedOrder.status).toBeDefined()
    expect(requestedOrder.status).toBe('OPEN')
  })

  test('Test successful authorization, order creation and order deletion', async ({ request }) => {
    const responseLogin = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDto.createLoginWithCorrectData(),
    })

    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDTO.generateRandomOrderDto(),
      headers: {
        Authorization: `Bearer ${await responseLogin.text()}`,
      },
    })

    const createdOrder = OrderDTO.serializeResponse(await responseCreateOrder.json())

    const responseOrderStatus = await request.delete(
      `https://backend.tallinn-learning.ee/orders/${createdOrder.id}`,
      {
        headers: {
          Authorization: `Bearer ${await responseLogin.text()}`,
        },
      },
    )
    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)
  })
})
