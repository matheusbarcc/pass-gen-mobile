import { HStack, Text } from "@gluestack-ui/themed"
import { DsButton } from "./DsButton"

import ClipboardText from "phosphor-react-native/src/icons/ClipboardText";

type Props = {
  content: string
}

export function PasswordCard({ content }: Props) {
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
      <Text ml="$4" fontSize="$lg">
        {content}
      </Text>

      <DsButton
        w="$12"
        h="$12"
        borderRadius="$md"
        type="secondary"
      >
        <ClipboardText weight="bold" color="#103214" />
      </DsButton>
    </HStack>
  )
}