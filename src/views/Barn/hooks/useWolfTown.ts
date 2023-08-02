import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useWtBarnContract, 
  useWtAnimalContract, 
  useHeroContract,
  useErc721CollectionContract
} from 'hooks/useContract'
import useLastUpdated from 'hooks/useLastUpdated'
import { fetchUserAnimalsAsync } from 'state/wolfTown'
import { estimateGas, callWithEstimateGas } from 'utils/calls/estimateGas'

export const useIsAnimalApprovedAll = (erc721Address: string, spenderAddress: string) => {
  const { account } = useWeb3React()
  const [approved, setApproved] = useState(false)
  const {reader: animalContract} = useErc721CollectionContract(erc721Address)
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const fetch = async () => {
      try {
        const isApprovedForAll = await animalContract.isApprovedForAll(account, spenderAddress)
        if (isApprovedForAll) {
          setApproved(true)
        }
      } catch (e) {
        console.error(e)
      }
    }
    if (account) {
      fetch()
    }
  }, [account, spenderAddress, lastUpdated])

  return { approved, setLastUpdated }
}

export const useAnimalApproveAll = (erc721Address: string) => {
  const { account } = useWeb3React()
  const { signer } = useErc721CollectionContract(erc721Address)
  const handleApprove = useCallback(
    async (spenderAddress: string) => {
      return signer.setApprovalForAll(spenderAddress, true, { from: account })
    },
    [account],
  )
  return { onApprove: handleApprove }
}

export const useStakeMany = () => {
  const { account } = useWeb3React()
  const contract = useWtBarnContract()

  const handleStake = useCallback(
    async (ids: number[]) => {
      // return contract.stakeMany(ids, { from: account })
      return callWithEstimateGas(contract, "stakeMany", [ ids ], {}, 2000)
    },
    [account, contract],
  )

  return { onStakeMany: handleStake }
}

// export const useStakeManyForWool = () => {
//   const { account } = useWeb3React()
//   const contract = useWtBarnContract()
//   const handleStake = useCallback(
//     async (ids: number[]) => {
//       return contract.stakeManyForWTWool(ids)
//     },
//     [account, contract],
//   )

//   return { onStakeManyForWool: handleStake }
// }

// export const useStakeManyWovies = () => {
//   const { account } = useWeb3React()
//   const contract = useWtBarnContract()

//   const handleStake = useCallback(
//     async (ids: number[]) => {
//       return contract.stakeMany(ids, { from: account })
//     },
//     [account, contract],
//   )

//   return { onStakeManyWovies: handleStake }
// }

export const useUnstakeMany = () => {
  const { account } = useWeb3React()
  const contract = useWtBarnContract()

  const handleTransaction = useCallback(
    async (ids: number[]) => {
      // return contract.unstakeMany(ids, { from: account })
      return callWithEstimateGas(contract, "unstakeMany", [ ids ], {}, 2000)
    },
    [account, contract],
  )

  return { onUnstakeMany: handleTransaction }
}

export const useClaimMany = () => {
  const { account } = useWeb3React()
  const contract = useWtBarnContract()
  const handleTransaction = useCallback(
    async (ids: number[]) => {
      if (ids.length > 0) {
        // const gasLimit = await estimateGas(contract, "claimMany", [ ids ])
        // return contract.claimMany(ids, { from: account, gasLimit })

        return callWithEstimateGas(contract, "claimMany", [ ids ], {}, 2000)
      }
      return null
    },
    [account, contract],
  )

  return { onClaimMany: handleTransaction }
}
