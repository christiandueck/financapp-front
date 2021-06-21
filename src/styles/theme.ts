import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#202727",
      "800": "#2E3838",
      "700": "#434C4C",
      "600": "#565E5E",
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
      }
    }
  }
})