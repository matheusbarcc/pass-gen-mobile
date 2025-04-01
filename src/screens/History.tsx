import { Heading, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { SectionList } from "react-native";
import { useEffect, useState } from "react";

import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft";
import Trash from "phosphor-react-native/src/icons/Trash";

import { PasswordCard } from "../components/PasswordCard";
import { EmptyList } from "../components/EmptyList";
import { DsButton } from "../components/DsButton";

import { getAllPasswords } from "../storage/get-all-passwords";
import { DayList } from "../storage/storageConfig";
import { removeAllPasswords } from "../storage/remove-all-passwords";


export function History() {
  const [passwordsDayLists, setPasswordsDayLists] = useState<DayList[]>([])
  const [clipboard, setClipboard] = useState('')

  const { goBack } = useNavigation()

  async function fetchPasswords() {
    const dayLists = await getAllPasswords()

    const invertedDayLists = dayLists.reverse()

    setPasswordsDayLists(invertedDayLists)
  }

  async function handleClearPasswords() {
    await removeAllPasswords()
    setPasswordsDayLists([])
  }

  function handleGoBack() {
    goBack()
  }

  useEffect(() => {
    fetchPasswords()
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
        <SectionList
          sections={passwordsDayLists}
          keyExtractor={(item) => item}
          renderItem={({ section, index }) => (
            <PasswordCard
              content={section.data[index]}
              clipboard={clipboard}
              copyPassword={copyPassword}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Heading
              color="$green800"
              fontSize="$lg"
              mt="$10"
              mb="$4"
            >
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            passwordsDayLists.length === 0 ? {
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
        <DsButton
          title="Limpar senhas"
          isDisabled={passwordsDayLists.length < 1}
          sx={{
            ":disabled": {
              opacity: 0.6
            }
          }}
          onPress={handleClearPasswords}
        >
          <Trash weight="bold" color="#FFF" />
        </DsButton>
      </VStack>
    </>
  )
}