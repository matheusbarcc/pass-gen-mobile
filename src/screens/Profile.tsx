import { Heading, HStack, Pressable, useToast, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft";
import { Controller, useForm } from "react-hook-form";

import * as yup from 'yup'
import { InferType } from 'yup'
import { Input } from "../components/Input";
import { DatePicker } from "../components/DatePicker";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppError";
import { ToastMessage } from "../components/ToastMessage";
import { useCallback } from "react";

const updateProfileSchema = yup.object({
  name: yup.string().required(),
  email: yup.string()
    .required()
    .email(),
  birthday: yup.date().required()
})

type updateProfileData = InferType<typeof updateProfileSchema>

export function Profile() {
  const { user, updateUser } = useAuth()

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      birthday: new Date(user.birthday)
    }
  })

  const toast = useToast()

  const { navigate } = useNavigation()

  async function handleUpdateProfile(data: updateProfileData) {
    try {
      await updateUser(data)

      toast.show({
        placement: 'top',
        duration: 1000 * 2,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Dados atualizados com sucesso!"
            action="success"
          />
        )
      })

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.'

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

  function handleGoBack() {
    navigate("home")
  }

  useFocusEffect(
    useCallback(() => {
      reset({
        name: user.name,
        email: user.email,
        birthday: new Date(user.birthday)
      })
    }, [user, reset])
  )

  return (
    <>
      <HStack
        bg="$base100"
        pt="$14"
        pb="$7"
        justifyContent="center"
        borderWidth={1}
        borderColor="$base500"
        borderBottomLeftRadius="$3xl"
        borderBottomRightRadius="$3xl"
        position="relative"
      >
        <Pressable
          position="absolute"
          left={24}
          bottom={32}
          onPress={handleGoBack}
        >
          <ArrowLeft
            color="#103214"
          />
        </Pressable>

        <Heading
          fontSize="$xl"
          color="$green700"
        >
          Perfil
        </Heading>
      </HStack>

      <VStack px="$6" pt="$10">
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

        <Button
          mt="$2"
          title="Atualizar informações"
          onPress={handleSubmit(handleUpdateProfile)}
          isLoading={isSubmitting}
        />
      </VStack>
    </>
  )
}