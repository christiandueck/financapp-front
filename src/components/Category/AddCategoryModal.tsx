import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, HStack, Icon, SimpleGrid, FormLabel, FormControl, Flex } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import { RiAddLine, RiArrowDownCircleFill, RiArrowUpCircleFill, RiEditLine } from "react-icons/ri"
import { Input } from "../Form/Input"
import { SelectButton } from "../Form/SelectButton"
import { SelectColorButton } from "../Form/SelectColorButton"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from "../../services/api"
import { useCategory } from "../../hooks/useCategory"
import { Color, useColor } from "../../hooks/useColor"
import { toast, ToastContainer } from 'react-toastify';

interface AddTransactionModalProps {
	type?: 'income' | 'outcome'
}

type AddCategoryFormData = {
	type: 'income' | 'outcome';
	name: string;
	color_id: number;
}

const addCategoryFormSchema = yup.object().shape({
	name: yup.string().required('Nome é obrigatório')
})

export function AddCategoryModal({ type = 'income' }: AddTransactionModalProps) {
	const { colors } = useColor();
	const { editCategory, deactivateCategory, closeCategoryModal, isOpenCategoryModal } = useCategory()
	const [categoryType, setCategoryType] = useState(type)
	const [activeColor, setActiveColor] = useState<Color | null>(colors ? colors[0] : null);

	const { register, handleSubmit, formState, setValue } = useForm({
		resolver: yupResolver(addCategoryFormSchema)
	})

	const handleSaveCategory: SubmitHandler<AddCategoryFormData> = async (values) => {
		if (editCategory !== null) {
			await api.post(`category/update/${editCategory.id}`, {
				id: editCategory.id,
				name: values.name,
				type: categoryType,
				color_id: activeColor.id,
				active: editCategory.active
			}).catch((error) => {
				toast.error("Não foi possível cadastrar a categoria, tente novamente!")
			})
		} else {
			await api.post('category/insert', {
				name: values.name,
				type: categoryType,
				color_id: activeColor.id
			}).catch((error) => {
				toast.error("Categoria já cadastrada!")
			})
		}

		closeCategoryModal()
	}

	async function reactivate() {
		await api.post(`category/update/${editCategory.id}`, {
			id: editCategory.id,
			name: editCategory.name,
			type: categoryType,
			color_id: activeColor.id,
			active: true
		})

		closeCategoryModal()
	}

	const { errors } = formState

	useEffect(() => {
		if (editCategory !== null) {
			setCategoryType(editCategory.type)
			setActiveColor(editCategory.color)
			setValue('name', editCategory.name)
		} else {
			setCategoryType(type)
			setValue('name', '')
			setActiveColor(colors ? colors[0] : null)
		}
	}, [isOpenCategoryModal])

	return (
		<Modal isOpen={isOpenCategoryModal} onClose={closeCategoryModal} isCentered size="xl">
			<ToastContainer />

			<ModalOverlay />
			<ModalContent
				bg="gray.800"
				p="1.5rem"
				overflow="hidden"
				borderRadius="1rem"
				as="form"
				onSubmit={handleSubmit(handleSaveCategory)}
			>

				<ModalHeader p="0" mb="2rem">
					<HStack>
						<Icon as={editCategory ? RiEditLine : RiAddLine} fontSize="1.5rem" />
						<Text textTransform="uppercase">{editCategory ? "Editar categoria" : "Adicionar categoria"}</Text>
					</HStack>
				</ModalHeader>
				<ModalCloseButton
					top="1.5rem"
					right="1.5rem"
					fontSize="1rem"
					color="gray.100"
				/>

				<ModalBody p="0">
					<Stack spacing="1.5rem">

						<FormControl>
							<FormLabel
								htmlFor="type"
								textTransform="uppercase"
								fontSize="sm"
								ml="0.5rem"
								mb="0"
								color="gray.400"
							>Tipo de categoria:</FormLabel>
							<SimpleGrid columns={2} spacing="1rem" p={0}>

								<SelectButton
									icon={{
										icon: RiArrowUpCircleFill,
										color: "green.500"
									}}
									active={categoryType === 'income'}
									onClick={() => setCategoryType('income')}
								>Entrada</SelectButton>

								<SelectButton
									icon={{
										icon: RiArrowDownCircleFill,
										color: "red.500"
									}}
									active={categoryType === 'outcome'}
									onClick={() => setCategoryType('outcome')}
								>Saída</SelectButton>
							</SimpleGrid>
						</FormControl>

						<Input name="name" type="text" label="Nome" error={errors.name} {...register('name')} />

						<FormControl>
							<FormLabel
								htmlFor="color"
								textTransform="uppercase"
								fontSize="sm"
								ml="0.5rem"
								mb="0"
								color="gray.400"
							>Selecione uma cor:</FormLabel>
							<Flex wrap="wrap" css={{ gap: '0.5rem' }}>
								{colors?.map(color => (
									<SelectColorButton
										key={color.id}
										color={color.hex_code}
										onClick={() => setActiveColor(color)}
										active={activeColor?.id === color.id}
									/>
								))}
							</Flex>
						</FormControl>

					</Stack>
				</ModalBody>

				<ModalFooter p="0" mt="2.5rem" display="flex" flexDir="column">
					<Button type="submit" isLoading={formState.isSubmitting} colorScheme="green" w="100%">
						Salvar
					</Button>

					{editCategory !== null && editCategory.active &&
						<Button type="button" onClick={() => deactivateCategory()} colorScheme="red" w="100%" mt="2rem">
							Desativar categoria
						</Button>
					}
					{editCategory !== null && editCategory.active === false &&
						<Button type="button" onClick={reactivate} colorScheme="orange" w="100%" mt="2rem">
							Reativar categoria
						</Button>
					}
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}