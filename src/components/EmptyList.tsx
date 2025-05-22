import { Center, Text } from "@gluestack-ui/themed";

export function EmptyList() {
  return (
    <Center flex={1}>
      <Text fontFamily="$bold" color="$base700" fontSize="$lg">Nenhuma senha encontrada!</Text>
      <Text color="$base700" textAlign="center">
        Suas senha salvas aparecerão aqui.
      </Text>
    </Center>
  )
}