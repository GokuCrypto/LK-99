import { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { State, AnimalsState } from '../types'
import { fetchUserAnimalsAsync } from '.'
import { fetchTotalEarningsAsync, fetchStakedAnimalsAsync } from './barn'

export const useFetchUserAnimals = (account: string) => {
  const dispatch = useAppDispatch()
  useSlowRefreshEffect(() => {
    if (account) {
      dispatch(fetchUserAnimalsAsync(account))
    }
  }, [account])
}

export const useFetchStakedAnimals = (account: string) => {
  const dispatch = useAppDispatch()
  useSlowRefreshEffect(() => {
    if (account) {
      dispatch(fetchStakedAnimalsAsync(account))
    }
  }, [account])
}
export const useFetchTotalEarnings = (account: string) => {
  const dispatch = useAppDispatch()
  useSlowRefreshEffect(() => {
    if (account) {
      dispatch(fetchTotalEarningsAsync(account))
    }
  }, [account])
}

// Animals and Barn
export const useGetUserAnimals = (account: string): AnimalsState => {
  const animals = useSelector((state: State) => state.animals)
  return animals
}

export const useGetStakedAnimals = () => {
  return useSelector((state: State) => state.barn)
}

// export const useGetStakedAnimalIds = () => {
//   const stakedSheepIds = useSelector((state: State) => state.barn.stakedSheeps).map(a => a.id)
//   const stakedWolfIds = useSelector((state: State) => state.barn.stakedWovies).map(a => a.id)
//   return { stakedSheepIds, stakedWolfIds }
// }

export const useGetTotalEarnings = () => {
  const earnings = useSelector((state: State) => state.barn.totalEarnings)
  return earnings
}
