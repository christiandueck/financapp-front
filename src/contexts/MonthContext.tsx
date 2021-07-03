import { createContext, useState, ReactNode, useContext, useEffect } from 'react';


type MonthContextData = {
  month: number;
  year: number;
  description: string;
  previousMonth: () => void;
  nextMonth: () => void;
}

export const MonthContext = createContext({} as MonthContextData);

type MonthContextProviderProps = {
  children: ReactNode;
}

export function MonthContextProvider({ children }: MonthContextProviderProps) {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [description, setDescription] = useState('')
  

  function previousMonth() {
    if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    } 
  }
  
  function nextMonth() {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    } 
  }  

  useEffect(() => {
    setDescription(`${months[month-1]} ${year}`)
  }, [month, year])

  return (
    <MonthContext.Provider value={{
      month,
      year,
      description,
      previousMonth,
      nextMonth
    }}>
      {children}
    </MonthContext.Provider>
  )
}

export const useMonth = () => {
  return useContext(MonthContext);
}