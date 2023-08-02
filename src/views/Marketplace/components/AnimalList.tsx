import { Flex, Grid, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Hero } from 'state/types'
import AnimalCard from './AnimalCard'

interface AnimalListProps {
  animals: Hero[]
  itemType: "Hero" | "Warrior"
  userDataLoaded: boolean
}

const AnimalList: React.FC<AnimalListProps> = ({ animals, itemType, userDataLoaded }) => {
  const { t } = useTranslation()

  return (
    <>
    { animals.length === 0 ? <Text textAlign="left" ml="10px" color="#fff"> No {itemType}</Text> : 
      (
        <Grid
          gridGap="20px"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']}
          mb="32px"
        >
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} itemType={itemType} userDataLoaded />
          ))}
        </Grid>
      )
    }
    </>
  )
}

export default AnimalList
