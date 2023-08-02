import { useCallback, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { MaxUint256 } from '@ethersproject/constants'
import { parseUnits, formatUnits } from '@ethersproject/units'
import { Interface } from '@ethersproject/abi'
import { useHeroMintContract, useTokenContract, useWarriorMintContract } from 'hooks/useContract'
import { getHeroMintAddress, getHeroAddress, getWarriorMintAddress, getWarriorAddress } from 'utils/addressHelpers'
import useLastUpdated from 'hooks/useLastUpdated'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { Token } from '@pancakeswap/sdk'
import raidHeroAbi from 'config/abi/raidHero.json'
import raidHeroMintAbi from 'config/abi/raidHeroMint.json'
import warriorMintAbi from 'config/abi/warriorMint.json'
import warriorAbi from 'config/abi/warrior.json'
import tokens from 'config/constants/tokens'
import { estimateGas, callWithEstimateGas } from 'utils/calls/estimateGas'
import multicall from 'utils/multicall'
import { Trait } from 'state/types'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export enum SpendCoin {
  Gold = 0,
  Silver = 1,
  Copper = 2,
  Busd = 3
}

export const useTokenApprove = (token: Token, spender: string) => {
  // const spender = getHeroMintAddress()
  const { callWithGasPrice } = useCallWithGasPrice()
  const tokenContract = useTokenContract(token.address)
  const handleApprove = useCallback(async () => {
    // return callWithGasPrice(tokenContract, 'approve', [spender, MaxUint256])
    return tokenContract.approve(spender, MaxUint256)
  }, [tokenContract, spender, callWithGasPrice])

  return { onApprove: handleApprove }
}
export const useFetchWhitelisted = (account: string) => {
  const [whitelisted, setWhitelisted] = useState(false)
  const [minted, setMinted] = useState(false)

  const contract = useHeroMintContract()
  useEffect(() => {
    const fetch = async () => {
      try {
        const calls = [
          {
            address: getHeroMintAddress(),
            name: 'whiltelisted',
            params: [ account ],
          },
          {
            address: getHeroMintAddress(),
            name: 'wlMinted',
            params: [ account ],
          }
        ]
        const [ [isWhitelisted], [isMinted] ] = await multicall(raidHeroMintAbi, calls)
        setWhitelisted(isWhitelisted)
        setMinted(isMinted)
      } catch (e) {
        console.error(e)
      }
    }
    fetch()
  }, [contract])

  return { whitelisted, minted }
}

export const useMint = () => {
  const { account } = useWeb3React()
  const contract = useHeroMintContract()
  const iface = new Interface(raidHeroAbi)
  const handleMint = useCallback(
    async (count: number, inviter: string) => {
      return callWithEstimateGas(contract, "mint", [ count, inviter ], {}, 2000)
    },
    [account, contract],
  )

  const handleMintByGold = useCallback(
    async (count: number) => {
      return callWithEstimateGas(contract, "mintByGold", [ count ], {}, 2000)
    },
    [account, contract],
  )

  const handleWLMint= useCallback(
    async () => {
      return callWithEstimateGas(contract, "whitelistMint", [], {}, 2000)
    },
    [account, contract],
  )

  return { onMint: handleMint, onMintByGold: handleMintByGold, onWLMint: handleWLMint }
}

export const useWarriorMint = () => {
  const { account } = useWeb3React()
  const contract = useWarriorMintContract()
  const handleMint = useCallback(
    async (count: number, inviter: string) => {
      return callWithEstimateGas(contract, "mint", [ count, inviter ], {}, 2000)
    },
    [account, contract],
  )

  const handleMintByCoin = useCallback(
    async (coin: SpendCoin, count: number) => {
      return callWithEstimateGas(contract, "mintBy", [ coin, count ], {}, 2000)
    },
    [account, contract],
  )

  return { onMint: handleMint, onMintByCoin: handleMintByCoin }
}

export const useUpdatePrice = () => {
  const { account } = useWeb3React()
  const contract = useHeroMintContract()
  const iface = new Interface(raidHeroAbi)
  const handleTransaction = useCallback(
    async (method: string, price: string) => {
      const priceWei = new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL)
      return callWithEstimateGas(contract, method, [ priceWei.toString() ], {}, 2000)
    },
    [account, contract],
  )
  return { onUpdatePrice: handleTransaction }
}

export const useUpdateWarriorPrice = () => {
  const { account } = useWeb3React()
  const contract = useWarriorMintContract()
  const handleTransaction = useCallback(
    async (method: string, price: string) => {
      const priceWei = new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL)
      if(method === 'setGoldPrice') {
        return callWithEstimateGas(contract, 'setCoinPrice', [ SpendCoin.Gold, priceWei.toString() ], {}, 2000)
      }

      if(method === 'setSilverPrice') {
        return callWithEstimateGas(contract, 'setCoinPrice', [ SpendCoin.Silver, priceWei.toString() ], {}, 2000)
      }

      if(method === 'setCopperPrice') {
        return callWithEstimateGas(contract, 'setCoinPrice', [ SpendCoin.Copper, priceWei.toString() ], {}, 2000)
      }
      
      return callWithEstimateGas(contract, method, [ priceWei.toString() ], {}, 2000)
    },
    [account, contract],
  )
  return { onUpdatePrice: handleTransaction }
}


