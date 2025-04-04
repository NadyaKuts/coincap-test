type MetricItemProps = {
  label: string
  value: string
  isPositive?: boolean
}

export default function MetricItem({
  label,
  value,
  isPositive,
}: MetricItemProps) {
  return (
    <div className='flex justify-between'>
      <span className='text-gray-600'>{label}</span>
      <span
        className={`font-medium ${
          isPositive !== undefined
            ? isPositive
              ? 'text-green-500'
              : 'text-red-500'
            : ''
        }`}
      >
        {value}
      </span>
    </div>
  )
}
