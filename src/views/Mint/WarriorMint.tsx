import BigNumber from 'bignumber.js'
import React, { useState, useEffect, useMemo, useContext, useRef } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Interface } from '@ethersproject/abi'
import { useWeb3React } from '@web3-react/core'
import { getFullDisplayBalance, getBalanceAmount } from 'utils/formatBalance'
import {
  Heading,
  Button,
  Box,
  Input,
  Text,
  useModal,
  Flex,
  useMatchBreakpoints,
  ModalBody,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  Image,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import erc721Abi from 'config/abi/erc721.json'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import {
  getHeroAddress,
  getHeroMintAddress,
  getWarriorAddress,
  getWarriorMintAddress,
  getBlackCardAddress,
} from 'utils/addressHelpers'
import Page from 'components/Layout/Page'
import {
  useMint,
  useWarriorMint,
  useFetchPrices,
  useFetchWhitelisted,
  useTokenApprove,
  useFetchAllowances,
  useFetchAllowance,
  useFetchWarriorPrices,
  SpendCoin,
} from './hooks'
import MintedWarriorModal from './MintedWarriorModal'

const MintCard = styled.div`
  background-image: url('/images/raid/swap/dragon.png'); // 1630x1244
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 350px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 652px;
    height: 498px;
  }
  margin-bottom: 10px;
`
const StyledInput = styled(Input)`
  text-align: center;
  color: #000;
  width: 50px;
  border-radius: 0px;
`

const StyledFlex = styled(Flex)`
  background-image: url('/images/raid/swap/bg-border.png');
  background-size: cover;
  width: 572px;
  height: 94px;
`

// const MintButton = styled(Button)`
//   background-color: transparent;
//   background-image: url('/images/raid/swap/btn-mint.png');
//   background-size: cover;
//   height: 62px;
//   width: 159px;
//   &:disabled {
//     background-color: transparent;
//     opacity: 0.6;
//   }
// `

const MintButton = styled(Button)`
  background-image: url('/images/wt/btn-claim.png'); // 372 x 147
  border-radius: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 0px;
  font-size: 16px;
  font-weight: bold;
  width: 159px;
  height: 62px;
  color: #ffda31;
  &:disabled {
    background-color: transparent;
    opacity: 0.6;
  }
`

const ActionButton = styled(Text)`
  cursor: pointer;
  width: 25px;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`

const Plus = styled.span`
  color: white;
  font-size: 18px;
  font-weight: bold;
`

const inputRegex = RegExp(`^[0-9]*$`)

const MAX_MINT = 5

const WarriorMint = () => {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const router = useRouter()
  const { account } = useWeb3React()
  const { isMobile } = useMatchBreakpoints()

  const invite_address = localStorage.getItem('invite_address')
    ? localStorage.getItem('invite_address')
    : '0x0000000000000000000000000000000000000000'
  console.log('invite_addressInwarrior', invite_address)
  const [value, setValue] = useState('1')
  const [countByGold, setCountByGold] = useState('1')
  const [countBySilver, setCountBySilver] = useState('1')
  const [countByCopper, setCountByCopper] = useState('1')

  const { onApprove: onBusdApprove } = useTokenApprove(tokens.busd, getWarriorMintAddress())
  const { onApprove: onRaidApprove } = useTokenApprove(tokens.raid, getWarriorMintAddress())
  const { onApprove: onGoldApprove } = useTokenApprove(tokens.gold, getWarriorMintAddress())
  const { onApprove: onSilverApprove } = useTokenApprove(tokens.silver, getWarriorMintAddress())
  const { onApprove: onCopperApprove } = useTokenApprove(tokens.copper, getWarriorMintAddress())

  const [tokenIds, setTokenIds] = useState<(number | undefined)[]>([])
  const [cardIds, setCardIds] = useState<(number | undefined)[]>([])

  const busdAllowance = useFetchAllowance(tokens.busd, account, getWarriorMintAddress())
  const raidAllowance = useFetchAllowance(tokens.raid, account, getWarriorMintAddress())
  const goldAllowance = useFetchAllowance(tokens.gold, account, getWarriorMintAddress())
  const silverAllowance = useFetchAllowance(tokens.silver, account, getWarriorMintAddress())
  const copperAllowance = useFetchAllowance(tokens.copper, account, getWarriorMintAddress())

  const { prices } = useFetchWarriorPrices()
  const [onPresentModal, onDismissModal] = useModal(
    <MintedWarriorModal tokenIds={tokenIds} cardIds={cardIds} />,
    false,
    true,
    'mintedWarriors',
  )

  const enforcer = (nextUserInput: string, callback: (v: string) => void) => {
    if (nextUserInput === '' || inputRegex.test(nextUserInput)) {
      if (parseInt(nextUserInput) > MAX_MINT) {
        callback(MAX_MINT.toString())
      } else {
        callback(nextUserInput)
      }
    }
  }

  const getSpendAmount = (price: string | null, count: string) => {
    if (price) {
      return new BigNumber(price).times(new BigNumber(count))
    } else {
      return new BigNumber(0)
    }
  }

  const isApproved = (allowance: string | null, spendAmount: BigNumber) => {
    return allowance && spendAmount.gte(0) ? new BigNumber(allowance).gte(spendAmount) : false
  }
  const { onMint, onMintByCoin } = useWarriorMint()

  const { fetchWithCatchTxError } = useCatchTxError()

  const [pendingMintTx, setPendingMintTx] = useState(false)
  const [pendingGoldMintTx, setPendingGoldMintTx] = useState(false)
  const [pendingSilverMintTx, setPendingSilverMintTx] = useState(false)
  const [pendingCopperMintTx, setPendingCopperMintTx] = useState(false)

  const handleBusdApprove = async () => {
    setPendingMintTx(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onBusdApprove()
    })
    setPendingMintTx(false)
    if (receipt?.status) {
      busdAllowance.setLastUpdated()
      toastSuccess(
        `${t('Approved')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('You have approved BUSD')}</ToastDescriptionWithTx>,
      )

      return true
    }

    return false
  }

  const handleRaidApprove = async () => {
    setPendingMintTx(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onRaidApprove()
    })
    setPendingMintTx(false)
    if (receipt?.status) {
      raidAllowance.setLastUpdated()
      toastSuccess(
        `${t('Approved')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('You have approved RAID')}</ToastDescriptionWithTx>,
      )

      return true
    }

    return false
  }

  const handleGoldApprove = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onGoldApprove()
    })
    if (receipt?.status) {
      goldAllowance.setLastUpdated()
      toastSuccess(
        `${t('Approved')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('You have approved GOLD')}</ToastDescriptionWithTx>,
      )
      return true
    }
    return false
  }

  const handleSilverApprove = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onSilverApprove()
    })
    if (receipt?.status) {
      silverAllowance.setLastUpdated()
      toastSuccess(
        `${t('Approved')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You have approved SILVER')}
        </ToastDescriptionWithTx>,
      )

      return true
    }

    return false
  }

  const handleCopperApprove = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onCopperApprove()
    })
    if (receipt?.status) {
      copperAllowance.setLastUpdated()
      toastSuccess(
        `${t('Approved')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You have approved COPPER')}
        </ToastDescriptionWithTx>,
      )

      return true
    }

    return false
  }

  const iface = new Interface(['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'])
  const processMintResult = async (setPendingTx: (v: boolean) => void, tx: () => Promise<any>) => {
    setPendingTx(true)
    setTokenIds([])
    setCardIds([])
    onPresentModal()
    const receipt = await tx()
    setPendingTx(false)
    if (receipt?.status) {
      const tokenIds = receipt.logs
        .filter((log) => log.address === getWarriorAddress())
        .map((log) => iface.parseLog(log).args.tokenId.toNumber())
      setTokenIds(tokenIds)
      const cardIds = receipt.logs
        .filter((log) => log.address === getBlackCardAddress())
        .map((log) => iface.parseLog(log).args.tokenId.toNumber())
      setCardIds(cardIds)
    } else {
      onDismissModal()
      setTokenIds([])
      setCardIds([])
    }
  }

  const handleShow = async () => {
    onPresentModal()
    setTokenIds([1, 2])
    setCardIds([1])
  }

  const handleMint = async () => {
    if (!isApproved(busdAllowance.allowance, getSpendAmount(prices.busd, value))) {
      const approved = await handleBusdApprove()
      if (!approved) return
    }

    if (!isApproved(raidAllowance.allowance, getSpendAmount(prices.raid, value))) {
      const approved = await handleRaidApprove()
      if (!approved) return
    }

    processMintResult(setPendingMintTx, () => {
      return fetchWithCatchTxError(() => onMint(parseInt(value), invite_address))
    })
  }

  const handleMintByGold = async () => {
    if (!isApproved(goldAllowance.allowance, getSpendAmount(prices.gold, countByGold))) {
      const approved = await handleGoldApprove()
      if (!approved) return
    }

    processMintResult(setPendingGoldMintTx, () => {
      return fetchWithCatchTxError(() => onMintByCoin(SpendCoin.Gold, parseInt(countByGold)))
    })
  }

  const handleMintBySilver = async () => {
    if (!isApproved(silverAllowance.allowance, getSpendAmount(prices.silver, countBySilver))) {
      const approved = await handleSilverApprove()
      if (!approved) return
    }
    processMintResult(setPendingSilverMintTx, () => {
      return fetchWithCatchTxError(() => onMintByCoin(SpendCoin.Silver, parseInt(countBySilver)))
    })
  }

  const handleMintByCopper = async () => {
    if (!isApproved(copperAllowance.allowance, getSpendAmount(prices.copper, countByCopper))) {
      const approved = await handleCopperApprove()
      if (!approved) return
    }

    processMintResult(setPendingCopperMintTx, () => {
      return fetchWithCatchTxError(() => onMintByCoin(SpendCoin.Copper, parseInt(countByCopper)))
    })
  }

  const handleIncrement = (val: string, set: (v: string) => void) => {
    let nextValue = parseInt(val) + 1
    if (nextValue > MAX_MINT) {
      nextValue = MAX_MINT
    }
    set(nextValue.toString())
  }

  const handleDecrement = (val: string, set: (v: string) => void) => {
    let nextValue = parseInt(val) - 1
    if (nextValue < 0) {
      nextValue = 1
    }
    set(nextValue.toString())
  }

  return (
    <>
      <Flex flexDirection={['column', 'column', 'column']}>
        <StyledFlex m="10px" flexDirection="row" alignItems="center">
          <Flex mx="20px" width="60px" flexDirection="column" alignItems="center">
            <Image src="/images/raid/swap/r.png" alt="Raid" width={60} height={60} />
          </Flex>
          <Flex width="180px" flexDirection="column" alignItems="center">
            <Text fontSize="24px" color="white" fontWeight="bold">
              {getSpendAmount(prices.busd, value).toString()} $BUSD
            </Text>
            <Plus>+</Plus>
            <Text fontSize="24px" color="white" fontWeight="bold">
              {getSpendAmount(prices.raid, value).toString()} $RAID
            </Text>
          </Flex>
          <Flex alignItems="center" width="120px" justifyContent="center">
            <ActionButton onClick={() => handleDecrement(value, setValue)}>-</ActionButton>
            <StyledInput
              onChange={(event) => {
                enforcer(event.target.value.replace(/\./g, ''), setValue)
              }}
              value={value}
              inputMode="decimal"
              title={t('Count')}
              autoComplete="off"
              autoCorrect="off"
              type="text"
              pattern="^[0-9]*$"
              minLength={1}
              maxLength={3}
              spellCheck="false"
            />
            <ActionButton onClick={() => handleIncrement(value, setValue)}>+</ActionButton>
          </Flex>

          <MintButton disabled={pendingMintTx} onClick={handleMint}>
            Mint
            <br />
            Warrior
          </MintButton>
        </StyledFlex>
        <StyledFlex m="10px" flexDirection="row" alignItems="center">
          <Flex mx="20px" width="60px" flexDirection="column" alignItems="center">
            <Image src="/images/raid/swap/r.png" alt="Raid" width={60} height={60} />
          </Flex>
          <Flex width="180px" flexDirection="column" alignItems="center">
            <Text fontSize="24px" color="white" fontWeight="bold">
              {getSpendAmount(prices.gold, countByGold).toString()} $GOLD
            </Text>
          </Flex>
          <Flex alignItems="center" width="120px" justifyContent="center">
            <ActionButton onClick={() => handleDecrement(countByGold, setCountByGold)}>-</ActionButton>
            <StyledInput
              onChange={(event) => {
                enforcer(event.target.value.replace(/\./g, ''), setCountByGold)
              }}
              value={countByGold}
              inputMode="decimal"
              title={t('Count')}
              autoComplete="off"
              autoCorrect="off"
              type="text"
              pattern="^[0-9]*$"
              minLength={1}
              maxLength={3}
              spellCheck="false"
            />
            <ActionButton onClick={() => handleIncrement(countByGold, setCountByGold)}>+</ActionButton>
          </Flex>
          <MintButton disabled={pendingGoldMintTx} onClick={handleMintByGold}>
            Mint
            <br />
            Warrior
          </MintButton>
        </StyledFlex>
        {/*<StyledFlex m="10px" flexDirection="row" alignItems="center">
          <Flex mx="20px" width="60px" flexDirection="column" alignItems="center">
            <Image src="/images/raid/swap/r.png" alt="Raid" width={60} height={60} />
          </Flex>
          <Flex width="180px" flexDirection="column" alignItems="center">
            <Text fontSize="24px" color="white" fontWeight="bold">
              { getSpendAmount(prices.silver, countBySilver).toString() } $SILVER
            </Text>
          </Flex>
          <Flex alignItems="center" width="120px" justifyContent="center">
            <ActionButton onClick={() => handleDecrement(countBySilver, setCountBySilver)}>-</ActionButton>
            <StyledInput
              onChange={(event) => {
                enforcer(event.target.value.replace(/\./g, ''), setCountBySilver)
              }}
              value={countBySilver}
              inputMode="decimal"
              title={t('Count')}
              autoComplete="off"
              autoCorrect="off"
              type="text"
              pattern="^[0-9]*$"
              minLength={1}
              maxLength={3}
              spellCheck="false"
            />
            <ActionButton onClick={() => handleIncrement(countBySilver, setCountBySilver)}>+</ActionButton>
          </Flex>
          <MintButton disabled={pendingSilverMintTx} onClick={handleMintBySilver}>
            Mint 
            <br/>
            Warrior
          </MintButton>
        </StyledFlex>
        <StyledFlex m="10px" flexDirection="row" alignItems="center">
          <Flex mx="20px" width="60px" flexDirection="column" alignItems="center">
            <Image src="/images/raid/swap/r.png" alt="Raid" width={60} height={60} />
          </Flex>
          <Flex width="180px" flexDirection="column" alignItems="center">
            <Text fontSize="24px" color="white" fontWeight="bold">
              { getSpendAmount(prices.copper, countByCopper).toString() } $COPPER
            </Text>
          </Flex>
          <Flex alignItems="center" width="120px" justifyContent="center">
            <ActionButton onClick={() => handleDecrement(countByCopper, setCountByCopper)}>-</ActionButton>
            <StyledInput
              onChange={(event) => {
                enforcer(event.target.value.replace(/\./g, ''), setCountByCopper)
              }}
              value={countByCopper}
              inputMode="decimal"
              title={t('Count')}
              autoComplete="off"
              autoCorrect="off"
              type="text"
              pattern="^[0-9]*$"
              minLength={1}
              maxLength={3}
              spellCheck="false"
            />
            <ActionButton onClick={() => handleIncrement(countByCopper, setCountByCopper)}>+</ActionButton>
          </Flex>
          <MintButton disabled={pendingCopperMintTx} onClick={handleMintByCopper}>
            Mint 
            <br/>
            Warrior
          </MintButton>
        </StyledFlex>*/}

        {/*<Button onClick={handleShow}>show</Button>*/}
      </Flex>
    </>
  )
}

export default WarriorMint
