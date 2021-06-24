import { Stack, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { RiArrowDownCircleFill, RiArrowLeftRightLine, RiArrowUpCircleFill } from 'react-icons/ri'
import { SelectButton } from '../Form/SelectButton'

type Transaction = 'income' | 'outcome' | 'transfer'

export function SelectTransaction() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>('income')

  function selectTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction)
  }

  return (
    <Stack spacing="0">
      <Text fontSize="sm" color="gray.400" pl="0.5rem">TIPO DE TRANSAÇÃO:</Text>
      <Flex
        flexWrap="wrap"
      >

        <SelectButton
          icon={{
            icon: RiArrowUpCircleFill,
            color: "green.500"
          }}
          active={selectedTransaction === 'income'}
          onClick={() => selectTransaction('income')}
          margin
        >Entrada</SelectButton>

        <SelectButton
          icon={{
            icon: RiArrowDownCircleFill,
            color: "red.500"
          }}
          active={selectedTransaction === 'outcome'}
          onClick={() => selectTransaction('outcome')}
          margin
        >Saída</SelectButton>

        <SelectButton
          icon={{
            icon: RiArrowLeftRightLine,
            color: "purple.300"
          }}
          active={selectedTransaction === 'transfer'}
          onClick={() => selectTransaction('transfer')}
          margin
        >Transferência</SelectButton>

      </Flex>
    </Stack>
  )
}