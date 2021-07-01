import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Center, SimpleGrid, Stack, Text, theme } from '@chakra-ui/react'
import { Header } from '../components/Header'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const monthlyExpenses = {
  series: [976, 326, 628, 150],
  options: {
    labels: ['Aluguel', 'Transporte', 'Mercado', 'Comunicação'],
    colors: ['#F51D1D', '#20B74A', '#1DB4F5', '#961DF5'],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        expandOnClick: false,
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 10
        }, 
        donut: {
          size: '60%',
          background: 'transparent',
          labels: {
            show: false,
          }
        }
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        const pVal = val / 100
        const fVal = pVal.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 })
        return fVal
      },
      style: {
        fontSize: '1rem',
        fontFamily: 'Lato',
        colors: ['#FFFFFF']
      }
    },
    fill: {
      type: 'gradient',
    },
    legend: {    
      fontSize: '16px',
      fontWeight: 400,
      fontFamily: 'Lato',
      labels: {
        colors: ['#FFFFFF']
      },
      markers: {
        width: 16,
        height: 16,
        offsetX: -4
      },
      itemMargin: {
        vertical: 4,
      },
    },
    stroke: {
      show: false
    },
    tooltip: {
      style: {
        fontSize: '16px',
        fontFamily: 'Lato'
      },
    },
  },
}

const monthlyBalance = {
  series: [{
    name: 'Entradas',
    data: [3000, 2645, 3152, 3412, 3000, 2645, 3152, 3412]
  }, {
    name: 'Saídas',
    data: [2975, 2813, 1912, 3150, 2462, 3121, 1998, 2412]
  }],
  options: {
    chart: {
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '70%',
        borderRadius: 4
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    legend: {
      fontSize: '16px',
      fontWeight: 400,
      fontFamily: 'Lato',
      labels: {
        colors: ['gray.600'] 
      },
      markers: {
        width: 18,
        height: 18,
        offsetX: -4
      },
      itemMargin: {
        horizontal: 12,
      },
    },
    xaxis: {
      categories: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      labels: {
        style: {
          fontFamily: 'Lato',
          fontSize: '16px',
          colors: ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF']
        }
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: 'Lato',
          fontSize: '16px',
          colors: ['#C7C9C9']
        }
      },
    },
    grid: {
      borderColor: '#565E5E',
    },
    colors: ['#20B74A', '#FA4F4F'],
    fill: {
      opacity: 1
    },
    tooltip: {
      enabled: false
    }
  },
}

export default function Dashboard() {
  return (
    <Stack
      spacing="3rem"
      align="center"
      my={{ base: "1rem", lg: "2rem" }}
      mx="auto"
      px={{ base: "1rem", lg: "1.5rem" }}
      w="100vw"
      maxW="85rem"
    >
      <Header />

      <Head>
        <title>Dashboard | FinançApp</title>
      </Head>

      <SimpleGrid flex="1" gap={{ base: "1rem", lg: "2rem" }} minChildWidth="20rem" align="flex-start" w="100%">
        <Box p={{ base: "1rem", lg: "2rem" }} bg="gray.700" borderRadius="0.5rem">
          <Center mb={{ base: "1rem", lg: "2rem" }}>
            <Text fontSize="lg" textTransform="uppercase" color="gray.100" fontWeight="bold">Despesas por categoria</Text>
          </Center>
          
          <Chart options={monthlyExpenses.options} series={monthlyExpenses.series} type="donut" width="100%" height={400} />
        </Box>

        <Box p={{ base: "1rem", lg: "2rem" }} bg="gray.700" borderRadius="0.5rem">
          <Center mb={{ base: "1rem", lg: "2rem" }}>
            <Text fontSize="lg" textTransform="uppercase" color="gray.100" fontWeight="bold">Entradas e Saídas</Text>
          </Center>

          <Chart options={monthlyBalance.options} series={monthlyBalance.series} type="bar" width="100%" height={350} />
        </Box>
      </SimpleGrid>
    </Stack>
  )
}