/* eslint-disable jsx-a11y/anchor-is-valid */
import { useWeb3React } from '@web3-react/core'
import Page, { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import { parseUnits, formatEther } from '@ethersproject/units'
import { Button, Text, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { getContractHandler } from 'hooks/ethereum'
import { AbiConfig, Constants } from 'hooks/WolfConfig'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCurrentBlock } from 'state/block/hooks'
import { MaxUint256 } from '@ethersproject/constants'

import { simpleRpcProvider } from 'utils/providers'
import useSWR from 'swr'

const StyledPage = styled(Page)`
  background-color: #060818;
  width: 100%;
`

const StyledFlex = styled(Flex)`
  justify-content: center;
  width: 100%;
`

const StyledDiv = styled.div`
  display: table;
  margin: 0 auto;
  width: 80%;
  border: 1px solid rgb(30, 39, 64);
  border-radius: 16px;
  margin-top: 50px;
`

const StyledDiv1 = styled.div`
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: bold;
  font-family: ExtraBold;
  padding-left: 24px;
  line-height: 56px;
  height: 56px;
`

const StyledDiv2 = styled.div`
  background-color: rgb(30, 39, 64);
  height: 1px;
  margin: 0px auto 32px;
  width: 100%;
`
const StyledDiv3 = styled.div`
  padding: 0px 0px 24px 0px;
  min-height: 72px;
`
const StyledDiv4 = styled.div`
  padding: 0px 0px 24px 0px;
  min-height: 130px;
`

const StyledDivii = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
const StyledDiviii = styled.div`
  min-width: 170px;
`

const StyledDiviiii = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10px;
`

const StyledMy = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;

  margin: 0 auto;
`

const StyledMyLeft = styled.div`
  min-width: auto;
  position: relative;
  border: 1px solid rgb(30, 39, 64);
  border-radius: 16px;
  margin-top: 24px;
  flex: 1 1 0%;
`

const USDTText = styled(Text)`
  background: -webkit-linear-gradient(#ff6b6b, #feca57, #1abc9c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledButton = styled(Button)`
  background-image: url('/images/raidx/home/enter.png');
  background-size: cover;
  width: 100%;
`
const LP: React.FC = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { fetchWithCatchTxError } = useCatchTxError()
  const [tvl, setTvl] = useState('0')
  const [mylp, setMylp] = useState('0')
  const [myStake, setMyStake] = useState('0')
  const [totalLP, setTotalLp] = useState('0')
  const [rewardHistory, setRewardHistory] = useState('0')
  const [reward, setReward] = useState('0')
  const [paddingUsdt, setPaddingUsdt] = useState('0')
  const { isMobile } = useMatchBreakpoints()
  const [approveLp, setApproveLp] = useState(0)
  const [isLoadding, setIsLoadding] = useState(false)
  const { toastSuccess, toastError } = useToast()

  const { status, data, mutate } = useSWR([account, 'bnbBalance'], async () => {
    return simpleRpcProvider.getBalance(account)
  })

  const currentBlock = useCurrentBlock()
  const queryLPStakeInfo = async () => {
    try {
      const BRX = await getContractHandler('BRX')
      const lpREDMINE = await getContractHandler('BRX_REDMINE')

      if (!BRX) return

      const bal = await BRX.balanceOf('0x7f41789f089308783c21865a19d287fdc49248ca')

      const balan = await simpleRpcProvider.getBalance(Constants.Contract.BRX_REDMINE)

      setTvl(parseFloat(formatEther(bal)).toFixed(5))
      setTotalLp(parseFloat(formatEther(balan)).toFixed(5))
    } catch (e: any) {}
  }

  useEffect(() => {
    if (account) {
      queryLPStakeInfo()
    }
  }, [account, Math.floor(currentBlock / 3)])

  const rewardToSale = async () => {
    try {
      setIsLoadding(true)
      const lpREDMINE = await getContractHandler('BRX_REDMINE')

      if (!lpREDMINE) return

      const approveLpS = await lpREDMINE.pictest()

      toastSuccess('Successfully!')
      setIsLoadding(false)
    } catch (e: any) {
      setIsLoadding(false)
      toastError(e?.message)
    }
  }

  const rewardLP = async () => {
    try {
      setIsLoadding(true)

      const lpREDMINE = await getContractHandler('BRX_REDMINE')
      if (!lpREDMINE) return
      await lpREDMINE.reward()
      toastSuccess('Successfully  !')

      setIsLoadding(false)
    } catch (e: any) {
      setIsLoadding(false)
      toastError(e?.message)
    }
  }

  const rewardLP1 = async () => {
    try {
      setIsLoadding(true)

      const lpREDMINE = await getContractHandler('BRX_REDMINE')
      if (!lpREDMINE) return
      await lpREDMINE.rewardMore(10)
      toastSuccess('Successfully  !')

      setIsLoadding(false)
    } catch (e: any) {
      setIsLoadding(false)
      toastError(e?.message)
    }
  }

  const rewardLP2 = async () => {
    try {
      setIsLoadding(true)

      const lpREDMINE = await getContractHandler('BRX_REDMINE')
      if (!lpREDMINE) return
      await lpREDMINE.rewardMore(20)
      toastSuccess('Successfully  !')

      setIsLoadding(false)
    } catch (e: any) {
      setIsLoadding(false)
      toastError(e?.message)
    }
  }

  return (
    <>
      <StyledPage>
        <StyledFlex mt={isMobile ? 80 : 50}>
          <USDTText ml={10} fontSize={isMobile ? '18px' : '25px'}>
            LP分红
          </USDTText>
        </StyledFlex>
        <StyledDiv>
          <StyledDiv1>待分红信息</StyledDiv1>
          <StyledDiv2></StyledDiv2>
          <StyledDiv3>
            <StyledDivii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>路由合约-待兑换PIDAO数量</Text>
                <Text textAlign={'center'}> {tvl}</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>分红合约待分红数量</Text>
                <Text textAlign={'center'}>{totalLP}</Text>
              </StyledDiviii>
            </StyledDivii>
          </StyledDiv3>
        </StyledDiv>

        <StyledMy>
          <StyledMyLeft>
            <StyledDiv1>执行ETH到分红合约</StyledDiv1>

            <StyledDiv2></StyledDiv2>
            <StyledDiv4>
              <StyledDivii>
                <StyledDiviii style={{ marginTop: '24px' }}>
                  <StyledDiviiii>
                    <Button disabled={isLoadding} onClick={rewardToSale}>
                      {'执行'}
                    </Button>
                  </StyledDiviiii>
                </StyledDiviii>
              </StyledDivii>
            </StyledDiv4>
          </StyledMyLeft>
          <StyledMyLeft>
            <StyledDiv1>手动执行LP分红</StyledDiv1>
            <StyledDiv2></StyledDiv2>
            <StyledDiv4>
              <StyledDivii>
                <StyledDiviii style={{ marginTop: '24px' }}>
                  <StyledDiviiii>
                    <Button disabled={isLoadding} variant={'secondary'} ml={20} onClick={rewardLP}>
                      执行
                    </Button>
                    <Button disabled={isLoadding} variant={'secondary'} ml={20} onClick={rewardLP1}>
                      执行10次
                    </Button>
                    <Button disabled={isLoadding} variant={'secondary'} ml={20} onClick={rewardLP2}>
                      执行20次
                    </Button>
                  </StyledDiviiii>
                </StyledDiviii>
              </StyledDivii>
            </StyledDiv4>
          </StyledMyLeft>
        </StyledMy>
      </StyledPage>
    </>
  )
}

export default LP
