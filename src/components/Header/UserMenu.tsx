import { Stack, Flex, Text, IconButton, Link as ChakraLink, HStack, Icon, useDisclosure } from "@chakra-ui/react"
import { RiCloseLine, RiLogoutCircleRLine, RiUserSettingsLine } from "react-icons/ri"
import { useUser } from "../../hooks/useUser"
import { ChangeUserDataModal } from "../User/ChangeUserDataModal"

interface UserMenuProps {
	name: string;
	closeFunction: () => void;
}

export function UserMenu({ closeFunction }: UserMenuProps) {
	const { user, signOut } = useUser();

	const { isOpen, onOpen, onClose } = useDisclosure()

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
			shadow="dark-lg"
		>
			<Flex
				justify="space-between"
				h="3rem"
				align="center"
				borderBottom="1px solid #20B74A"
			>
				<Text ml="1rem">
					Olá, <strong>{user?.name?.split(' ', 1)}</strong>
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

			<ChakraLink px="1rem" _hover={{ bg: "gray.600" }} borderBottom="1px solid #565E5E" onClick={onOpen}>
				<HStack spacing="0.75rem">
					<Icon as={RiUserSettingsLine} />
					<Text lineHeight="3rem">
						Alterar dados pessoais
					</Text>
				</HStack>
			</ChakraLink>

			<ChakraLink px="1rem" _hover={{ bg: "gray.600" }} onClick={signOut}>
				<HStack spacing="0.75rem">
					<Icon as={RiLogoutCircleRLine} />
					<Text lineHeight="3rem">
						Sair
					</Text>
				</HStack>
			</ChakraLink>

			<ChangeUserDataModal isOpen={isOpen} onClose={onClose} />
		</Stack>
	)
}