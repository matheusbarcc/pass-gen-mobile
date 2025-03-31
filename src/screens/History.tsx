import { Heading, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";

import { SectionList } from "react-native";
import { useState } from "react";

import ArrowLeft from "phosphor-react-native/src/icons/ArrowLeft";
import { PasswordCard } from "../components/PasswordCard";
import { EmptyList } from "../components/EmptyList";
import { useNavigation } from "@react-navigation/native";


export function History() {
  const [passwords, setPasswords] = useState([
    {
      title: '30.03.2025',
      data: ['29wRJKRJ', 'djks90aj', 'u8d90sajj',]
    },
    {
      title: '29.03.2025',
      data: ['j89dsaj89', 'kd980saj']
    },
    {
      title: '28.03.2025',
      data: ['90djsa890jd']
    },
    {
      title: '27.03.2025',
      data: ['di90saj89d', 'mdu9sau90d']
    },
  ])

  const { goBack } = useNavigation()

  function handleGoBack() {
    goBack()
  }

  return (
    <>
      <HStack
        bg="$base100"
        pt="$16"
        pb="$7"
        alignItems="flex-end"
        justifyContent="center"
        borderBottomLeftRadius="$3xl"
        borderBottomRightRadius="$3xl"
      >
        <HStack
          w="$full"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Pressable
            position="absolute"
            left={24}
            onPress={handleGoBack}
          >
            <ArrowLeft
              color="#103214"
            />
          </Pressable>

          <Heading
            textTransform="uppercase"
            fontSize="$xl"
            color="$green700"
          >
            Histórico
          </Heading>
        </HStack>
      </HStack>
      <VStack
        px="$6"
        bg="$background"
        flex={1}
      >
        <SectionList
          sections={passwords}
          keyExtractor={(item) => item}
          renderItem={({ section, index }) => <PasswordCard content={section.data[index]} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color="$green800"
              fontSize="$lg"
              mt="$10"
              mb="$4"
            >
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            passwords.length === 0 ? {
              flex: 1,
              justifyContent: 'center',
              paddingBottom: 32,
            } : {
              paddingBottom: 32,
            }
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList />
          }
        />
      </VStack>
    </>
  )
}