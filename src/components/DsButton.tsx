import { ComponentProps, ReactNode } from "react";
import { Button as GluestackButton, Text } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof GluestackButton> & {
  title?: string
  children?: ReactNode
  type?: 'primary' | 'secondary'
}

export function DsButton({ title, children, type = 'primary', ...rest }: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$16"
      p="$4"
      flexDirection="row"
      gap="$2"
      justifyContent="center"
      alignItems="center"
      bg={type === 'primary' ? '$green700' : '$green300'}
      borderRadius="$xl"
      {...rest}
    >
      {title && (
        <Text
          color={type === 'primary' ? '$white' : '$green700'}
          fontFamily="$heading"
        >
          {title}
        </Text>
      )}
      {children}
    </GluestackButton>
  )
}