export const useFetchPrices = () => {
  const [prices, setPrices] = useState({ busd: null, raid: null, gold: null })
  const contract = useHeroMintContract()
  useEffect(() => {
    const fetch = async () => {
      try {
        const calls = [
          {
            address: getHeroMintAddress(),
            name: 'busdPrice',
            params: [],
          },
          {
            address: getHeroMintAddress(),
            name: 'raidPrice',
            params: [],
          },
          {
            address: getHeroMintAddress(),
            name: 'goldPrice',
            params: [],
          },
        ]
        const [ [busdPrice], [raidPrice], [goldPrice] ] = await multicall(raidHeroMintAbi, calls)
        setPrices({ 
          busd: formatUnits(busdPrice, 18), 
          raid: formatUnits(raidPrice, 18),
          gold: formatUnits(goldPrice, 18)
        })
      } catch (e) {
        console.error(e)
      }
    }
    fetch()
  }, [contract])

  return { prices }
}

export const useFetchWarriorPrices = () => {
  const [prices, setPrices] = useState({ 
    busd: null, 
    raid: null, 
    gold: null,
    silver: null,
    copper: null
  })
  const contract = useHeroMintContract()
  useEffect(() => {
    const fetch = async () => {
      try {
        const calls = [
          {
            address: getWarriorMintAddress(),
            name: 'busdPrice',
            params: [],
          },

          {
            address: getWarriorMintAddress(),
            name: 'raidPrice',
            params: [],
          },
          {
            address: getWarriorMintAddress(),
            name: 'prices',
            params: [0],
          },

          {
            address: getWarriorMintAddress(),
            name: 'prices',
            params: [1],
          },

          {
            address: getWarriorMintAddress(),
            name: 'prices',
            params: [2],
          }
        ]
        const [ [busdPrice], [raidPrice], [goldPrice], [silverPrice], [copperPrice] ] = await multicall(warriorMintAbi, calls)
        setPrices({ 
          busd: formatUnits(busdPrice, 18), 
          raid: formatUnits(raidPrice, 18),
          gold: formatUnits(goldPrice, 18),
          silver: formatUnits(silverPrice, 18),
          copper: formatUnits(copperPrice, 18)
        })
      } catch (e) {
        console.error(e)
      }
    }
    fetch()
  }, [contract])

  return { prices }
}

export const useFetchAllowance = (token: Token, account: string, spender: string) => {
  const [allowance, setAllowance] = useState<string | null>(null)
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const contract = useTokenContract(token.address)
  useEffect(() => {
    const fetch = async () => {
      try {
        const rawAllowance = await contract.allowance(account, spender)
        setAllowance(formatUnits(rawAllowance, token.decimals))
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetch()
    }
  }, [account, lastUpdated, contract])

  return { allowance, setLastUpdated }
}

export const useFetchAllowances = (account: string | undefined) => {
  // const { account } = useWeb3React()
  const [allowances, setAllowances] = useState({ busd: null, raid: null })
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const busdContract = useTokenContract(tokens.busd.address)
  const raidContract = useTokenContract(tokens.raid.address)

  useEffect(() => {
    const fetch = async () => {
      try {
        const busdAllowance = await busdContract.allowance(account, getHeroMintAddress())
        const raidAllowance = await raidContract.allowance(account, getHeroMintAddress())
        setAllowances({ busd: formatUnits(busdAllowance, 18), raid: formatUnits(raidAllowance, 18) })
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetch()
    }
  }, [account, lastUpdated, busdContract, raidContract])

  return { allowances, setLastUpdated }
}

export const useFetchTraits = (tokenIds: number[]) => {
  const [ traits, setTraits ] = useState<Trait[]>([])
  const contract = useHeroMintContract()
  useEffect(() => {
    const fetch = async () => {
      try {
        // if(tokenIds.filter(id => !!id).length == 0) {
        //   setTraits(Array.from({ length: tokenIds.length }) as Trait[])
        //   return
        // }
        if(tokenIds.length === 0) return
        const calls = tokenIds.map(id => {
          return {
            address: getHeroAddress(),
            name: 'getTraits',
            params: [ id ]
          }
        })
          
        const rawTraits = await multicall(raidHeroAbi, calls)
        const arrTraits = rawTraits.map(([trait], i) =>{
          return {
            id: tokenIds[i],
            race: trait.race, 
            attribute: trait.attribute, 
            level: trait.level, 
            life: trait.life, 
            active: trait.active
          }
        })
        setTraits(arrTraits as Trait[])
      } catch (e) {
        console.error(e)
      }
    }
    fetch()
  }, [contract, tokenIds])

  return traits
}


export const useFetchWarriorTraits = (tokenIds: number[]) => {
  const [ traits, setTraits ] = useState<Trait[]>([])
  useEffect(() => {
    const fetch = async () => {
      try {
        // if(tokenIds.filter(id => !!id).length == 0) {
        //   setTraits(Array.from({ length: tokenIds.length }) as Trait[])
        //   return
        // }
        if(tokenIds.length === 0) return
        const calls = tokenIds.map(id => {
          return {
            address: getWarriorAddress(),
            name: 'getTraits',
            params: [ id ]
          }
        })
          
        const rawTraits = await multicall(warriorAbi, calls)

        const arrTraits = rawTraits.map(([trait], i) =>{
          return {
            id: tokenIds[i],
            race: trait.race, 
            attribute: trait.attribute, 
            level: trait.power.toNumber(),  // level is used as power
            life: trait.life, 
            active: trait.active
          }
        })
        setTraits(arrTraits as Trait[])
      } catch (e) {
        console.error(e)
      }
    }
    fetch()
  }, [tokenIds])

  return traits
}

