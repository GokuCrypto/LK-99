import { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { getHeroAddress, getWarriorAddress } from 'utils/addressHelpers'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { State } from '../types'
import { fetchAllOrdersAsync, fetchOrderAsync, fetchUserOrdersAsync, fetchItemMetadataAsync } from '.'

export const useFetchAllOrders = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  useSlowRefreshEffect(() => {
    dispatch(fetchAllOrdersAsync())
  }, [])

  useSlowRefreshEffect(() => {
    if (account) {
      dispatch(fetchUserOrdersAsync(account))
    }
  }, [account])
}

export const useFetchOrder = (id: number) => {
  const dispatch = useAppDispatch()
  useSlowRefreshEffect(() => {
    if (id > 0) {
      dispatch(fetchOrderAsync(id))
    }
  }, [id])
}

export const useFetchItemMetadata = () => {
  const dispatch = useAppDispatch()
  const heroIds = useSelector((state: State) => Object.values(state.marketplace.orders).filter(o=>o.nftAddr === getHeroAddress()).map(o => o.nftId))
  const warriorIds = useSelector((state: State) => Object.values(state.marketplace.orders).filter(o=>o.nftAddr === getWarriorAddress()).map(o => o.nftId))

  useEffect(() => {
    dispatch(fetchItemMetadataAsync({ heroIds, warriorIds }))
  }, [ dispatch, JSON.stringify(heroIds), JSON.stringify(warriorIds) ])
}

export const useGetAllOrders = () => {
  return useSelector((state: State) => {
    return {
      isLoading: state.marketplace.isLoading,
      ordersCount: state.marketplace.ordersCount,
      orders: state.marketplace.orders,
      floorPrice: state.marketplace.floorPrice,
      warriorFloorPrice: state.marketplace.warriorFloorPrice,
    }
  })
}

export const useGetOrder = (id: number) => {
  return useSelector((state: State) => {
    return state.marketplace.orders[id]
  })
}

export const useGetUserOrders = (account: string): { isLoading: boolean; ordersCount: number; orders: any } => {
  return useSelector((state: State) => {
    return {
      isLoading: state.marketplace.userData.isLoading,
      ordersCount: state.marketplace.userData.ordersCount,
      orders: state.marketplace.userData.orders,
    }
  })
}

export const useGetItems = () => {
  return useSelector((state: State) => state.marketplace.items)
}
export const useGetWarriorItems = () => {
  return useSelector((state: State) => state.marketplace.warriorItems)
}
