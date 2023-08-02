import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, API_BASE_URL } from 'config'
import { useMarketplaceContract, useHeroContract, useWarriorContract } from 'hooks/useContract'
import { useCallback, useState, useEffect } from 'react'
import { useAppDispatch } from 'state'
import { estimateGas, callWithEstimateGas } from 'utils/calls/estimateGas'
import { getMarketplaceAddress } from 'utils/addressHelpers'
import { Token } from '@pancakeswap/sdk'
import { MaxUint256 } from '@ethersproject/constants'
import { useTokenContract } from 'hooks/useContract'
import useLastUpdated from 'hooks/useLastUpdated'
import tokens from 'config/constants/tokens'
import { parseUnits, formatUnits } from '@ethersproject/units'
import { fetchNftTraits } from 'state/raid/fetchData'

export const useTokenApprove = (token: Token, amount: string) => {
  const spender = getMarketplaceAddress()
  const tokenContract = useTokenContract(token.address)
  const handleApprove = useCallback(async () => {
    return callWithEstimateGas(tokenContract, "approve", [spender, amount], {}, 2000)
  }, [tokenContract, spender])

  return { onApprove: handleApprove }
}

export const useFetchAllowance = (account: string | undefined) => {
  const [allowance, setAllowance] = useState(null)
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const raidContract = useTokenContract(tokens.raid.address)

  useEffect(() => {
    const fetch = async () => {
      try {
        const raidAllowance = await raidContract.allowance(account, getMarketplaceAddress())
        setAllowance(formatUnits(raidAllowance, 18))
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetch()
    }
  }, [account, lastUpdated, raidContract])

  return { allowance, setLastUpdated }
}

export const useCreateOrder = () => {
  const { account } = useWeb3React()
  const contract = useMarketplaceContract()

  const handleCreateOrder = useCallback(
    async (nftAddress: string, nftId: number, price: string) => {
      const priceWei = new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL)
      return callWithEstimateGas(contract, "createOrder", [ nftAddress, nftId, priceWei.toString()], {}, 2000)
    },
    [account, contract],
  )

  return { onCreateOrder: handleCreateOrder }
}

export const useSetFloorPrice = () => {
  const { account } = useWeb3React()
  const contract = useMarketplaceContract()

  const handle = useCallback(
    async (nftAddr: string, price: string) => {
      const priceWei = new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL)
      return callWithEstimateGas(contract, "setFloorPriceV2", [ nftAddr, priceWei.toString() ], {}, 2000)
    },
    [account, contract]
  )
  return { onSetFloorPrice: handle }
}

export const useBuy = () => {
  const { account } = useWeb3React()
  const contract = useMarketplaceContract()
  const dispatch = useAppDispatch()

  const handleBuyOrder = useCallback(
    async (orderId: number, price: string) => {
      // const priceWei = new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL)
      // return contract.buy(orderId)
      return callWithEstimateGas(contract, "buy", [ orderId ], {}, 2000)
    },
    [account, contract, dispatch],
  )

  return { onBuy: handleBuyOrder }
}

export const useCancelOrder = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const contract = useMarketplaceContract()

  const handleCancelOrder = useCallback(
    async (orderId: number) => {
      return callWithEstimateGas(contract, "cancelOrder", [orderId], {}, 2000)
    },
    [account, contract, dispatch],
  )

  return { onCancel: handleCancelOrder }
}

export const useChangePrice = () => {
  const { account } = useWeb3React()
  const contract = useMarketplaceContract()
  const dispatch = useAppDispatch()

  const handleChangePrice = useCallback(
    async (orderId: number, price: string) => {
      const priceWei = new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL)
      return callWithEstimateGas(contract, "changePrice", [ orderId, priceWei.toString()], {}, 2000)
    },
    [account, contract, dispatch],
  )

  return { onChangePrice: handleChangePrice }
}



export const useFetchNftTraits = (nftAddress: string, nftId: number) => {
  const [traits, setTraits] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      const traits = await fetchNftTraits(nftAddress, nftId)
      setTraits(traits)
      setDataLoaded(true)
    }
    fetchData()
  }, [])
  return { dataLoaded, traits }
}


export const useFetchTradeHistory = () => {
  const [trades, setTrades] = useState([])
  const [ dataLoaded, setDataLoaded ] = useState(false)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/marketplace/history`)
        const trades = await response.json()
        setTrades(trades)
        setDataLoaded(true)
      } catch (e) {
        console.log(e)
      }
    }
    fetchHistory()
  }, [])

  return { dataLoaded, trades }
}

export const useFetchTradeStats = () => {
  const [stats, setStats] = useState({ volume: 0, count: 0, totalVolume: 0 })
  const [ dataLoaded, setDataLoaded ] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/marketplace/stats`)
        const stats = await response.json()
        setStats(stats)
        setDataLoaded(true)
      } catch (e) {
        console.log(e)
      }
    }
    fetchStats()
  }, [])

  return { dataLoaded, stats }
}



export const useHeroSetBlocked = () => {
  const { account } = useWeb3React()
  const contract = useHeroContract()

  const handle = useCallback(
    async (tokenId: string, isBlocked: boolean) => {
      return callWithEstimateGas(contract, "setBlocked", [ tokenId, isBlocked ], {}, 2000)
    },
    [account, contract]
  )
  return { onHeroSetBlocked: handle }
}

export const useWarriorSetBlocked = () => {
  const { account } = useWeb3React()
  const contract = useWarriorContract()

  const handle = useCallback(
    async (tokenId: string, isBlocked: boolean) => {
      return callWithEstimateGas(contract, "setBlocked", [ tokenId, isBlocked ], {}, 2000)
    },
    [account, contract]
  )
  return { onWarriorSetBlocked: handle }
}

export default useCreateOrder
