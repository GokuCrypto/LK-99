import BigNumber from 'bignumber.js'
import { API_SERVICE_URL } from 'config'
import marketplaceAbi from 'config/abi/marketplace.json'
import wtBarnAbi from 'config/abi/wtBarn.json'
import multicall from 'utils/multicall'
import { getMarketplaceAddress, getWtBarnAddress, getHeroAddress, getWarriorAddress } from 'utils/addressHelpers'

export const fetchOrder = async (id: number) => {
  const call = [
    {
      address: getMarketplaceAddress(),
      name: 'getOrder',
      params: [id],
    },
  ]
  const [order] = await multicall(marketplaceAbi, call)

  return {
    createdAt: order.createdAt.toNumber(),
    id: order.id.toNumber(),
    nftAddr: order.nftAddr,
    nftId: order.nftId.toNumber(),
    owner: order.owner,
    price: order.price.toString(),
    tokenURI: order.tokenURI,
  }
}

export const fetchUserOrders = async (account: string) => {
  const call = [
    {
      address: getMarketplaceAddress(),
      name: 'userOrdersCount',
      params: [account],
    }
  ]
  const [[ordersCount]] = await multicall(marketplaceAbi, call)
  const count = ordersCount.toNumber()
  let orders = {}

  if (count > 0) {
    const calls = Array.from({ length: count }, (_, i) => {
      return {
        address: getMarketplaceAddress(),
        name: 'getUserOrderByIndex',
        params: [account, i],
      }
    })
    const orderArray = await multicall(marketplaceAbi, calls)
    orders = orderArray.reduce((acc, order, i) => {
      const orderMap = acc
      orderMap[order.id] = {
        createdAt: order.createdAt.toNumber(),
        id: order.id.toNumber(),
        nftAddr: order.nftAddr,
        nftId: order.nftId.toNumber(),
        owner: order.owner,
        price: order.price.toString(),
        tokenURI: order.tokenURI,
      }
      return orderMap
    }, {})
  }
  return { ordersCount: count, orders }
}

const fetchAllOrders = async () => {
  const call = [
    {
      address: getMarketplaceAddress(),
      name: 'ordersCount',
      params: [],
    },
    {
      address: getMarketplaceAddress(),
      name: "floorPrices",
      params:[ getHeroAddress() ]
    },
    {
      address: getMarketplaceAddress(),
      name: "floorPrices",
      params:[ getWarriorAddress() ]
    }
  ]
  const [[ordersCount], [ floorPrice ], [ warriorFloorPrice ]] = await multicall(marketplaceAbi, call)

  let count = ordersCount.toNumber()
  let orders = {}

  if (count > 0) {
    const calls = Array.from({ length: count }, (_, i) => {
      return {
        address: getMarketplaceAddress(),
        name: 'getOrderByIndex',
        params: [i],
      }
    })
    const orderArray = await multicall(marketplaceAbi, calls)
    
    // const blacklistedCalls = orderArray.map((order) => {
    //   return {
    //     address: getWtBarnAddress(),
    //     name: "blacklisted",
    //     params: [ order.nftId.toNumber() ]
    //   }
    // })

    // const blacklisted = await multicall(wtBarnAbi, blacklistedCalls)
    // const filteredOrders = orderArray.filter((order, i) => !blacklisted[i][0])
    

    orders = orderArray.reduce((acc, order, i) => {
      const orderMap = acc
      if(!order.blocked) {
        orderMap[order.id] = {
          createdAt: order.createdAt.toNumber(),
          id: order.id.toNumber(),
          nftAddr: order.nftAddr,
          nftId: order.nftId.toNumber(),
          owner: order.owner,
          price: order.price.toString(),
          tokenURI: order.tokenURI,
        }
      }
      return orderMap
    }, {})


    count = Object.keys(orders).length
  }

  return { ordersCount: count, orders, floorPrice: floorPrice.toString(), warriorFloorPrice: warriorFloorPrice.toString()  }
}

export default fetchAllOrders
