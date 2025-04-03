import { type Column } from '@tanstack/react-table'

type SortableHeaderProps<T> = {
  column: Column<T>
  title: string
}

export const SortableHeader = <T,>({
  column,
  title,
}: SortableHeaderProps<T>) => {
  const sortDirection = column.getIsSorted()
  const arrow = sortDirection ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ' ↔'

  return (
    <button
      className='flex-row items-center gap-1 transition-colors'
      onClick={() => column.toggleSorting(sortDirection === 'asc')}
    >
      <span>{title}</span>
      <span className='text-sm text-gray-400'>{arrow}</span>
    </button>
  )
}
