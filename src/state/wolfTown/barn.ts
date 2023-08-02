/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BarnState } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { getErc721Contract } from 'utils/contractHelpers'
import fetchUserAnimals, { fetchStakedAnimals, fetchTotalEarnings } from './fetchData'

const initialState: BarnState = {
  stakedHeros: [],
  userDataLoaded: false,
  totalStakes: 0,
}

// Async thunks

export const fetchStakedAnimalsAsync = createAsyncThunk('wt/fetchStakedAnimalsAsync', async (account: string) => {
  const data = await fetchStakedAnimals(account)
  return { totalStakes: data.balance, stakedHeros: data.stakedHeros }
})

export const fetchTotalEarningsAsync = createAsyncThunk('wt/fetchTotalEarningsAsync', async (account: string) => {
  const data = await fetchTotalEarnings(account)
  return data
})

export const barnSlice = createSlice({
  name: 'barn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStakedAnimalsAsync.fulfilled, (state, action) => {
      state.userDataLoaded = true
      state.stakedHeros = action.payload.stakedHeros
      state.totalStakes = action.payload.totalStakes
    })

    builder.addCase(fetchTotalEarningsAsync.fulfilled, (state, action) => {
      state.totalEarnings = action.payload
    })
  },
})

export default barnSlice.reducer
