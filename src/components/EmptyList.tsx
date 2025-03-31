import { Text } from "@gluestack-ui/themed";

export function EmptyList() {
  return (
    <Text
      color="$base700"
      textAlign="center"
    >
      Nenhuma senha encontrada. {"\n"}
      Gere novas senhas na página inicial.
    </Text>
  )
}