import { Flex, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, HStack, Icon, Box } from "@chakra-ui/react"
import { RiAddLine, RiArrowDownCircleFill, RiArrowLeftRightLine, RiArrowUpCircleFill, RiArrowUpLine } from "react-icons/ri"
import { Input } from "../Form/Input"
import { SelectButton } from "../Form/SelectButton"
import { SelectTransaction } from "./SelectTransaction"

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.800" p="1.5rem" overflow="hidden" borderRadius="1rem">

        <ModalHeader p="0" mb="2rem">
          <HStack>
            <Icon as={RiAddLine} fontSize="1.5rem" />
            <Text textTransform="uppercase">Nova transação</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton
          top="1.5rem"
          right="1.5rem"
          fontSize="1rem"
          color="gray.100"
        />

        <ModalBody p="0">
          <Stack spacing="0.75rem">
            <SelectTransaction />

            <Input name="amount" type="number" label="valor" />

            <Input name="date" type="date" label="Data da entrada" />

            <Input name="account" type="text" label="Conta de destino" />
            <Input name="category" type="text" label="Categoria" />
            <Input name="description" type="text" label="Descrição" placeholder="Texto opcional..." />


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