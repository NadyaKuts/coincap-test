export type CryptoInfo = {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string | null
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
}

export type CryptosApiResponse = {
  data: CryptoInfo[]
  timestamp: number
  nextPage: number | null
}

export type FetchCryptosParams = {
  pageParam?: number
}

export type CryptoHistory = {
  priceUsd: string
  time: number
  date?: string
}
