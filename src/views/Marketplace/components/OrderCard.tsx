import BigNumber from 'bignumber.js'
import { Flex, Button, CardBody, Image, Text, useModal, useMatchBreakpoints, Skeleton } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'
import useCatchTxError from 'hooks/useCatchTxError'
import useToast from 'hooks/useToast'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Hero, NftOrder, NftTrait } from 'state/types'
import styled from 'styled-components'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { getHeroAddress, getWarriorAddress } from 'utils/addressHelpers'
import { RAID_HERO_IMAGE_BASE_URL } from 'config'
import { useCancelOrder } from '../hooks'
import { StyledButtonBuy, StyledButtonCancel } from '../styles'
import ShowModal from './ShowModal'
import ListModal from './ListModal'

interface OrderCardProps {
  order: NftOrder
}

const StyledCardBody = styled(CardBody)<{ selected?: boolean }>`
  // position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  // background-image: url('/images/animal-frame.png'); // 241 x 383
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  justify-content: center;
  // height: 400px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 188px;
    // height: 350px;
  }
`

const ImageButtion = styled(Button)`
  background-image: url('/images/wt/btn-bg.png'); // 247 x 100
  border-radius: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 0px;
  font-size: 16px;
  width: 137px;
  height: 50px;
  &:disabled {
    background-color: transparent;
  }
`

const AttrContainer = styled.div`
  position: absolute;
  top: 20px;
`

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const price = getFullDisplayBalance(new BigNumber(order.price || 0), 18)
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess, toastError } = useToast()
  const { onCancel } = useCancelOrder()
  const [pendingTx, setPendingTx] = useState(false)

  const itemType = order.nftAddr === getHeroAddress() ? 'Hero' : 'Warrior'

  const getImage = () => {
    var date = new Date()
    var sign2 = ':'
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1 // 月
    var day = date.getDate() // 日
    var hour = date.getHours() // 时
    var minutes = Math.round(date.getMinutes() / 4) // 分
    var times = year + ':' + month + ':' + day + ':' + hour + ':' + minutes + ''

    if (order.nftAddr === getHeroAddress()) {
      return `${RAID_HERO_IMAGE_BASE_URL}/hero/images/${order.nftId}.png?${times}`
    } else {
      return `${RAID_HERO_IMAGE_BASE_URL}/warrior/images/${order.nftId}.png?${times}`
    }
  }

  const [onPresentShow] = useModal(<ShowModal order={order} />)
  const [onPresentList] = useModal(<ListModal itemType={itemType} order={order} />)

  const handleCancel = async () => {
    setPendingTx(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onCancel(order.id)
    })

    if (receipt?.status) {
      toastSuccess(
        `${t('Canceled')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('You canceled order')}</ToastDescriptionWithTx>,
      )
      // dispatch(fetchUserAnimalsAsync(account))
    }
    setPendingTx(false)
  }

  const showBtnBuy = asPath === '/Marketplace'
  const showBtnCancel = asPath === '/Marketplace#listed'

  return (
    <StyledCardBody p="8px">
      {order ? (
        <Image src={getImage()} alt={`NFT #${order.nftId}`} width={220} height={332} />
      ) : (
        <Skeleton width="220px" height="332px" />
      )}

      <Text color="#fff" fontSize="18px">
        {price} $RAID
      </Text>
      {showBtnBuy && <StyledButtonBuy onClick={onPresentShow}> {t('BUY')}</StyledButtonBuy>}
      {showBtnCancel && (
        <Flex flexDirection="column">
          <ImageButtion onClick={handleCancel} disabled={pendingTx}>
            {' '}
            {t('Cancel')}{' '}
          </ImageButtion>
          <ImageButtion onClick={onPresentList}> {t('Change Price')} </ImageButtion>
        </Flex>
      )}
    </StyledCardBody>
  )
}

export default OrderCard
