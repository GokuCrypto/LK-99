import { ButtonMenu, ButtonMenuItem, Text, Flex } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from 'state'
import { fetchItemMetadataAsync } from 'state/marketplace'
import { useFetchAllOrders, useGetAllOrders, useGetUserOrders, useFetchItemMetadata } from 'state/marketplace/hooks'
import { NftOrder } from 'state/types'
import { useFetchUserAnimals, useGetUserAnimals } from 'state/wolfTown/hooks'
import { 
  useGetUserHeros, 
  useFetchUserHeros, 
  useGetUserWarriors,
  useFetchUserWarriors,
  useGetUserNFTs
} from 'state/raid/hooks'
import { getHeroAddress, getWarriorAddress } from 'utils/addressHelpers'
import styled from 'styled-components'
import AnimalList from './components/AnimalList'
import OrderList from './components/OrderList'
import TradeList from './components/TradeList'

const Wrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
`
const StyledButtonMenu = styled(ButtonMenu)`
  background-image: url('/images/wt/bg-menu.png'); // 1177 x 142
  background-size: cover;
  background-color: transparent;
  border: none;
  border-radius: 0;
  color: #fff;
  width: 588px;
  height: 71px;
  align-items: center;
  padding: 20px 13px;
`
const StyledButtonMenuItem = styled(ButtonMenuItem)`
  background-color: transparent;
  background-image: ${({ isActive }) => (isActive ? "url('/images/wt/btn-menu-selected-sm.png')" : 'none')};
  background-size: cover;
  width: 121px;
  height: 49px;
  border-radius: 0;
  color: #fff;
`

const StyledButtonMenuSmall = styled(ButtonMenu)`
  background-image: url('/images/wt/bg-menu.png'); // 1177 x 142
  background-size: cover;
  background-color: transparent;
  border: none;
  border-radius: 0;
  color: #fff;
  max-width:100%;
  width: 455px;
  height: 55px;
  align-items: center;
  padding: 20px 13px;
`
const StyledButtonMenuItemSmall = styled(ButtonMenuItem)`
  background-color: ${({ isActive }) => (isActive ? '#996843' : 'transparent')};
  // background-image: ${({ isActive }) => (isActive ? "url('/images/wt/btn-menu-selected-sm.png')" : 'none')}; // 224 x98
  // background-size: cover;
  width: 225px;
  height: 35px;
  border-radius: 0;
  color: #fff;
