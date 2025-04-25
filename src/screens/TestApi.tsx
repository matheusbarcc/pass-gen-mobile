import { Heading, HStack, Pressable, Text, View, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface PokeApiResponse {
    name: string
    abilities: [
        ability: {
            ability: {
                name: string
            }
        }
    ]
}

export default function TestApi() {
    const [data, setData] = useState<PokeApiResponse>()

    const { goBack } = useNavigation()

    function handleGoBack() {
        goBack()
    }

    async function handleGetPokemon() {
        try {
            api
            .get('https://pokeapi.co/api/v2/pokemon/ditto')
            .then((response) => {
                console.log(response.data.abilities)
                setData(response.data)
            })
        } catch {
            throw new Error()
        }
    }

    useEffect(() => {
        handleGetPokemon()
    }, [])

    return (
        <>
            <HStack
                bg="$base100"
                pt="$11"
                pb="$7"
                alignItems="flex-end"
                justifyContent="center"
                borderWidth={1}
                borderColor="$base500"
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
                    API
                </Heading>
                </HStack>
            </HStack>
            <VStack
                p="$6"
                bg="$background"
                flex={1}
            >
                {!!data && (
                    <>
                        <Text fontSize="$6xl">
                            {data.name}
                        </Text>
                        <View>
                            {data?.abilities.map((ability) => (
                                <Text key={ability.ability.name}>{ability.ability.name}</Text>
                            ))}
                        </View>
                    </>
                )}
            </VStack>
        </>
    )
}