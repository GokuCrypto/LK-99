import BigNumber from 'bignumber.js'
import { useCallback, useState, useEffect } from 'react'
import { useAppDispatch } from 'state'
import {
  Button,
  Flex,
  InjectedModalProps,
  ModalBody,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  Text,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'
import useCatchTxError from 'hooks/useCatchTxError'
import { Hero, NftTrait, NftOrder } from 'state/types'
import styled from 'styled-components'
import { useFetchOrder, useGetItems, useGetOrder } from 'state/marketplace/hooks'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { getHeroAddress, getWarriorAddress } from 'utils/addressHelpers'
import { RAID_HERO_IMAGE_BASE_URL } from 'config'
import tokens from 'config/constants/tokens'
import { useBuy, useTokenApprove, useFetchAllowance, useFetchNftTraits } from '../hooks'
import { StyledButtonBuy } from '../styles'
import { getRace, getAttribute } from '../helpers'
import Alert from './Alert'

interface ModalProps extends InjectedModalProps {
  order: NftOrder
  animal?: NftTrait
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
  background-image: url('/images/wt/bg-market-modal.png'); // 1501 x 1093
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 810px;
  height: 618px;
  padding: 0;
  border: none;
  min-width: 100px;
  max-width: 820px;
`

const StyledModalBody = styled(ModalBody)`
  padding: 24px;
  overflow-y: auto;
  margin-top: 10px;
  height: 450px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

const ImageButtion = styled(Button)`
  background-image: url('/images/btn-bg.png');
  border-radius: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  // min-width: 125px;
  width: 89px;
  height: 37px;
`

const ImageWrapper = styled.div`
  color: #fff;
  padding: 10px;
  text-align: center;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    padding: 10px;
  }
`
const AttrContainer = styled.div`
  color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const AttrText = styled(Text)<{ bgImageUrl?: string }>`
  background-image: ${({ bgImageUrl }) => `url("${bgImageUrl}")` ?? 'transparent'};
  background-size: contain;
  background-repeat: no-repeat;
  padding: 10px;
  color: #fff;
`

const ShowModal: React.FC<ModalProps> = ({ onDismiss, animal, order }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const itemType = order.nftAddr === getHeroAddress() ? 'Hero' : 'Warrior'
  const getImage = () => {
    if (order.nftAddr === getHeroAddress()) {
      return `${RAID_HERO_IMAGE_BASE_URL}/hero/images/${order.nftId}.png`
    } else {
      return `${RAID_HERO_IMAGE_BASE_URL}/warrior/images/${order.nftId}.png`
    }
  }

  const { traits, dataLoaded } = useFetchNftTraits(order.nftAddr, order.nftId)

  const price = getFullDisplayBalance(new BigNumber(order?.price || 0), 18)

  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess, toastError } = useToast()
  const { onBuy } = useBuy()
  const [pendingTx, setPendingTx] = useState(false)

  const { onApprove: onRaidApprove } = useTokenApprove(tokens.raid, order.price)
  const { allowance, setLastUpdated } = useFetchAllowance(account)

  const raidApproved = allowance && new BigNumber(allowance).gte(new BigNumber(price))
  const [viewCard, setViewCard] = useState(false)
  const handleRaidApprove = async () => {
    setPendingTx(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onRaidApprove()
    })
    setPendingTx(false)
    if (receipt?.status) {
      setLastUpdated()
      toastSuccess(
        `${t('Approved')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('You have approved RAID')}</ToastDescriptionWithTx>,
      )

      return true
    }

    return false
  }

  const handleBuy = async () => {
    setPendingTx(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onBuy(order.id, price)
    })

    if (receipt?.status) {
      toastSuccess(
        `${t('Bought')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('You bought Hero')}</ToastDescriptionWithTx>,
      )
      onDismiss()
      // dispatch(fetchUserAnimalsAsync(account))
    }
    setPendingTx(false)
  }

  const handleApproveAndBuy = async () => {
    const approved = await handleRaidApprove()
    if(approved){
      await handleBuy()
    }
  }

  return (
    <StyledModalContainer minWidth="820px">
      {viewCard && (
        <Alert
          onDismiss={(obj) => {
            setViewCard(false)
            if (obj) {
              handleApproveAndBuy()
            }
          }}
        />
      )}
      <StyledModalHeader>
        <ModalTitle justifyContent="center"> {t('')} </ModalTitle>
        <StyledCloseButton onClick={onDismiss} />
      </StyledModalHeader>
      <StyledModalBody>
        <ImageWrapper>
          <img src={getImage()} width={220} height={332} alt="" />
          <Text color="white" fontSize="18px">
            {price} $RAID
          </Text>
        </ImageWrapper>
        <AttrContainer>
          <AttrText>ID: {traits?.id}</AttrText>
          <AttrText>Race: {traits ? getRace(traits?.race) : '--'}</AttrText>
          <AttrText>Attribute: {traits ? getAttribute(traits?.attribute) : '--'}</AttrText>
          {itemType === 'Hero' ? (
            <AttrText>Level: {traits?.level}</AttrText>
          ) : (
            <AttrText>Power: {traits?.power}</AttrText>
          )}
          <AttrText>Life: {traits?.life}</AttrText>
          <AttrText>Active: {!traits?.active ? 'false' : 'true'}</AttrText>
          {/*<AttrText>active: {animal.active}</AttrText>*/}
          <StyledButtonBuy
            mt="20px"
            onClick={
              raidApproved
                ? () => {
                    if (traits?.power) {
                      //战士
                      if (traits?.life < 30) {
                        setViewCard(true)
                      } else {
                        handleApproveAndBuy()
                      }
                    } else {
                      //英雄
                      if (traits?.life < 300) {
                        setViewCard(true)
                      } else {
                        handleApproveAndBuy()
                      }
                    }
                  }
                : handleApproveAndBuy
            }
            disabled={pendingTx}
          >
            {' '}
            {t('Buy')}{' '}
          </StyledButtonBuy>
        </AttrContainer>
      </StyledModalBody>
    </StyledModalContainer>
  )
}

export default ShowModal
