import { Center, HStack, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from 'expo-clipboard';
import { useState } from "react";

import Check from "phosphor-react-native/src/icons/Check";
import ClockCounterClockwise from "phosphor-react-native/src/icons/ClockCounterClockwise";
import SignOut from "phosphor-react-native/src/icons/SignOut";
import Copy from "phosphor-react-native/src/icons/Copy";
import FloppyDisk from "phosphor-react-native/src/icons/FloppyDisk";
import Lock from "phosphor-react-native/src/icons/Lock";

import { Button } from "../components/Button";

import { generatePassword } from "../utils/generatePassword";
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppError";
import { ToastMessage } from "../components/ToastMessage";
import { SaveItemForm } from "../components/SaveItemForm";

export function Home() {
  const [password, setPassword] = useState('')
  const [clipboard, setClipboard] = useState('')

  const { signOut } = useAuth()

  const toast = useToast()

  const { navigate } = useNavigation()

  const isPassCopied = clipboard === password && clipboard !== ""

  async function handleNewPassword() {
    const newPassword = await generatePassword()
    setPassword(newPassword)
  }

  function handleCopyPassword() {
    password && Clipboard.setStringAsync(password)
    setClipboard(password)

    if (password.length > 1) {
      toast.show({
        placement: 'top',
        duration: 1000 * 2,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Senha copiada!"
            action="success"
          />
        )
      })
    }
  }

  async function handleSignOut() {
    try {
      await signOut()
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível sair da conta. Tente novamente mais tarde.'

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

          <Button h="$12" w="$12" type="secondary" onPress={handleSignOut}>
            <SignOut color="#103214" />
          </Button>

          <Button h="$12" w="$12" onPress={handleHistory}>
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
        <SaveItemForm generatedPassword={password} />
      </VStack>
    </>
  )
}