/* eslint-disable jsx-a11y/anchor-is-valid */
import { useWeb3React } from '@web3-react/core'
import Page, { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import React, { useEffect, useState, ChangeEvent } from 'react'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import { parseUnits, formatEther, parseEther, formatUnits } from '@ethersproject/units'
import { Button, Text, Flex, useMatchBreakpoints, Input, ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { getContractHandler } from 'hooks/ethereum'
import { AbiConfig, Constants } from 'hooks/WolfConfig'
import { getTokenPrice } from 'hooks/tokenPrice'

import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCurrentBlock } from 'state/block/hooks'
import { MaxUint256 } from '@ethersproject/constants'
import Heart from './common/heart'
import Countdown from './common/Times'
import CopyAddress from '../components/Menu/UserMenu/CopyAddress'
import { parse } from 'querystring'
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
const stake: React.FC = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { fetchWithCatchTxError } = useCatchTxError()
  const [tvl, setTvl] = useState('0')
  const [mylp, setMylp] = useState('0')
  const [myStake, setMyStake] = useState('0')
  const [price, setPrice] = useState(0)
  const [totalLP, setTotalLp] = useState('0')
  const [rewardHistory, setRewardHistory] = useState('0')
  const [reward, setReward] = useState('0')
  const [paddingUsdt, setPaddingUsdt] = useState('0')
  const { isMobile } = useMatchBreakpoints()
  const [approveLp, setApproveLp] = useState(0)
  const [isLoadding, setIsLoadding] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const currentBlock = useCurrentBlock()
  const [query, setQuery] = useState('')
  const [totalData, setTotalData] = useState<any>(null)
  const [myData, setMyData] = useState<any[]>([])
  const [piqzAccount, setPiqzAccount] = useState<any>(null)

  const [index, setIndex] = useState(0)

  const handleClick = (newIndex) => setIndex(newIndex)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setQuery(value)
  }

  const getPageQuery = () => parse(window.location.href.split('?')[1])

  const locationQuery = getPageQuery()
  if (locationQuery && locationQuery.invite) {
    // 读取base64字符串
    let buffer = Buffer.from(locationQuery.invite.toString(), 'base64')

    console.log('invite_addressbuffer', buffer)
    // 进行解码
    localStorage.setItem('invite_address#pidao', buffer.toString())
  }

  let invateLink = 'https://pidaocore.com/stake?invite='

  if (account) {
    // 对字符串进行base64编码
    let buffer = Buffer.from(account)

    invateLink += buffer.toString('base64')
  }

  const queryLPStakeInfo = async () => {
    //查询LP信息  Constants.Contract.NEWGODZ
    const RENMINE = await getContractHandler('RENMINE')
    const VAULT = await getContractHandler('VAULT')

    const approvePidao = await RENMINE.allowance(account, Constants.Contract.VAULT)

    //lp数量
    const mylps = await RENMINE.balanceOf(account)
    setApproveLp(approvePidao)
    setMylp(parseFloat(formatEther(mylps)).toFixed(2))

    const totalLPS = await RENMINE.balanceOf('0x06801Ec986BD819de86FFE8903c90a8D19b79b8a')
    const price = await VAULT.getPrice()
    console.log('totalLPS', formatEther(totalLPS))

    console.log('price', parseFloat(formatUnits(price, 6)))

    setTvl((parseFloat(formatEther(totalLPS)) * 2 * parseFloat(formatUnits(price, 6))).toString())
  }

  const queryCentDataInfo = async () => {
    //查询后台数据
  }

  const queryLPPrice = async () => {
    const pri = await getTokenPrice()
    setPrice(pri)
  }

  useEffect(() => {
    if (account) {
      queryLPPrice()
      queryLPStakeInfo()
      queryCentDataInfo()
    }
  }, [account, Math.floor(currentBlock / 5)])

  const stakeLP = async () => {
    try {
      setIsLoadding(true)
      const pidao = await getContractHandler('RENMINE')
      const VAULT = await getContractHandler('VAULT')

      const myPidao = await pidao.balanceOf(account)

      const approvePidao = await pidao.allowance(account, Constants.Contract.VAULT)
      if (parseFloat(formatEther(approvePidao)) <= parseFloat(formatEther(myPidao))) {
        const approve = await pidao.approve(Constants.Contract.VAULT, MaxUint256)
        setApproveLp(approve)
      }

      if (!query || Number(query) == 0) {
        toastError('Amount is zero！')
        return
      }

      if (parseFloat(formatEther(myPidao)) < Number(query)) {
        toastError('Insufficient  RENMINE balance')
        return
      }

      let inviteAddress = localStorage.getItem('invite_address#pidao')
      if (!inviteAddress) {
        inviteAddress = '0x0000000000000000000000000000000000000000'
      }

      console.log('input:', Constants.Contract.RENMINE, inviteAddress, parseEther(query), index)

      await VAULT.deposit(Constants.Contract.RENMINE, inviteAddress, parseEther(query), index)
      toastSuccess('Successfully stake!')
      setIsLoadding(false)
    } catch (e: any) {
      setIsLoadding(false)
      toastError(e?.message)
      console.error(e?.message)
    }
  }

  const rewardLP = async () => {
    try {
      setIsLoadding(true)
      toastError('Its not time to receive rewards！')
      /*   const VAULT = await getContractHandler('VAULT')

      await VAULT.withdraw()
      toastSuccess('Successfully Gain Rewards!')
 */
      setIsLoadding(false)
    } catch (e: any) {
      setIsLoadding(false)
      toastError(e?.message)
    }
  }

  return (
    <>
      {/* 心跳监控 */}
      <Heart />
      <StyledPage>
        <StyledFlex mt={isMobile ? 80 : 50}>
          <Text fontSize={isMobile ? '18px' : '25px'}> Staking RENMINE to Earn </Text>
          <USDTText ml={10} fontSize={isMobile ? '18px' : '25px'}>
            PIQZ
          </USDTText>
        </StyledFlex>
        <StyledFlex mt={isMobile ? 80 : 50}>
          <Text>{t('NEXT REWARD TIME:')}</Text>
          <Text>
            <Countdown />
          </Text>
        </StyledFlex>

        <StyledDiv>
          <StyledDiv1>RENMINE FOR ETH</StyledDiv1>
          <StyledDiv2></StyledDiv2>
          <StyledDiv3>
            <StyledDivii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>TVL</Text>
                <Text textAlign={'center'}>${tvl}</Text>
              </StyledDiviii>

              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>APR</Text>
                <Text textAlign={'center'}>9953.33%</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Total POWER')}</Text>
                <Text textAlign={'center'}>{totalData?.power_number ? totalData?.power_number : 0}</Text>
              </StyledDiviii>

              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>My Staked</Text>
                <Text textAlign={'center'}>
                  {myData
                    ?.filter((student) => student?.status == 1)
                    .reduce((total, student) => total + student.stakeNumber, 0)}

                  {!myData && 0}
                </Text>
              </StyledDiviii>
            </StyledDivii>
          </StyledDiv3>
        </StyledDiv>

        <StyledMy>
          <StyledMyLeft>
            <StyledDiv1>{t('Stake')}</StyledDiv1>

            <StyledDiv2></StyledDiv2>
            <StyledDiv4>
              <StyledDiviii>
                <ButtonMenu
                  marginLeft={isMobile ? '0px' : '30px'}
                  activeIndex={index}
                  onItemClick={handleClick}
                  scale="sm"
                  variant="subtle"
                >
                  <ButtonMenuItem>{t('90 days')}</ButtonMenuItem>
                  <ButtonMenuItem>{t('180 days')}</ButtonMenuItem>
                  <ButtonMenuItem>{t('360 days')}</ButtonMenuItem>
                  <ButtonMenuItem>{t('720 days')}</ButtonMenuItem>
                </ButtonMenu>
              </StyledDiviii>
              <StyledDivii>
                <StyledDiviii style={{ marginTop: '24px' }}>
                  {/*  <Text textAlign={'center'}> RENMINE</Text> */}

                  <Text textAlign={'center'}>RENMINE: {mylp}</Text>
                  <Input placeholder={t('Stake Amount')} onChange={handleChange} value={query} />
                  <StyledDiviiii>
                    <Button disabled={isLoadding} onClick={stakeLP}>
                      {approveLp > 0 ? t('Stake') : t('Approve')}
                    </Button>
                  </StyledDiviiii>
                </StyledDiviii>
              </StyledDivii>
            </StyledDiv4>
          </StyledMyLeft>
          <StyledMyLeft>
            <StyledDiv1>{t('Rewards')}</StyledDiv1>
            <StyledDiv2></StyledDiv2>
            <StyledDiv4>
              <StyledDivii>
                <StyledDiviii style={{ marginTop: '24px' }}>
                  <Text textAlign={'center'}> My POWER</Text>
                  <Text textAlign={'center'}>
                    {myData
                      ?.filter((student) => student?.status == 1)
                      .reduce((total, student) => total + student.tokenNumber, 0)}
                    {!myData && 0}
                  </Text>
                </StyledDiviii>
                <StyledDiviii style={{ marginTop: '24px' }}>
                  <Text textAlign={'center'}> Unclaimed</Text>
                  <Text textAlign={'center'}> {piqzAccount?.normalBalance ? piqzAccount?.normalBalance : 0} PIQZ</Text>
                  <StyledDiviiii>
                    <Button disabled={isLoadding} variant={'secondary'} ml={20} onClick={rewardLP}>
                      Reward
                    </Button>
                  </StyledDiviiii>
                </StyledDiviii>
                {/*   <StyledDiviii style={{ marginTop: '24px' }}>
                  <Text textAlign={'center'}>-</Text>
                  <Text textAlign={'center'}>${rewardHistory}</Text>
                  <StyledDiviiii>
                    <Button disabled={isLoadding} variant={'secondary'} ml={20} onClick={removeLP}>
                      Remove Stake
                    </Button>
                  </StyledDiviiii>
                </StyledDiviii> */}
              </StyledDivii>
            </StyledDiv4>
          </StyledMyLeft>
        </StyledMy>

        <StyledDiv>
          <StyledDiv1>Invite</StyledDiv1>
          <StyledDiv2></StyledDiv2>
          <StyledDiv3>
            <StyledDivii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Invite Link')}</Text>
                <CopyAddress account={invateLink} mb="24px" />
              </StyledDiviii>

              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Invite Number')} </Text>
                <Text textAlign={'center'}>
                  {myData
                    ?.filter(
                      (student) =>
                        student?.status == 1 &&
                        (student?.coin == 'POWER_1' || student?.coin == 'POWER_2' || student?.coin == 'POWER_3'),
                    )
                    .reduce((total, student) => total + 1, 0)}
                  {!myData && 0}
                </Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Invite Power')}</Text>
                <Text textAlign={'center'}>
                  {myData &&
                    myData
                      ?.filter(
                        (student) =>
                          student?.status == 1 &&
                          (student?.coin == 'POWER_1' || student?.coin == 'POWER_2' || student?.coin == 'POWER_3'),
                      )
                      .reduce((total, student) => total + student.tokenNumber, 0)}

                  {!myData && 0}
                </Text>
              </StyledDiviii>
            </StyledDivii>
          </StyledDiv3>
        </StyledDiv>
      </StyledPage>
    </>
  )
}

export default stake
