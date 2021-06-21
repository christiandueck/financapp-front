import { ReactNode } from "react";
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"

interface LinkProps extends ChakraLinkProps {
  children: ReactNode;
}

export function Link({ children, ...rest }: LinkProps) {
  return (
    <ChakraLink
      textTransform="uppercase"
      fontWeight="black"
      _hover={{
        color: 'teal.300',
        textDecoration: 'underline'
      }}
      {...rest}
    >
      {children}
    </ChakraLink>
  )
}