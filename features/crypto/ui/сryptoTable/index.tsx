import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useCryptos } from 'features/crypto/lib/hooks'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDebounce } from 'use-debounce'
import { columns } from './config'

export const CryptoTable = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
  } = useCryptos(debouncedSearch[0])

  const isEmptyResults =
    !isFetching && data?.pages?.[0]?.data?.length === 0 && !!search

  const showLoading = isFetchingNextPage || isFetching || isLoading

  const tableData = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || []
  }, [data])

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search cryptocurrencies...'
          className='w-full max-w-md px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='bg-white rounded-xl shadow-lg overflow-hidden relative'>
        <table className='w-full border-separate border-spacing-0'>
          <thead className='bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='sticky top-0 px-4 py-4 text-left text-sm font-semibold text-gray-600 bg-gray-50 z-10'
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className='hover:bg-blue-50 bg-white'
                style={{ position: 'relative' }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className='px-4 py-3 text-sm border-t border-gray-100'
                    style={{ width: `${cell.column.getSize()}px` }}
                  >
                    <div className='truncate'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div ref={ref} className='h-2' />
        {showLoading && (
          <div className='p-4 text-center text-gray-500'>
            Loading {isFetchingNextPage && 'more '}data...
          </div>
        )}
        {isEmptyResults && (
          <>
            <div className='p-4 text-center text-gray-500'>
              No cryptocurrencies found matching{' '}
              <span className='font-medium text-blue-500'>"{search}"</span>.
              Please try a different search term.
            </div>
            <button
              onClick={() => setSearch('')}
              className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
            >
              Reset Search
            </button>
          </>
        )}
      </div>
    </div>
  )
}
