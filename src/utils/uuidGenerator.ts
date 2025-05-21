import { v4 as uuidv4 } from 'uuid'

export function generateUUID() {
    const uuid =  uuidv4()

    return uuid
}