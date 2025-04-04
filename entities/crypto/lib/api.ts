import axios from 'axios'
import type { CryptoHistory, CryptoInfo } from '../model/types'

const API_URL = 'https://api.coincap.io/v2'

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

export const cryptoApi = {
  fetchAll: async ({
    signal,
    ...params
  }: {
    offset?: number
    limit?: number
    search?: string
    signal?: AbortSignal
  }): Promise<CryptoInfo[]> => {
    const { data } = await axiosInstance.get(`/assets`, { params, signal })
    return data.data
  },

  fetchById: async (id: string): Promise<CryptoInfo> => {
    const { data } = await axiosInstance.get(`/assets/${id}`)
    return data.data
  },

  fetchHistory: async (
    id: string,
    interval: string
  ): Promise<CryptoHistory[]> => {
    const { data } = await axiosInstance.get(`/assets/${id}/history`, {
      params: { interval },
    })
    return data.data
  },
}
