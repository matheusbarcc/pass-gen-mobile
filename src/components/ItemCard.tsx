import { useState } from "react";
import * as Clipboard from 'expo-clipboard';
import { Heading, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";

import Check from "phosphor-react-native/src/icons/Check";
import Trash from "phosphor-react-native/src/icons/Trash";
import Copy from "phosphor-react-native/src/icons/Copy";
import Eye from "phosphor-react-native/src/icons/Eye";
import EyeSlash from "phosphor-react-native/src/icons/EyeSlash";

import { Button } from "./Button"

import { ItemDTO } from "../services/item/itemService";
import { PasswordClipboard } from "../screens/History";

type Props = {
  item: ItemDTO
  clipboard: PasswordClipboard
  copyPassword: (id: string, value: string) => void
  removePassword: (password: string) => void
}

export function ItemCard({ item, clipboard, copyPassword, removePassword }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function toggleIsVisible() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  async function handleCopyPassword() {
    await Clipboard.setStringAsync(item.password)

    const password = await Clipboard.getStringAsync()
    copyPassword(item.id, item.password)
  }

  async function handleRemovePassword() {
    removePassword(item.id)
  }

  const isPassCopied = clipboard.value === item.password && clipboard.id === item.id

  return (
    <HStack
      mb="$6"
      gap="$2"
      alignItems="center"
    >
      <VStack
        flex={1}
        gap="$3"
        bg="$base100"
        borderWidth={1}
        borderColor="$base500"
        borderRadius="$xl"
        justifyContent="center"
        px="$6"
        py="$4"
      >
        <Heading fontFamily="$bold" fontSize="$xl" color="$green700">
          {item.label}
        </Heading>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$lg">
            {isPasswordVisible ? item.password : "********"}
          </Text>

          <Pressable mb="$2" w="$8" h="$8" justifyContent="center" alignItems="center" onPress={toggleIsVisible}>
            {isPasswordVisible ? <Eye color="#103214" /> : <EyeSlash color="#103214" />}
          </Pressable>
        </HStack>
      </VStack >

      <VStack gap="$2" justifyContent="space-between">
        <Button
          w="$12"
          h="$12"
          borderRadius="$md"
          type="secondary"
          isDisabled={isPassCopied}
          sx={{
            ":disabled": {
              opacity: 0.6,
            },
          }}
          onPress={handleCopyPassword}
        >
          {isPassCopied ? (
            <Check weight="bold" color="#103214" />
          ) : (
            <Copy weight="bold" color="#103214" />
          )}
        </Button>
        <Button
          w="$12"
          h="$12"
          mb="$2"
          borderRadius="$md"
          type="destructive"
          onPress={handleRemovePassword}
        >
          <Trash weight="bold" color="#ab0202" />
        </Button>
      </VStack>
    </HStack >
  )
}