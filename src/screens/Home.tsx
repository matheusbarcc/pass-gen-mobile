import { Center, HStack, Pressable, Text, useToast, VStack } from "@gluestack-ui/themed";
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
import { ToastMessage } from "../components/ToastMessage";
import { SaveItemForm } from "../components/SaveItemForm";
import { PasswordLengthSelector } from "../components/PasswordLengthSelector";

import { generatePassword } from "../utils/generatePassword";
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppError";


export function Home() {
  const [passwordLength, setPasswordLength] = useState<number>(8)
  const [password, setPassword] = useState('')
  const [clipboard, setClipboard] = useState('')

  const { signOut } = useAuth()

  const toast = useToast()

  const { navigate } = useNavigation()

  const isPassCopied = clipboard === password && clipboard !== ""

  async function handleNewPassword() {
    const newPassword = await generatePassword(passwordLength)
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

  function handleSwitchPasswordLength(length: number) {
    setPasswordLength(length)
  }

  return (
    <>
      <VStack
        pt="$14"
        px="$6"
        bg="$background"
        flex={1}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <VStack>
            <Text fontFamily="$bold" color="$green800" fontSize="$lg">Matheus</Text>
            <Text color="$green800" mt="-$1">matheus@email.com</Text>
          </VStack>

          <Pressable onPress={handleSignOut}>
            <SignOut size={28} weight="bold" color="#071508" />
          </Pressable>
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
              isDisabled={isPassCopied || !password}
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
          <HStack mt="$3" gap="$3">
            <PasswordLengthSelector
              title="6 dígitos"
              isActive={passwordLength === 6}
              onPress={() => handleSwitchPasswordLength(6)}
            />
            <PasswordLengthSelector
              title="8 dígitos"
              isActive={passwordLength === 8}
              onPress={() => handleSwitchPasswordLength(8)}
            />
            <PasswordLengthSelector
              title="10 dígitos"
              isActive={passwordLength === 10}
              onPress={() => handleSwitchPasswordLength(10)}
            />
          </HStack>
        </VStack>
      </VStack>
      <VStack
        pt="$6"
        pb="$6"
        px="$6"
        gap="$3"
      >
        <Button title="Gerar senha" onPress={handleNewPassword} />
        <SaveItemForm generatedPassword={password} isDisabled={!password} />
      </VStack>
    </>
  )
}