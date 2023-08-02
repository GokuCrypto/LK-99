import { Text, Button, Flex, Heading, Input } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { NftOrder } from 'state/types'
import styled from 'styled-components'
import ModalPriceInput from 'components/Modal/ModalPriceInput'
import { useTokenApprove } from 'hooks/useApproveCallback'
import useCatchTxError from 'hooks/useCatchTxError'
import tokens from 'config/constants/tokens'
import { getWtBarnAddress, getHeroAddress, getWarriorAddress } from 'utils/addressHelpers'
import { useUpdatePrice, useUpdateWarriorPrice } from 'views/Mint/hooks'
import { useSetFloorPrice, useHeroSetBlocked, useWarriorSetBlocked } from './hooks'
import { Constants } from 'hooks/WolfConfig'
import { getContractHandler } from 'hooks/ethereum'
import { ethers } from 'ethers'
const StyledFlex = styled(Flex)`
  border: solid 1px #555;
  padding: 20px;
  align-items: flex-end;
  margin-bottom: 20px;
`

const SetFloorPrice = () => {
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const { account } = useWeb3React()
  const [price, setPrice] = useState('')
  const [warriorPrice, setWarriorPrice] = useState('')
  const [busdPrice, setBusdPrice] = useState('')
  const [raidPrice, setRaidPrice] = useState('')
  const [goldPrice, setGoldPrice] = useState('')
  const [heroId, setHeroId] = useState('')
  const [warriorId, setWarriorId] = useState('')

  const [warriorBusdPrice, setWarriorBusdPrice] = useState('')
  const [warriorRaidPrice, setWarriorRaidPrice] = useState('')
  const [warriorGoldPrice, setWarriorGoldPrice] = useState('')
  const [warriorSilverPrice, setWarriorSilverPrice] = useState('')
  const [warriorCopperPrice, setWarriorCopperPrice] = useState('')

  const [heroInvite, setHeroInvite] = useState('')

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const id = e.currentTarget.getAttribute('id')
      if (e.currentTarget.validity.valid) {
        if (id === 'floorPrice') {
          setPrice(e.currentTarget.value.replace(/,/g, '.'))
        }
        if (id === 'warriorFloorPrice') {
          setWarriorPrice(e.currentTarget.value.replace(/,/g, '.'))
        }
        if (id === 'busdPrice') {
          setBusdPrice(e.currentTarget.value.replace(/,/g, '.'))
        }
        if (id === 'raidPrice') {
          setRaidPrice(e.currentTarget.value.replace(/,/g, '.'))
        }
        if (id === 'goldPrice') {
          setGoldPrice(e.currentTarget.value.replace(/,/g, '.'))
        }
        if (id === 'heroId') {
          setHeroId(e.currentTarget.value.replace(/,/g, '.'))
        }
        if (id === 'warriorId') {
          setWarriorId(e.currentTarget.value.replace(/,/g, '.'))
        }

        if (id === 'heroInvite') {
          setHeroInvite(e.currentTarget.value)
        }
      }
    },
    [setPrice, setBusdPrice, setRaidPrice, setGoldPrice, setWarriorPrice, heroId, warriorId],
  )

  const handleChangeValue = (e: React.FormEvent<HTMLInputElement>, set: (v) => void) => {
    set(e.currentTarget.value.replace(/,/g, '.'))
  }
  const { fetchWithCatchTxError } = useCatchTxError()

  const { onSetFloorPrice } = useSetFloorPrice()

  const handleSetFloorPrice = async () => {
    await fetchWithCatchTxError(() => {
      return onSetFloorPrice(getHeroAddress(), price)
    })
  }

  const handleSetWarriorFloorPrice = async () => {
    await fetchWithCatchTxError(() => {
      return onSetFloorPrice(getWarriorAddress(), warriorPrice)
    })
  }

  const { onApprove } = useTokenApprove(tokens.raid.address, getWtBarnAddress())

  const approveStaking = async () => {
    await fetchWithCatchTxError(() => {
      return onApprove()
    })
  }

  const { onUpdatePrice } = useUpdatePrice()
  const { onUpdatePrice: onUpdateWarriorPrice } = useUpdateWarriorPrice()

  const handleUpdatePrice = async (method: string, price: string) => {
    await fetchWithCatchTxError(() => {
      return onUpdatePrice(method, price)
    })
  }

  const handleUpdateWarriorPrice = async (method: string, price: string) => {
    await fetchWithCatchTxError(() => {
      return onUpdateWarriorPrice(method, price)
    })
  }

  const { onHeroSetBlocked } = useHeroSetBlocked()
  const { onWarriorSetBlocked } = useWarriorSetBlocked()

  const handleHeroSetBlocked = async (isBlocked: boolean) => {
    await fetchWithCatchTxError(() => {
      return onHeroSetBlocked(heroId, isBlocked)
    })
  }

  const handleWarriorSetBlocked = async (isBlocked: boolean) => {
    await fetchWithCatchTxError(() => {
      return onWarriorSetBlocked(warriorId, isBlocked)
    })
  }

  const setHeroContract = async () => {
    const contract = await getContractHandler('heroMint')
    if (!heroInvite) return
    if (!contract) return
    const res = await contract.setInvitation(heroInvite)

    return res
  }

  return (
    <Page>
      <StyledFlex>
        <Flex flexDirection="column">
          <Text color="#fff">Set Hero Floor Price </Text>
          <ModalPriceInput
            id="floorPrice"
            onChange={handleChange}
            value={price}
            symbol="RAID"
            inputTitle={t('New Floor Price')}
            decimals={10}
          />
        </Flex>
        <Button onClick={handleSetFloorPrice} ml="20px">
          Submit
        </Button>
      </StyledFlex>

      <StyledFlex>
        <Flex flexDirection="column">
          <Text color="#fff">Set Warrior Floor Price </Text>
          <ModalPriceInput
            id="warriorFloorPrice"
            onChange={handleChange}
            value={warriorPrice}
            symbol="RAID"
            inputTitle={t('New Floor Price')}
            decimals={10}
          />
        </Flex>
        <Button onClick={handleSetWarriorFloorPrice} ml="20px">
          Submit
        </Button>
      </StyledFlex>

      <StyledFlex>
        <Button onClick={approveStaking}>Approve Staking Treasury</Button>
      </StyledFlex>

      <Heading color="#fff" mt="30px" mb="10px">
        Set Hero Mint Prices
      </Heading>
      <Flex flexDirection={['column', null, null, 'row']}>
        <Flex flexDirection="column" mr="20px">
          <Text color="#fff">Set BUSD Price </Text>
          <ModalPriceInput
            id="busdPrice"
            onChange={handleChange}
            value={busdPrice}
            symbol="BUSD"
            inputTitle={t('New Floor Price')}
            decimals={10}
          />
          <Button
            onClick={() => {
              handleUpdatePrice('setBusdPrice', busdPrice)
            }}
            mt="10px"
          >
            Submit
          </Button>
        </Flex>

        <Flex flexDirection="column" mr="20px">
          <Text color="#fff">Set RAID Price </Text>
          <ModalPriceInput
            id="raidPrice"
            onChange={handleChange}
            value={raidPrice}
            symbol="RAID"
            inputTitle={t('New Floor Price')}
            decimals={10}
          />
          <Button
            onClick={() => {
              handleUpdatePrice('setRaidPrice', raidPrice)
            }}
            mt="10px"
          >
            Submit
          </Button>
        </Flex>

        <Flex flexDirection="column">
          <Text color="#fff">Set GOLD Price </Text>
          <ModalPriceInput
            id="goldPrice"
            onChange={handleChange}
            value={goldPrice}
            symbol="GOLD"
            inputTitle={t('New Floor Price')}
            decimals={10}
          />
          <Button
            onClick={() => {
              handleUpdatePrice('setGoldPrice', goldPrice)
            }}
            mt="10px"
          >
            Submit
          </Button>
        </Flex>
      </Flex>

      {/* warrior */}
      <Heading color="#fff" mt="30px" mb="10px">
        Set Warrior Mint Prices
      </Heading>
      <Flex flexDirection={['column', null, null, 'row']}>
        <Flex flexDirection="column" mr="20px">
          <Text color="#fff">Set BUSD Price </Text>
          <ModalPriceInput
            id="warriorBusdPrice"
            onChange={(e) => handleChangeValue(e, setWarriorBusdPrice)}
            value={warriorBusdPrice}
            symbol="BUSD"
            decimals={10}
          />
          <Button
            onClick={() => {
              handleUpdateWarriorPrice('setBusdPrice', warriorBusdPrice)
            }}
            mt="10px"
          >
            Submit
          </Button>
        </Flex>

        <Flex flexDirection="column" mr="20px">
          <Text color="#fff">Set RAID Price </Text>
          <ModalPriceInput
            id="warriorRaidPrice"
            onChange={(e) => handleChangeValue(e, setWarriorRaidPrice)}
            value={warriorRaidPrice}
            symbol="RAID"
            decimals={10}
          />
          <Button
            onClick={() => {
              handleUpdateWarriorPrice('setRaidPrice', warriorRaidPrice)
            }}
            mt="10px"
          >
            Submit
          </Button>
        </Flex>

        <Flex flexDirection="column" mr="20px">
          <Text color="#fff">Set GOLD Price </Text>
          <ModalPriceInput
            id="warriorGoldPrice"
            onChange={(e) => handleChangeValue(e, setWarriorGoldPrice)}
            value={warriorGoldPrice}
            symbol="GOLD"
            decimals={10}
          />
          <Button
            onClick={() => {
              handleUpdateWarriorPrice('setGoldPrice', warriorGoldPrice)
            }}
            mt="10px"
          >
            Submit
          </Button>
        </Flex>

        <Flex flexDirection="column" mr="20px">
          <Text color="#fff">Set SILVER Price </Text>
          <ModalPriceInput
            id="warriorSilverPrice"
            onChange={(e) => handleChangeValue(e, setWarriorSilverPrice)}
            value={warriorSilverPrice}
            symbol="SILVER"
            decimals={10}
          />
          <Button
            onClick={() => {
              handleUpdateWarriorPrice('setSilverPrice', warriorSilverPrice)
            }}
            mt="10px"
          >
            Submit
          </Button>
        </Flex>

        <Flex flexDirection="column" mr="20px">
          <Text color="#fff">Set COPPER Price </Text>
          <ModalPriceInput
            id="warriorCopperPrice"
            onChange={(e) => handleChangeValue(e, setWarriorCopperPrice)}
            value={warriorCopperPrice}
            symbol="COPPER"
            decimals={10}
          />
          <Button
            onClick={() => {
              handleUpdateWarriorPrice('setCopperPrice', warriorCopperPrice)
            }}
            mt="10px"
          >
            Submit
          </Button>
        </Flex>
      </Flex>

      <StyledFlex>
        <Flex flexDirection="column">
          <Text color="#fff">Set Hero blacklist</Text>
          <ModalPriceInput
            id="heroId"
            onChange={handleChange}
            value={heroId}
            placeholder="TokenID"
            symbol=""
            decimals={0}
          />
        </Flex>
        <Button onClick={() => handleHeroSetBlocked(true)} ml="20px">
          Add
        </Button>
        <Button variant="danger" onClick={() => handleHeroSetBlocked(false)} ml="20px">
          Remove
        </Button>
      </StyledFlex>

      <StyledFlex>
        <Flex flexDirection="column">
          <Text color="#fff">Set Warrior blacklist</Text>
          <ModalPriceInput
            id="warriorId"
            onChange={handleChange}
            value={warriorId}
            placeholder="TokenID"
            symbol=""
            decimals={0}
          />
        </Flex>
        <Button
          onClick={() => {
            handleWarriorSetBlocked(true)
          }}
          ml="20px"
        >
          Add
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleWarriorSetBlocked(false)
          }}
          ml="20px"
        >
          Remove
        </Button>
      </StyledFlex>

      <StyledFlex>
        <Flex flexDirection="column">
          <Text color="#fff">Set Hero Invite Contract</Text>
          <Input id="heroInvite" onChange={handleChange} value={heroInvite} placeholder="Contract" />
        </Flex>
        <Button onClick={() => setHeroContract()} ml="20px">
          Change
        </Button>
        <Text> Contract:{Constants.Contract.MintInvite}</Text>
      </StyledFlex>
    </Page>
  )
}

export default SetFloorPrice
