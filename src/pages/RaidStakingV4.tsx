/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import React, { useCallback, useState } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { Table, Th, Td, Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { ToastDescriptionWithTx } from 'components/Toast'
import { ethers } from 'ethers'
import { getContractHandler } from 'hooks/ethereum'
import useToast from 'hooks/useToast'
import useTokenBalance from 'hooks/useTokenBalance'
import { Constants } from 'hooks/WolfConfig'
import { simpleRpcProvider } from 'utils/providers'

export interface Message {
  address: string
  msg: string
  sig: string
}

const RaidStakingV4 = () => {
  const { t } = useTranslation()
  const [rewardTime, setRewardTime] = useState(15)
  const [rewards, setRewards] = useState<any[]>([])
  const [viewLoad, serViewLoad] = useState(false)

  const [approveOrBuy, setApproveOrBuy] = useState('Approve')

  const findData = async () => {
    const contractss = await getContractHandler('DONATEPLEDEGV3')

    if (!contractss) return false

    for (var i = 0; i < 1000; i++) {
      const res: any = await contractss.droplist(1, i)
      const res2: any = await contractss.getnumberForPool(res, 1)
      console.log('viewval', res, res2)
      rewards.push([
        res,
        res2
          .div(10 ** 9)
          .div(10 ** 9)
          .toNumber(),
      ])
      setRewards(rewards)
    }
  }

  //获取input输入的城市

  return (
    <Page
      style={{
        height: '1000px',
        textAlign: 'center',
      }}
    >
      <Button onClick={findData}>查询</Button>
      <Button
        onClick={() => {
          serViewLoad(!viewLoad)
        }}
      >
        显示
      </Button>

      <Table>
        <thead>
          <tr>
            <Th>block</Th>
            <Th>地址</Th>
            <Th>数量</Th>
          </tr>
        </thead>
        <tbody>
          {rewards?.map((vaa, ii) => (
            <>
              {vaa?.length == 2 && (
                <tr>
                  <Td>{ii}</Td>
                  <Td>{vaa[0]}</Td>
                  <Td>{vaa[1]}</Td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </Page>
  )
}

export default RaidStakingV4
