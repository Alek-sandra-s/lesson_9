import { APIRequestContext, APIResponse } from 'playwright-core'
import { UserDTO } from '../tests/DTO/UserDto'

export class ApiClientUserManagement {
  static instance: ApiClientUserManagement;
  private request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  public async createUserAndReturnUserId(): Promise<UserDTO>{
    const response = await this.request.post('http://localhost:3000/users')
    const responseBody = await response.json()
    return UserDTO.serializeResponse(responseBody)
  }

  public async deleteUser(userId: number): Promise<UserDTO>{
    const response = await this.request.delete(`http://localhost:3000/users/${userId}`)
    return UserDTO.serializeResponse((await response.json())[0])
  }

  public async deleteAllUsers(): Promise<void> {
    const allUsers = await this.searchUsers()

    for(const user of allUsers) {
      await this.deleteUser(user.id)
    }
  }

  public async searchUser(userId: number): Promise<UserDTO> {
    const response = await this.request.get(`http://localhost:3000/users/${userId}`)
    return UserDTO.serializeResponse(await response.json())
  }

  public async searchUsers(): Promise<UserDTO[]>{
    const response =  await this.request.get('http://localhost:3000/users')

    const result = []

    for (const user of await response.json()) {
      const userDto = UserDTO.serializeResponse(user)
      result.push(userDto)
    }

    return result
  }
}
