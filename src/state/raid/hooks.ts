import { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { State, HerosState } from '../types'
import { fetchUserHerosAsync, fetchUserWarriorsAsync } from '.'

export const useFetchUserHeros = (account: string) => {
  const dispatch = useAppDispatch()
  useSlowRefreshEffect(() => {
    if (account) {
      dispatch(fetchUserHerosAsync(account))
    }
  }, [account])
}

export const useFetchUserWarriors = (account: string) => {
  const dispatch = useAppDispatch()
  useSlowRefreshEffect(() => {
    if (account) {
      dispatch(fetchUserWarriorsAsync(account))
    }
  }, [account])
}

export const useGetUserHeros = (account: string): HerosState => {
  return useSelector((state: State) => state.heros)
}

export const useGetUserWarriors = (account: string): HerosState => {
  return useSelector((state: State) => state.heros)
}

export const useGetUserNFTs =  (account: string): HerosState => {
  return useSelector((state: State) => state.heros)
}