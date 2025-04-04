import type { ColumnDef } from '@tanstack/react-table'
import type { CryptoInfo } from 'entities/crypto/model/types'
import routes from 'shared/routes'
import CryptoLink from '../ui/сryptoTable/components/CryptoLink'
import SortableHeader from '../ui/сryptoTable/components/SortableHeader'

export const columns: ColumnDef<CryptoInfo>[] = [
  {
    accessorKey: 'rank',
    header: ({ column }) => <SortableHeader column={column} title='Rank' />,
    cell: ({ row }) => (
      <div className='text-left py-3 w-[80px]'>
        <CryptoLink to={routes.cryptoInfo(row.original.id)}>
          {row.getValue('rank')}
        </CryptoLink>
      </div>
    ),
    size: 80,
    sortingFn: (rowA, rowB) =>
      parseInt(rowA.original.rank) - parseInt(rowB.original.rank),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title='Name' />,
    cell: ({ row }) => (
      <CryptoLink
        to={routes.cryptoInfo(row.original.id)}
        className='flex items-center gap-3 py-3 min-w-[200px]'
      >
        <span className='font-semibold'>{row.original.name}</span>
        <span className='text-gray-500 text-sm'>{row.original.symbol}</span>
      </CryptoLink>
    ),
    size: 250,
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'priceUsd',
    header: ({ column }) => <SortableHeader column={column} title='Price' />,
    cell: ({ row }) => (
      <CryptoLink
        to={routes.cryptoInfo(row.original.id)}
        className='py-3 font-medium w-[150px]'
      >
        $
        {parseFloat(row.getValue('priceUsd')).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </CryptoLink>
    ),
    size: 150,
    sortingFn: (rowA, rowB) =>
      parseFloat(rowA.original.priceUsd) - parseFloat(rowB.original.priceUsd),
  },
  {
    accessorKey: 'marketCapUsd',
    header: ({ column }) => (
      <SortableHeader column={column} title='Market Cap' />
    ),
    cell: ({ row }) => (
      <CryptoLink
        to={routes.cryptoInfo(row.original.id)}
        className='py-3 font-medium w-[180px]'
      >
        $
        {parseFloat(row.getValue('marketCapUsd')).toLocaleString('en-US', {
          maximumFractionDigits: 0,
        })}
      </CryptoLink>
    ),
    size: 180,
    sortingFn: (rowA, rowB) =>
      parseFloat(rowA.original.marketCapUsd) -
      parseFloat(rowB.original.marketCapUsd),
  },
  {
    accessorKey: 'changePercent24Hr',
    header: ({ column }) => (
      <SortableHeader column={column} title='24h Change' />
    ),
    cell: ({ row }) => {
      const change = parseFloat(row.getValue('changePercent24Hr') || '0')
      return (
        <CryptoLink
          to={routes.cryptoInfo(row.original.id)}
          className={`py-3 font-medium w-[120px] ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}
        >
          {change.toFixed(2)}%
        </CryptoLink>
      )
    },
    size: 120,
    sortingFn: (rowA, rowB) =>
      parseFloat(rowA.original.changePercent24Hr) -
      parseFloat(rowB.original.changePercent24Hr),
  },
]
