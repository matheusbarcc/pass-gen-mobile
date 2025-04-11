import AsyncStorage from "@react-native-async-storage/async-storage"

export async function storageSave(key: any, value: string | object) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
        throw error
    }
}

export async function storageGetAll(key: string) {
    try {
        const storage = await AsyncStorage.getItem(key)

        return storage !== null ? JSON.parse(storage) : []
    } catch (error) {
        throw error
    }
}

export async function storageRemoveAll(key: string) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        throw error
    }
}
