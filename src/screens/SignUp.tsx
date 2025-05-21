import { useNavigation } from "@react-navigation/native";
import { Center, ScrollView, Text, VStack } from "@gluestack-ui/themed";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { DatePicker } from "../components/DatePicker";

import { Controller, useForm } from "react-hook-form";

export function SignUp() {
  const { navigate } = useNavigation()

  const { control } = useForm()

  function handleSignIn() {
    navigate("signin")
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack py="$11" px="$6" bg="$background" flex={1}>
        <Text fontFamily="$heading" fontSize="$5xl" color="$green800">
          Crie sua conta
        </Text>

        <VStack mt="$10" mb="$2">
          <Input placeholder="Nome" />
          <Input placeholder="E-mail" />
          <Controller
            name="birthday"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value}
                onChange={onChange}
                placeholder="Data de nascimento"
              />
            )}
          />
          <Input placeholder="Senha" secureTextEntry />
          <Input placeholder="Confirmar senha" secureTextEntry />
        </VStack>

        <Button title="Criar e acessar" />

        <Center flex={1} justifyContent="flex-end" gap="$1" mt='$4'>
          <Button title="Voltar para o login" type="secondary" onPress={handleSignIn} />
        </Center>

      </VStack>
    </ScrollView>
  )
}