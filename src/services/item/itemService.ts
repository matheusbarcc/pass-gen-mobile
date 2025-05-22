import * as itemResource from './itemResource'

type ItemDTO = {
  id: string
  label: string
  password: string
  created_at: string
}

async function createItem(label: string, password: string) {
  await itemResource.createItem(label, password)
}

async function fetchUserItems() {
  const data = await itemResource.fetchUserItems()

  const items: ItemDTO[] = data.items

  return items
}

async function deleteItemService(itemId: string) {
  await itemResource.deleteItem(itemId)
}

export { ItemDTO, createItem, fetchUserItems, deleteItemService }