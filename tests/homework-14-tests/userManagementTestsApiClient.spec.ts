import { expect, test } from '@playwright/test'
import { ApiClientUserManagement } from '../../api/ApiClientUserManagement'

test.describe('User management app tests for empty array with API client', () => {
  test('TL-14-4 get all users returns empty array test', async ({ request }) => {
    const apiClient = new ApiClientUserManagement(request)
    await apiClient.deleteAllUsers()

    const allUsers = await apiClient.searchUsers()
    expect(allUsers.length).toBe(0)
  })
})

test.describe('User management app tests for create, find and delete users with API client', async () => {
  test('TL-14-1 create user test with Api client', async ({ request }) => {
    const apiClient = new ApiClientUserManagement(request)
    await apiClient.deleteAllUsers()

    const newUser = await apiClient.createUserAndReturnUserId()

    expect(newUser).toBeDefined()
  })
  test('TL-14-2 find user test with API client', async ({ request }) => {
    const apiClient = new ApiClientUserManagement(request)
    await apiClient.deleteAllUsers()

    const createdUser = await apiClient.createUserAndReturnUserId()
    const foundUser = await apiClient.searchUser(createdUser.id)

    expect(foundUser).toStrictEqual(createdUser)
  })
  test('TL-14-3 delete user test with API client', async ({ request }) => {
    const apiClient = new ApiClientUserManagement(request)
    await apiClient.deleteAllUsers()

    const createdUser = await apiClient.createUserAndReturnUserId()
    const deletedUser = await apiClient.deleteUser(createdUser.id)

    expect(deletedUser).toStrictEqual(createdUser)
  })
  test('TL-14-4 get all users test with API client', async ({ request }) => {
    const apiClient = new ApiClientUserManagement(request)
    await apiClient.deleteAllUsers()

    await apiClient.createUserAndReturnUserId()
    await apiClient.createUserAndReturnUserId()
    await apiClient.createUserAndReturnUserId()
    const allUsers = await apiClient.searchUsers()

    expect(allUsers.length).toBe(3)
  })
})
