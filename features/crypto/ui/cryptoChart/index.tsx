import dayjs from 'dayjs'
import { useCryptoHistory } from 'features/crypto/lib/hooks'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type CryptoChartProps = {
  id: string
  timeRange: string
  onTimeRangeChange: (range: string) => void
}

export default function CryptoChart({
  id,
  timeRange,
  onTimeRangeChange,
}: CryptoChartProps) {
  const { data, isLoading, error } = useCryptoHistory(id, timeRange)

  if (error) return <div className='text-red-500'>Error loading chart data</div>

  if (isLoading)
    return (
      <div className='bg-gray-300 p-4 rounded-lg shadow-md h-140 animate-pulse' />
    )

  const chartData = data?.map((item) => ({
    date: dayjs(item.time).format('MMM D, YYYY H:mm'),
    price: parseFloat(item.priceUsd),
  }))

  return (
    <div className='bg-white p-4 rounded-lg shadow-md h-140'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Price History</h2>
        <div className='flex gap-2'>
          {['m5', 'h6', 'h12', 'd1'].map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width='100%' height='95%'>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
          <XAxis dataKey='date' tick={{ fontSize: 12 }} tickMargin={10} />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            width={80}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, 'Price']}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Line
            type='monotone'
            dataKey='price'
            stroke='#3b82f6'
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#1d4ed8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
