import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Flex, Grid, Text, AutoRenewIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useFetchUserAnimals } from 'state/wolfTown/hooks'
import { Hero, Warrior } from 'state/types'
import NftCard from './NftCard'

interface NftListProps {
  items: (Hero | Warrior)[]
  itemType: 'Hero' | 'Warrior'
  userDataLoaded: boolean
}

const NftList: React.FC<NftListProps> = ({ items, itemType, userDataLoaded }) => {
  const { t } = useTranslation()

  return (
    <div>
      {items.length > 0 ? (
        <Grid
          gridGap="20px"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
          mb="32px"
        >
          {items.map((item) => (
            <>
              <NftCard key={item.id} item={item} itemType={itemType} userDataLoaded />
            </>
          ))}
        </Grid>
      ) : (
        <Text color="#fff" textAlign="center">
          {t('You have no NFT')}
        </Text>
      )}
    </div>
  )
}

export default NftList
