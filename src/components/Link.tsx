import { ReactNode } from "react";
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"

interface LinkProps extends ChakraLinkProps {
  children: ReactNode;
  active?: boolean;
}

export function Link({ children, active, ...rest }: LinkProps) {
  return (
    <ChakraLink
      textTransform="uppercase"
      fontWeight="black"
      color={active ? 'teal.300' : 'white'}
      textDecoration={active ? 'underline' : 'none'}
      _hover={{
        textDecoration: 'underline'
      }}
      {...rest}
    >
      {children}
    </ChakraLink>
  )
}