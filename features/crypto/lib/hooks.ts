import {
  type InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { cryptoApi } from 'entities/crypto/lib/api'
import type {
  CryptoHistory,
  CryptosApiResponse,
} from 'entities/crypto/model/types'

const PAGE_LIMIT = 20

export const useCryptos = (search = '') => {
  return useInfiniteQuery<
    CryptosApiResponse,
    Error,
    InfiniteData<CryptosApiResponse, number>,
    readonly unknown[],
    number
  >({
    queryKey: ['cryptos', search],
    queryFn: async ({ pageParam }) => {
      const response = await cryptoApi.fetchAll({
        offset: pageParam * PAGE_LIMIT,
        limit: PAGE_LIMIT,
        search,
      })
      return {
        data: response,
        nextPage: response.length >= PAGE_LIMIT ? pageParam + 1 : null,
        timestamp: Date.now(),
      } satisfies CryptosApiResponse
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 0,
  })
}

export const useCryptoDetails = (id: string) => {
  return useQuery({
    queryKey: ['crypto', id],
    queryFn: () => cryptoApi.fetchById(id),
    enabled: !!id,
  })
}

export const useCryptoHistory = (id: string, interval: string = 'd1') => {
  return useQuery<CryptoHistory[]>({
    queryKey: ['cryptoHistory', id, interval],
    queryFn: () => cryptoApi.fetchHistory(id, interval),
    staleTime: 10000,
    refetchInterval: 10000,
    enabled: !!id,
  })
}
