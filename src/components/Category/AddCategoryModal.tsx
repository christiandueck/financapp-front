import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, HStack, Icon, SimpleGrid, FormLabel, FormControl, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { RiAddLine, RiArrowDownCircleFill, RiArrowUpCircleFill } from "react-icons/ri"
import { Input } from "../Form/Input"
import { SelectButton } from "../Form/SelectButton"
import { SelectColorButton } from "../Form/SelectColorButton"

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

export function AddCategoryModal({ isOpen, onClose, type = 'income' }: AddTransactionModalProps) {
  const [categoryType, setCategoryType] = useState(type)
  const [color, setColor] = useState<Color>(colors[0]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.800" p="1.5rem" overflow="hidden" borderRadius="1rem">

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
              <input type="hidden" name="type" value={categoryType} />
            </FormControl>

            <Input name="name" type="text" label="Nome" />

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
              <input type="hidden" name="color" value={color.id} />
            </FormControl>

          </Stack>
        </ModalBody>

        <ModalFooter p="0" mt="2.5rem">
          <Button colorScheme="green" onClick={onClose} w="100%">
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}