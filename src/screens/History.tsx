import { useEffect, useState } from "react";
import { FlatList, SectionList } from "react-native";
import { Heading, HStack, Pressable, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft";
import Trash from "phosphor-react-native/src/icons/Trash";

import { Button } from "../components/Button"
import { EmptyList } from "../components/EmptyList";
import { PasswordCard } from "../components/PasswordCard";


export function History() {
  const [passwords, setPasswords] = useState<any[]>([])
  const [clipboard, setClipboard] = useState('')

  const { goBack } = useNavigation()

  async function getAllPasswords() {
    // const storedPasswords = await fetchPasswords()

    // setPasswords(storedPasswords)
  }

  async function handleClearPasswords() {
    // await removeAllPasswords()
    setPasswords([])
  }

  async function removePassword(value: string) {
    // await removePasswordByValue(value)
  }

  function handleGoBack() {
    goBack()
  }

  useEffect(() => {
    getAllPasswords()
  }, [])

  function copyPassword(password: string) {
    setClipboard(password)
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
          data={passwords}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <PasswordCard
              content={item.value}
              clipboard={clipboard}
              copyPassword={copyPassword}
              removePassword={removePassword}
            />
          )}
          contentContainerStyle={
            passwords.length === 0 ? {
              height: '100%',
              justifyContent: 'center',
              paddingBottom: 32,
            } : {
              paddingBottom: 32,
            }
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList />
          }
        />
      </VStack>
      <VStack
        pt="$6"
        pb="$9"
        px="$6"
        bg="$base100"
        gap="$3"
        borderWidth={1}
        borderColor="$base500"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
      >
        <Button
          title="Limpar senhas"
          isDisabled={passwords.length < 1}
          sx={{
            ":disabled": {
              opacity: 0.6
            }
          }}
          onPress={handleClearPasswords}
        >
          <Trash weight="bold" color="#FFF" />
        </Button>
      </VStack>
    </>
  )
}