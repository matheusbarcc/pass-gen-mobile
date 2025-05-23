import * as userResource from './userResource'

async function getAuthenticatedUserService() {
  const data = await userResource.getAuthenticatedUser()

  const user: userResource.UserDTO = data.user

  return user
}

async function updateUserService({ name, email, birthday }: userResource.UserDTO) {
  await userResource.updateUser({
    name,
    email,
    birthday
  })
}

export { getAuthenticatedUserService, updateUserService }