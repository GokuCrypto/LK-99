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
import raidHeroAbi from 'config/abi/raidHero.json'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import { getHeroAddress, getHeroMintAddress, getWarriorAddress, getWarriorMintAddress } from 'utils/addressHelpers'
import Page from 'components/Layout/Page'
import {
  useMint,
  useFetchPrices,
  useFetchWhitelisted,
  useTokenApprove,
  useFetchAllowances,
  useFetchAllowance,
} from './hooks'
import MintedModal from './MintedModal'
import Invite from '../../components/Menu/UserMenu/Invite'
import WarriorMint from './WarriorMint'

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

const Mint = () => {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const router = useRouter()
  const { account } = useWeb3React()
  const { isMobile } = useMatchBreakpoints()

  const [value, setValue] = useState('1')
  const [countByGold, setCountByGold] = useState('1')
  const [onInvite] = useModal(<Invite />)
  const { onApprove: onBusdApprove } = useTokenApprove(tokens.busd, getHeroMintAddress())
  const { onApprove: onRaidApprove } = useTokenApprove(tokens.raid, getHeroMintAddress())
  const { onApprove: onGoldApprove } = useTokenApprove(tokens.gold, getHeroMintAddress())

  const [tokenIds, setTokenIds] = useState<(number | undefined)[]>([5, 6, 7])

  const { allowances, setLastUpdated } = useFetchAllowances(account)

  const busdAllowance = useFetchAllowance(tokens.busd, account, getHeroMintAddress())
  const raidAllowance = useFetchAllowance(tokens.raid, account, getHeroMintAddress())
  const goldAllowance = useFetchAllowance(tokens.gold, account, getHeroMintAddress())

  const { whitelisted, minted: isWLMinted } = useFetchWhitelisted(account)

  const { prices } = useFetchPrices()
  const [onPresentModal, onDismissModal] = useModal(<MintedModal tokenIds={tokenIds} />, false, true, 'mintedHeros')

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(nextUserInput)) {
      if (parseInt(nextUserInput) > MAX_MINT) {
        setValue(MAX_MINT.toString())
      } else {
        setValue(nextUserInput)
      }
    }
  }

  const goldInputEnforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(nextUserInput)) {
      if (parseInt(nextUserInput) > MAX_MINT) {
        setCountByGold(MAX_MINT.toString())
      } else {
        setCountByGold(nextUserInput)
      }
    }
  }

  const spends = useMemo(() => {
    const spends = { busd: null, raid: null, gold: null }
    if (prices.busd && value) {
      spends.busd = parseInt(prices.busd) * parseInt(value)
    }
    if (prices.raid && value) {
      spends.raid = parseInt(prices.raid) * parseInt(value)
    }
    if (prices.gold && countByGold) {
      spends.gold = parseInt(prices.gold) * parseInt(countByGold)
    }
    return spends
  }, [value, prices, countByGold])

  const busdApproved =
    busdAllowance.allowance && spends.busd && new BigNumber(busdAllowance.allowance).gte(new BigNumber(spends.busd))
  const raidApproved =
    raidAllowance.allowance && spends.raid && new BigNumber(raidAllowance.allowance).gte(new BigNumber(spends.raid))
  const goldApproved =
    goldAllowance.allowance && spends.gold && new BigNumber(goldAllowance.allowance).gte(new BigNumber(spends.gold))

  const { onMint, onMintByGold, onWLMint } = useMint()

  const { fetchWithCatchTxError } = useCatchTxError()

  const [pendingMintTx, setPendingMintTx] = useState(false)
  const [pendingWLMintTx, setPendingWLMintTx] = useState(false)
  const [pendingGoldMintTx, setPendingGoldMintTx] = useState(false)

  const invite_address = localStorage.getItem('invite_address')
    ? localStorage.getItem('invite_address')
    : '0x0000000000000000000000000000000000000000'
  console.log('invite_address', invite_address)
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
    }
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
    }
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
    }
  }

  const iface = new Interface(raidHeroAbi)
  const handleMint = async () => {
    onPresentModal()
    /* setPendingMintTx(true)
    setTokenIds([])
    onPresentModal()
    const receipt = await fetchWithCatchTxError(() => {
      return onMint(parseInt(value), invite_address)
    })

    setPendingMintTx(false)
    if (receipt?.status) {
      const tokenIds = receipt.logs
        .filter((log) => log.address === getHeroAddress())
        .map((log) => iface.parseLog(log).args.tokenId.toNumber())
      setTokenIds(tokenIds)
    } else {
      onDismissModal()
      setTokenIds([])
    } */
  }

  const handleWLMint = async () => {
    setPendingWLMintTx(true)
    // setTokenIds(Array.from({ length: 1 }))
    setTokenIds([])
    onPresentModal()
    const receipt = await fetchWithCatchTxError(() => {
      return onWLMint()
    })
    setPendingWLMintTx(false)
    if (receipt?.status) {
      const tokenIds = receipt.logs
        .filter((log) => log.address === getHeroAddress())
        .map((log) => iface.parseLog(log).args.tokenId.toNumber())
      setTokenIds(tokenIds)
    } else {
      onDismissModal()
      setTokenIds([])
    }
  }

  const handleMintByGold = async () => {
    setPendingGoldMintTx(true)
    // setTokenIds(Array.from({ length: parseInt(countByGold) }))
    setTokenIds([])
    onPresentModal()
    const receipt = await fetchWithCatchTxError(() => {
      return onMintByGold(parseInt(countByGold))
    })
    setPendingGoldMintTx(false)
    if (receipt?.status) {
      const tokenIds = receipt.logs
        .filter((log) => log.address === getHeroAddress())
        .map((log) => iface.parseLog(log).args.tokenId.toNumber())
      setTokenIds(tokenIds)
    } else {
      onDismissModal()
      setTokenIds([])
    }
  }

  //邀请部分
  let invateLink = 'http://localhost:3000/?invate='
  const [copyTitle, setCopyTitle] = useState('')

  if (account) {
    // 对字符串进行base64编码
    let buffer = Buffer.from(account)
    // console.log(buffer.toString('base64')) // MTIz
    invateLink += buffer.toString('base64')
    // 对base64编码字符串进行解码
    // 读取base64字符串
    buffer = Buffer.from(buffer.toString('base64'), 'base64')
    // 进行解码
    // console.log(buffer.toString()) // 123
  }
  //复制模块
  const myInput = useRef(null)
  function handleClickCopy() {
    const copyText = myInput.current.value
    if (copyText) {
      const copyInput = document.createElement('input')
      copyInput.setAttribute('value', copyText)
      document.body.appendChild(copyInput)
      copyInput.select()
      try {
        document.execCommand('copy')
        document.body.removeChild(copyInput)
        setCopyTitle('1')
      } catch (err) {
        document.body.removeChild(copyInput)
      }
    } else {
    }
  }

  const handleDecrValue = () => {
    let nextValue = parseInt(value) - 1
    if (nextValue < 0) {
      nextValue = 1
    }
    setValue(nextValue.toString())
  }

  const handleIncrValue = () => {
    let nextValue = parseInt(value) + 1
    if (nextValue > MAX_MINT) {
      nextValue = MAX_MINT
    }
    setValue(nextValue.toString())
  }

  const handleDecrCount = () => {
    let nextValue = parseInt(countByGold) - 1
    if (nextValue < 0) {
      nextValue = 1
    }
    setCountByGold(nextValue.toString())
  }

  const handleIncrCount = () => {
    let nextValue = parseInt(countByGold) + 1
    if (nextValue > 5) {
      nextValue = 5
    }
    setCountByGold(nextValue.toString())
  }

  return (
    <Page>
      <Flex mb="40px" alignItems="center" justifyContent="center" flexDirection="column">
        <MintCard />
        <Flex flexDirection={['column', 'column', 'column']}>
          {whitelisted && (
            <Flex m="10px" flexDirection="column" alignItems="center">
              <Text fontSize="24px" color="white" fontWeight="bold">
                Whitelist Mint
              </Text>
              <MintButton onClick={handleWLMint} disabled={!whitelisted || (isWLMinted && pendingWLMintTx)}>
                Mint Hero
              </MintButton>
            </Flex>
          )}

          <StyledFlex m="10px" flexDirection="row" alignItems="center">
            <Flex mx="20px" width="60px" flexDirection="column" alignItems="center">
              <Image src="/images/raid/swap/r.png" alt="Raid" width={60} height={60} />
            </Flex>
            <Flex width="180px" flexDirection="column" alignItems="center">
              <Text fontSize="24px" color="white" fontWeight="bold">
                {spends.busd} $BUSD
              </Text>
              <Plus>+</Plus>
              <Text fontSize="24px" color="white" fontWeight="bold">
                {spends.raid} $RAID
              </Text>
            </Flex>
            <Flex alignItems="center" width="120px" justifyContent="center">
              <ActionButton onClick={handleDecrValue}>-</ActionButton>
              <StyledInput
                onChange={(event) => {
                  enforcer(event.target.value.replace(/\./g, ''))
                }}
                value={value}
                inputMode="decimal"
                title={t('Tickets')}
                autoComplete="off"
                autoCorrect="off"
                type="text"
                pattern="^[0-9]*$"
                minLength={1}
                maxLength={3}
                spellCheck="false"
              />
              <ActionButton onClick={handleIncrValue}>+</ActionButton>
            </Flex>
            {!busdApproved ? (
              <MintButton disabled={pendingMintTx} onClick={handleMint}>
                Mint Hero
              </MintButton>
            ) : prices.raid && prices.raid > 0 && !raidApproved ? (
              <MintButton disabled={pendingMintTx} onClick={handleMint}>
                Mint Hero
              </MintButton>
            ) : (
              <MintButton disabled={pendingMintTx} onClick={handleMint}>
                Mint Hero
              </MintButton>
            )}
          </StyledFlex>
          <StyledFlex m="10px" flexDirection="row" alignItems="center">
            <Flex mx="20px" width="60px" flexDirection="column" alignItems="center">
              <Image src="/images/raid/swap/r.png" alt="Raid" width={60} height={60} />
            </Flex>
            <Flex width="180px" flexDirection="column" alignItems="center">
              <Text fontSize="24px" color="white" fontWeight="bold">
                {spends.gold} $GOLD
              </Text>
            </Flex>
            <Flex alignItems="center" width="120px" justifyContent="center">
              <ActionButton onClick={handleDecrCount}>-</ActionButton>
              <StyledInput
                onChange={(event) => {
                  goldInputEnforcer(event.target.value.replace(/\./g, ''))
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
              <ActionButton onClick={handleIncrCount}>+</ActionButton>
            </Flex>
            {!goldApproved ? (
              <MintButton disabled={pendingGoldMintTx} onClick={handleGoldApprove}>
                Mint Hero
              </MintButton>
            ) : (
              <MintButton disabled={pendingGoldMintTx} onClick={handleMintByGold}>
                Mint Hero
              </MintButton>
            )}
          </StyledFlex>
        </Flex>

        <WarriorMint />

        <Button
          style={{ color: '#fff', borderColor: '#ffde00' }}
          width="572px"
          variant="secondary"
          m="18px"
          onClick={onInvite}
        >
          {t('Get your invitation link')}
        </Button>
      </Flex>
    </Page>
  )
}

export default Mint
