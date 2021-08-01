import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, HStack, Icon, SimpleGrid, FormLabel, FormControl, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { RiAddLine, RiArrowDownCircleFill, RiArrowUpCircleFill } from "react-icons/ri"
import { Input } from "../Form/Input"
import { SelectButton } from "../Form/SelectButton"
import { SelectColorButton } from "../Form/SelectColorButton"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from "../../services/api"

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'income' | 'outcome'
}

type Color = {
  id: number;
  name: string;
  hex: string;
}

const colors = [
  {
    id: 1,
    name: '#4267B2',
    hex: '#4267B2'
  },
  {
    id: 2,
    name: '#1DB4F5',
    hex: '#1DB4F5'
  },
  {
    id: 4,
    name: '#20B74A',
    hex: '#20B74A'
  },
  {
    id: 6,
    name: '#9DB410',
    hex: '#9DB410'
  },
  {
    id: 7,
    name: '#F5781D',
    hex: '#F5781D'
  },
  {
    id: 8,
    name: '#F51D1D',
    hex: '#F51D1D'
  },
  {
    id: 10,
    name: '#961DF5',
    hex: '#961DF5'
  },
  {
    id: 11,
    name: '#C289EF',
    hex: '#C289EF'
  }
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

export function AddCategoryModal({ isOpen, onClose, type = 'income' }: AddTransactionModalProps) {
  const [categoryType, setCategoryType] = useState(type)
  const [color, setColor] = useState<Color>(colors[0]);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(addCategoryFormSchema)
  })

  const handleAddCategory: SubmitHandler<AddCategoryFormData> = async (values) => {
    const category = {
      ...values,
      type: categoryType,
      color: color.name,
      user: 'Christian'
    }

    await api.post('category/insert', category)

    onClose()
  }

  const { errors } = formState

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent
        bg="gray.800"
        p="1.5rem"
        overflow="hidden"
        borderRadius="1rem"
        as="form"
        onSubmit={handleSubmit(handleAddCategory)}
      >

        <ModalHeader p="0" mb="2rem">
          <HStack>
            <Icon as={RiAddLine} fontSize="1.5rem" />
            <Text textTransform="uppercase">Adicionar categoria</Text>
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
                {colors.map(item => (
                  <SelectColorButton
                    key={item.id}
                    color={item.name}
                    onClick={() => setColor(item)}
                    active={color.name === item.name}
                  />
                ))}
              </Flex>
            </FormControl>

          </Stack>
        </ModalBody>

        <ModalFooter p="0" mt="2.5rem">
          <Button type="submit" isLoading={formState.isSubmitting} colorScheme="green" w="100%">
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}