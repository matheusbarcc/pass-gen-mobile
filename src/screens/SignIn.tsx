import { Center, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack py="$11" px="$6" bg="$background" flex={1}>
        <Text fontFamily="$heading" fontSize="$5xl" width="67%" color="$green800">
          Não perca tempo criando suas senhas, use o
          <Text fontFamily="$heading" fontSize="$5xl" color="$green700">
            {' '}PassGen!
          </Text>
        </Text>

        <VStack mt="$10" mb="$2">
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />
        </VStack>

        <Button title="Acessar" />

        <Center flex={1} justifyContent="flex-end" gap="$1" mt='$4'>
          <Text fontFamily="$bold" color="$green800" size="sm">
            Ainda não tem acesso?
          </Text>

          <Button title="Criar conta" type="secondary" />
        </Center>

      </VStack>
    </ScrollView>
  )
}