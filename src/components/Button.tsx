import { ComponentProps, ReactNode } from "react";
import { ButtonSpinner, Button as GluestackButton, Text } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof GluestackButton> & {
  title?: string
  children?: ReactNode
  type?: 'primary' | 'secondary' | 'destructive'
  isLoading?: boolean
}

export function Button({ title, children, type = 'primary', isLoading, ...rest }: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      flexDirection="row"
      gap="$2"
      bg={type === 'primary' ? '$green700' : type === 'secondary' ? '$green300' : '$red300'}
      borderRadius="$lg"
      isDisabled={isLoading}
      $disabled-opacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color={type === 'primary' ? '$white' : '$green700'} />
      ) : (
        <>
          {title && (
            <Text
              color={type === 'primary' ? '$white' : '$green700'}
              fontSize="$sm"
              fontFamily="$bold"
            >
              {title}
            </Text>
          )}
          {children}
        </>
      )}
    </GluestackButton>
  )
}