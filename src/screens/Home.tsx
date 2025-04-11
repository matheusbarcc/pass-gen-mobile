import { useState } from "react";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from 'expo-clipboard';

import ClipboardText from "phosphor-react-native/src/icons/ClipboardText";
import ClockCounterClockwise from "phosphor-react-native/src/icons/ClockCounterClockwise";
import Lock from "phosphor-react-native/src/icons/Lock";
import FloppyDisk from "phosphor-react-native/src/icons/FloppyDisk";

import { DsButton } from "../components/DsButton";

import { generatePassword } from "../services/generate-password";

export function Home() {
  const [password, setPassword] = useState('')
  const [clipboard, setClipboard] = useState('')

  const { navigate } = useNavigation()

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

  const isPassCopied = clipboard === password && clipboard !== ""

  return (
    <>
      <VStack
        pt="$11"
        px="$6"
        bg="$background"
        flex={1}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$4xl" fontFamily="$heading" color="$green700">
            PassGen
          </Text>

          <DsButton
            h="$12"
            w="$12"
            borderRadius="$lg"
            bg="$green700"
            alignItems="center"
            justifyContent="center"
            onPress={handleHistory}
          >
            <ClockCounterClockwise color="#FFF" />
          </DsButton>
        </HStack>

        <VStack
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <HStack
            w="$full"
            h="$20"
            p="$4"
            justifyContent="center"
            alignItems="center"
            bg="$base100"
            borderWidth={1}
            borderColor="$base500"
            borderRadius="$xl"
            position="relative"
          >
            <Lock
              color='#E4E4E4'
              style={{
                position: 'absolute',
                left: 24,
              }}
            />
            <Text fontFamily="$body" color="$black" fontSize="$2xl">
              {password ? password : <Text color='$base500'>Senha</Text>}
            </Text>
          </HStack>
          <Text
            w="$64"
            mt="$2"
            textAlign="center"
            fontSize="$xs"
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
        <DsButton title="Gerar senha" onPress={handleNewPassword} />
        <DsButton 
          title="Salvar" type="secondary">
          <FloppyDisk weight="bold" color="#103214" />
        </DsButton>
        <DsButton
          title={isPassCopied ? "Copiada!" : "Copiar"}
          type="secondary"
          isDisabled={isPassCopied || password === ""}
          sx={{
            ":disabled": {
              opacity: 0.6
            }
          }}
          onPress={handleCopyPassword}
        >
          {!isPassCopied && <ClipboardText weight="bold" color="#103214" />}
        </DsButton>
      </VStack>
    </>
  )
}