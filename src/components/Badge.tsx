import { Flex, Text, Button, ButtonProps, Icon } from "@chakra-ui/react"
import { ElementType } from "react"

interface BadgeProps extends ButtonProps {
  name: string;
  color?: string;
  icon?: ElementType;
}

export function Badge({ name, color = "gray.500", icon, ...rest }: BadgeProps) {

  return (
    <Button {...rest} variant="unstyled" h="1.8rem" bg={color} borderRadius="0.25rem">
      <Flex align="center" px="1rem">
        {icon && <Icon as={icon} mr="0.5rem" />}
        <Text fontSize="1rem" fontWeight="normal">{name}</Text>
      </Flex>
    </Button>
  )
}