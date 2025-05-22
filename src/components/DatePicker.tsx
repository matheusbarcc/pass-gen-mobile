import { FormControl, FormControlError, FormControlErrorText, Pressable, Text } from "@gluestack-ui/themed";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";

import CalendarDots from "phosphor-react-native/src/icons/CalendarDots";

type DatePickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  isInvalid?: boolean
  errorMessage?: string | null
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  isInvalid = false,
  errorMessage = null
}: DatePickerProps) {
  const invalid = !!errorMessage || isInvalid

  function handleChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  function showDatepicker() {
    DateTimePickerAndroid.open({
      value: value || new Date(),
      maximumDate: new Date(),
      onChange: handleChange,
      mode: "date",
    });
  };

  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <Pressable
        bg="$white"
        h="$14"
        px="$4"
        borderWidth="$1"
        borderRadius="$lg"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderColor={invalid ? "$red500" : "$base500"}
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$red500" : "$green700"
        }}
        onPress={showDatepicker}
      >
        {value ? (
          <Text color="$black">
            {value.toLocaleDateString('pt-br')}
          </Text>
        ) : (
          <Text color="$base700">
            {placeholder}
          </Text>
        )}

        <CalendarDots color="#ADADAD" />
      </Pressable>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}