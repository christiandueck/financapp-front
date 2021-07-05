import { Center, FormControl, FormLabel, Icon, Input as ChakraInput, InputProps as ChakraInputProps, Text } from '@chakra-ui/react'
import { ElementType } from 'react'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  icon?: ElementType;
  suffix?: string;
}

export function Input({ name, label, icon, suffix, ...rest }: InputProps) {
  return (
    <FormControl id={name} position="relative">
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
        paddingInlineStart={icon || suffix ? "5.25rem" : "4"}
        _hover={{
          bgColor: 'gray.600'
        }}
        {...rest}
      />
      {icon &&
        <Center
          h="2rem"
          w="4rem"
          mb="0.25rem"
          position="absolute"
          bottom={0}
          left={0}
          borderRight="1px solid"
          borderColor="whiteAlpha.200"
          color="gray.100"
        >
          <Icon as={icon} fontSize="1.25rem" />
        </Center>
      }
      {suffix &&
        <Center
          h="2rem"
          w="4rem"
          mb="0.25rem"
          position="absolute"
          bottom={0}
          left={0}
          borderRight="1px solid"
          borderColor="whiteAlpha.200"
          color="gray.100"
        >
          <Text fontSize="1rem">{suffix}</Text>
        </Center>
      }
    </FormControl>
  )
}