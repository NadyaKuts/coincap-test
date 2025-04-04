import { Link } from 'react-router'
import routes from 'shared/routes'

export default function MainPageButton() {
  return (
    <Link
      to={routes.main}
      className={`
        inline-flex items-center gap-2
        px-4 py-2
        mb-4
        bg-white dark:bg-gray-800
        text-gray-700 dark:text-gray-200
        rounded-lg
        border border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-md
        transition-all duration-200
        hover:bg-gray-50 dark:hover:bg-gray-700
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      `}
    >
      <span className='font-medium'>Main page</span>
    </Link>
  )
}
