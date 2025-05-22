import * as itemResource from './itemResource'

async function createItem(label: string, password: string) {
  await itemResource.createItem(label, password)
}