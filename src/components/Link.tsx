import { Link as ChakraLink, LinkProps as ChakraLinkProps, HStack, Text, Icon, useBreakpointValue, border } from "@chakra-ui/react"
import { ElementType } from "react"

interface LinkProps extends ChakraLinkProps {
  children: string;
  icon?: ElementType;
  active?: boolean;
}

export function Link({ children, icon, active, ...rest }: LinkProps) {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <ChakraLink
      textTransform="uppercase"
      fontWeight="bold"
      color={active ? 'teal.300' : 'white'}
      textDecoration={active ? 'underline' : 'none'}

      _hover={{
        textDecoration: 'underline'
      }}
      {...rest}
    >
      <HStack spacing="0.75rem">
        {icon && isMobile && <Icon as={icon} fontSize="1.25rem"></Icon>}
        <Text>{children}</Text>
      </HStack>
    </ChakraLink>
  )
}