import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl id={name}>
      {!!label && <FormLabel
        htmlFor={name}
        textTransform="uppercase"
        fontSize="sm"
        ml="0.5rem"
        mb="0"
        color="gray.400"
      >
        {label}:
      </FormLabel>}
      <ChakraInput
        name={name}
        focusBorderColor="green.500"
        bg="gray.600"
        borderRadius="0.5rem"
        variant="filled"
        _hover={{
          bgColor: 'gray.600'
        }}
        {...rest}
      />
    </FormControl>
  )
}