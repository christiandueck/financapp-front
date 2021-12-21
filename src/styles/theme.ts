import { extendTheme } from '@chakra-ui/react'
import { CalendarDefaultTheme } from '@uselessdev/datepicker'

export const theme = extendTheme(CalendarDefaultTheme, {
	colors: {
		gray: {
			"900": "#202727",
			"800": "#2E3838",
			"700": "#434C4C",
			"600": "#565E5E",
			"500": "#697070",
			"400": "#A1A5A5",
			"100": "#C7C9C9",
			"50": "#DDDFDF"
		}
	},
	fonts: {
		heading: 'Lato',
		body: 'Lato',
	},
	styles: {
		global: {
			body: {
				bg: 'gray.800',
				color: 'White'
			},
		}
	},
	components: {
		CalendarDay: {
			baseStyle: {
				_active: {
					bgColor: 'teal.400',
				},
				_hover: {
					bgColor: 'teal.200',
				},
				_focus: {
					bgColor: 'teal.400',
				}
			},
		},

		CalendarControl: {
			parts: ['button'],

			baseStyle: {
				button: {
					h: 6,
					px: 2,
					rounded: 'none',
					fontSize: 'sm',
					color: 'white',
					bgColor: 'teal.400',

					_hover: {
						bgColor: 'teal.200',
					},

					_focus: {
						outline: 'none',
					},
				},
			},
		},
	}
})