import { CryptoTable } from 'features/crypto/ui/сryptoTable'

export const HomePage = () => {
  return (
    <div className='container mx-auto p-4 max-w-6xl'>
      <h1 className='text-2xl px-4 pt-4'>Crypto Market Dashboard</h1>
      <CryptoTable />
    </div>
  )
}
