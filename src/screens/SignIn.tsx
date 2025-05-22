import { Center, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn } = useAuth()

  const { navigate } = useNavigation()

  const { control, handleSubmit } = useForm()

  async function handleSignIn(data: any) {
    await signIn(data.email, data.password)
  }

  function handleNewAccount() {
    navigate("signup")
  }

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
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />

        </VStack>

        <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />

        <Center flex={1} justifyContent="flex-end" gap="$1" mt='$4'>
          <Text fontFamily="$bold" color="$green800" size="sm">
            Ainda não tem acesso?
          </Text>

          <Button title="Criar conta" type="secondary" onPress={handleNewAccount} />
        </Center>

      </VStack>
    </ScrollView>
  )
}