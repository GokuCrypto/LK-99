/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HerosState } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { getErc721Contract } from 'utils/contractHelpers'
import fetchUserHeros, { fetchUserWarriors  }  from './fetchData'

const initialState: HerosState = {
  heros: [],
  userDataLoaded: false,
  totalBalance: 0,

  warriors: [],
  userWarriorsLoaded: false,
  totalWarrios: 0
}

// Async thunks
export const fetchUserHerosAsync = createAsyncThunk('raid/fetchUserHerosAsync', async (account: string) => {
  const data = await fetchUserHeros(account)
  return { totalBalance: data.balance, heros: data.heros }
})

export const fetchUserWarriorsAsync = createAsyncThunk('raid/fetchUserWarriors', async (account: string) => {
  const data = await fetchUserWarriors(account)
  return { totalBalance: data.balance, warriors: data.warriors }
})


export const herosSlice = createSlice({
  name: 'myNfts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserHerosAsync.fulfilled, (state, action) => {
      state.userDataLoaded = true
      state.heros = action.payload.heros
      state.totalBalance = action.payload.totalBalance
    })
    builder.addCase(fetchUserWarriorsAsync.fulfilled, (state, action) => {
      state.userWarriorsLoaded = true
      state.warriors = action.payload.warriors
      state.totalWarrios = action.payload.totalBalance
    })
  },
})

export default herosSlice.reducer
