import * as userResource from './userResource'

type UserDTO = {
    name: string
    email: string
    birthday: string
}

async function getAuthenticatedUserService() {
  const data = await userResource.getAuthenticatedUser()

  const user: UserDTO = data.user

  return user
}

export { UserDTO, getAuthenticatedUserService }