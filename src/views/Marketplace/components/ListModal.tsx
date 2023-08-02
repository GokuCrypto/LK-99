import BigNumber from 'bignumber.js'
import {
  Button, Flex,
  InjectedModalProps, ModalBody, ModalContainer,
  ModalHeader,
  ModalTitle, Text,
  Skeleton
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import ModalPriceInput from 'components/Modal/ModalPriceInput'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'
import useCatchTxError from 'hooks/useCatchTxError'
import useToast from 'hooks/useToast'
import { useCallback, useState } from 'react'
import { useAppDispatch } from 'state'
import { Hero, NftOrder } from 'state/types'
import { removeAnimal } from 'state/wolfTown'
import styled from 'styled-components'
import { getMarketplaceAddress, getWtAnimalAddress, getHeroAddress, getWarriorAddress } from 'utils/addressHelpers'
import { useAnimalApproveAll, useIsAnimalApprovedAll } from 'views/Barn/hooks/useWolfTown'
import { RAID_HERO_IMAGE_BASE_URL } from 'config'
import { useGetAllOrders } from 'state/marketplace/hooks'
import { useCreateOrder, useChangePrice } from '../hooks'

interface ModalProps extends InjectedModalProps {
  order?: NftOrder
  animal?: Hero
  itemType: "Hero" | "Warrior"
}

const Footer = styled.div`
  width: 100%;
  margin-top: 12px;
  text-align: center;
`

const StyledModalHeader = styled(ModalHeader)`
  border: 0;
  padding: 0;
  font-size: 24px;
  height: 90px;
  margin-left: 20px;
  color: #fff;
  font-weight: bold;
`

const StyledCloseButton = styled(Button)`
  background-image: url('/images/wt/x.png');
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 0;
  background-color: transparent;
  margin-top: 10px;
  margin-right: 10px;
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
  padding: 0;
  overflow-y: auto;
  align-items: center;
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
  &:disabled{
    background-color: transparent;
  }
`

const StyledModalPriceInput = styled(ModalPriceInput)`
  color: #000;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
`

const ListModal: React.FC<ModalProps> = ({ order, itemType, onDismiss, animal }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToast()

  const erc721Address = itemType === "Hero" ? getHeroAddress() : getWarriorAddress()

  const { approved: isApprovedForAll, setLastUpdated } = useIsAnimalApprovedAll(erc721Address, getMarketplaceAddress())
  const { onApprove } = useAnimalApproveAll(erc721Address)
  const { fetchWithCatchTxError } = useCatchTxError()
  const { onCreateOrder } = useCreateOrder()
  const { onChangePrice } = useChangePrice()
  const { floorPrice, warriorFloorPrice } = useGetAllOrders()

  const getImage = () => {
    if(itemType === 'Hero') {
      return `${RAID_HERO_IMAGE_BASE_URL}/hero/images/${order ? order.nftId : animal.id}.png`  
    }
    if(itemType === 'Warrior') {
      return `${RAID_HERO_IMAGE_BASE_URL}/warrior/images/${order ? order.nftId : animal.id}.png`  
    }
    return null
  }
  const handleApprove = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onApprove(getMarketplaceAddress())
    })
    if (receipt?.status) {
      setLastUpdated()
      toastSuccess(
        `${t('Approved')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You have approved your NFT')}
        </ToastDescriptionWithTx>,
      )
      return true
    } else {
      return false
    }
  }

  const [pendingTx, setPendingTx] = useState(false)

  const bnFloorPrice = new BigNumber(floorPrice).shiftedBy(-18)
  const bnWarriorFloorPrice = new BigNumber(warriorFloorPrice).shiftedBy(-18)
  const finalFloorPrice = itemType === "Hero" ? bnFloorPrice : bnWarriorFloorPrice
  const handleList = async () => {
    if(new BigNumber(val).isLessThan(finalFloorPrice)) {
      toastError(t('Error'), t('List price must be greater than floor price'))
      return
    }

    const receipt = await fetchWithCatchTxError(() => {
      return onCreateOrder(erc721Address, animal.id, val)
    })

    if (receipt?.status) {
      toastSuccess(
        `${t('Listed')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You listed your NFT on marketplace')}
        </ToastDescriptionWithTx>,
      )

      dispatch(removeAnimal(animal.id))
      onDismiss?.()
    }
  }

  const handleApproveAndList = async () => {
    setPendingTx(true)
    let approved = isApprovedForAll
    if (!isApprovedForAll) {
      approved = await handleApprove()
    }
    if(approved) {
      await handleList()
    }
    setPendingTx(false)
  }

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const invalidInput = val !== '' && parseFloat(val) > 0



  const handleChangePrice = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onChangePrice(order.id, val)
    })

    if (receipt?.status) {
      toastSuccess(
        `${t('Price Changed')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You relist your NFT')}
        </ToastDescriptionWithTx>,
      )
      // dispatch(removeAnimal(animal.id))
      onDismiss?.()
    }
  }

  return (
    <StyledModalContainer minWidth="820px">
      <StyledModalHeader>
        <ModalTitle justifyContent="center" color="#fff"> List {itemType} </ModalTitle>
        <StyledCloseButton onClick={onDismiss} />
      </StyledModalHeader>
      <StyledModalBody>
        <img src={getImage()} alt="" height="332px" width="220px" />
        <Text mb="10px" color="#fff">
          {itemType}#{animal?.id || order?.nftId}
        </Text>
        <StyledModalPriceInput onChange={handleChange} value={val} symbol="RAID" inputTitle={t('Price')} decimals={10} />
      </StyledModalBody>
      <Footer>
        {
          order ? 
            <ImageButtion onClick={handleChangePrice} disabled={pendingTx || !invalidInput }>
              {t('Change Price')}
            </ImageButtion>
          :
          <ImageButtion onClick={handleApproveAndList} disabled={pendingTx || !invalidInput}>
            {t('List')}
          </ImageButtion>
        }
        
      </Footer>
    </StyledModalContainer>
  )
}

export default ListModal
