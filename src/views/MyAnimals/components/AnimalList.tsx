import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Flex, Grid, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useFetchUserAnimals } from 'state/wolfTown/hooks'
import { Animal } from 'state/types'
import AnimalCard from './AnimalCard'

interface AnimalListProps {
  animals: Animal[]
  userDataLoaded: boolean
}

const AnimalList: React.FC<AnimalListProps> = ({ animals, userDataLoaded }) => {
  const { t } = useTranslation()

  return (
    <div>
      {animals.length > 0 ? (
        <Grid
          gridGap="20px"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}
          mb="32px"
        >
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} userDataLoaded />
          ))}
        </Grid>
      ) : (
        <Text color="#fff" textAlign="center">
          {t('You have no animals')}
        </Text>
      )}
    </div>
  )
}

export default AnimalList
