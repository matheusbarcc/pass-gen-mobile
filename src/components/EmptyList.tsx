import { Center, Text } from "@gluestack-ui/themed";

export function EmptyList() {
  return (
    <Center flex={1}>
      <Text
        color="$base700"
        textAlign="center"
      >
        Nenhuma senha encontrada {"\n"}
        Gere novas senhas na página inicial
      </Text>
    </Center>
  )
}