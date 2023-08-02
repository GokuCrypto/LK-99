import { BigNumber } from '@ethersproject/bignumber'
import { API_SERVICE_URL } from 'config'
import wtAnimalABI from 'config/abi/wtAnimal.json'
import wtBarnABI from 'config/abi/wtBarn.json'
import wtBarnStakeOfABI from 'config/abi/wtBarnStakeOf.json'
import multicall, { multicallv2 } from 'utils/multicall'
import { getWtAnimalAddress, getWtBarnAddress } from 'utils/addressHelpers'

export const fetchAnimals = async (ids: number[]) => {
  const groupSize = ids.length / 100 + (ids.length % 100 === 0 ? 0 : 1)

  const groupedAnimals = await Promise.all(
    Array.from({ length: groupSize }, async (_, i) => {
      const groupIds = ids.slice(i * 100, i * 100 + 100)
        const url = `${API_SERVICE_URL}/animals?ids=${encodeURIComponent(JSON.stringify(groupIds))}`  
    
     const response = await fetch(url)
      const animals = await response.json()
      return animals
    }),
  )
  const traits = groupedAnimals.reduce((acc, group, i) => {
    Object.assign(acc, group)
    return acc
  }, {})
  return ids.map((id) => {
    return {
      id,
      name: traits[id].name,
      isSheep: traits[id].name.includes('Sheep'),
      image: traits[id].image,
      imageSmall: traits[id].imageSmall,
      attributes: traits[id].attributes,
    }
  })
}

const fetchUserAnimals = async (account) => {
  const call = [
    {
      address: getWtAnimalAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]
  const [[balanceOf]] = await multicall(wtAnimalABI, call)
  const count = balanceOf.toNumber()
  const idCalls = Array.from({ length: count }, (_, i) => {
    return {
      address: getWtAnimalAddress(),
      name: 'tokenOfOwnerByIndex',
      params: [account, i],
    }
  })
  const ids = await multicall(wtAnimalABI, idCalls)
  const animals = await fetchAnimals(ids.map((id) => id[0].toNumber()))
  return { balance: count, animals }
}

export const fetchStakedAnimals = async (account) => {

  const call = [
    {
      address: getWtBarnAddress(),
      name: 'getUserStakes',
      params: [ account ],
    }
  ]
  const [ [ ids ] ] = await multicall(wtBarnABI, call)
  const stakedHeros = ids.map((id) => { 
    return { id: id.toNumber() }
  })
  return { balance: stakedHeros.length, stakedHeros }
}

export const fetchTotalEarnings = async (account: string) => {
  const call = [
    {
      address: getWtBarnAddress(),
      name: 'getPendingRewards',
      params: [account],
    }
  ]
  const [ [rewards] ] = await multicall(wtBarnABI, call)
  return rewards.toString()
}

export const fetchStakedEarnings = async (account: string) => {
  const call = [
    {
      address: getWtBarnAddress(),
      name: 'totalStakesOf',
      params: [account],
    },
  ]
  const [[balanceOf]] = await multicall(wtBarnABI, call)
  const count = balanceOf.toNumber()

  const stakeCalls = Array.from({ length: count }, (_, i) => {
    return {
      address: getWtBarnAddress(),
      name: 'stakeOf',
      params: [account, i],
    }
  })
  const stakes = await multicall(wtBarnStakeOfABI, stakeCalls)
  const ids = stakes.map((s) => s[0].tokenId.toNumber())

  const earningsCall = [
    {
      address: getWtBarnAddress(),
      name: 'estimateEarnings',
      params: [ids],
    },
  ]
  const [[_, wools, milks]] = await multicall(wtBarnABI, earningsCall)


  return ids.reduce(
    (acc, id, i) => {
      const earnings = acc
      earnings[id].wool = BigNumber.from(earnings.wool).add(wools[i]).toString() // { wool: wools[i].toString(), milk: milks[i].toString() }
      earnings[id].milk = BigNumber.from(earnings.milk).add(milks[i]).toString() // { wool: wools[i].toString(), milk: milks[i].toString() }
      return earnings
    },
    { },
  )
}

export default fetchUserAnimals
