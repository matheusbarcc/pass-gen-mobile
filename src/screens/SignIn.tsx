import { useNavigation } from "@react-navigation/native"
import { Center, ScrollView, Text, useToast, VStack } from "@gluestack-ui/themed"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { ToastMessage } from "../components/ToastMessage"

import { useAuth } from "../hooks/useAuth"
import { AppError } from "../utils/AppError"

import * as yup from 'yup'
import { InferType } from 'yup'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

const signInSchema = yup.object({
  email: yup.string().required('Preencha o e-mail.').email('O e-mail deve ser válido.'),
  password: yup.string().required('Preencha a senha.').min(3, 'A senha possui no mínimo 3 dígitos.')
})

type signInData = InferType<typeof signInSchema>

export function SignIn() {
  const { signIn } = useAuth()

  const toast = useToast()

  const { navigate } = useNavigation()

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(signInSchema)
  })

  async function handleSignIn(data: signInData) {
    try {
      await signIn(data.email, data.password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível fazer login. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
          />
        )
      })
    }
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
                errorMessage={errors.email?.message}
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
                errorMessage={errors.password?.message}
                secureTextEntry
              />
            )}
          />

        </VStack>

        <Button
          title="Acessar"
          onPress={handleSubmit(handleSignIn)}
          isLoading={isSubmitting}
        />

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