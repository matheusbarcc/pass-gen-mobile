import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Heading, HStack, Pressable, VStack } from "@gluestack-ui/themed";

import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft";

import { EmptyList } from "../components/EmptyList";
import { ItemCard } from "../components/ItemCard";

import { fetchUserItems, ItemDTO } from "../services/item/itemService";

export type PasswordClipboard = {
  id: string
  value: string
}

export function History() {
  const [items, setItems] = useState<ItemDTO[]>([])
  const [clipboard, setClipboard] = useState<PasswordClipboard>({} as PasswordClipboard)

  const { goBack } = useNavigation()

  async function fetchPasswords() {
    const items = await fetchUserItems()

    setItems(items)
  }

  async function removePassword(value: string) {
    // await removePasswordByValue(value)
  }

  function handleGoBack() {
    goBack()
  }

  useEffect(() => {
    fetchPasswords()
  }, [])

  function copyPassword(id: string, value: string) {
    setClipboard({ id, value })
  }

  return (
    <>
      <HStack
        bg="$base100"
        pt="$11"
        pb="$7"
        alignItems="flex-end"
        justifyContent="center"
        borderWidth={1}
        borderColor="$base500"
        borderBottomLeftRadius="$3xl"
        borderBottomRightRadius="$3xl"
      >
        <HStack
          w="$full"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Pressable
            position="absolute"
            left={24}
            onPress={handleGoBack}
          >
            <ArrowLeft
              color="#103214"
            />
          </Pressable>

          <Heading
            textTransform="uppercase"
            fontSize="$xl"
            color="$green700"
          >
            Histórico
          </Heading>
        </HStack>
      </HStack>
      <VStack
        px="$6"
        bg="$background"
        flex={1}
      >
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              clipboard={clipboard}
              copyPassword={copyPassword}
              removePassword={removePassword}
            />
          )}
          contentContainerStyle={
            items.length === 0 ? {
              height: '100%',
            } : {
              paddingTop: 40,
              paddingBottom: 32,
            }
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList />
          }
        />
      </VStack>
    </>
  )
}