import { HStack, Icon, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import ClockCounterClockwise from "phosphor-react-native/src/icons/ClockCounterClockwise";
import Lock from "phosphor-react-native/src/icons/Lock";
import ClipboardText from "phosphor-react-native/src/icons/ClipboardText";

import { DsButton } from "../components/DsButton";

export function Home() {
  const { navigate } = useNavigation()

  function handleHistory() {
    navigate('history')
  }

  return (
    <>
      <VStack
        pt="$16"
        px="$6"
        bg="$background"
        flex={1}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$4xl" fontFamily="$heading" color="$green700">
            PassGen
          </Text>

          <Pressable
            h="$12"
            w="$12"
            borderRadius="$lg"
            bg="$green700"
            alignItems="center"
            justifyContent="center"
            onPress={handleHistory}
          >
            <ClockCounterClockwise color="#FFF" />
          </Pressable>
        </HStack>

        <VStack
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <HStack
            w="$full"
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
            <Text fontFamily="$body" color="$black" fontSize="$2xl">29wRJKRJ</Text>
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
        pb="$16"
        px="$6"
        bg="$base100"
        gap="$3"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
      >
        <DsButton title="Gerar senha" />
        <DsButton title="Copiar" type="secondary">
          <ClipboardText weight="bold" color="#103214" />
        </DsButton>
      </VStack>
    </>
  )
}