import { CryptoChart, useCryptoDetails } from 'features/crypto'
import { useState } from 'react'
import { useParams } from 'react-router'
import { MainPageButton, MetricItem } from 'shared/ui'

export default function CryptoDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [timeRange, setTimeRange] = useState('d1') // d1 = 1 day interval

  const { data: crypto, isLoading, error } = useCryptoDetails(id!)

  if (isLoading)
    return (
      <div className='pt-16 p-4 container mx-auto flex items-center justify-center w-full h-140 font-medium text-2xl text-gray-500 animate-pulse'>
        Loading data...
      </div>
    )

  if (error)
    return (
      <div className='pt-16 p-4 container mx-auto flex items-center justify-center w-full h-140 font-medium text-2xl text-red-500'>
        Failed to load cryptocurrency details
      </div>
    )

  if (!crypto)
    return (
      <div className='pt-16 p-4 container mx-auto flex items-center justify-center w-full h-140 font-medium text-2xl text-blue-500'>
        Cryptocurrency not found
      </div>
    )

  return (
    <div className='container mx-auto p-4 max-w-6xl'>
      <MainPageButton />
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>
          {crypto.name} ({crypto.symbol})
        </h1>
        <div className='text-2xl font-semibold mb-4'>
          $
          {parseFloat(crypto.priceUsd).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Key Metrics</h2>
          <div className='space-y-3'>
            <MetricItem label='Rank' value={crypto.rank} />
            <MetricItem
              label='Market Cap'
              value={`$${parseFloat(crypto.marketCapUsd).toLocaleString('en-US')}`}
            />
            <MetricItem
              label='24h Trading Volume'
              value={`$${parseFloat(crypto.volumeUsd24Hr).toLocaleString('en-US')}`}
            />
            <MetricItem
              label='24h Change'
              value={`${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`}
              isPositive={parseFloat(crypto.changePercent24Hr) >= 0}
            />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Supply</h2>
          <div className='space-y-3'>
            <MetricItem
              label='Circulating Supply'
              value={`${parseFloat(crypto.supply).toLocaleString('en-US')} ${crypto.symbol}`}
            />
            <MetricItem
              label='Max Supply'
              value={
                crypto.maxSupply
                  ? `${parseFloat(crypto.maxSupply).toLocaleString('en-US')} ${crypto.symbol}`
                  : '∞'
              }
            />
          </div>
        </div>
      </div>

      <CryptoChart
        id={id!}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />
    </div>
  )
}
