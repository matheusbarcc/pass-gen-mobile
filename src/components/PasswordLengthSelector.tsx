import { ComponentProps, ReactNode } from "react";
import { ButtonSpinner, Button as GluestackButton, Text } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof GluestackButton> & {
  title?: string
  isActive: boolean
}

export function PasswordLengthSelector({ title, isActive, ...rest }: Props) {
  return (
    <GluestackButton
      flexDirection="row"
      bg={isActive ? '$green700' : '$green300'}
      borderRadius="$full"
      {...rest}
    >
      {title && (
        <Text
          color={isActive ? '$white' : '$green700'}
          fontSize="$xs"
          fontFamily="$bold"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}