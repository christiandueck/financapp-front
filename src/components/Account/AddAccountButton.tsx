import { Button, Stack, Icon, Text } from "@chakra-ui/react"
import { RiAddLine } from "react-icons/ri"
import { useAccount } from "../../hooks/useAccount"
import { AddAccountModal } from "./AddAccountModal"

export function AddAccountButton() {
	const { openAccountModal } = useAccount()

	return (
		<>
			<Button
				type="button"
				colorScheme="green"
				boxShadow="0px 3px 6px rgba(0, 0, 0, 0.5)"
				w={["100%", "auto"]}
				onClick={() => { openAccountModal() }}
			>
				<Stack
					direction="row"
					spacing="0.5rem"
					align="center"
				>
					<Icon as={RiAddLine} />
					<Text
						lineHeight="1.25rem"
						fontWeight="black"
						textTransform="uppercase"
					>Adicionar conta</Text>
				</Stack>
			</Button>

			<AddAccountModal />
		</>
	)
}