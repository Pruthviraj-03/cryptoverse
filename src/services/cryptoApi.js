import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_CRYPTO_API_URL,
        prepareHeaders: (headers) => {
            const newHeaders = new Headers()
            newHeaders.set('x-rapidapi-host', process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST);
            newHeaders.set('x-rapidapi-key', process.env.REACT_APP_RAPIDAPI_KEY);
            return newHeaders
        }
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
          query: (count) => `/coins?limit=${count}`,
        }),
    
        getCryptoDetails: builder.query({
          query: (coinId) => `/coin/${coinId}`,
        }),
    
        getCryptoHistory: builder.query({
          query: ({ coinId, timeperiod }) => `/coin/${coinId}/history?timeperiod=${timeperiod}`,
        })
    }),
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;