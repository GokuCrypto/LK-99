import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useWtBarnContract, useWtAnimalContract } from 'hooks/useContract'
import { estimateGas } from 'utils/calls/estimateGas'

export const useMint = () => {
  const { account } = useWeb3React()
  const contract = useWtAnimalContract()

  const handleMint = useCallback(
    async (count: number) => {
      let txHash
      if (count === 1) {
        const gasLimit = await estimateGas(contract, 'mint', [])
        txHash = await contract.mint({ gasLimit, from: account })
      } else {
        const gasLimit = await estimateGas(contract, 'mintMany', [count])
        txHash = await contract.mintMany(count, { from: account })
      }
      return txHash
    },
    [account, contract],
  )

  return { onMint: handleMint }
}
