import { Stack, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { RiArrowDownCircleFill, RiArrowLeftRightLine, RiArrowUpCircleFill } from 'react-icons/ri'
import { useTransaction } from '../../contexts/TransactionContext'
import { SelectButton } from '../Form/SelectButton'

export function SelectTransaction() {
  const { transaction, selectTransaction } = useTransaction()

  return (
    <Stack spacing="0">
      <Text fontSize="sm" color="gray.400" pl="0.5rem">TIPO DE TRANSAÇÃO:</Text>
      <Flex
        flexWrap="wrap"
        css={{
          gap: '0.5rem'
        }}
      >

        <SelectButton
          icon={{
            icon: RiArrowUpCircleFill,
            color: "green.500"
          }}
          active={transaction === 'income'}
          onClick={() => selectTransaction('income')}
        >Entrada</SelectButton>

        <SelectButton
          icon={{
            icon: RiArrowDownCircleFill,
            color: "red.500"
          }}
          active={transaction === 'outcome'}
          onClick={() => selectTransaction('outcome')}
        >Saída</SelectButton>

        <SelectButton
          icon={{
            icon: RiArrowLeftRightLine,
            color: "purple.300"
          }}
          active={transaction === 'transfer'}
          onClick={() => selectTransaction('transfer')}
        >Transferência</SelectButton>

      </Flex>
    </Stack>
  )
}