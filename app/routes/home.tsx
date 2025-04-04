import HomePage from 'pages/home'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Coinapp' },
    { name: 'description', content: 'Coinapp test task' },
  ]
}

export default function Home() {
  return <HomePage />
}
