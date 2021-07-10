import { Link as ChakraLink, LinkProps as ChakraLinkProps, HStack, Text, Icon } from "@chakra-ui/react"
import { ElementType } from "react"
import { ActiveLink } from './ActiveLink'

interface LinkProps extends ChakraLinkProps {
  children: string;
  icon?: ElementType;
  active?: boolean;
  href: string;
}

export function NavLink({ children, icon, active, href, ...rest }: LinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        textTransform="uppercase"
        fontWeight="bold"
        color="white"
        _hover={{
          textDecoration: 'underline'
        }}
        {...rest}
      >
        <HStack spacing="0.75rem">
          {icon && <Icon as={icon} fontSize="1.25rem"></Icon>}
          <Text>{children}</Text>
        </HStack>
      </ChakraLink>
    </ActiveLink>
  )
}