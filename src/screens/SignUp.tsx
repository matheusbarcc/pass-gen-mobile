import { useNavigation } from "@react-navigation/native";
import { Center, ScrollView, Text, useToast, VStack } from "@gluestack-ui/themed";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { DatePicker } from "../components/DatePicker";

import * as yup from 'yup'
import { InferType } from 'yup'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppError";
import { ToastMessage } from "../components/ToastMessage";

const signUpSchema = yup.object({
  name: yup.string().required('O nome é obrigatório.'),
  email: yup.string()
    .required("O e-mail é obrigatório.")
    .email("O e-mail deve ser válido."),
  birthday: yup.date().required("A data de nascimento é obrigatória."),
  password: yup.string()
    .required("A senha é obrigatória.")
    .min(3, "A senha deve ter no mínimo 3 dígitos."),
  password_confirmation: yup.string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'As senhas não conferem.'),
})

type signUpData = InferType<typeof signUpSchema>

export function SignUp() {
  const { signUp, signIn } = useAuth()

  const { navigate } = useNavigation()

  const toast = useToast()

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(signUpSchema)
  })

  async function handleSignUp(data: signUpData) {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        birthday: data.birthday.toLocaleDateString('en-CA'),
        password: data.password
      })

      await signIn(data.email, data.password)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Conta criada com sucesso! Bem-vindo(a)!"
            action="success"
          />
        )
      })

      navigate("signin")
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.'

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
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

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
            name="birthday"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value}
                onChange={onChange}
                placeholder="Data de nascimento"
                errorMessage={errors.birthday?.message}
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

          <Controller
            name="password_confirmation"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirmation?.message}
                secureTextEntry
              />
            )}
          />
        </VStack>

        <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />

        <Center flex={1} justifyContent="flex-end" gap="$1" mt='$4'>
          <Button title="Voltar para o login" type="secondary" onPress={handleSignIn} />
        </Center>

      </VStack>
    </ScrollView>
  )
}