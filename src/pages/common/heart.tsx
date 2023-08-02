/* eslint-disable jsx-a11y/anchor-is-valid */
import { useWeb3React } from '@web3-react/core'

import React, { useEffect, useState } from 'react'

import { useCurrentBlock } from 'state/block/hooks'

const Heart: React.FC = () => {
  const { account } = useWeb3React()

  const currentBlock = useCurrentBlock()

  useEffect(() => {
    if (account) {
    }
  }, [account, Math.floor(currentBlock / 2)])

  return <></>
}

export default Heart
