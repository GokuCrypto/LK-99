import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Flex, Button, Text, useModal, ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useFetchUserAnimals, useGetUserAnimals } from 'state/wolfTown/hooks'
import Page from 'components/Layout/Page'
import AnimalList from './components/AnimalList'

const StyledButtonMenu = styled(ButtonMenu)`
  background-image: url('/images/btn-menu-bg.png');
  background-color: transparent;
  border: none;
  border-radius: 0;
  color: #8d652d;
`

const StyledButtonMenuItem = styled(ButtonMenuItem)`
  background-color: transparent;
  background-image: ${({ isActive }) => (isActive ? "url('/images/btn-menu-selected.png')" : 'none')};
  background-size: contain;
  width: 80px;
  border-radius: 0;
  color: ${({ isActive }) => (isActive ? '#fff' : '#8d652d')};
`

const MyAnimals = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { account } = useWeb3React()
  useFetchUserAnimals(account)
  const [index, setIndex] = useState(0)
  const handleClick = (newIndex) => setIndex(newIndex)
  // const testAccount = '0x318bafba940f4eefb3f953f586603ea3bd4938c5'
  const data = useGetUserAnimals(account)

  const getAnimals = () => {
    if (index === 1) {
      return data.sheeps
    }
    if (index === 2) {
      return data.wovies
    }
    return data.wovies.concat(data.sheeps).sort((a, b) => a.id - b.id)
  }
  return (
    <Page>
      <StyledButtonMenu activeIndex={index} onItemClick={handleClick} mb="20px">
        <StyledButtonMenuItem>{t('All')}</StyledButtonMenuItem>
        <StyledButtonMenuItem>{t('Sheep')}</StyledButtonMenuItem>
        <StyledButtonMenuItem>{t('Wolf')}</StyledButtonMenuItem>
      </StyledButtonMenu>
      {data.userDataLoaded ? (
        <AnimalList animals={getAnimals()} userDataLoaded={data.userDataLoaded} />
      ) : (
        <Text textAlign="center" color="#fff">
          Loading...
        </Text>
      )}
    </Page>
  )
}

export default MyAnimals
