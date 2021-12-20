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
	disabled?: boolean;
}

export function SelectButton({ children, icon, active, onClick, disabled = false }: SelectButtonProps) {
	if (active) {
		return (
			<Flex
				h="2.75rem"
				align="center"
				justify="center"
				px="1rem"
				bg="gray.900"
				borderRadius="0.5rem"
				cursor={disabled ? "not-allowed" : "pointer"}
				onClick={disabled ? () => { } : onClick}
				opacity={disabled ? 0.5 : 1}
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
			h="2.75rem"
			align="center"
			justify="center"
			px="1rem"
			boxShadow="inset 0px 0px 0px 3px #565E5E"
			borderRadius="0.5rem"
			cursor={disabled ? "not-allowed" : "pointer"}
			onClick={disabled ? () => { } : onClick}
			opacity={disabled ? 0.5 : 1}
		>
			<HStack spacing="0.5rem">
				{icon && <Icon as={icon.icon} fontSize="1.5rem" color={icon.color || "white"} />}
				<Text textTransform="uppercase" fontWeight="bold" fontSize="1rem">{children}</Text>
			</HStack>
		</Flex>
	)
}