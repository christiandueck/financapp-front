import { Flex, HStack, Icon, Text } from "@chakra-ui/react"
import { ElementType } from "react"

interface SelectButtonProps {
  children: string;
  icon?: {
    icon: ElementType;
    color?: string;
  }
  active?: boolean;
  onClick: () => void;
}

export function SelectButton({ children, icon, active, onClick }: SelectButtonProps) {
  if (active) {
    return (
      <Flex
        h="3rem"
        align="center"
        px="1rem"
        bg="gray.900"
        borderRadius="0.5rem"
        cursor="pointer"
        onClick={onClick}
      >
        <HStack spacing="0.5rem">
          {icon && <Icon as={icon.icon} fontSize="1.5rem" color={icon.color || "white"} />}
          <Text textTransform="uppercase" fontWeight="bold" fontSize="1rem">{children}</Text>
        </HStack>
      </Flex>
    )
  }

  return (
    <Flex
      h="3rem"
      align="center"
      px="1rem"
      boxShadow="inset 0px 0px 0px 3px #565E5E"
      borderRadius="0.5rem"
      cursor="pointer"
      onClick={onClick}
    >
      <HStack spacing="0.5rem">
        {icon && <Icon as={icon.icon} fontSize="1.5rem" color={icon.color || "white"} />}
        <Text textTransform="uppercase" fontWeight="bold" fontSize="1rem">{children}</Text>
      </HStack>
    </Flex>
  )
}