`

const Marketplace = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { asPath } = useRouter()
  const { account } = useWeb3React()
  useFetchAllOrders()
  useFetchUserHeros(account)
  useFetchUserWarriors(account)
  useFetchItemMetadata()

  const marketplace = useGetAllOrders()
  const userData = useGetUserOrders(account)
  // const { heros, userDataLoaded } = useGetUserHeros(account)
  // const { warriors } = useFetchUserWarriors()

  const { 
    totalBalance, heros, userDataLoaded, 
    warriors, userWarriorsLoaded, totalWarrios 
  } = useGetUserNFTs(account)

  const freeAnimals = heros

  const [index, setIndex] = useState(0)
  const handleClick = (newIndex) => setIndex(newIndex)

  let activeIndex = 0
  if (asPath === '/Marketplace#sell') {
    activeIndex = 1
  } else if (asPath === '/Marketplace#listed') {
    activeIndex = 2
  } else if (asPath === '/Marketplace#history') {
    activeIndex = 3
  } else {
    activeIndex = 0
  }

  const [tabIndex, setTabIndex] = useState(0)
  const handleTabClick = (newIndex) => setTabIndex(newIndex)

  const [marketTabIndex, setMarketTabIndex] = useState(0)
  const handleMarketTabClick = (newIndex) => setMarketTabIndex(newIndex)

  const [listedTabIndex, setListedTabIndex] = useState(0)
  const handleListedTabClick = (newIndex) => setListedTabIndex(newIndex)


  const showAllOrders = activeIndex === 0
  const showFreeAnimals = activeIndex === 1
  const showMyOrders = activeIndex === 2
  const showHistory = activeIndex === 3

  const heroOrders = useMemo(() => {
    if (marketplace) {
      const orders = Object.values(marketplace.orders) as NftOrder[]
      return orders.filter(o => o.nftAddr === getHeroAddress())
    }
    return []
  }, [marketplace])

  const warriorOrders = useMemo(() => {
    if (marketplace) {
      const orders = Object.values(marketplace.orders) as NftOrder[]
      return orders.filter(o => o.nftAddr === getWarriorAddress())
    }
    return []
  }, [marketplace])

  const userOrders = useMemo(() => {
    if (userData) {
      return Object.values(userData.orders) as NftOrder[]
    }
    return []
  }, [userData])

  const userHeroOrders = useMemo(() => {
    if (userData) {
      const orders =  Object.values(userData.orders) as NftOrder[]
      return orders.filter(o => o.nftAddr === getHeroAddress())
    }
    return []
  }, [userData])

  const userWarriorOrders = useMemo(() => {
    if (userData) {
      const orders =  Object.values(userData.orders) as NftOrder[]
      return orders.filter(o => o.nftAddr === getWarriorAddress())
    }
    return []
  }, [userData])

  return (
    <Page>
      <Wrapper>
        <StyledButtonMenu activeIndex={activeIndex}>
          <NextLink href="/Marketplace" passHref>
            <StyledButtonMenuItem isActive={activeIndex === 0}>{t('Market')}</StyledButtonMenuItem>
          </NextLink>

          <NextLink href="/Marketplace#sell" passHref>
            <StyledButtonMenuItem isActive={activeIndex === 1}>{t('Sell')}</StyledButtonMenuItem>
          </NextLink>

          <NextLink href="/Marketplace#listed" passHref>
            <StyledButtonMenuItem isActive={activeIndex === 2}>{t('Listed')}</StyledButtonMenuItem>
          </NextLink>

          <NextLink href="/Marketplace#history" passHref>
            <StyledButtonMenuItem isActive={activeIndex === 3}>{t('History')}</StyledButtonMenuItem>
          </NextLink>
        </StyledButtonMenu>
      </Wrapper>

      {showAllOrders &&
        (marketplace.isLoading ? (
          <Text textAlign="center" color="#fff">Loading...</Text>
        ) : (
          <Flex flexDirection="column">
            <StyledButtonMenuSmall activeIndex={marketTabIndex} onItemClick={handleMarketTabClick}>
              <StyledButtonMenuItemSmall isActive={marketTabIndex === 0}>{t('Heroes')}</StyledButtonMenuItemSmall>
              <StyledButtonMenuItemSmall isActive={marketTabIndex === 1}>{t('Warriors')}</StyledButtonMenuItemSmall>
            </StyledButtonMenuSmall>
            { marketTabIndex === 0 && <OrderList itemType={"Hero"} orders={heroOrders} ordersCount={heroOrders.length} /> }
            { marketTabIndex === 1 && <OrderList itemType={"Warrior"} orders={warriorOrders} ordersCount={warriorOrders.length} /> }
          </Flex>
        ))}

      {showFreeAnimals &&
        (userDataLoaded ? (
          <Flex flexDirection="column">
            <StyledButtonMenuSmall activeIndex={tabIndex} onItemClick={handleTabClick}>
              <StyledButtonMenuItemSmall isActive={tabIndex === 0}>{t('Heroes')}</StyledButtonMenuItemSmall>
              <StyledButtonMenuItemSmall isActive={tabIndex === 1}>{t('Warriors')}</StyledButtonMenuItemSmall>
            </StyledButtonMenuSmall>
            { tabIndex === 0 && <AnimalList animals={heros} itemType="Hero" userDataLoaded={userDataLoaded} /> }
            { tabIndex === 1 && <AnimalList animals={warriors} itemType="Warrior" userDataLoaded={userWarriorsLoaded} /> }
          </Flex>
        ) : (
          <Text textAlign="center" color="#fff">
            { account ? "Loading ..." : "Please connect wallet" }
          </Text>
        ))}

      {showMyOrders &&
        (userData.isLoading ? (
          <Text textAlign="center" color="#fff">
            { account ? "Loading ..." : "Please connect wallet" }
          </Text>
        ) : (
            <Flex flexDirection="column">
              <StyledButtonMenuSmall activeIndex={listedTabIndex} onItemClick={handleListedTabClick}>
                <StyledButtonMenuItemSmall isActive={listedTabIndex === 0}>{t('Heroes')}</StyledButtonMenuItemSmall>
                <StyledButtonMenuItemSmall isActive={listedTabIndex === 1}>{t('Warriors')}</StyledButtonMenuItemSmall>
              </StyledButtonMenuSmall>
              { listedTabIndex === 0 && <OrderList orders={userHeroOrders} itemType="Hero" ordersCount={userHeroOrders.length} /> }
              { listedTabIndex === 1 && <OrderList orders={userWarriorOrders} itemType="Warrior" ordersCount={userWarriorOrders.length} /> }
            </Flex>
            
        ))}

      {
        showHistory && <TradeList />
      }
    </Page>
  )
}

export default Marketplace
