import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, HStack, Icon, SimpleGrid, FormLabel, FormControl, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { RiAddLine, RiArrowDownCircleFill, RiArrowUpCircleFill, RiEditLine } from "react-icons/ri"
import { Input } from "../Form/Input"
import { SelectButton } from "../Form/SelectButton"
import { SelectColorButton } from "../Form/SelectColorButton"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Category, useCategory } from "../../hooks/useCategory"

interface AddTransactionModalProps {
  type?: 'income' | 'outcome'
  category?: Category;
}

const colors = [
  '#4267B2',
  '#1DB4F5',
  '#20B74A',
  '#9DB410',
  '#F5781D',
  '#F51D1D',
  '#961DF5',
  '#C289EF'
]

type AddCategoryFormData = {
  user?: string;
  type: 'income' | 'outcome';
  name: string;
  color: string;
}

const addCategoryFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório')
})

export function AddCategoryModal({ type = 'income', category = null }: AddTransactionModalProps) {
  const { isOpen, onClose, addCategory, updateCategory, deactivateCategory, reactivateCategory } = useCategory()
  const [categoryType, setCategoryType] = useState(type)
  const [activeColor, setActiveColor] = useState(colors[0]);

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(addCategoryFormSchema)
  })

  const handleSaveCategory: SubmitHandler<AddCategoryFormData> = async (values) => {
    if (category !== null) {
      const updatedCategory = {
        ...values,
        id: category.id,
        type: categoryType,
        color: activeColor,
        active: category.active
      }

      updateCategory(updatedCategory);

    } else {

      const newCategory = {
        ...values,
        type: categoryType,
        color: activeColor,
        user: 'Christian'
      }

      addCategory(newCategory);
    }

    onClose()
  }

  function reactivate() {
    reactivateCategory()
  }

  const { errors } = formState

  useEffect(() => {
    if (category !== null) {
      setCategoryType(category.type)
      setActiveColor(category.color)
      setValue('name', category.name)
    } else {
      setCategoryType(type)
      setValue('name', '')
      setActiveColor(colors[0])
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
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
            <Icon as={category ? RiEditLine : RiAddLine} fontSize="1.5rem" />
            <Text textTransform="uppercase">{category ? "Editar categoria" : "Adicionar categoria"}</Text>
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
                {colors.map(color => (
                  <SelectColorButton
                    key={color}
                    color={color}
                    onClick={() => setActiveColor(color)}
                    active={activeColor === color}
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

          {category !== null && category.active &&
            <Button type="button" onClick={() => deactivateCategory(category.id)} colorScheme="red" w="100%" mt="2rem">
              Desativar categoria
            </Button>
          }
          {category !== null && category.active === false &&
            <Button type="button" onClick={reactivate} colorScheme="orange" w="100%" mt="2rem">
              Reativar categoria
            </Button>
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}