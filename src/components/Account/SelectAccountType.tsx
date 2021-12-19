import { Center, FormControl, FormLabel, Icon, Flex, HStack } from '@chakra-ui/react'
import { Badge } from '../Badge'
import { useState } from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { IconType } from 'react-icons'
import { AccountType, accountTypes } from '../../hooks/useAccount'

interface SelectAccountTypeProps {
	name: string;
	label?: string;
	types: AccountType[];
	accountType: 'bank' | 'credit_card' | 'cash' | string;
	setAccountType: (type: string) => void;
}

export function SelectAccountType({ name, label, types, accountType, setAccountType }: SelectAccountTypeProps) {
	const [showList, setShowList] = useState(false)

	function toggleShowList() {
		setShowList(!showList)
	}

	function changeAccountType(type: 'bank' | 'credit_card' | 'cash' | string) {
		setAccountType(type)
		setShowList(false)
	}

	return (
		<FormControl id={name}>
			{!!label && <FormLabel
				htmlFor={name}
				textTransform="uppercase"
				fontSize="sm"
				ml="0.5rem"
				mb="0"
				color="gray.400"
			>
				{label}:
			</FormLabel>}
			<Flex
				h="inherit"
				w="100%"
				variant="unstyled"
				bg="gray.600"
				borderRadius="0.5rem"
				overflow="hidden"
				boxShadow={showList ? "0 0 0 2px var(--chakra-colors-green-500)" : "none"}
			>
				<Flex flexDir="column" w="100%">
					<Flex h="2.5rem" align="center" justifyContent="space-between" onClick={toggleShowList} cursor="pointer">
						<HStack align="center" spacing="1.5rem">
							<Center
								h="2rem"
								w="4rem"
								borderRight="1px solid"
								borderColor="whiteAlpha.200"
								color="gray.100"
							>
								<Icon as={accountTypes.find((item) => (item.type === accountType)).icon} fontSize="1.25rem" />
							</Center>

							{accountType &&
								<Badge name={accountTypes.find((item) => (item.type === accountType)).label} color="gray.500" />
							}
						</HStack>

						<Icon
							mr="0.5rem"
							as={showList ? RiArrowUpSLine : RiArrowDownSLine}
							fontSize="2rem"
							color="gray.400"
						/>
					</Flex>

					{showList &&
						<Flex p="1rem" wrap="wrap" css={{ gap: "1rem" }} borderTop="1px solid" borderColor="whiteAlpha.200">
							{types.map((item) => {
								return (
									<Badge
										key={item.type}
										name={item.label}
										icon={item.icon}
										color={item.type === accountType ? "gray.800" : "gray.500"}
										onClick={() => changeAccountType(item.type)}
									/>
								)
							})}
						</Flex>
					}
				</Flex>
			</Flex>
		</FormControl>
	)
}