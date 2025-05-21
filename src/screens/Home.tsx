import { useState } from "react";
import { Center, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from 'expo-clipboard';

import Check from "phosphor-react-native/src/icons/Check";
import Copy from "phosphor-react-native/src/icons/Copy";
import ClockCounterClockwise from "phosphor-react-native/src/icons/ClockCounterClockwise";
import Lock from "phosphor-react-native/src/icons/Lock";
import FloppyDisk from "phosphor-react-native/src/icons/FloppyDisk";

import { Button } from "../components/Button"

import { generatePassword } from "../utils/generatePassword";

export function Home() {
  const [password, setPassword] = useState('')
  const [clipboard, setClipboard] = useState('')

  const { navigate } = useNavigation()

  const isPassCopied = clipboard === password && clipboard !== ""

  async function handleNewPassword() {
    const newPassword = await generatePassword()
    setPassword(newPassword)
  }

  function handleCopyPassword() {
    password && Clipboard.setStringAsync(password)
    setClipboard(password)
  }

  function handleHistory() {
    navigate('history')
  }

  return (
    <>
      <VStack
        pt="$11"
        px="$6"
        bg="$background"
        flex={1}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$5xl" fontFamily="$heading" color="$green700">
            PassGen
          </Text>

          <Button
            h="$12"
            w="$12"
            borderRadius="$lg"
            bg="$green700"
            alignItems="center"
            justifyContent="center"
            onPress={handleHistory}
          >
            <ClockCounterClockwise color="#FFF" />
          </Button>
        </HStack>

        <VStack
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <HStack
            w="$full"
            p="$5"
            justifyContent="space-between"
            alignItems="center"
            bg="$base100"
            borderWidth={1}
            borderColor="$base500"
            borderRadius="$xl"
            position="relative"
          >
            <Lock
              color='#CFCFCF'
            />
            <Center>
              <Text fontFamily="$body" color="$black" fontSize="$xl">
                {password ? password : <Text color='$base600' fontSize="$md">Senha</Text>}
              </Text>
            </Center>
            <Button
              w="$12"
              h="$12"
              borderRadius="$md"
              type="secondary"
              isDisabled={isPassCopied}
              sx={{
                ":disabled": {
                  opacity: 0.6
                }
              }}
              onPress={handleCopyPassword}
            >
              {isPassCopied ? (
                <Check weight="bold" color="#103214" />
              ) : (
                <Copy weight="bold" color="#103214" />
              )}
            </Button>
          </HStack>
          <Text
            w="$64"
            mt="$2"
            textAlign="center"
            fontSize="$sm"
            color="$base700"
          >
            As senhas geradas são únicas, você pode vê-las no histórico.
          </Text>
        </VStack>
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
        <Button title="Gerar senha" onPress={handleNewPassword} />
        <Button title="Salvar" type="secondary">
          <FloppyDisk weight="bold" color="#103214" />
        </Button>
      </VStack>
    </>
  )
}