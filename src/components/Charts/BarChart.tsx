import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface BarChartProps {
  data: {
    xaxis: string[];
    series: {
      name: string;
      data: number[];
    }[]
  }
}

export function BarChart({ data }: BarChartProps) {

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
                  fontSize: '13px',
                  colors: ['#C7C9C9']
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