import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Flex, Button, Text, useModal, ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetUserHeros, useFetchUserHeros, useFetchUserWarriors, useGetUserNFTs } from 'state/raid/hooks'
import Page from 'components/Layout/Page'
import NftList from './components/NftList'

// const StyledButtonMenu = styled(ButtonMenu)`
//   background-image: url('/images/btn-menu-bg.png');
//   background-color: transparent;
//   border: none;
//   border-radius: 0;
//   color: #8d652d;
// `

// const StyledButtonMenuItem = styled(ButtonMenuItem)`
//   background-color: transparent;
//   background-image: ${({ isActive }) => (isActive ? "url('/images/btn-menu-selected.png')" : 'none')};
//   background-size: contain;
//   width: 80px;
//   border-radius: 0;
//   color: ${({ isActive }) => (isActive ? '#fff' : '#8d652d')};
// `

const MyNfts = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { account } = useWeb3React()
  useFetchUserHeros(account)
  useFetchUserWarriors(account)
  const [index, setIndex] = useState(0)
  const handleClick = (newIndex) => setIndex(newIndex)
  // const data = useGetUserHeros(account)

  const { totalBalance, heros, userDataLoaded, warriors, userWarriorsLoaded, totalWarrios } = useGetUserNFTs(account)

  const renderHeroes = () => {
    return (
      <>
        {userDataLoaded ? (
          <NftList items={heros} itemType="Hero" userDataLoaded={userDataLoaded} />
        ) : (
          <Text textAlign="center" color="#fff">
            Loading...
          </Text>
        )}
      </>
    )
  }

  const renderWarriors = () => {
    return (
      <>
        {userWarriorsLoaded ? (
          <NftList items={warriors} itemType="Warrior" userDataLoaded={userWarriorsLoaded} />
        ) : (
          <Text textAlign="center" color="#fff">
            Loading...
          </Text>
        )}
      </>
    )
  }

  return (
    <Page>
      <ButtonMenu activeIndex={index} onItemClick={handleClick} mb="20px">
        <ButtonMenuItem>
          {t('All Heroes')} ({totalBalance})
        </ButtonMenuItem>
        <ButtonMenuItem>
          {t('All Warriors')} ({totalWarrios})
        </ButtonMenuItem>
      </ButtonMenu>

      {index == 0 && renderHeroes()}
      {index == 1 && renderWarriors()}
    </Page>
  )
}

export default MyNfts
