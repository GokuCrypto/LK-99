/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnimalsState } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { getErc721Contract } from 'utils/contractHelpers'
import fetchUserAnimals, { fetchStakedAnimals } from './fetchData'

const initialState: AnimalsState = {
  sheeps: [],
  wovies: [],
  userDataLoaded: false,
  totalBalance: 0,
}

// Async thunks
export const fetchUserAnimalsAsync = createAsyncThunk('wt/fetchUserAnimalsAsync', async (account: string) => {
  const data = await fetchUserAnimals(account)
  const sheeps = data.animals.filter((a) => a.isSheep)
  const wovies = data.animals.filter((a) => !a.isSheep)
  return { totalBalance: data.balance, sheeps, wovies }
})

export const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    removeAnimal: (state, action: PayloadAction<number>) => {
      if (state.sheeps[action.payload]) {
        delete state.sheeps[action.payload]
        state.totalBalance -= 1
      }
      if (state.wovies[action.payload]) {
        delete state.wovies[action.payload]
        state.totalBalance -= 1
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAnimalsAsync.fulfilled, (state, action) => {
      state.userDataLoaded = true
      state.sheeps = action.payload.sheeps
      state.wovies = action.payload.wovies
      state.totalBalance = action.payload.totalBalance
    })
  },
})

export const { removeAnimal } = animalsSlice.actions
export default animalsSlice.reducer
