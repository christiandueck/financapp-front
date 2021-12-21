import { Box, Button, Center, FormControl, FormLabel, Icon, Input as ChakraInput, InputProps as ChakraInputProps, Text, FormErrorMessage } from '@chakra-ui/react'
import { ElementType, forwardRef, ForwardRefRenderFunction, useCallback, useState } from 'react'
import { format } from 'date-fns'
import { Calendar, CalendarDate } from '@uselessdev/datepicker'
import { ptBR } from 'date-fns/locale'


interface DatePickerProps extends ChakraInputProps {
	label?: string;
	icon?: ElementType;
	date: CalendarDate;
	setDate: (date: CalendarDate) => void;
}

export function DatePicker({ label, icon, date, setDate }) {
	const [showDatePicker, setShowDatePicker] = useState(false)

	function handleSelectDate(date: CalendarDate) {
		setDate(date)
		setShowDatePicker(false)
	}

	return (
		<Box position="relative">
			{!!label && <FormLabel
				textTransform="uppercase"
				fontSize="sm"
				ml="0.5rem"
				mb="0"
				color="gray.400"
			>
				{label}:
			</FormLabel>}
			<Button
				w="100%"
				focusBorderColor="green.500"
				bg="gray.600"
				borderRadius="0.5rem"
				variant="filled"
				paddingInlineStart={icon ? "5.25rem" : "4"}
				_hover={{
					bgColor: 'gray.600'
				}}
				fontWeight="400"
				justifyContent="flex-start"
				onClick={() => setShowDatePicker(!showDatePicker)}
			>
				{icon &&
					<Center
						h="2rem"
						w="4rem"
						mb="0.25rem"
						position="absolute"
						top="0.3rem"
						left={0}
						borderRight="1px solid"
						borderColor="whiteAlpha.200"
						color="gray.100"
					>
						<Icon as={icon} fontSize="1.25rem" />
					</Center>
				}
				{format(date, "dd/MM/yyyy")}
			</Button>

			{showDatePicker &&
				<Box position="absolute" top="4	rem" zIndex={10} bg="gray.800">
					<Calendar
						value={{ start: date }}
						singleMonth
						singleDateSelection
						onSelectDate={handleSelectDate}
						nextButton={props => (
							<Button size="xs" colorScheme="teal" {...props}>
								&#8250;
							</Button>
						)}
						prevButton={props => (
							<Button size="xs" colorScheme="teal" {...props}>
								&#8249;
							</Button>
						)}
						locale={ptBR}
						weekdayFormat="EEEEEE"
						monthYearFormat="MMMM yyyy"
					/>
				</Box>
			}
		</Box>
	)
}