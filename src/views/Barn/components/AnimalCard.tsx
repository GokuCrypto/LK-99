import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, useMatchBreakpoints, Text, Image, Checkbox, CardBody } from '@pancakeswap/uikit'
import { Hero } from 'state/types'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { RAID_HERO_IMAGE_BASE_URL } from 'config'
interface AnimalCardProps {
  animal: Hero
  account: string
  userDataLoaded: boolean
  onChecked: (id: number) => void
  onUncheck: (id: number) => void
  selected: boolean
}

const StyledCardBody = styled(CardBody)<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${({ selected }) =>
    selected ? '/images/wt/frame-selected.png' : 'none'});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  justify-content: space-around;
  padding: 16px;
`

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, account, userDataLoaded, onChecked, onUncheck, selected }) => {
  // const { isXs, isSm, isMd, isLg, isXl } = useMatchBreakpoints()
  const image = `${RAID_HERO_IMAGE_BASE_URL}/hero/images/${animal.id}.png`
  const [isSelected, setIsSelected] = useState(selected)

  const handleCheck = () => {
    if (!isSelected) {
      onChecked(animal.id)
      setIsSelected(true)
    } else {
      onUncheck(animal.id)
      setIsSelected(false)
    }
  }

  return (
    <StyledCardBody p="8px" selected={isSelected} onClick={handleCheck}>
      <Image src={image} alt={`Hero#${animal.id}`} width={220} height={332} />
    </StyledCardBody>
  )
}

export default AnimalCard
