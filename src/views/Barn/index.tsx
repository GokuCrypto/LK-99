import BigNumber from 'bignumber.js'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { getFullDisplayBalance, getBalanceAmount } from 'utils/formatBalance'
import { Heading, Button, Text, useModal, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import {
  useFetchStakedAnimals,
  useFetchTotalEarnings,
  useGetTotalEarnings,
  useGetStakedAnimals,
} from 'state/wolfTown/hooks'
import { useGetUserHeros, useFetchUserHeros } from 'state/raid/hooks'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import Page from 'components/Layout/Page'
import SelectModal from './components/SelectModal'
import { useClaimMany } from './hooks/useWolfTown'
import { StakeType } from './types'

const SelectAnimalButton = styled.div`
  cursor: pointer;
`
const ImageWrapper = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 800px;
    height: 510px;
    padding: 150px;
    margin-top: -120px;
    background-image: url('/images/wt/bg-select2.png'); // 1239 x 790
    background-repeat: no-repeat;
    background-size: cover;
  }
`

const RewardContainer = styled(Text)`
  background-image: url('/images/wt/frame-bg.png'); // 1031 x 287
  background-size: contain;
  background-repeat: no-repeat;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: flex-end;

  width: 100%;
  height: 110px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 515px;
    height: 143px;
  }
`

const RewardText = styled(Flex)`
  min-width: 120px;
`

const ImageButtion = styled(Button)`
  background-image: url('/images/wt/btn-bg.png'); // 247 x 100
  border-radius: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 0px;
  font-size: 18px;
  width: 137px;
  height: 50px;
`

const ClaimButtion = styled(Button)`
  background-image: url('/images/wt/btn-claim.png'); // 372 x 147
  border-radius: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 0px;
  font-size: 18px;
  font-weight: bold;
  width: 149px;
  height: 59px;
`

const CLAIM_MAX_ANIMALS = 100
const CLAIM_MIN_TOKENS = 100

const Barn = () => {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const router = useRouter()
  const { account } = useWeb3React()
  const { isMobile } = useMatchBreakpoints()
  useFetchStakedAnimals(account)
  useFetchUserHeros(account)
  useFetchTotalEarnings(account)

  const { stakedHeros } = useGetStakedAnimals()
  const stakedIds = stakedHeros.map((hero) => hero.id)

  

  const earnings = useGetTotalEarnings()

  // console.log("earnings=", earnings)

  const earned = getFullDisplayBalance(new BigNumber(earnings || 0), 18, 4)
  // const milks = getFullDisplayBalance(new BigNumber(earnings?.milk || 0), 18, 2)

  const [onPresentStakeForWool] = useModal(<SelectModal stakeType={StakeType.STAKE_FOR_WOOL} />)
  // const [onPresentStakeForMilk] = useModal(<SelectModal stakeType={StakeType.STAKE_FOR_MILK} />)
  // const [onPresentStakeWolf] = useModal(<SelectModal stakeType={StakeType.STAKE_WOVIES} />)

  const [onPresentUnstakeForWool] = useModal(<SelectModal stakeType={StakeType.UNSTAKE_FOR_WOOL} />)
  // const [onPresentUnstakeForMilk] = useModal(<SelectModal stakeType={StakeType.UNSTAKE_FOR_MILK} />)
  // const [onPresentUnstakeWolf] = useModal(<SelectModal stakeType={StakeType.UNSTAKE_WOVIES} />)

  const [onPresentStakedForWool] = useModal(<SelectModal stakeType={StakeType.UNSTAKE_FOR_WOOL} hideButton />)
  // const [onPresentStakedForMilk] = useModal(<SelectModal stakeType={StakeType.UNSTAKE_FOR_MILK} hideButton />)
  // const [onPresentStakedWolf] = useModal(<SelectModal stakeType={StakeType.UNSTAKE_WOVIES} hideButton />)

  const [pendingTx, setPendingTx] = useState(false)

  const { onClaimMany } = useClaimMany()
  const { fetchWithCatchTxError } = useCatchTxError()
  const handleClaim = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onClaimMany(stakedIds)
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Claimed')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You claimed rewards')}
        </ToastDescriptionWithTx>,
      )
    }
  }

  // const handleClaimRewardsByWolves = async () => {
  //   const receipt = await fetchWithCatchTxError(() => {
  //     return onClaimMany(stakedWolfIds)
  //   })
  //   if (receipt?.status) {
  //     toastSuccess(
  //       `${t('Staked')}!`,
  //       <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('You claimed rewards')}</ToastDescriptionWithTx>,
  //     )
  //   }
  // }

  return (
    <Page>
      <Flex mb="40px" alignItems="center" flexDirection={['column', null, null, 'column']}>
        <RewardContainer mb="10px">
          <RewardText flexDirection="column">
            <Text color="#fff" 
              textAlign="center" 
              fontSize="20px" 
              fontWeight="bold" 
              mr="20px">{earned} $RAID
            </Text>
          </RewardText>
          <ClaimButtion onClick={handleClaim} disabled={pendingTx} mr={ isMobile ? "20px" : "30px"}>
            {t('Claim')}
          </ClaimButtion>
        </RewardContainer>
        <Text mt="25px">
          <img src="/images/wt/phase1.png" alt="Phase 1" width="100px" />
        </Text>
        <ImageWrapper> 
          <Text color="#fff" bold fontSize="20px" mr="50px">{t('Stake for RAID')}</Text>
          <Flex flexDirection="column">
            <ImageButtion mb="5px" onClick={onPresentStakeForWool}> { t('Stake') } </ImageButtion>
            <ImageButtion onClick={onPresentUnstakeForWool}> { t('Unstake') } </ImageButtion>
            <ImageButtion mt="5px" onClick={onPresentStakedForWool}> { t('Show') } </ImageButtion>
          </Flex>
        </ImageWrapper>
      </Flex>
    </Page>
  )
}

export default Barn
