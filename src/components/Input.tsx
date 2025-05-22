import { FormControl, FormControlError, FormControlErrorText, Input as GluestackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
  variant?: 'primary' | 'secondary'
}

export function Input({ isReadOnly, errorMessage = null, isInvalid = false, variant = 'primary', ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GluestackInput
        isInvalid={invalid}
        h="$14"
        borderWidth="$1"
        borderColor='$base500'
        borderRadius="$lg"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$red500" : "$green700"
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: "$red500"
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          bg={variant === 'primary' ? "$white" : '$base300'}
          px="$4"
          color='$black'
          fontFamily='$body'
          placeholderTextColor="$base700"
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}