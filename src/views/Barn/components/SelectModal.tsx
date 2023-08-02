import { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import {
  Text,
  Flex,
  InjectedModalProps,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBackButton,
  ModalCloseButton,
  ModalBody,
  Button,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useGetUserAnimals, useGetStakedAnimals } from 'state/wolfTown/hooks'
import { useGetUserHeros } from 'state/raid/hooks'
import { fetchUserAnimalsAsync } from 'state/wolfTown'
import { getWtBarnAddress, getHeroAddress } from 'utils/addressHelpers'
import {
  useAnimalApproveAll,
  useIsAnimalApprovedAll,
  // useStakeManyForMilk,
  // useStakeManyForWool,
  // useStakeManyWovies,
  useStakeMany,
  useUnstakeMany
} from '../hooks/useWolfTown'
import AnimalList from './AnimalList'
import { StakeType } from '../types'

interface ModalProps extends InjectedModalProps {
  stakeType: StakeType
  hideButton?: boolean
}

const Footer = styled.div`
  width: 100%;
  margin-top: 12px;
  text-align: center;
`

const StyledModalHeader = styled(ModalHeader)`
  border: 0;
  padding: 0;
  font-size: 20px;
  height: 60px;
`

const StyledCloseButton = styled(Button)`
  background-image: url('/images/wt/x.png');
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 0;
  background-color: transparent;
  margin-right: 10px;
  margin-top: 10px;
`

const StyledModalContainer = styled(ModalContainer)`
  border-radius: 0px;
  background-image: url('/images/wt/bg-modal.png'); // 1465 x 1119
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 810px;
  height: 618px;
  padding: 0;
  border: none;
  min-width: 100px;
  max-width: calc(100% - 10px);
  max-height: 100%;
`

const StyledModalTitle = styled(ModalTitle)`
  margin-top: 30px;
  margin-left: 50px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`

const StyledModalBody = styled(ModalBody)`
  padding: 24px;
  overflow-y: auto;
  margin-top: 30px;
  height: 450px;
`

// const ScrollableContainer = styled(Flex)`
//   flex-direction: column;
//   max-height: 400px;
//   ${({ theme }) => theme.mediaQueries.sm} {
//     max-height: none;
//   }
// `

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
  &:disabled {
    background-color: transparent;
  }
`

const SelectModal: React.FC<ModalProps> = ({ onDismiss, stakeType, hideButton = false }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { asPath: fullpath } = useRouter()
  const { toastSuccess, toastError } = useToast()

  const { heros, userDataLoaded } = useGetUserHeros(account)
  const { stakedHeros, userDataLoaded: stakedDataLoaded } = useGetStakedAnimals()

  const getAnimals = () => {
    if (stakeType === StakeType.STAKE_FOR_WOOL) {
      return heros
    }
    if(stakeType === StakeType.UNSTAKE_FOR_WOOL) {
      return stakedHeros
    }
    return []
  }

  const checkLoaded = () => {
    if (stakeType === StakeType.STAKE_FOR_WOOL) {
      return userDataLoaded
    }
    if (stakeType === StakeType.UNSTAKE_FOR_WOOL) {
      return stakedDataLoaded
    }

    return false
  }

  const isStakeForWool = stakeType === StakeType.STAKE_FOR_WOOL
  // const isStakeForMilk = stakeType === StakeType.STAKE_FOR_MILK
  // const isStakeWolf = stakeType === StakeType.STAKE_WOVIES

  const isUntakeForWool = stakeType === StakeType.UNSTAKE_FOR_WOOL
  // const isUntakeForMilk = stakeType === StakeType.UNSTAKE_FOR_MILK
  // const isUntakeWolf = stakeType === StakeType.UNSTAKE_WOVIES

  const { approved: isApprovedForAll, setLastUpdated } = useIsAnimalApprovedAll(getHeroAddress(), getWtBarnAddress())

  const { onApprove } = useAnimalApproveAll(getHeroAddress())
  // const { onStakeManyForMilk } = useStakeManyForMilk()
  // const { onStakeManyForWool } = useStakeManyForWool()
  // const { onStakeManyWovies } = useStakeManyWovies()
  const { onUnstakeMany } = useUnstakeMany()
  const { onStakeMany } = useStakeMany()

  const { fetchWithCatchTxError } = useCatchTxError()

  const handleApprove = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onApprove(getWtBarnAddress())
    })
    if (receipt?.status) {
      setLastUpdated()
      toastSuccess(
        `${t('Approved')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You have approved your heros')}
        </ToastDescriptionWithTx>,
      )
    }
  }

  const [pendingTx, setPendingTx] = useState(false)

  const handleStakeMany = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onStakeMany(selectedIds)
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Staked')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You staked your heros')}
        </ToastDescriptionWithTx>,
      )
      dispatch(fetchUserAnimalsAsync(account))
    }
  }

  // const handleStakeManyForWool = async () => {
  //   const receipt = await fetchWithCatchTxError(() => {
  //     return onStakeManyForWool(selectedIds)
  //   })
  //   if (receipt?.status) {
  //     toastSuccess(
  //       `${t('Staked')}!`,
  //       <ToastDescriptionWithTx txHash={receipt.transactionHash}>
  //         {t('You staked your sheeps for WOOL')}
  //       </ToastDescriptionWithTx>,
  //     )
  //     dispatch(fetchUserAnimalsAsync(account))
  //   }
  // }

  // const handleStakeWovies = async () => {
  //   const receipt = await fetchWithCatchTxError(() => {
  //     return onStakeManyWovies(selectedIds)
  //   })
  //   if (receipt?.status) {
  //     toastSuccess(
  //       `${t('Staked')}!`,
  //       <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('You staked wovies')}</ToastDescriptionWithTx>,
  //     )
  //     dispatch(fetchUserAnimalsAsync(account))
  //   }
  // }

  // const handleApproveAndStakeForMilk = async () => {
  //   setPendingTx(true)
  //   if (!isApprovedForAll) {
  //     await handleApprove()
  //   }
  //   await handleStakeManyForMilk()

  //   setPendingTx(false)
  // }

  const handleApproveAndStake = async () => {
    setPendingTx(true)
    if (!isApprovedForAll) {
      await handleApprove()
    }
    await handleStakeMany()

    setPendingTx(false)
  }

  // const handleApproveAndStakeWovies = async () => {
  //   setPendingTx(true)
  //   if (!isApprovedForAll) {
  //     await handleApprove()
  //   }
  //   await handleStakeWovies()

  //   setPendingTx(false)
  // }


  const handleUnstake = async() => {
    const receipt = await fetchWithCatchTxError(() => {
      return onUnstakeMany(selectedIds)
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Unstaked')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You unstaked your heros')}
        </ToastDescriptionWithTx>,
      )
      // dispatch(fetchUserAnimalsAsync(account))
    }
  }

  // const handleUnstakeWovies = async() => {
  //   const receipt = await fetchWithCatchTxError(() => {
  //     return onUnstakeMany(selectedIds)
  //   })
  //   if (receipt?.status) {
  //     toastSuccess(
  //       `${t('Unstaked')}!`,
  //       <ToastDescriptionWithTx txHash={receipt.transactionHash}>
  //         {t('You unstaked your wovies')}
  //       </ToastDescriptionWithTx>,
  //     )
  //     // dispatch(fetchUserAnimalsAsync(account))
  //   }
  // }

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      setSelectedIds(heros.map((a) => a.id).slice(0, 100))
    } else {
      setSelectedIds([])
    }
  }

  const handleItemChecked = (id: number) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds(selectedIds.concat(id))
    }
  }

  const handleItemUncheck = (id: number) => {
    setSelectedIds(selectedIds.filter((v) => v !== id))
  }

  return (
    <StyledModalContainer minWidth="820px">
      <StyledModalHeader>
        <StyledModalTitle justifyContent="center"> { t('Heroes') } </StyledModalTitle>
        <StyledCloseButton onClick={onDismiss} />
      </StyledModalHeader>
      <StyledModalBody>
        {checkLoaded() ? (
          getAnimals().length > 0 ? (
            <AnimalList
              animals={getAnimals()}
              account={account}
              userDataLoaded={userDataLoaded}
              onChecked={handleItemChecked}
              onUncheck={handleItemUncheck}
              selectedIds={selectedIds}
            />
          ) : (
            <Text textAlign="center"> {t('You have no hero')}</Text>
          )
        ) : (
          <Text textAlign="center">{t('Loading...')}</Text>
        )}
      </StyledModalBody>
      <Footer>
        {isStakeForWool && !hideButton && (
          <ImageButtion onClick={handleApproveAndStake} disabled={pendingTx}>
            {t('Stake')}
          </ImageButtion>
        )}

        {isUntakeForWool && !hideButton && (
          <ImageButtion onClick={handleUnstake} disabled={pendingTx}>
            {t('Unstake')}
          </ImageButtion>
        )}

      </Footer>
    </StyledModalContainer>
  )
}

export default SelectModal
