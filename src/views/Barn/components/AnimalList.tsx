import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Heading, Button, TabMenu, Tab, useModal, Grid } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useFetchUserAnimals } from 'state/wolfTown/hooks'
import { Hero } from 'state/types'
import AnimalCard from './AnimalCard'

interface AnimalListProps {
  animals: Hero[]
  userDataLoaded: boolean
  account: string
  onChecked: (id: number) => void
  onUncheck: (id: number) => void
  selectedIds: number[]
}

const AnimalList: React.FC<AnimalListProps> = ({
  animals,
  userDataLoaded,
  account,
  onChecked,
  onUncheck,
  selectedIds,
}) => {
  const { t } = useTranslation()
  const objSelectedIds = selectedIds.reduce((acc, v) => {
    const ids = acc
    ids[v] = true
    return ids
  }, {})

  return (
    <Grid gridGap="16px" gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} mb="32px">
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          account={account}
          userDataLoaded={userDataLoaded}
          onChecked={onChecked}
          onUncheck={onUncheck}
          selected={!!objSelectedIds[animal.id]}
        />
      ))}
    </Grid>
  )
}

export default AnimalList
