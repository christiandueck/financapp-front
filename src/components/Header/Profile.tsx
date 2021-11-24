import { UserMenu } from "./UserMenu"
import { Avatar } from "@chakra-ui/avatar"
import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { useUser } from "../../hooks/useUser";

export function Profile() {
	const { user } = useUser()

	const [showUserMenu, setShowUserMenu] = useState(false)

	function toggleUserMenu() {
		setShowUserMenu(!showUserMenu)
	}

	return (
		<Box
			h="3rem"
			w="3rem"
			position="relative"
		>
			<Avatar
				size="md"
				borderRadius="0.75rem"
				filter="drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.5))"
				cursor="pointer"
				onClick={() => toggleUserMenu()}
				name={user?.name}

				position="relative"

				_after={{
					content: `""`,
					position: 'absolute',
					inset: 0,
					border: '0.2rem solid rgba(255, 255, 255, 0.5)',
					borderRadius: '0.75rem'
				}}
			/>

			{showUserMenu && <UserMenu name={user?.name} closeFunction={toggleUserMenu} />}
		</Box >
	)
}