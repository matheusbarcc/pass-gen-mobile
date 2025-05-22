import React, { useEffect, useState } from 'react'
import { Box, Text, VStack, HStack, Pressable, useToast } from '@gluestack-ui/themed'

import { Input } from './Input'
import { Button } from './Button'
import { Drawer } from './Drawer'

import CaretDown from "phosphor-react-native/src/icons/CaretDown"
import FloppyDisk from "phosphor-react-native/src/icons/FloppyDisk"

import * as yup from 'yup'
import { InferType } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppError } from '../utils/AppError'
import { ToastMessage } from './ToastMessage'
import { createItem } from '../services/item/itemResource'
import { useNavigation } from '@react-navigation/native'

type Props = {
  generatedPassword: string
  isDisabled?: boolean
}

const saveItemSchema = yup.object({
  label: yup.string().required('O nome da senha é obrigatório.'),
  password: yup.string().required('A senha é obrigatória.')
})

type SaveItemData = InferType<typeof saveItemSchema>

export function SaveItemForm({ generatedPassword, isDisabled = false }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(saveItemSchema),
    defaultValues: {
      password: generatedPassword
    }
  })

  const toast = useToast()

  const { navigate } = useNavigation()

  async function handleSaveItem(data: SaveItemData) {
    try {
      await createItem(data.label, data.password)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Senha salva com sucesso!"
            action="success"
          />
        )
      })

      navigate('history')

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível salvar a senha. Tente novamente mais tarde.'

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

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  };

  function closeDrawer() {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      reset({
        label: '',
        password: generatedPassword
      })
    }
  }, [isDrawerOpen, generatedPassword, reset])

  return (
    <Box bg="transparent">
      <Button title="Salvar" type="secondary" onPress={toggleDrawer} isDisabled={isDisabled}>
        <FloppyDisk weight="bold" color="#103214" />
      </Button>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      >
        <VStack flex={1} p="$6" space="sm">
          <HStack justifyContent="center" alignItems="center" pb="$4" mb='$4' borderBottomWidth={1} borderBottomColor="$green300">
            <Text fontSize="$xl" color="$green700" fontFamily="$bold">
              Salvar senha
            </Text>
            <Pressable
              onPress={closeDrawer}
              position='absolute'
              right={4}
              top={5}
            >
              <CaretDown />
            </Pressable>
          </HStack>

          <VStack>
            <Controller
              name="label"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  variant="secondary"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.label?.message}
                />
              )}
            />

            <Text fontFamily='$bold'>Senha</Text>

            <Controller
              key={generatedPassword}
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  variant="secondary"
                  onChangeText={onChange}
                  defaultValue={generatedPassword}
                  value={value}
                  errorMessage={errors.password?.message}
                  isReadOnly
                />
              )}
            />
          </VStack>

          <Button
            title="Salvar"
            onPress={handleSubmit(handleSaveItem)}
            isLoading={isSubmitting}
          >
            <FloppyDisk weight="bold" color="#FFF" />
          </Button>
        </VStack>
      </Drawer>
    </Box>
  );
}