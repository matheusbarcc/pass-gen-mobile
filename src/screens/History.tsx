import { Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Heading, HStack, Pressable, useToast, VStack } from "@gluestack-ui/themed";

import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft";

import { EmptyList } from "../components/EmptyList";
import { ItemCard } from "../components/ItemCard";

import { deleteItemService, fetchUserItems, ItemDTO } from "../services/item/itemService";
import { AppError } from "../utils/AppError";
import { ToastMessage } from "../components/ToastMessage";
import { Loading } from "../components/Loading";

export type PasswordClipboard = {
  id: string
  value: string
}

export function History() {
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<ItemDTO[]>([])
  const [clipboard, setClipboard] = useState<PasswordClipboard>({} as PasswordClipboard)

  const toast = useToast()

  const { goBack } = useNavigation()

  async function fetchPasswords() {
    try {
      setIsLoading(true)
      const items = await fetchUserItems()

      setItems(items)

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível buscar as senhas. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
          />
        )
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function removePassword(itemId: string) {
    try {
      Alert.alert('Excluir senha', 'A senha não poderá ser recuperada, você deseja excluí-la?', [
        {
          text: 'Sim',
          onPress: async () => {
            await deleteItemService(itemId)

            setItems((state) => state.filter(state => state.id !== itemId))
          },
          style: 'destructive'
        },
        {
          text: 'Não',
          onPress: () => { },
          style: 'cancel'
        }
      ])

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível excluir a senha. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
          />
        )
      })
    }
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
      {isLoading ? <Loading /> : (
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
      )}
    </>
  )
}