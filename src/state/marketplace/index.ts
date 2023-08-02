/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarketplaceState } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { getErc721Contract } from 'utils/contractHelpers'
// import { fetchAnimals } from '../wolfTown/fetchData'
import { fetchTraits, fetchWarriorTraits  } from '../raid/fetchData'
import fetchAllOrders, { fetchUserOrders, fetchOrder } from './fetchData'

const initialState: MarketplaceState = {
  isLoading: true,
  ordersCount: 0,
  orders: {},
  userData: {
    isLoading: true,
    ordersCount: 0,
    orders: {},
  },
  items: {},
  warriorItems: {}
}

// Async thunks
export const fetchAllOrdersAsync = createAsyncThunk('marketplace/fetchAllOrdersAsync', async () => {
  const data = await fetchAllOrders()
  return data
})

export const fetchUserOrdersAsync = createAsyncThunk('marketplace/fetchUserOrdersAsync', async (account: string) => {
  const data = await fetchUserOrders(account)
  return data
})

export const fetchOrderAsync = createAsyncThunk('marketplace/fetchOrderAsync', async (id: number) => {
  const data = await fetchOrder(id)
  return data
})

export const fetchItemMetadataAsync = createAsyncThunk<
  { heroItems: any; warriorItems: any },
  { heroIds: number[]; warriorIds: number[] }
>(
  'marketplace/fetchItemMetadataAsync', async ({ heroIds, warriorIds}) => {
    const items = await fetchTraits(heroIds)
    const itemsOfWarrior = await fetchWarriorTraits(warriorIds)

    const heroItems = items.reduce((acc, item) => {
      const itemMap = acc
      itemMap[item.id] = item
      return itemMap
    }, {})
    const warriorItems = itemsOfWarrior.reduce((acc, item) => {
      const itemMap = acc
      itemMap[item.id] = item
      return itemMap
    }, {})

    return { heroItems, warriorItems }
  },
)

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    removeOrder: (state, action: PayloadAction<number>) => {
      delete state.orders[action.payload]
      delete state.userData.orders[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.ordersCount = action.payload.ordersCount
      state.orders = action.payload.orders
      state.floorPrice = action.payload.floorPrice
      state.warriorFloorPrice = action.payload.warriorFloorPrice
    })

    builder.addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
      state.userData = { isLoading: false, ...action.payload }
    })

    builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
      state.orders[action.payload.id] = action.payload
      // state.userData.orders[action.payload.id] = action.payload
    })

    builder.addCase(fetchItemMetadataAsync.fulfilled, (state, action) => {
      state.items = { ...state.items, ...action.payload.heroItems }
      state.warriorItems = { ...state.warriorItems, ...action.payload.warriorItems }
    })
  },
})

export const { removeOrder } = marketplaceSlice.actions
export default marketplaceSlice.reducer
