import { ChainId } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'
import { CHAIN_ID } from './constants/networks'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://bscscan.com',
  [ChainId.TESTNET]: 'https://testnet.bscscan.com',
}

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeDataRow.tsx = 15 (40 - Amount sent to burn pool)
export const CAKE_PER_BLOCK = 40
export const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK * BLOCKS_PER_YEAR
export const BASE_URL = 'https://pancakeswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET]
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 250000
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
// export const API_SERVICE_URL = 'https://app.wolftown.world'
const API_SERVICE_ENDPOINTS = {
  [ChainId.MAINNET]: 'https://app.wolftown.world',
  [ChainId.TESTNET]: 'https://app.test.wolftown.world',
}
const API_ENDPOINTS = {
	[ChainId.MAINNET]: 'https://metadata.ancientraid.com',
  [ChainId.TESTNET]: 'http://127.0.0.1:5000',
}
export const API_SERVICE_URL = API_SERVICE_ENDPOINTS[CHAIN_ID]
export const RAID_HERO_IMAGE_BASE_URL = API_ENDPOINTS[CHAIN_ID]
export const API_BASE_URL = API_ENDPOINTS[CHAIN_ID]