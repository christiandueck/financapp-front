import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

type Transaction = 'income' | 'outcome' | 'transfer'

type TransactionContextData = {
  transaction: string;
  transactionDescription: string;
  selectTransaction: (transaction: Transaction) => void;
}

export const TransactionContext = createContext({} as TransactionContextData);

type TransactionContextProviderProps = {
  children: ReactNode;
}

export function TransactionContextProvider({ children }: TransactionContextProviderProps) {

  const [transaction, setTransaction] = useState<Transaction>('income')
  const [transactionDescription, setTransactionDescription] = useState('Entrada')

  function selectTransaction(transaction: Transaction) {
    setTransaction(transaction)
  }

  useEffect(() => {
    if (transaction === 'income') {
      setTransactionDescription('Entrada')
    } else if (transaction === 'outcome') {
      setTransactionDescription('Saída')
    } else if (transaction === 'transfer') {
      setTransactionDescription('Transferência')
    }
  }, [transaction])

  return (
    <TransactionContext.Provider value={{
      transaction,
      transactionDescription,
      selectTransaction
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransaction = () => {
  return useContext(TransactionContext);
}