import { DarkMode } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface BarChartProps {
  data: {
    xaxis: string[];
    series: {
      name: string;
      data: number[];
      color: string;
    }[]
  }
}

export function BarChart({ data }: BarChartProps) {

  const colors = data.series.map((serie) => {
    return serie.color
  })

  const barChart = {
    series: data.series,
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
        categories: data.xaxis,
        labels: {
          style: {
            fontFamily: 'Lato',
            fontSize: '16px',
            colors: data.xaxis.map(() => ('#C7C9C9'))
          }
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: 'Lato',
            fontSize: '14px',
            colors: ['#C7C9C9']
          },
          formatter: function (val: number) {
            return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
          }
        },
      },
      grid: {
        borderColor: '#565E5E',
      },
      colors: colors,
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: true,
        style: {
          fontSize: '16px',
          fontFamily: 'Lato'
        },
        y: {
          formatter: function (val: number) {
            return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          }
        }
      },
      responsive: [
        {
          breakpoint: 450,
          options: {
            xaxis: {
              labels: {
                style: {
                  fontSize: '14px'
                }
              }
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: '11px',
                  colors: ['#C7C9C9']
                },
                formatter: function (val: number) {
                  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
                }
              }
            },
            legend: {
              fontSize: '14px',
              markers: {
                width: 15,
                height: 15
              }
            }
          }
        }
      ]
    },
  }

  return (
    <Chart options={barChart.options} series={barChart.series} type="bar" width="100%" />
  )
}