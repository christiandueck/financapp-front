import { Center, FormControl, FormLabel, Icon, Button, Flex, HStack, Input as ChakraInput, IconButton } from '@chakra-ui/react'
import { Badge } from '../Badge'
import { useState } from 'react'
import { RiArrowDownSLine, RiArrowUpSLine, RiBankCard2Line, RiBankLine, RiFunctionLine, RiWalletLine } from 'react-icons/ri'
import { useEffect } from 'react'
import { Category, useCategory } from '../../hooks/useCategory'

interface SelectCategoryProps {
	name: string;
	label?: string;
	transaction: string;
	setCategoryId: (id: number) => void;
}

export function SelectCategory({ name, label, transaction, setCategoryId }: SelectCategoryProps) {

	const { activeCategories } = useCategory();

	const [category, setCategory] = useState(activeCategories ? activeCategories[0] : null)
	const [showList, setShowList] = useState(false)

	function toggleShowList() {
		setShowList(!showList)
	}

	function changeCategory(category: Category) {
		setCategory(category)
		setShowList(false)
	}

	useEffect(() => {
		setCategory(activeCategories?.filter((category) => (category.type === transaction))[0])
	}, [transaction])

	useEffect(() => {
		setCategoryId(category?.id || 0)
	}, [category])

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
								<Icon as={RiFunctionLine} fontSize="1.25rem" />
							</Center>

							{category &&
								<Badge name={category?.name} color={category?.color.hex_code} />
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
							{activeCategories.filter((category) => (category.type === transaction)).map((category) => {
								return (
									<Badge
										key={category.id}
										name={category.name}
										color={category.color.hex_code}
										onClick={() => changeCategory(category)}
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