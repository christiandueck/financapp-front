import { Stack, Flex, Text, IconButton, Link, HStack, Icon } from "@chakra-ui/react"
import { RiCloseLine, RiLogoutCircleRLine, RiUserSettingsLine } from "react-icons/ri"

interface UserMenuProps {
  name: string;
  closeFunction: () => void;
}

export function UserMenu({ name, closeFunction }: UserMenuProps) {
  return (
    <Stack
      spacing="0.25rem"

      zIndex={10}

      position="relative"
      bottom="-0.75rem"
      left="-15rem"
      w="18rem"

      borderRadius="0.5rem"

      bg="gray.700"
      color="gray.100"
      textTransform="uppercase"

      overflow="hidden"
    >
      <Flex
        justify="space-between"
        h="3rem"
        align="center"
        borderBottom="1px solid #20B74A"
      >
        <Text ml="1rem">
          Olá, <strong>{name.split(' ', 1)}</strong>
        </Text>
        <IconButton
          aria-label="Close"
          icon={<RiCloseLine />}
          variant="none"
          mr="0.25rem"
          fontSize="2rem"
          onClick={closeFunction}
        />
      </Flex>

      <Link px="1rem" _hover={{ bg: "gray.600" }} borderBottom="1px solid #565E5E">
        <HStack spacing="0.75rem">
          <Icon as={RiUserSettingsLine} />
          <Text lineHeight="3rem">
            Alterar dados pessoais
          </Text>
        </HStack>
      </Link>

      <Link px="1rem" _hover={{ bg: "gray.600" }}>
        <HStack spacing="0.75rem">
          <Icon as={RiLogoutCircleRLine} />
          <Text lineHeight="3rem">
            Sair
          </Text>
        </HStack>
      </Link>
    </Stack>
  )
}