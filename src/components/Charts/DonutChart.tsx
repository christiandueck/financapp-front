import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface DonutChartProps {
  data: {
      name: string;
      amount: number;
      color: string;
  }[]
}

export function DonutChart({ data }: DonutChartProps) {

  const series = data.map((data) => {
    return data.amount
  })

  const labels = data.map((data) => {
    return data.name
  })

  const colors = data.map((data) => {
    return data.color
  })

  const donutChart = {
    series: series,
    options: {
      labels: labels,
      colors: colors,
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
          fontSize: '16px',
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
            legend: {
              fontSize: "14px",
              markers: {
                width: 14,
                height: 14
              }
            },
            dataLabels: {
              formatter: function (val: number) {
                const pVal = val / 100
                const fVal = pVal.toLocaleString('pt-BR', { style: 'percent', maximumFractionDigits: 0 })
                return fVal
              },
              style: {
                fontSize: '13px'
              }
            }
          }
        }
      ]
    },
  }

  return (
    <Chart options={donutChart.options} series={donutChart.series} type="donut" width="100%" />
  )
}