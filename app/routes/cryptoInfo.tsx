import CryptoDetailsPage from 'pages/cryptoDetailsPage/cryptoDetails'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Crypto info' },
    { name: 'description', content: 'Coinapp test task' },
  ]
}

export default function Home() {
  return <CryptoDetailsPage />
}
