import { Center, Spinner } from "@gluestack-ui/themed";

export function Loading() {
  return (
    <Center flex={1} bg="$background">
      <Spinner color="$green700" />
    </Center>
  )
}