import { HStack, Text } from "@gluestack-ui/themed";
import * as Clipboard from 'expo-clipboard';

import Check from "phosphor-react-native/src/icons/Check";
import Trash from "phosphor-react-native/src/icons/Trash";
import ClipboardText from "phosphor-react-native/src/icons/ClipboardText";

import { Button } from "../components/Button"

type Props = {
  content: string
  clipboard: string
  copyPassword: (password: string) => void
  removePassword: (password: string) => void
}

export function PasswordCard({ content, clipboard, copyPassword, removePassword }: Props) {
  async function handleCopyPassword() {
    await Clipboard.setStringAsync(content)

    const password = await Clipboard.getStringAsync()
    copyPassword(password)
  }

  async function handleRemovePassword() {
    removePassword(content)
  }

  const isPassCopied = clipboard === content

  return (
    <HStack
      mb="$2"
      bg="$base100"
      borderWidth={1}
      borderColor="$base500"
      borderRadius="$xl"
      justifyContent="space-between"
      alignItems="center"
      p='$2'
    >
      <Text ml="$4" fontSize="$lg" flex={1}>
        {content}
      </Text>

      <Button
        w="$12"
        h="$12"
        mr="$2"
        borderRadius="$md"
        type="destructive"
        onPress={handleRemovePassword}
      >
        <Trash weight="bold" color="#ab0202" />
      </Button>
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
          <ClipboardText weight="bold" color="#103214" />
        )}
      </Button>
    </HStack>
  )
}