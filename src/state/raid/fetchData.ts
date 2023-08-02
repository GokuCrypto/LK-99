import { BigNumber } from '@ethersproject/bignumber'
import heroABI from 'config/abi/raidHero.json'
import warriorABI from 'config/abi/warrior.json'
import multicall, { multicallv2 } from 'utils/multicall'
import { getHeroAddress, getWarriorAddress } from 'utils/addressHelpers'

const fetchUserHeros = async (account) => {
  const call = [
    {
      address: getHeroAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]
  const [[balanceOf]] = await multicall(heroABI, call)
  const count = balanceOf.toNumber()
  const idCalls = Array.from({ length: count }, (_, i) => {
    return {
      address: getHeroAddress(),
      name: 'tokenOfOwnerByIndex',
      params: [account, i],
    }
  })
  const ids = await multicall(heroABI, idCalls)
  const heros = ids.map((id) => { 
    return { id: id[0].toNumber() }
  })
  return { balance: count, heros }
}

export const fetchUserWarriors = async (account) => {
  const call = [
    {
      address: getWarriorAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]
  const [[balanceOf]] = await multicall(heroABI, call)
  const count = balanceOf.toNumber()
  const idCalls = Array.from({ length: count }, (_, i) => {
    return {
      address: getWarriorAddress(),
      name: 'tokenOfOwnerByIndex',
      params: [account, i],
    }
  })
  const ids = await multicall(heroABI, idCalls)
  const warriors = ids.map((id) => { 
    return { id: id[0].toNumber() }
  })
  return { balance: count, warriors }
}

export const fetchTraits = async (tokenIds: number[]) => {

  const calls = tokenIds.map(id => {
    return {
      address: getHeroAddress(),
      name: 'getTraits',
      params: [id],
    }
  })

  const traits = await multicall(heroABI, calls)
  return traits.map(([trait], i) => {
    return {
      id: tokenIds[i],
      race: trait.race,
      attribute: trait.attribute,
      level: trait.level,
      life: trait.life,
      active: trait.active
    }
  })
}

export const fetchWarriorTraits = async (tokenIds: number[]) => {

  const calls = tokenIds.map(id => {
    return {
      address: getWarriorAddress(),
      name: 'getTraits',
      params: [id],
    }
  })

  const traits = await multicall(warriorABI, calls)
  return traits.map(([trait], i) => {
    return {
      id: tokenIds[i],
      race: trait.race,
      attribute: trait.attribute,
      power: trait.power.toNumber(),
      life: trait.life,
      active: trait.active
    }
  })
}

export const fetchNftTraits = async(nftAddress: string, tokenId: number) => {
  const calls = [
    {
      address: nftAddress,
      name: 'getTraits',
      params: [tokenId]
    }
  ]
  if(nftAddress === getHeroAddress()) {
    const [ [trait] ] = await multicall(heroABI, calls)
    return {
      id: tokenId,
      race: trait.race,
      attribute: trait.attribute,
      level: trait.level,
      life: trait.life,
      active: trait.active
    }
  } else {
    const [ [trait] ] = await multicall(warriorABI, calls)
    return {
      id: tokenId,
      race: trait.race,
      attribute: trait.attribute,
      power: trait.power.toNumber(),
      life: trait.life,
      active: trait.active
    }
  }
}

export default fetchUserHeros
